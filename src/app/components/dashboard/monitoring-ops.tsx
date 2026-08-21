// ---------------------------------------------------------------------------
// Support operations monitoring dashboard — widget renderers
// ---------------------------------------------------------------------------
// The content that used to be the hand-built Monitoring page, expressed as
// dashboard widgets so it opens in the dashboard builder like any other
// dashboard. The builder owns the canvas, chrome and the global filter bar;
// this file owns what gets drawn inside each widget.
//
// The page's own filter row is deliberately not reproduced here — the builder's
// filter bar above the canvas is the single place filters live now.
//
// Colour rules follow the service-ops module: categorical hues in fixed slot
// order, a neutral fold for the long tail, and status colours that only ever
// mean state and always ship with a word or an icon.
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
  CheckCircle,
  ClockStroke as Clock,
  Lightbulb,
  SparklesStroke,
  TrendingUp,
} from '@/components/icons/flora';
import {
  AXIS,
  AXIS_TICK,
  Delta,
  GRID,
  INK,
  INK_2,
  Interpretation,
  Legend,
  MUTED,
  SERIES,
  STATUS,
  TOOLTIP_STYLE,
} from './service-ops';

// The documented fold for a long tail of categories — not a categorical slot.
const OTHER = '#b0b3ae';

// ---- Data -----------------------------------------------------------------

export const volumeForecastData = [
  { t: '06:00', actual: 210, forecast: 240 },
  { t: '08:00', actual: 480, forecast: 460 },
  { t: '10:00', actual: 910, forecast: 780 },
  { t: '12:00', actual: 1180, forecast: 940 },
  { t: '14:00', actual: 1040, forecast: 900 },
  { t: '16:00', actual: 860, forecast: 820 },
  { t: '18:00', actual: 540, forecast: 560 },
];

export const channelMixData = [
  { day: 'Mon', Messaging: 420, Email: 310, Voice: 150, 'Help Center': 90 },
  { day: 'Tue', Messaging: 460, Email: 300, Voice: 160, 'Help Center': 95 },
  { day: 'Wed', Messaging: 510, Email: 290, Voice: 175, 'Help Center': 110 },
  { day: 'Thu', Messaging: 545, Email: 285, Voice: 168, 'Help Center': 105 },
  { day: 'Fri', Messaging: 610, Email: 270, Voice: 190, 'Help Center': 120 },
];

const CHANNEL_SERIES = [
  { key: 'Messaging', color: SERIES.blue },
  { key: 'Email', color: SERIES.orange },
  { key: 'Voice', color: SERIES.aqua },
  { key: 'Help Center', color: OTHER },
];

export const contactDriverData = [
  { driver: 'Billing & refunds', tickets: 1240, change: 18, focus: true },
  { driver: 'Login & access', tickets: 860, change: 4, focus: false },
  { driver: 'Shipping status', tickets: 640, change: -6, focus: false },
  { driver: 'Product defects', tickets: 410, change: -2, focus: false },
  { driver: 'Plan changes', tickets: 320, change: 1, focus: false },
];

export const slaTrendData = [
  { t: 'Wk 1', response: 96, resolution: 91 },
  { t: 'Wk 2', response: 95, resolution: 89 },
  { t: 'Wk 3', response: 94, resolution: 88 },
  { t: 'Wk 4', response: 94, resolution: 84 },
  { t: 'Wk 5', response: 93, resolution: 81 },
];
export const SLA_TARGET = 90;

export const slaByPriorityData = [
  { priority: 'Urgent', met: 88, target: 95 },
  { priority: 'High', met: 91, target: 95 },
  { priority: 'Normal', met: 96, target: 90 },
  { priority: 'Low', met: 99, target: 85 },
];

export const csatTrendData = [
  { t: 'Wk 1', csat: 93.1 },
  { t: 'Wk 2', csat: 93.6 },
  { t: 'Wk 3', csat: 94.0 },
  { t: 'Wk 4', csat: 94.2 },
  { t: 'Wk 5', csat: 94.6 },
];

export const resolutionMixData = [
  { name: 'Resolved by AI agent', value: 34, color: SERIES.aqua },
  { name: 'Resolved by agent', value: 52, color: SERIES.blue },
  { name: 'Escalated', value: 14, color: OTHER },
];

export const teamLoadData = [
  { team: 'Billing', capacity: 155 },
  { team: 'Technical', capacity: 102 },
  { team: 'Onboarding', capacity: 88 },
  { team: 'Retention', capacity: 74 },
];
export const CAPACITY_TARGET = 100;

export const teamDetailData = [
  { team: 'Billing', agents: 14, backlog: 212, sla: 81, csat: 91.4, state: 'critical' as const },
  { team: 'Technical', agents: 18, backlog: 96, sla: 93, csat: 94.8, state: 'good' as const },
  { team: 'Onboarding', agents: 9, backlog: 41, sla: 97, csat: 96.1, state: 'good' as const },
  { team: 'Retention', agents: 7, backlog: 63, sla: 89, csat: 93.2, state: 'warning' as const },
];

// ---- Shared pieces --------------------------------------------------------

const STATE_META = {
  good: { color: STATUS.good, label: 'On track', Icon: CheckCircle },
  warning: { color: STATUS.warning, label: 'Watch', Icon: Clock },
  critical: { color: STATUS.critical, label: 'Attention', Icon: AlertTriangle },
};

// Status pill — colour plus icon plus word, never colour on its own.
function StatePill({ state }: { state: keyof typeof STATE_META }) {
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

// Stat tile. `state` marks a number that is off target, and it is carried by a
// pill with a word in it rather than by colour alone.
function KpiTile({ content }: { content: any }) {
  return (
    <div className="flex flex-1 flex-col justify-between px-4 pb-3 pt-1">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[32px] font-medium leading-none" style={{ color: INK }}>
            {content.value}
          </span>
          {content.unit && (
            <span className="text-lg" style={{ color: MUTED }}>{content.unit}</span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Delta value={content.change} suffix={content.changeSuffix} invert={content.lowerIsBetter} />
          <span className="text-sm" style={{ color: MUTED }}>vs. last month</span>
          {content.state && <StatePill state={content.state} />}
        </div>
      </div>
      <div className="pt-2 text-sm leading-snug" style={{ color: INK_2 }}>
        {content.note}
      </div>
    </div>
  );
}

// AI-written read of the period — the one card in a band that carries prose.
function NarrativeCard({ content }: { content: any }) {
  return (
    <div className="flex h-full flex-col gap-3 px-5 py-4">
      {/* The sparkle is the provenance and it is enough of it. The "AI summary"
          pill that used to sit opposite the heading now names a different thing —
          the dashboard carries the real AI summary widget, and a second card
          wearing its label reads as a second summary rather than as the written
          commentary this is. */}
      <div className="flex items-center gap-2">
        <SparklesStroke style={{ width: 16, height: 16, color: '#5b4bc4' }} />
        <span className="text-base font-medium" style={{ color: INK }}>{content.heading}</span>
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

// Actual against plan: the plan is a dashed reference series, so it never reads
// as a second measure competing for attention.
function VolumeForecastChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={volumeForecastData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="monVolumeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SERIES.blue} stopOpacity={0.26} />
                <stop offset="100%" stopColor={SERIES.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="t" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={48} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v} contacts`} />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke={SERIES.blue}
              strokeWidth={2}
              fill="url(#monVolumeFill)"
              dot={{ r: 3, strokeWidth: 0, fill: SERIES.blue }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke={MUTED}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Legend items={[{ label: 'Actual', color: SERIES.blue }, { label: 'Forecast', color: MUTED }]} />
    </div>
  );
}

// Composition over time. 2px surface gaps separate segments instead of strokes.
function ChannelMixChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={channelMixData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="day" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={44} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            {CHANNEL_SERIES.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="channels"
                fill={s.color}
                barSize={34}
                stroke="#ffffff"
                strokeWidth={2}
                radius={i === CHANNEL_SERIES.length - 1 ? [4, 4, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Legend items={CHANNEL_SERIES.map((s) => ({ label: s.key, color: s.color }))} />
    </div>
  );
}

// A ranked list with magnitude bars — one hue, because the categories are
// nominal and the bars only encode size.
function ContactDriverList() {
  const top = contactDriverData[0].tickets;
  return (
    <div className="flex h-full flex-col px-3 pb-2">
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        {contactDriverData.map((d) => (
          <div key={d.driver}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-sm" style={{ color: INK, fontWeight: d.focus ? 600 : 400 }}>
                {d.driver}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-sm tabular-nums" style={{ color: INK }}>
                  {d.tickets.toLocaleString()}
                </span>
                <Delta value={d.change} />
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: GRID }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round((d.tickets / top) * 100)}%`,
                  backgroundColor: d.focus ? SERIES.blue : '#a8c8ea',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Two measures, one unit (percent) — so they share one axis honestly, with the
// commitment drawn as a labelled rule.
function SlaTrendChart() {
  const series = [
    { key: 'response', label: 'Response SLA', color: SERIES.blue },
    { key: 'resolution', label: 'Resolution SLA', color: SERIES.orange },
  ];
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={slaTrendData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="t" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={44}
              unit="%"
              domain={[70, 100]}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% within SLA`} />
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
            <ReferenceLine
              y={SLA_TARGET}
              stroke={STATUS.critical}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              label={{ value: 'Target 90%', position: 'top', fill: STATUS.critical, fontSize: 12 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />
    </div>
  );
}

// Attainment against a per-priority target. The target is the lighter bar
// behind, so a miss reads as a gap rather than as a recoloured bar.
function SlaByPriorityChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={slaByPriorityData}
            layout="vertical"
            margin={{ top: 8, right: 44, left: 0, bottom: 0 }}
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
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}%`} />
            <Bar dataKey="target" name="Target" fill="#dfe3e8" barSize={10} radius={[0, 4, 4, 0]} />
            <Bar dataKey="met" name="Attained" fill={SERIES.blue} barSize={10} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Legend items={[{ label: 'Attained', color: SERIES.blue }, { label: 'Target', color: '#dfe3e8' }]} />
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
              <linearGradient id="monCsatFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SERIES.aqua} stopOpacity={0.26} />
                <stop offset="100%" stopColor={SERIES.aqua} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="t" axisLine={{ stroke: AXIS }} tickLine={false} tick={AXIS_TICK} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={48} unit="%" domain={[90, 96]} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% satisfied`} />
            <Area
              type="monotone"
              dataKey="csat"
              stroke={SERIES.aqua}
              strokeWidth={2}
              fill="url(#monCsatFill)"
              dot={{ r: 3, strokeWidth: 0, fill: SERIES.aqua }}
              activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Part-to-whole at a glance, three segments, values direct-labelled below so the
// ring is never the only way to read a number.
function ResolutionMixDonut() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resolutionMixData}
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {resolutionMixData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% of tickets`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-medium" style={{ color: INK }}>34%</span>
          <span className="text-sm" style={{ color: MUTED }}>closed by AI</span>
        </div>
      </div>
      <div className="space-y-1 px-1 pt-2">
        {resolutionMixData.map((s) => (
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

// Magnitude against plan: one hue for the bars, 100% drawn as a labelled rule.
function TeamLoadChart() {
  return (
    <div className="flex h-full flex-col px-2 pb-1">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={teamLoadData} layout="vertical" margin={{ top: 24, right: 44, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" domain={[0, 180]} axisLine={false} tickLine={false} tick={AXIS_TICK} unit="%" />
            <YAxis
              type="category"
              dataKey="team"
              axisLine={false}
              tickLine={false}
              tick={{ fill: INK_2, fontSize: 12 }}
              width={94}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => `${v}% of planned capacity`} />
            <Bar dataKey="capacity" fill={SERIES.blue} barSize={16} radius={[0, 4, 4, 0]} />
            <ReferenceLine
              x={CAPACITY_TARGET}
              stroke={STATUS.critical}
              strokeWidth={1.5}
              label={{ value: 'Planned 100%', position: 'top', fill: STATUS.critical, fontSize: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
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
function TeamDetailTable() {
  return (
    <div className="flex h-full flex-col">
      <TableShell>
        <thead>
          <tr style={{ borderBottom: `1px solid ${AXIS}` }}>
            <th className={TH} style={{ color: INK }}>Team</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Agents</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>Backlog</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>SLA</th>
            <th className={`${TH} text-right`} style={{ color: INK }}>CSAT</th>
            <th className={TH} style={{ color: INK }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {teamDetailData.map((row) => (
            <tr key={row.team} style={{ borderBottom: `1px solid ${GRID}` }}>
              <td className={TD} style={{ color: INK }}>{row.team}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.agents}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.backlog}</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.sla}%</td>
              <td className={`${TD} text-right tabular-nums`} style={{ color: INK }}>{row.csat}%</td>
              <td className={TD}><StatePill state={row.state} /></td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}

// Callout: a change worth stopping on. Icon and heading carry the meaning; the
// tint only reinforces it.
const CALLOUT_META = {
  risk: { color: STATUS.critical, label: 'Risk', Icon: AlertTriangle },
  watch: { color: STATUS.warning, label: 'Watch', Icon: Clock },
  win: { color: STATUS.good, label: 'Opportunity', Icon: Lightbulb },
};

function Callout({ content }: { content: any }) {
  const { color, label, Icon } = CALLOUT_META[(content.tone || 'risk') as keyof typeof CALLOUT_META];
  return (
    <div className="flex h-full gap-3 px-4 py-4">
      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1f` }}
      >
        <Icon style={{ width: 16, height: 16, color }} />
      </span>
      <div className="min-w-0 flex-1">
        <span
          className="text-sm font-medium uppercase tracking-wide"
          style={{ color: content.tone === 'watch' ? '#8a5b00' : color }}
        >
          {label}
        </span>
        <div className="mt-1 text-base font-medium leading-snug" style={{ color: INK }}>{content.heading}</div>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK_2 }}>{content.body}</p>
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
              <TrendingUp style={{ width: 14, height: 14, color: STATUS.good }} />
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
  'mon-kpi': (content) => <KpiTile content={content} />,
  'mon-narrative': (content) => <NarrativeCard content={content} />,
  'mon-volume-forecast': () => <VolumeForecastChart />,
  'mon-channel-mix': () => <ChannelMixChart />,
  'mon-drivers': () => <ContactDriverList />,
  'mon-sla-trend': () => <SlaTrendChart />,
  'mon-sla-priority': () => <SlaByPriorityChart />,
  'mon-csat-trend': () => <CsatTrendChart />,
  'mon-resolution-mix': () => <ResolutionMixDonut />,
  'mon-team-load': () => <TeamLoadChart />,
  'mon-team-table': () => <TeamDetailTable />,
  'mon-callout': (content) => <Callout content={content} />,
  'mon-actions': (content) => <ActionList content={content} />,
};

// Widgets that draw their own heading, so the builder skips its title row.
const CHROMELESS = new Set(['mon-narrative', 'mon-callout', 'mon-actions']);

export const isMonitoringChart = (chartType?: string) => !!chartType && chartType in RENDERERS;
export const isMonitoringChromeless = (chartType?: string) => !!chartType && CHROMELESS.has(chartType);

export function MonitoringChart({ content }: { content: any }) {
  const render = RENDERERS[content?.chartType];
  if (!render) return null;
  return <div className="flex min-h-0 flex-1 flex-col">{render(content)}</div>;
}
