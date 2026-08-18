// ---------------------------------------------------------------------------
// Service operations dashboard — widget renderers
// ---------------------------------------------------------------------------
// The widgets a prebuilt "Service operations executive review" dashboard is made
// of. DashboardBuilder owns the canvas, chrome and layout; this file owns what
// gets drawn inside each widget, so the builder file stays about authoring.
//
// Colour rules (data-viz method):
//  - Categorical hues are assigned in fixed slot order and never cycled. A
//    validated 3-slot set is used everywhere a chart needs identity; a 4th
//    category folds into a neutral "Other" rather than taking a 4th hue.
//  - Status colours (good/warning/critical) mean state, never identity, and
//    always ship with an icon or a word beside them.
//  - Magnitude-only charts use a single hue, never a hue-per-bar ramp.
import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Lightbulb,
  SparklesStroke,
  TrendingUp,
} from '@/components/icons/flora';

// ---- Tokens ---------------------------------------------------------------

// Categorical slots, in fixed order — the same hues the builder's background and
// border pickers offer (TEXT_STYLE_PALETTE in DashboardBuilder), so a series and a
// card tint come out of one set rather than two that nearly match.
//
// Assigned in this order and never cycled: a chart with two series uses blue then
// orange, whatever the series are. Order is not arbitrary — it is the order the
// set was validated in, and the two closest hues (violet and indigo) are kept
// non-adjacent.
//
// Validated against the white card surface at 3, 5 and 6 slots: lightness band,
// chroma floor, adjacent-pair CVD separation, normal-vision floor and 3:1 contrast
// all pass. Worst adjacent pair is aqua↔orange at CVD ΔE 10.6 (protan) and 21.9
// normal-vision; at 5+ slots it is red↔violet at 16.9 normal-vision.
//
// Orange is one step darker than the picker's own #FCA347. That swatch is a card
// tint, where it sits under text and only has to be light; as a mark on white it
// is 1.95:1 and outside the lightness band, so a bar drawn in it disappears. Same
// hue, darkened until it passed.
export const SERIES = {
  blue: '#2694D6',
  orange: '#D2761A',
  aqua: '#26A178',
  // Slots 4–6, for the charts that plot more than three categories. Red is a
  // series slot here, not a state: status colours stay reserved to STATUS below
  // and never stand in for a category.
  violet: '#B276CD',
  red: '#EB5C69',
  indigo: '#698CD3',
};
// Not a categorical slot — the documented fold for a long tail of categories.
const OTHER = '#b0b3ae';

// Status colours are reserved for state and are never used as a series colour.
export const STATUS = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
};

export const INK = '#2f3941';
export const INK_2 = '#68737d';
export const MUTED = '#87929d';
export const GRID = '#ebedef';
export const AXIS = '#d8dcde';
// Positive/negative deltas as *text* — darker than the status fills so they
// clear text contrast on a white card.
export const DELTA_GOOD = '#0a6b0a';
const DELTA_BAD = '#a8261f';

export const AXIS_TICK = { fill: MUTED, fontSize: 12 };
export const TOOLTIP_STYLE = {
  backgroundColor: '#ffffff',
  border: `1px solid ${AXIS}`,
  borderRadius: 8,
  fontSize: 12,
  color: INK,
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
};

// ---- Data -----------------------------------------------------------------

// Contact volume by channel, by week. "Other" folds social + web form + voice
// callback so the stack stays inside a validated 3-hue set.
export const channelVolumeData = [
  { week: 'Wk 27', Email: 1840, Chat: 1210, Phone: 720, Other: 310 },
  { week: 'Wk 28', Email: 1920, Chat: 1330, Phone: 690, Other: 340 },
  { week: 'Wk 29', Email: 1780, Chat: 1480, Phone: 640, Other: 360 },
  { week: 'Wk 30', Email: 1690, Chat: 1620, Phone: 610, Other: 390 },
  { week: 'Wk 31', Email: 1610, Chat: 1810, Phone: 580, Other: 420 },
  { week: 'Wk 32', Email: 1540, Chat: 1960, Phone: 550, Other: 450 },
];

// Contact reasons — part-to-whole at a glance, kept to four segments.
export const contactReasonData = [
  { name: 'Billing & invoices', value: 34, color: SERIES.blue },
  { name: 'Account access', value: 27, color: SERIES.orange },
  { name: 'Product defects', value: 22, color: SERIES.aqua },
  { name: 'Other reasons', value: 17, color: OTHER },
];

// Two measures, one unit (hours) — so they share one axis honestly.
export const responsivenessData = [
  { week: 'Wk 27', firstReply: 3.4, resolution: 9.1 },
  { week: 'Wk 28', firstReply: 3.1, resolution: 8.6 },
  { week: 'Wk 29', firstReply: 2.8, resolution: 8.0 },
  { week: 'Wk 30', firstReply: 2.5, resolution: 7.2 },
  { week: 'Wk 31', firstReply: 2.2, resolution: 6.4 },
  { week: 'Wk 32', firstReply: 2.0, resolution: 5.8 },
];

// SLA attainment by priority against a 90% commitment.
export const slaByPriorityData = [
  { priority: 'Urgent', attainment: 82 },
  { priority: 'High', attainment: 88 },
  { priority: 'Normal', attainment: 94 },
  { priority: 'Low', attainment: 97 },
];
export const SLA_TARGET = 90;

export const csatTrendData = [
  { week: 'Wk 27', csat: 90.4 },
  { week: 'Wk 28', csat: 91.1 },
  { week: 'Wk 29', csat: 91.8 },
  { week: 'Wk 30', csat: 92.6 },
  { week: 'Wk 31', csat: 93.5 },
  { week: 'Wk 32', csat: 94.2 },
];

export const teamVolumeData = [
  { team: 'Tier 1 — EMEA', solved: 3120 },
  { team: 'Tier 1 — AMER', solved: 2880 },
  { team: 'Tier 2 — Technical', solved: 2140 },
  { team: 'Billing', solved: 1760 },
  { team: 'Escalations', solved: 980 },
];

export const topIssuesData = [
  { issue: 'Duplicate charge on renewal', volume: 612, change: 18, csat: 86.4, driver: 'Billing' },
  { issue: 'SSO login loop after reset', volume: 488, change: 34, csat: 81.2, driver: 'Account access' },
  { issue: 'Export job times out', volume: 341, change: -9, csat: 90.1, driver: 'Product defect' },
  { issue: 'Invoice missing VAT number', volume: 287, change: 4, csat: 92.8, driver: 'Billing' },
  { issue: 'Mobile push not delivered', volume: 214, change: -22, csat: 93.5, driver: 'Product defect' },
];

export const teamAttentionData = [
  { team: 'Escalations', sla: 78, backlog: 214, occupancy: 96, state: 'critical' as const },
  { team: 'Tier 2 — Technical', sla: 85, backlog: 168, occupancy: 91, state: 'warning' as const },
  { team: 'Billing', sla: 89, backlog: 97, occupancy: 84, state: 'warning' as const },
  { team: 'Tier 1 — AMER', sla: 94, backlog: 62, occupancy: 79, state: 'good' as const },
  { team: 'Tier 1 — EMEA', sla: 96, backlog: 41, occupancy: 76, state: 'good' as const },
];

// ---- Shared pieces --------------------------------------------------------

// Identity is never colour-alone: every multi-series chart carries this.
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 pt-3">
      {items.map((s) => (
        <span key={s.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
          <span className="text-sm" style={{ color: INK_2 }}>{s.label}</span>
        </span>
      ))}
    </div>
  );
}

// One-sentence read of the chart, so a visual never ships without its meaning.
export function Interpretation({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 pt-2 text-sm leading-snug" style={{ color: INK_2 }}>
      {children}
    </p>
  );
}

export function Delta({ value, suffix, invert }: { value: number; suffix?: string; invert?: boolean }) {
  // `invert` marks metrics where down is the good direction (time, backlog).
  const isGood = invert ? value < 0 : value > 0;
  const Arrow = value >= 0 ? ArrowUp : ArrowDown;
  return (
    <span className="inline-flex items-center gap-1 text-sm" style={{ color: isGood ? DELTA_GOOD : DELTA_BAD }}>
      <Arrow style={{ width: 14, height: 14 }} />
      {value > 0 ? '+' : ''}{value}
      {suffix ?? '%'}
    </span>
  );
}

const STATE_META = {
  good: { color: STATUS.good, label: 'On track', Icon: CheckCircle },
  warning: { color: STATUS.warning, label: 'Watch', Icon: AlertTriangle },
  critical: { color: STATUS.critical, label: 'At risk', Icon: AlertTriangle },
};

// Status pill — colour plus icon plus word, never colour on its own.
export function StatePill({ state }: { state: keyof typeof STATE_META }) {
  const { color, label, Icon } = STATE_META[state];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm"
      style={{ backgroundColor: `${color}1f`, color: state === 'warning' ? '#8a5b00' : color }}
    >
      <Icon style={{ width: 12, height: 12 }} />
      {label}
    </span>
  );
}

// ---- Widgets --------------------------------------------------------------

// Stat tile: the honest form for a single headline number. A sparkline gives it
// direction without pretending to be a chart.
function KpiTile({ content }: { content: any }) {
  const spark: number[] = content.spark || [];
  const data = spark.map((v, i) => ({ i, v }));
  const accent = content.accent || SERIES.blue;
  // A sparkline exists to show shape, so the band is the data's own range with a
  // little headroom — anchoring it at zero would flatten every one of these to a
  // straight line. No axis is drawn, and the value above it carries the level.
  const lo = Math.min(...spark);
  const hi = Math.max(...spark);
  const pad = (hi - lo || 1) * 0.18;
  return (
    <div className="flex flex-1 flex-col justify-between px-4 pb-2 pt-1">
      <div>
        <div className="text-[32px] font-medium leading-none" style={{ color: INK }}>
          {content.value}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Delta value={content.change} suffix={content.changeSuffix} invert={content.lowerIsBetter} />
          <span className="text-sm" style={{ color: MUTED }}>vs prior 6 weeks</span>
        </div>
      </div>
      {data.length > 0 && (
        <div className="mt-2 h-9">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`spark-${content.sparkId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={[lo - pad, hi + pad]} />
              <Area
                type="monotone"
                dataKey="v"
                stroke={accent}
                strokeWidth={2}
                fill={`url(#spark-${content.sparkId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="pt-1 text-sm leading-snug" style={{ color: INK_2 }}>
        {content.note}
      </div>
    </div>
  );
}

// AI-written read of the period. Tinted, because it is the one card in the band
// that carries prose rather than a number.
function NarrativeCard({ content }: { content: any }) {
  return (
    <div className="flex h-full flex-col gap-3 px-5 py-4">
      <div className="flex items-center gap-2">
        <SparklesStroke style={{ width: 16, height: 16, color: '#5b4bc4' }} />
        <span className="text-base font-medium" style={{ color: INK }}>{content.heading}</span>
        <span className="ml-auto rounded-full bg-white/70 px-2 py-0.5 text-sm" style={{ color: INK_2 }}>
          AI summary
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: INK }}>{content.summary}</p>
      <ul className="mt-auto space-y-1.5">
        {(content.points || []).map((p: string, i: number) => (
          <li key={i} className="flex gap-2 text-sm leading-snug" style={{ color: INK_2 }}>
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: '#5b4bc4' }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Composition over time. 2px surface gaps separate segments instead of strokes.
function StackedChannelChart() {
  const series = [
    { key: 'Email', color: SERIES.blue },
    { key: 'Chat', color: SERIES.orange },
    { key: 'Phone', color: SERIES.aqua },
    { key: 'Other', color: OTHER },
  ];
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={channelVolumeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="week" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={44} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="channels"
                fill={s.color}
                barSize={30}
                // 2px of surface between segments; only the top segment rounds.
                stroke="#ffffff"
                strokeWidth={2}
                radius={i === series.length - 1 ? [4, 4, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Legend items={series.map((s) => ({ label: s.key, color: s.color }))} />
      <Interpretation>
        Chat has overtaken email as the busiest channel — up 62% over six weeks while email fell 16%.
      </Interpretation>
    </div>
  );
}

// Part-to-whole at a glance, four segments, values direct-labelled in the
// legend so the ring is never the only way to read a number.
function ContactReasonDonut() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={contactReasonData}
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {contactReasonData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% of contacts`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-medium" style={{ color: INK }}>61%</span>
          <span className="text-sm" style={{ color: MUTED }}>top two reasons</span>
        </div>
      </div>
      <div className="space-y-1 px-1 pt-2">
        {contactReasonData.map((s) => (
          <div key={s.name} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="min-w-0 flex-1 truncate" style={{ color: INK_2 }}>{s.name}</span>
            <span className="tabular-nums" style={{ color: INK }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Two measures, same unit, one axis — the only honest way to put them together.
function ResponsivenessChart() {
  const series = [
    { key: 'firstReply', label: 'First reply (h)', color: SERIES.blue },
    { key: 'resolution', label: 'Full resolution (h)', color: SERIES.orange },
  ];
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responsivenessData} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="week" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={44}
              unit="h"
              domain={[0, 10]}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v} h`} />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: s.color }}
                activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />
      <Interpretation>
        Both measures improved every week; full resolution is now 5.8 h, down from 9.1 h in week 27.
      </Interpretation>
    </div>
  );
}

// Magnitude against a commitment: one hue for the bars, the target as a
// labelled rule. Bars that miss are named in the text, not recoloured.
function SlaByPriorityChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={slaByPriorityData}
            layout="vertical"
            // Top margin leaves room for the target rule's label, which sits
            // above the plot area rather than on top of the bars.
            margin={{ top: 24, right: 44, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={AXIS_TICK} unit="%" />
            <YAxis
              type="category"
              dataKey="priority"
              axisLine={false}
              tickLine={false}
              tick={{ fill: INK_2, fontSize: 12 }}
              width={64}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% within SLA`} />
            <Bar dataKey="attainment" fill={SERIES.blue} barSize={18} radius={[0, 4, 4, 0]} />
            <ReferenceLine
              x={SLA_TARGET}
              stroke={STATUS.critical}
              strokeWidth={1.5}
              label={{ value: 'Target 90%', position: 'top', fill: STATUS.critical, fontSize: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Interpretation>
        Urgent (82%) and High (88%) sit below the 90% commitment — everything else clears it.
      </Interpretation>
    </div>
  );
}

// A single series over time — area is the right weight for one measure.
function CsatTrendChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={csatTrendData} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="csatFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SERIES.aqua} stopOpacity={0.26} />
                <stop offset="100%" stopColor={SERIES.aqua} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="week" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={48}
              unit="%"
              domain={[86, 96]}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% satisfied`} />
            <Area
              type="monotone"
              dataKey="csat"
              stroke={SERIES.aqua}
              strokeWidth={2}
              fill="url(#csatFill)"
              dot={{ r: 3, strokeWidth: 0, fill: SERIES.aqua }}
              activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Interpretation>
        Satisfaction climbed 3.8 points across the period, tracking the drop in resolution time.
      </Interpretation>
    </div>
  );
}

// Volume by team: nominal categories, so one hue for every bar.
function TeamVolumeChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={teamVolumeData} layout="vertical" margin={{ top: 8, right: 48, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK} />
            <YAxis
              type="category"
              dataKey="team"
              axisLine={false}
              tickLine={false}
              tick={{ fill: INK_2, fontSize: 12 }}
              width={132}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v.toLocaleString()} solved`} />
            <Bar dataKey="solved" fill={SERIES.blue} barSize={16} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Interpretation>
        The two Tier 1 teams closed 55% of all solved tickets; Escalations carries the lowest volume but the longest handle time.
      </Interpretation>
    </div>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

const TH = 'sticky top-0 bg-white py-2 px-2 text-left font-medium';
const TD = 'py-2 px-2 align-middle';

// A ranked list is a table, not a chart with ten colours.
function TopIssuesTable() {
  return (
    <div className="flex h-full flex-col">
      <TableShell>
        <thead>
          <tr style={{ borderBottom: `1px solid ${AXIS}` }}>
            <th className={TH} style={{ color: INK }}>Customer issue</th>
            <th className={TH} style={{ color: INK }}>Driver</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Tickets</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Change</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>CSAT</th>
          </tr>
        </thead>
        <tbody>
          {topIssuesData.map((row) => (
            <tr key={row.issue} style={{ borderBottom: `1px solid ${GRID}` }}>
              <td className={TD} style={{ color: INK }}>{row.issue}</td>
              <td className={TD} style={{ color: INK_2 }}>{row.driver}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.volume}</td>
              <td className={`${TD} text-right tabular-nums`}>
                <Delta value={row.change} />
              </td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.csat}%</td>
            </tr>
          ))}
        </tbody>
      </TableShell>
      <Interpretation>
        SSO login loops grew fastest (+34%) and carry the lowest satisfaction — the clearest fix-once candidate.
      </Interpretation>
    </div>
  );
}

function TeamAttentionTable() {
  return (
    <div className="flex h-full flex-col">
      <TableShell>
        <thead>
          <tr style={{ borderBottom: `1px solid ${AXIS}` }}>
            <th className={TH} style={{ color: INK }}>Team</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>SLA</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Backlog</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Occupancy</th>
            <th className={TH} style={{ color: INK }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {teamAttentionData.map((row) => (
            <tr key={row.team} style={{ borderBottom: `1px solid ${GRID}` }}>
              <td className={TD} style={{ color: INK }}>{row.team}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.sla}%</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.backlog}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.occupancy}%</td>
              <td className={TD}><StatePill state={row.state} /></td>
            </tr>
          ))}
        </tbody>
      </TableShell>
      <Interpretation>
        Escalations is the pressure point: 96% occupancy leaves no headroom, and SLA has slipped to 78%.
      </Interpretation>
    </div>
  );
}

// Callout: a material change worth stopping on. Icon + heading carry the
// meaning; the tint only reinforces it.
function Callout({ content }: { content: any }) {
  const isRisk = content.tone === 'risk';
  const color = isRisk ? STATUS.critical : STATUS.good;
  const Icon = isRisk ? AlertTriangle : Lightbulb;
  return (
    <div className="flex h-full gap-3 px-4 py-4">
      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1f` }}
      >
        <Icon style={{ width: 16, height: 16, color }} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wide" style={{ color }}>
            {isRisk ? 'Risk' : 'Opportunity'}
          </span>
        </div>
        <div className="mt-1 text-base font-medium leading-snug" style={{ color: INK }}>{content.heading}</div>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK_2 }}>{content.body}</p>
        {content.metric && (
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xl font-medium" style={{ color: INK }}>{content.metric}</span>
            <span className="text-sm" style={{ color: MUTED }}>{content.metricLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// The bottom of the dashboard answers "so what do we do?".
function ActionList({ content }: { content: any }) {
  return (
    <div className="flex h-full flex-col px-2 pb-2">
      <div className="grid flex-1 grid-cols-3 gap-4 px-2 pt-1">
        {(content.actions || []).map((a: any, i: number) => (
          <div
            key={i}
            className="flex flex-col rounded-[12px] border bg-white p-4"
            style={{ borderColor: AXIS }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={{ backgroundColor: `${SERIES.blue}1a`, color: SERIES.blue }}
              >
                {i + 1}
              </span>
              <span className="text-base font-medium leading-snug" style={{ color: INK }}>{a.title}</span>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: INK_2 }}>{a.body}</p>
            <div className="mt-3 flex items-center gap-2 border-t pt-2.5" style={{ borderColor: GRID }}>
              <TrendingUp style={{ width: 14, height: 14, color: DELTA_GOOD }} />
              <span className="text-sm" style={{ color: INK_2 }}>{a.impact}</span>
            </div>
            <div className="mt-1.5 text-sm" style={{ color: MUTED }}>Owner · {a.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Registry -------------------------------------------------------------

const RENDERERS: Record<string, (content: any) => React.ReactNode> = {
  'so-kpi': (content) => <KpiTile content={content} />,
  'so-narrative': (content) => <NarrativeCard content={content} />,
  'so-stacked-bar': () => <StackedChannelChart />,
  'so-donut': () => <ContactReasonDonut />,
  'so-responsiveness': () => <ResponsivenessChart />,
  'so-sla-priority': () => <SlaByPriorityChart />,
  'so-csat-trend': () => <CsatTrendChart />,
  'so-team-volume': () => <TeamVolumeChart />,
  'so-table-issues': () => <TopIssuesTable />,
  'so-table-teams': () => <TeamAttentionTable />,
  'so-callout': (content) => <Callout content={content} />,
  'so-actions': (content) => <ActionList content={content} />,
};

// Widgets that draw their own heading, so the builder skips its title row.
const CHROMELESS = new Set(['so-narrative', 'so-callout', 'so-actions']);

export const isServiceOpsChart = (chartType?: string) => !!chartType && chartType in RENDERERS;
export const isServiceOpsChromeless = (chartType?: string) => !!chartType && CHROMELESS.has(chartType);

export function ServiceOpsChart({ content }: { content: any }) {
  const render = RENDERERS[content?.chartType];
  if (!render) return null;
  return <div className="flex min-h-0 flex-1 flex-col">{render(content)}</div>;
}
