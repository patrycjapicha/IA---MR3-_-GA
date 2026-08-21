import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Anchor, Button as FloraButton, ChevronButton, Combobox, ComboboxField, Field, IconButton, Input as FloraInput, Item, ItemGroup, Menu, Modal, Option, Separator as FloraSeparator, SplitButton, MD, Table, Tag, Tabs, Textarea as FloraTextarea, Tooltip as FloraTooltip } from '@zendesk-ui/react-components';
import { FloraSearchInput } from './FloraSearchInput';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Toggle } from './ui/toggle';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import {
  BarChart3Stroke as BarChartIcon,
  TextStroke,
  // recharts exports its own `Line`, so the Flora rule glyph gets a distinct name.
  Line as LineRule,
  Link,
  Connector,
  LayoutStroke,
  ImageStroke,
  LineChartStroke,
  PieChartStroke,
  ActivityStroke,
  FlowStroke,
  TargetStroke,
  TableStroke,
  Edit2Stroke as Edit2,
  UndoReturn,
  RedoReturn,
  RefreshCw,
  Redo2,
  PlayStroke as Play,
  PauseStroke as Pause,
  // The filled cut, for the 12px state glyph on the refresh trigger: at that
  // size the stroke cut's outlines close up into a smudge.
  Pause as PauseFill,
  ChevronDown,
  MoreVertical,
  DownloadStroke as Download,
  ClockStroke as Clock,
  HistoryStroke as History,
  BookmarkStroke as Bookmark,
  Check,
  Trash2Stroke as Trash2,
  FilterStroke as Filter,
  FolderStroke as Folder,
  NestedInParent,
  PersonStroke as UserCircle,
  Plus,
  X,
  TrendingUp,
  Bold,
  Italic,
  ExternalLink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  SlidersHorizontal,
  Grid,
  Sun,
  TextColor,
  Eye,
  EyeStroke,
  Palette,
  StopStroke,
  ShapesStroke,
  Sparkles,
  PencilSparkleStroke,
  CheckSquareStroke,
  Copy,
  ShareStroke,
  BellStroke,
  InfoStroke,
  Star,
  StarStroke,
  ArrowRotateRight,
  ArrowDiagonalOut,
  TerminalStroke,
  DatabaseStroke,
} from '@/components/icons/flora';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from 'recharts';
import {
  GRID,
  MUTED,
  SERIES,
  ServiceOpsChart,
  TOOLTIP_STYLE,
  isServiceOpsChart,
  isServiceOpsChromeless,
} from './dashboard/service-ops';
import { MonitoringChart, isMonitoringChart, isMonitoringChromeless } from './dashboard/monitoring-ops';
import {
  AI_SUMMARY_BAND_HEIGHT,
  AI_SUMMARY_HEIGHT,
  AI_SUMMARY_WIDTH,
  AiSuggestionList,
  AiSummaryCard,
  REPORT_SUMMARY_EXTRA_HEIGHT,
  ReportSummaryBand,
  createAiSummaryContent,
  createMonitoringAiSummary,
  createReportSummary,
  createServiceReviewAiSummary,
  createSupportTicketsAiSummary,
  hasReportSummary,
  isAiSummaryChart,
} from './dashboard/ai-summary';
import { AiSummarySettingsDrawer, createAiSummarySettings } from './dashboard/ai-summary-settings';
import { LayoutSettingsDrawer, createLayoutSettings, type LayoutSettings } from './dashboard/layout-settings';
import { BuilderDrawer } from './dashboard/builder-drawer';

const FLORA_ICON = 'size-[16px] shrink-0 text-muted-foreground';
// The toolbar's glyphs are a step below Flora's 20px default: the row floats on
// the canvas now rather than sitting in the header bar, and at that size the
// tools crowd their own frame. Same 16px as the menus these tools also appear in.
const FLORA_TOOLBAR_ICON = 'size-[16px] shrink-0 text-muted-foreground';
const FLORA_LIBRARY_ICON = 'size-[16px] shrink-0 fill-current !text-muted-foreground';
const FLORA_TABLE_PRIMARY = 'm-0';
const FLORA_TAB_ADD_ICON = '!size-[16px] shrink-0';
const FLORA_MENU_ICON = FLORA_ICON;
// Matches Flora's own menu group title (the "Create new" header on the Create
// menu): 14px semibold foreground on a 20px line. leading is in px because the
// 14px root font size makes leading-5 resolve to 17.5px. Padding follows this
// menu's own items so the title shares their left edge.
const FLORA_MENU_TITLE = '!px-3 !py-2 !text-base !font-semibold !leading-[20px] !text-foreground';
const FLORA_HEADER_ICON = '!size-[16px] shrink-0 text-muted-foreground';
// The dashboard header bar runs at 16px, a step below Flora's 20px default, in
// step with the floating toolbar and the top bar above it — one glyph size
// across the whole of the chrome. The size is also given inline because Flora's
// IconButton sizes its own child svg.
const FLORA_BAR_ICON = '!size-[16px] shrink-0 text-muted-foreground';
const FLORA_BAR_ICON_SIZE = { width: 16, height: 16 };
const FLORA_DANGER_ICON = 'size-[16px] shrink-0';
const FLORA_BTN = '!rounded-[4px] text-base h-8 font-normal';
const FLORA_OUTLINE_BTN = `${FLORA_BTN} border border-[#d8dcde] bg-white hover:bg-[#f8f9f9]`;
const FLORA_ICON_BTN = `${FLORA_BTN} h-8 w-8 p-0 border-0 bg-transparent shadow-none hover:bg-muted/50`;
const FILTER_MENU_CONTENT_CLASS =
  'z-[200] w-72 overflow-hidden border border-[#e5e5e5] bg-white p-0 shadow-lg max-h-none';
const FILTER_MENU_SEARCH_CLASS = 'box-border w-full min-w-0 overflow-hidden border-b border-border px-2 pb-2 pt-4';
const FILTER_MENU_LIST_CLASS =
  'overflow-x-hidden overflow-y-auto py-1 [scrollbar-gutter:stable]';
// Flora's condensed menu density: 28px rows, Garden's `space.base * 7` behind
// `isCompact` on `Menu`, against the 36px of the comfortable one. Mirrored by
// hand rather than taken from Flora's `Menu` because this menu holds a search
// box and an actions foot that Garden's `Menu` has no slot for. 4px either side
// of the 20px line the label sits on is Garden's own compact sum: (28 - 20) / 2.
const FILTER_MENU_ITEM_CLASS = '!py-[4px]';
const FILTER_MENU_ITEM_HEIGHT = 28;
// The list cuts mid-item rather than between two: a half-height row at the
// bottom edge says "there is more below" on sight, where a clean cut reads as
// the end of the list and leaves the scrollbar to do the telling on its own.
// py-1 on the list adds 3.5px above the first row; condensed rows fit seven and
// a half of them in about the height six and a half used to take.
const FILTER_MENU_LIST_PAD = 3.5;
const FILTER_MENU_LIST_MAX_HEIGHT = FILTER_MENU_LIST_PAD + FILTER_MENU_ITEM_HEIGHT * 7.5;

const REFRESH_RATE_DEFAULT = '60s';
// What a dashboard opens on. Paused, so the canvas holds still until someone
// asks for a rate — REFRESH_RATE_DEFAULT stays the rate a resume falls back to,
// since "resume" on a paused dashboard has to land on some interval.
const REFRESH_RATE_INITIAL = 'manual';
const REFRESH_RATE_OPTIONS: { value: string; label: string; short: string }[] = [
  { value: 'manual', label: 'Paused', short: 'Paused' },
  { value: '10s', label: '10 seconds', short: '10 sec' },
  { value: '30s', label: '30 seconds', short: '30 sec' },
  { value: '60s', label: '60 seconds', short: '60 sec' },
  { value: '5m', label: '5 minutes', short: '5 min' },
  { value: '10m', label: '10 minutes', short: '10 min' },
  { value: '30m', label: '30 minutes', short: '30 min' },
];
// Historical data is on a fixed daily job, not on the rate above — the two are
// stated together wherever the rate is shown so nobody reads "60 seconds" as
// covering everything on the canvas. One constant, so the viewer menu and the
// author modal can never drift apart on when the last run was.
const HISTORICAL_REFRESH_CADENCE = 'Historical data refreshes daily';
const HISTORICAL_REFRESH_LAST_RUN = 'Today, 6:00 AM';

// Cross-filtering settings for a report widget. Four independent dropdowns,
// each with its own label, options, and default. Values are stored on the
// widget style under the dropdown's `key`.
const CROSS_FILTER_SETTINGS: {
  key: string;
  label: string;
  default: string;
  options: string[];
}[] = [
  {
    key: 'crossFilter',
    label: 'Cross filtering',
    default: 'Emit and receive',
    options: ['Emit and receive', 'Emit only', 'Receive only', 'Off'],
  },
  {
    key: 'emitSetting',
    label: 'Emit cross-filtering settings',
    default: 'Use composite on all',
    options: ['Use composite on all', 'Use clicked field only'],
  },
  {
    key: 'filterSetting',
    label: 'Filter setting',
    default: 'Receive as selection',
    options: ['Receive as selection', 'Receive as hard filter'],
  },
  {
    key: 'ignoreFilters',
    label: 'Ignore filters',
    default: 'None',
    options: ['None', 'All dashboard filters', 'Selected filters only'],
  },
];

const REPORTS_MODAL_LIST_CLASS =
  'dashboard-reports-modal-list max-h-[360px] overflow-x-hidden overflow-y-auto rounded-[4px] border border-[#dcdcda] [scrollbar-gutter:stable]';

function floraTableHeader(label: string) {
  return <MD tag="span" isBold className={FLORA_TABLE_PRIMARY}>{label}</MD>;
}

// The five slices of the sample donut, in the series order SERIES defines: colour
// follows the category, and the same list feeds the Pie and its Cells so the two
// cannot drift apart.
const GENERIC_PIE_DATA = [
  { name: 'Food & Groceries', value: 1800, color: SERIES.blue },
  { name: 'Housing', value: 1200, color: SERIES.orange },
  { name: 'Utilities', value: 900, color: SERIES.aqua },
  { name: 'Transportation', value: 750, color: SERIES.violet },
  { name: 'Healthcare', value: 651, color: SERIES.red },
];

// Flora color palette shared by the widget style menu color pickers
const FLORA_PALETTE = ['#2f3941', '#1f73b7', '#038153', '#00a2a2', '#5f5cd6', '#6b46c1', '#c72a1c', '#ad5e18', '#68737d', '#d8dcde', '#ffffff', 'transparent'];

// Palette used for text component color, border + background pickers.
// Laid out on a 6-column grid as three grouped rows:
//   row 1 — neutrals: white, greys, black  (none/transparent appended when allowed)
//   row 2 — dark saturated colors together
//   row 3 — light pastel colors together
//
// Row 2 is also where the charts get their series colors: SERIES in service-ops
// is these six hues, so a chart's marks and a card's tint are one set of colors
// rather than two that nearly match. Series colors are read off SERIES rather
// than this array — a chart draws marks in a validated order, which is not the
// order a 6-column swatch grid wants to be laid out in.
const TEXT_STYLE_PALETTE = [
  '#FFFFFF', '#F8F9F9', '#E8EAEC', '#5C6970', '#1C2227',
  '#FCA347', '#B276CD', '#2694D6', '#698CD3', '#26A178', '#EB5C69',
  '#FED6A9', '#E9D8F1', '#CCE0F1', '#D4DDF0', '#CAE3D9', '#F5D5D8',
];

// Compact Flora-styled color picker used inside the widget style menu
function FloraColorPicker({ value, onChange, allowTransparent, palette }: { value: string; onChange: (color: string) => void; allowTransparent?: boolean; palette?: string[] }) {
  const base = palette ?? FLORA_PALETTE;
  const withTransparent = allowTransparent && !base.includes('transparent') ? [...base, 'transparent'] : base;
  const swatches = allowTransparent ? withTransparent : withTransparent.filter(c => c !== 'transparent');
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-6 gap-1.5">
        {swatches.map((c) => {
          const isActive = value === c;
          const isTransparent = c === 'transparent';
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              aria-label={`Color ${c}`}
              className={`relative h-6 w-6 rounded-full border transition-transform hover:scale-110 ${isActive ? 'ring-2 ring-[#1f73b7] ring-offset-1' : 'border-[#dcdcda]'} ${isTransparent ? 'bg-white' : ''}`}
              style={{ backgroundColor: isTransparent ? undefined : c }}
            >
              {isTransparent && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-[1px] w-5 rotate-45 bg-[#c72a1c]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-[4px] border border-[#dcdcda]" style={{ backgroundColor: value === 'transparent' ? '#fff' : value }} />
        <Input
          value={value === 'transparent' ? '' : value}
          onChange={(e) => onChange(e.target.value || (allowTransparent ? 'transparent' : '#ffffff'))}
          placeholder="#RRGGBB"
          className="h-7 flex-1 text-xs"
        />
      </div>
    </div>
  );
}

// How long a simulated reload takes. Data first, then the summary: a summary is
// written from the rows underneath it, so it can't settle before they do, and
// watching it land second is what says so. Both are long enough to read as work
// happening and short enough that nobody waits through them twice.
const RELOAD_DATA_MS = 900;
const RELOAD_SUMMARY_MS = 1400;

// Covers a widget while the dashboard reloads rather than emptying it: the card
// keeps its size, so the canvas doesn't reflow as each one lands and the author's
// eye stays where they left it. Translucent, because the stale figure showing
// faintly underneath is the honest picture — it is still the last known value
// until the new one arrives.
function WidgetReloadOverlay({
  label = 'Refreshing…',
  variant = 'data',
}: {
  label?: string;
  variant?: 'data' | 'summary';
}) {
  return (
    <div
      className="absolute inset-0 z-[250] flex items-center justify-center rounded-[16px] bg-white/70"
      // Not interactive: a widget mid-reload has nothing to act on yet, and a
      // click landing on the stale chart underneath would read as a live one.
      style={{ backdropFilter: 'blur(1px)' }}
      aria-live="polite"
      aria-busy="true"
    >
      <span className="flex items-center gap-2 rounded-full border border-[#dcdcda] bg-white px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        {variant === 'summary' ? (
          // The summary is being written, not fetched, so it gets the mark that
          // says so everywhere else in the dashboard rather than a spinner.
          <Sparkles className="size-[14px] shrink-0 animate-pulse" style={{ width: 14, height: 14, color: '#5b4bc4' }} />
        ) : (
          <ArrowRotateRight className="size-[14px] shrink-0 animate-spin text-muted-foreground" style={{ width: 14, height: 14 }} />
        )}
        <span className="text-[13px] leading-[18px] text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}

// Inline contextual style controls (background, drop shadow, border) matching the text
// component toolbar — used by widgets like Image that show a floating toolbar row.
function WidgetStyleControls({
  style,
  onChange,
  defaultBorderOn = false,
  onDelete,
  onShare,
  onOpenReport,
  enableCrossFilter = false,
  onOpenSettings,
  settingsLabel,
  settingsActive = false,
  onToggleAiSummary,
  aiSummaryOn = false,
}: {
  style: any;
  onChange: (patch: Record<string, any>) => void;
  defaultBorderOn?: boolean;
  onDelete?: () => void;
  onShare?: () => void;
  onOpenReport?: () => void;
  enableCrossFilter?: boolean;
  // Opens the widget's own configuration surface. The toolbar only offers the
  // button; where the settings live is the widget's business, not this row's.
  onOpenSettings?: () => void;
  settingsLabel?: string;
  settingsActive?: boolean;
  // Adds or removes this report's own AI summary. Offered per report because a
  // dashboard-level summary and a summary of one chart answer different
  // questions, and an author may want either or both.
  onToggleAiSummary?: () => void;
  aiSummaryOn?: boolean;
}) {
  const sShadow = style?.shadow === true;
  const sBorder = defaultBorderOn ? style?.border !== false : style?.border === true;
  const sBorderColor = style?.borderColor || '#e5e7eb';
  const sBorderWidth = style?.borderWidth ?? 1;
  const sBg = style?.bgColor || 'transparent';
  // gap-1.5 matches the toolbar's own py-1.5, so the icon row is inset by the
  // same amount above (toolbar padding) and below (this gap, up to the divider).
  return (
    <div className={`flex flex-col gap-1.5 ${enableCrossFilter ? 'w-[420px]' : ''}`}>
      <div className="flex items-center gap-1">
      {/* Component background */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sBg !== 'transparent' ? 'bg-muted' : 'hover:bg-muted'}`}
            aria-label="Component background"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#dcdcda]" style={{ backgroundColor: sBg === 'transparent' ? '#ffffff' : sBg }} />
          </button>
        </DropdownMenuTrigger>
        {/* z-[400] beats the toolbar's own z-[300]: this menu portals to <body>,
            so at the default z-50 the cross-filtering panel below the trigger
            would paint over the swatches. */}
        <DropdownMenuContent align="start" className="z-[400] w-56 p-3" onClick={(e) => e.stopPropagation()}>
          <span className="mb-2 block text-xs text-muted-foreground">Background</span>
          <div onClick={(e) => e.stopPropagation()}>
            <FloraColorPicker value={sBg} onChange={(c) => onChange({ bgColor: c })} allowTransparent palette={TEXT_STYLE_PALETTE} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drop shadow toggle */}
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sShadow ? 'bg-muted' : 'hover:bg-muted'}`}
        onClick={(e) => { e.stopPropagation(); onChange({ shadow: !sShadow }); }}
        aria-label="Drop shadow"
        aria-pressed={sShadow}
      >
        <Sun className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
      </button>

      {/* Border */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sBorder ? 'bg-muted' : 'hover:bg-muted'}`}
            aria-label="Border"
            onClick={(e) => e.stopPropagation()}
          >
            <StopStroke className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
          </button>
        </DropdownMenuTrigger>
        {/* z-[400] for the same reason as the background menu above. */}
        <DropdownMenuContent align="start" className="z-[400] w-56 p-3 space-y-3" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">Border</span>
            <button
              role="switch"
              aria-checked={sBorder}
              aria-label="Toggle border"
              onClick={(e) => { e.stopPropagation(); onChange({ border: !sBorder }); }}
              className={`relative h-5 w-9 rounded-full transition-colors ${sBorder ? 'bg-[#1f73b7]' : 'bg-[#dcdcda]'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${sBorder ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className={`space-y-3 ${sBorder ? '' : 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Weight</span>
              <div className="flex items-center rounded-[8px] border border-[#dcdcda]" onClick={(e) => e.stopPropagation()}>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={sBorderWidth}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (!Number.isNaN(n)) onChange({ border: true, borderWidth: Math.max(1, Math.min(20, n)) });
                  }}
                  className="h-7 w-12 rounded-[8px] bg-transparent px-2 text-sm text-foreground [appearance:textfield] focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Border weight in pixels"
                />
                <span className="pr-2 text-xs text-muted-foreground">px</span>
              </div>
            </div>
            <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
              <span className="text-xs text-muted-foreground">Border color</span>
              <FloraColorPicker value={sBorderColor} onChange={(c) => onChange({ border: true, borderColor: c })} palette={TEXT_STYLE_PALETTE} />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AI summary — a report's own summary, on or off. Same glyph as the centre
          toolbar's AI summary tool, because it inserts the same kind of thing:
          one scoped to this report rather than to the whole dashboard. */}
      {onToggleAiSummary && (
        <FloraTooltip
          content={aiSummaryOn ? 'Remove AI summary' : 'Add AI summary'}
          placement="bottom"
          size="small"
          appendToNode={typeof document !== 'undefined' ? document.body : undefined}
          zIndex={99999}
        >
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${
              aiSummaryOn ? 'bg-muted' : 'hover:bg-muted'
            }`}
            aria-label={aiSummaryOn ? 'Remove AI summary' : 'Add AI summary'}
            aria-pressed={aiSummaryOn}
            onClick={(e) => { e.stopPropagation(); onToggleAiSummary(); }}
          >
            <PencilSparkleStroke className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
          </button>
        </FloraTooltip>
      )}

      {/* Widget settings — sits beside the style controls because both are the
          author's contextual controls for the selected widget, and splitting them
          across two surfaces would make the author hunt for one of them. The
          settings themselves open in a side drawer, so this button only toggles. */}
      {onOpenSettings && (
        <button
          className={`flex h-8 items-center gap-1.5 rounded-[8px] px-2 text-sm transition-colors ${settingsActive ? 'bg-muted' : 'hover:bg-muted'}`}
          aria-label={settingsLabel || 'Widget settings'}
          aria-expanded={settingsActive}
          onClick={(e) => { e.stopPropagation(); onOpenSettings(); }}
        >
          <SlidersHorizontal className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
          Settings
        </button>
      )}

      {/* Open report + Share + Delete — pushed to the right edge of the row */}
      {(onOpenReport || onShare || onDelete) && (
        <div className="ml-auto mr-0.5 h-5 w-px bg-[#dcdcda]" />
      )}
      {onOpenReport && (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-muted"
          onClick={(e) => { e.stopPropagation(); onOpenReport(); }}
          aria-label="Open report"
        >
          <ExternalLink className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
        </button>
      )}
      {onShare && (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-muted"
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          aria-label="Share"
        >
          <ShareStroke className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
        </button>
      )}
      {onDelete && (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-[#c72a1c]/10"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label="Delete component"
        >
          <Trash2 className="size-[16px] shrink-0" style={{ width: 16, height: 16, color: '#c72a1c' }} />
        </button>
      )}
      </div>

      {/* Cross-filtering settings — labeled dropdowns below the icon row */}
      {enableCrossFilter && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#dcdcda] pb-1 pt-4" onClick={(e) => e.stopPropagation()}>
          {CROSS_FILTER_SETTINGS.map((setting) => {
            const current = style?.[setting.key] || setting.default;
            return (
              <div key={setting.key} className="flex w-[190px] flex-col gap-1">
                <FloraSelectField
                  dense
                  label={setting.label}
                  value={current}
                  ariaLabel={setting.label}
                  options={setting.options.map((option) => ({ value: option, label: option }))}
                  onChange={(value) => onChange({ [setting.key]: value })}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// The AI summary's own overflow menu, in its top-right corner beside the tag.
//
// The widget has this in addition to the selection toolbar because its actions are
// about the summary as a piece of writing — copy the text, share the briefing —
// rather than about a box on a canvas, and they should be reachable without first
// selecting the widget. Delete is repeated from the toolbar since a menu that can
// do everything but remove the thing reads as incomplete.
function AiSummaryOverflowMenu({
  onCopyText,
  onShare,
  onDelete,
  onCreateWithCopilot,
}: {
  onCopyText: () => void;
  onShare: () => void;
  onDelete: () => void;
  onCreateWithCopilot: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="AI summary options"
          // stopPropagation on the whole trigger: the canvas below treats a click
          // as select-or-deselect, and opening this menu is neither.
          onClick={(e) => e.stopPropagation()}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] text-[#68737d] transition-colors hover:bg-black/5 hover:text-foreground"
        >
          <MoreVertical className="shrink-0" style={{ width: 14, height: 14 }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[400] w-48" onClick={(e) => e.stopPropagation()}>
        {/* Same item as a report's menu offers, pointed at this summary: the
            widget's settings cover what it is written from, and this covers the
            changes there is no control for. */}
        <DropdownMenuItem className="gap-2" onClick={onCreateWithCopilot}>
          <Sparkles className="size-[16px] shrink-0 !text-[#8d59b1]" />
          <MD tag="span" className="!text-foreground">Ask copilot</MD>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" onClick={onCopyText}>
          <Copy className={FLORA_MENU_ICON} />
          <MD tag="span" className="!text-foreground">Copy text</MD>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={onShare}>
          <ShareStroke className={FLORA_MENU_ICON} />
          <MD tag="span" className="!text-foreground">Share</MD>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="gap-2" onClick={onDelete}>
          <Trash2 className="size-[16px] shrink-0" style={{ color: '#c72a1c' }} />
          <MD tag="span" className="!text-destructive">Delete</MD>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Resize affordances drawn around a selected widget:
//  - four full-length edge strips that sit on the component's stroke, so the
//    resize cursor is active along the whole active border (not just at points)
//  - four visible square markers on the corners for diagonal resizing
// Each calls onResizeStart with the direction it grows from.
type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
function ResizeHandles({ onResizeStart, horizontalOnly }: { onResizeStart: (e: React.MouseEvent, dir: ResizeDir) => void; horizontalOnly?: boolean }) {
  // Full-length edge strips (thin, invisible) — the whole stroke is draggable.
  const allEdges: { dir: ResizeDir; cls: string; cursor: string }[] = [
    { dir: 'n', cls: '-top-1 left-2 right-2 h-2', cursor: 'cursor-ns-resize' },
    { dir: 's', cls: '-bottom-1 left-2 right-2 h-2', cursor: 'cursor-ns-resize' },
    { dir: 'w', cls: '-left-1 top-2 bottom-2 w-2', cursor: 'cursor-ew-resize' },
    { dir: 'e', cls: '-right-1 top-2 bottom-2 w-2', cursor: 'cursor-ew-resize' },
  ];
  // A separator only stretches left/right, so hide the vertical handles + corners.
  const edges = horizontalOnly ? allEdges.filter(h => h.dir === 'w' || h.dir === 'e') : allEdges;
  // Corner markers — visible squares.
  const corners: { dir: ResizeDir; cls: string; cursor: string }[] = horizontalOnly ? [] : [
    { dir: 'nw', cls: '-top-1 -left-1', cursor: 'cursor-nwse-resize' },
    { dir: 'ne', cls: '-top-1 -right-1', cursor: 'cursor-nesw-resize' },
    { dir: 'se', cls: '-bottom-1 -right-1', cursor: 'cursor-nwse-resize' },
    { dir: 'sw', cls: '-bottom-1 -left-1', cursor: 'cursor-nesw-resize' },
  ];
  return (
    <>
      {edges.map((h) => (
        <div
          key={h.dir}
          onMouseDown={(e) => onResizeStart(e, h.dir)}
          className={`absolute z-[110] ${h.cls} ${h.cursor}`}
          aria-label={`Resize ${h.dir}`}
        />
      ))}
      {horizontalOnly && (['w', 'e'] as ResizeDir[]).map((dir) => (
        <div
          key={`marker-${dir}`}
          onMouseDown={(e) => onResizeStart(e, dir)}
          className={`absolute top-1/2 -translate-y-1/2 z-[120] h-2.5 w-2.5 rounded-[2px] border border-[#1f73b7] bg-white cursor-ew-resize ${dir === 'w' ? '-left-1' : '-right-1'}`}
          aria-label={`Resize ${dir}`}
        />
      ))}
      {corners.map((h) => (
        <div
          key={h.dir}
          onMouseDown={(e) => onResizeStart(e, h.dir)}
          className={`absolute z-[120] h-2.5 w-2.5 rounded-[2px] border border-[#1f73b7] bg-white ${h.cls} ${h.cursor}`}
          aria-label={`Resize ${h.dir}`}
        />
      ))}
    </>
  );
}

// Contextual style menu shared by every dashboard widget: drop shadow, border, background
function WidgetStyleMenu({ style, onChange, dark }: { style: any; onChange: (patch: Record<string, any>) => void; dark?: boolean }) {
  const shadow = style?.shadow === true; // default off (no drop shadow)
  const border = style?.border !== false; // default on (stroke)
  const borderColor = style?.borderColor || '#e5e7eb';
  const borderWidth = style?.borderWidth ?? 1;
  const bgColor = style?.bgColor || '#ffffff';
  return (
    <Popover>
      <PopoverTrigger asChild>
        {dark ? (
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] hover:bg-white/10 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="Widget style"
          >
            <SlidersHorizontal className="size-[16px] shrink-0 text-white" style={{ width: 16, height: 16 }} />
          </button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
            aria-label="Widget style"
          >
            <SlidersHorizontal className={FLORA_ICON} style={{ width: 16, height: 16 }} />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72 p-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drop shadow */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Drop shadow</span>
          <Switch checked={shadow} onCheckedChange={(v) => onChange({ shadow: v })} />
        </div>

        <Separator />

        {/* Border */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Border</span>
            <Switch checked={border} onCheckedChange={(v) => onChange({ border: v })} />
          </div>
          {border && (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">Weight</span>
                <div className="flex items-center gap-1 rounded-[8px] border border-[#dcdcda] p-0.5">
                  {[1, 2, 3, 4].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => onChange({ borderWidth: w })}
                      aria-label={`Border weight ${w}px`}
                      aria-pressed={borderWidth === w}
                      className={`flex h-6 w-7 items-center justify-center rounded-[6px] text-xs transition-colors ${
                        borderWidth === w ? 'bg-[#1f73b7] text-white' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Border color</span>
                <FloraColorPicker value={borderColor} onChange={(c) => onChange({ borderColor: c })} />
              </div>
            </>
          )}
        </div>

        <Separator />

        {/* Background color */}
        <div className="space-y-1.5">
          <span className="text-sm text-foreground">Background</span>
          <FloraColorPicker value={bgColor} onChange={(c) => onChange({ bgColor: c })} allowTransparent />
        </div>
      </PopoverContent>
    </Popover>
  );
}
const FILTER_ACTIVE_VISIBLE_TAGS = 2;
// h-[32px] in px, not h-8 — the 14px root font size makes 2rem resolve to 28px,
// which would sit 4px shorter than the saved-views and refresh-rate controls.
const FILTER_ACTIVE_SHELL =
  'inline-flex h-[32px] w-fit max-w-[360px] items-center gap-1 rounded-[8px] border border-[#dcdcda] bg-white pl-3 pr-2';
const FILTER_ACTIVE_LABEL =
  'shrink-0 whitespace-nowrap !text-[12px] !font-semibold !leading-4 !text-[#2f3130]';
const FILTER_ACTIVE_VALUES =
  'min-w-0 truncate whitespace-nowrap !text-[12px] !font-normal !leading-4 !text-[#2f3130]';
const FILTER_ACTIVE_OVERFLOW =
  'shrink-0 whitespace-nowrap !text-[12px] !font-normal !leading-4 !tracking-[-0.0004px] !text-[#406cc4]';
const FILTER_VALUE_PANEL_CLASS =
  'dashboard-filter-panel z-[200] w-72 overflow-hidden rounded-[8px] border border-[#d8dcde] bg-white p-0 shadow-[0_20px_14px_rgba(4,68,77,0.15)]';
const CANVAS_BG = '#fafafa';
const CANVAS_WIDGET_PADDING = 24;

interface ContentItem {
  id: string;
  type: 'chart' | 'text' | 'link' | 'image' | 'filter' | 'separator' | 'section' | 'parameter' | 'fetch';
  title?: string;
  content?: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

// Where the data behind a report comes from and how fresh it is. It closes the
// report's overflow menu rather than sitting on the canvas: it answers "is this
// current?" when a reader goes looking, without spending card height on four
// lines of metadata under every figure.
const REPORT_PROVENANCE_DEFAULTS = {
  dataset: 'Support tickets',
  // A live report doesn't read a stored dataset, it reads the feed — so it names
  // the feed. This is the one line a real-time report's menu carries.
  liveDataset: 'Real-time monitoring',
  historicalRefresh: 'Hourly',
  liveRefresh: 'Every 30 seconds',
  lastRefreshed: '10:42 AM',
};

// Reports read historical data on a schedule; the live indicator dot is what
// marks the exceptions, so its absence is what decides the cadence here rather
// than a separate field an author could set to contradict it.
function reportProvenance(content: any) {
  const c = content || {};
  const isLive = Boolean(c.liveData);
  const cadence =
    c.refreshInterval ||
    (isLive
      ? REPORT_PROVENANCE_DEFAULTS.liveRefresh
      : REPORT_PROVENANCE_DEFAULTS.historicalRefresh);
  return {
    isLive,
    dataset:
      c.dataset ||
      (isLive ? REPORT_PROVENANCE_DEFAULTS.liveDataset : REPORT_PROVENANCE_DEFAULTS.dataset),
    // The cadence belongs to the dataset, so it rides on the same line; the
    // timestamp is about this reading of it, and drops to the next.
    cadence,
    updated: `Updated ${c.lastRefreshed || REPORT_PROVENANCE_DEFAULTS.lastRefreshed}`,
  };
}

// Sits at the foot of the report's overflow menu, under a rule: read-only
// metadata rather than another action, so it takes no hover state and no icon
// column. Written as plain statements instead of label/value pairs — a colon
// column in a menu this narrow costs more width than the words are worth. The
// dataset leads, with the database glyph the library uses for datasets, so the
// source is identifiable without a "Dataset:" label to carry it.
//
// A real-time report keeps the source line and drops the rest: the cadence and a
// clock time are answers to "is this current?", and on a live feed that question
// is already answered by the green dot beside the title — a fixed "Updated 10:42
// AM" under streaming data reads as staleness that isn't there. So the feed's name
// is the whole footer.
function ReportProvenanceMenuFooter({ content }: { content: any }) {
  const { isLive, dataset, cadence, updated } = reportProvenance(content);
  return (
    <>
      <div className="border-t border-border my-1" />
      {/* Flora's xsmall step (10px/16px) — a step under the menu's own items and
          under the report title, because this is a note about the data rather
          than something to act on. */}
      <div className="px-3 pb-1 pt-1 text-xs text-[#68737d]">
        <div className="flex items-center gap-1.5">
          <DatabaseStroke
            className="shrink-0 fill-current !text-[#68737d]"
            style={{ width: 12, height: 12 }}
          />
          {/* The dataset can be long, so it is the part that gives way — the
              cadence beside it is short and fixed. */}
          <span className="min-w-0 truncate text-[#2f3130]" title={dataset}>{dataset}</span>
          {!isLive && (
            <>
              <span aria-hidden className="shrink-0 text-[#c2c8cc]">·</span>
              {/* The glyph carries "refresh", so the line reads as icon + interval —
                  the word cost more width than it explained. Same rotate icon as the
                  header's refresh-data-now action, so the two read as one idea. */}
              <span
                className="flex shrink-0 items-center gap-1"
                title={`Refreshes ${cadence.toLowerCase()}`}
              >
                <ArrowRotateRight
                  className="shrink-0 fill-current !text-[#68737d]"
                  style={{ width: 12, height: 12 }}
                />
                {cadence}
              </span>
            </>
          )}
        </div>
        {!isLive && <div>{updated}</div>}
      </div>
    </>
  );
}

// The info icon is opt-in, not standard furniture: it only appears where the
// figure carries something a reader can't infer from the chart — how a bucket is
// composed, what a target is, how rows are ordered. An icon on every widget
// trains readers to ignore all of them, and most of these widgets say what they
// measure in their own title. `infoNote` is the author's caveat; a widget without
// one gets no icon.
function widgetInfoNote(item: ContentItem): string | null {
  const note = item.content?.infoNote;
  return typeof note === 'string' && note.trim() ? note : null;
}

type LinkType = 'asset' | 'hyperlink';
type LinkState = 'none' | 'filters' | 'cross-filters' | 'all';
type LinkOpenTarget = 'current' | 'new-tab' | string;

interface LinkFormat {
  fontStyle: string;
  fontSize: number;
  color: string;
  highlight: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: 'left' | 'center' | 'right';
}

interface LinkContent {
  label: string;
  linkType: LinkType;
  assetId: string | null;
  assetName: string | null;
  url: string;
  openInTab: LinkOpenTarget;
  passState: LinkState;
  format: LinkFormat;
}

interface DashboardTab {
  id: string;
  name: string;
  contentItems: ContentItem[];
}

interface DashboardBuilderProps {
  dashboardTitle?: string;
  projectName?: string;
  onSave?: (dashboard: any) => void;
  onCancel?: () => void;
  onClose?: () => void;
  onUpdateTitle?: (newTitle: string) => void;
  isFromCard?: boolean; // Flag to indicate if opened from a card
  initialData?: any; // Initial data for the dashboard
  onOpenAnalyticsAssistant?: (query: string, showResponse: boolean, responseType?: 'default' | 'narrate') => void;
  // Leave the builder and open the given project in the library
  onNavigateToProject?: (projectName: string) => void;
}

// Toolbar geometry. The real widths are read off the rendered row, since Flora
// sizes in rem against a 14px root — a "32px" button measures 28px here. These
// are only the fallbacks for the first pass, before the DOM has been measured.
const TOOLBAR_FALLBACK_BUTTON = 28;
const TOOLBAR_FALLBACK_GAP = 4;
const TOOLBAR_FALLBACK_PADDING = 16;
// w-px on mx-0.5 margins.
const TOOLBAR_FALLBACK_DIVIDER = 5;
// Layout and dev mode, which sit past the divider.
const TOOLBAR_TRAILING_TOOLS = 2;
// What the header's title and actions keep clear of each other. The toolbar has
// left the header, so this is now only the point at which the mode toggle sheds
// its label.
const TOOLBAR_MIN_SIDE_GAP = 40;
// The floating toolbar clears the canvas's bottom edge by 16px.
const FLOATING_TOOLBAR_BOTTOM = 16;
// The floating bar is centred over the canvas and keeps this much clear of each
// edge; past that its tools fold into the overflow menu one at a time.
const FLOATING_TOOLBAR_SIDE_GAP = 16;
// What the suggestion needs in the canvas's bottom-left corner to sit there: a
// chip narrow enough to still read, its dismiss button, and 8px of clearance
// before the bar. Below that it goes above the bar instead of running under it.
const SUGGESTION_SIDE_ROOM = 160 + 28 + 8;
// Long labels truncate rather than stretching the offer across the canvas.
const SUGGESTION_MAX_WIDTH = 260;
// What the Editing/Viewing toggle's label costs: the difference between the
// laid-out and the icon-only widths of .dashboard-mode-toggle (95px and 32px).
// It's the first thing the row gives up, and it buys back two tools' worth.
const MODE_TOGGLE_LABEL_WIDTH = 95 - 32;

const toolbarItems = [
  {
    id: 'chart',
    type: 'chart' as const,
    label: 'Report',
    shortcut: 'R',
    icon: <BarChartIcon className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a report'
  },
  {
    id: 'text',
    type: 'text' as const,
    label: 'Text',
    shortcut: 'T',
    icon: <TextStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add text content'
  },
  {
    id: 'image',
    type: 'image' as const,
    label: 'Image',
    shortcut: 'I',
    icon: <ImageStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add images'
  },
  {
    id: 'narrative',
    type: 'narrative' as const,
    label: 'AI summary',
    shortcut: 'A',
    icon: <PencilSparkleStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add an AI-written summary'
  },
  // Every insert tool sits in the row itself — nothing is tucked behind an
  // overflow menu, so the full set of components is visible at a glance.
  {
    id: 'section',
    label: 'Section',
    shortcut: 'S',
    icon: <StopStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a section'
  },
  {
    id: 'separator',
    label: 'Line',
    shortcut: 'L',
    icon: <LineRule className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a divider line'
  },
  {
    id: 'parameter',
    label: 'Parameter',
    shortcut: 'P',
    icon: <ShapesStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a reader-controlled parameter'
  },
  {
    id: 'fetch',
    label: 'Fetch',
    shortcut: 'F',
    icon: <Download className={FLORA_TOOLBAR_ICON} />,
    description: 'Pull in an external data source'
  },
];

// A parameter widget lets a reader pick a value that the reports on the
// dashboard read from — so one dashboard covers several questions. The control
// type decides what the reader sees; the options are what they can pick.
const PARAMETER_CONTROL_TYPES = [
  { id: 'select', label: 'Dropdown' },
  { id: 'buttons', label: 'Button group' },
  { id: 'number', label: 'Number' },
] as const;

const createParameterContent = () => ({
  name: 'Region',
  controlType: 'select' as (typeof PARAMETER_CONTROL_TYPES)[number]['id'],
  options: ['All regions', 'EMEA', 'AMER', 'APAC'],
  value: 'All regions',
  numberValue: 30,
  style: { shadow: false, border: true, borderColor: '#d8dcde', borderWidth: 1, bgColor: '#ffffff' },
});

// A fetch widget names an external source and shows the state of the last pull,
// so a reader can tell how fresh the numbers beside it are.
const FETCH_SOURCES = [
  { id: 'salesforce', label: 'Salesforce — Opportunities' },
  { id: 'snowflake', label: 'Snowflake — support_metrics' },
  { id: 'bigquery', label: 'BigQuery — zendesk_events' },
  { id: 'csv', label: 'CSV upload' },
] as const;

const createFetchContent = () => ({
  sourceId: 'snowflake' as (typeof FETCH_SOURCES)[number]['id'],
  rows: 1284,
  lastFetched: 'Today, 6:00 AM',
  status: 'idle' as 'idle' | 'loading',
  style: { shadow: false, border: true, borderColor: '#d8dcde', borderWidth: 1, bgColor: '#ffffff' },
});

const ADD_FILTER_SHORTCUT = 'F';

// Tooltip body for a toolbar tool: the name, then its single-letter keyboard
// shortcut set off to the right the way Flora tooltips carry hint text.
function toolTooltip(label: string, shortcut?: string) {
  if (!shortcut) return label;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span>{label}</span>
      <span className="text-white/60">{shortcut}</span>
    </span>
  );
}

// Suggestions that float over the canvas while editing. Every one adds a report
// to the dashboard — they're about the data on offer, not about the builder's
// own tooling, so nothing here points at copilot or the context graph.
type SuggestionAction = { id: string; label: string; report: Omit<ContentItem, 'id' | 'position'> };

const DASHBOARD_SUGGESTIONS: SuggestionAction[] = [
  {
    id: 'csat-comparison',
    label: 'Add CSAT comparison',
    report: {
      type: 'chart',
      size: { width: 400, height: 280 },
      title: 'CSAT comparison',
      content: {
        chartType: 'csat-comparison',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        description: 'CSAT this period against the previous one, by channel.',
        style: { shadow: false, border: true },
      },
    },
  },
  {
    id: 'resolution-time',
    label: 'Add median resolution time',
    report: {
      type: 'chart',
      size: { width: 280, height: 200 },
      title: 'Median resolution time',
      content: {
        chartType: 'kpi-resolution-time',
        reportSource: 'Resolution Time Analysis',
        reportType: 'KPI',
        description: 'Median time from ticket creation to solved, business hours only.',
        kpiData: { averageResolutionTime: '5.8 hours', change: '-36%', trend: 'down' },
        style: { shadow: false, border: true },
      },
    },
  },
  {
    id: 'ticket-volume',
    label: 'Add ticket volume by day',
    report: {
      type: 'chart',
      size: { width: 440, height: 280 },
      title: 'Ticket volume by day',
      content: {
        chartType: 'ticket-volume',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Tickets created per day across the reporting period.',
        style: { shadow: false, border: true },
      },
    },
  },
  {
    id: 'recent-tickets',
    label: 'Add recent tickets table',
    report: {
      type: 'chart',
      size: { width: 460, height: 300 },
      title: 'Recent tickets',
      content: {
        chartType: 'table',
        reportSource: 'Real-time Monitoring',
        reportType: 'Analytics',
        description: 'The most recently updated tickets, with status and assignee.',
        style: { shadow: false, border: true },
      },
    },
  },
];

// Geometry comes from the 🌸 Suggestions component in Figma (Dashboard builder —
// components, node 37:337), in the compact variant rather than that node's 40px
// default, built from Flora's own small-button tokens — 32px tall (space.base *
// 8), 12px side padding (space.base * 3) — so it reads as a hint over the canvas
// instead of a primary action bar. The trailing padding is cut to 4px: the
// dismiss button sits inside the pill, and its own 24px circle carries the rest
// of that clearance.
// The surface is the floating toolbar's rather than that node's grey ground: the
// two sit on the same band at the bottom of the canvas, and a chip that lifts off
// the grid the way the bar does reads as chrome floating over the work rather
// than as something dropped onto it.
const SUGGESTION_CHIP =
  'flex h-[32px] items-center gap-[6px] rounded-[99px] border border-border bg-white pl-[12px] pr-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#f7f7f7]';

// How the chrome that floats over the canvas's bottom band arrives: it rises the
// last few pixels into place as it fades up. Shared by the editing toolbar and
// the suggestion chip — they sit on the same band and switch on together, so the
// same motion is what makes them read as one piece of chrome appearing rather
// than as two things that happen to have shown up at once.
const CANVAS_BAND_ENTRANCE =
  'animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out fill-mode-both';

// The suggestion that sits in the canvas's bottom-left corner — one at a time, in order.
// Applying it drops it and the next one takes its place, so the offer stays a
// single thing to say yes or no to rather than a row to read, and it can't be
// clicked twice into a duplicate report.
//
// The chip rises into place when edit mode opens rather than appearing with it.
// Entering edit mode already changes the toolbar, the grid and the widget chrome
// all at once; a suggestion arriving a beat later reads as an offer the builder is
// making rather than as more of the chrome that just switched on, and the motion
// is what draws the eye to it.
//
// A beat after the mode switch itself, so the two don't read as one event.
const SUGGESTION_DELAY_MS = 140;

function DashboardSuggestions({
  onDismiss,
  onAction,
}: {
  onDismiss: () => void;
  onAction: (suggestion: SuggestionAction) => void;
}) {
  const [used, setUsed] = useState<string[]>([]);
  const remaining = DASHBOARD_SUGGESTIONS.filter((s) => !used.includes(s.id));
  const suggestion = remaining[0];

  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    // Two frames: one for the mounted-but-unentered paint, one for the browser to
    // pick up the animation. A timeout of 0 lands mid-frame on a busy mode switch.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setHasEntered(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  // The chip is keyed on the suggestion, so each new offer is a new element and
  // replays the entrance: taking one and having the next slide into the same spot
  // is what says there is more where that came from. Only the first is delayed —
  // that beat is about the mode switch, and there is no mode switch after it.
  const entrance = hasEntered ? CANVAS_BAND_ENTRANCE : 'opacity-0';

  if (!suggestion) return null;

  return (
    // Keyed here rather than on the label inside, so a new offer is a new pill
    // and replays the entrance. The z-index still has to clear the widgets'
    // resize handles (z-110): the scroll container isn't a stacking context, so
    // those compete with this directly and would otherwise swallow the click.
    <div
      key={suggestion.id}
      className={`pointer-events-auto z-[120] min-w-0 ${SUGGESTION_CHIP} ${entrance}`}
      style={used.length === 0 ? { animationDelay: `${SUGGESTION_DELAY_MS}ms` } : undefined}
    >
      <button
        type="button"
        onClick={() => {
          onAction(suggestion);
          setUsed((prev) => [...prev, suggestion.id]);
        }}
        // Takes the whole pill bar the dismiss button, so what tints on hover and
        // what is clickable are the same shape. The label is what gives way when
        // the corner runs out of room.
        className="flex h-full min-w-0 flex-1 cursor-pointer items-center gap-[6px]"
      >
        {/* 16px icon against 13px text. 13px rather than Flora's 12px small
            size so this chip, the AI summary's follow-ups and copilot's drawer
            are one pill at one size — they are the same offer in three places,
            and a pixel of difference between them is the kind of thing that
            reads as a mistake rather than as a variant. */}
        <Sparkles className="size-[16px] shrink-0 !text-[#8d59b1]" aria-hidden />
        <span className="truncate text-[13px] leading-[18px] tracking-[-0.132px] text-[#2f3130]">
          {suggestion.label}
        </span>
      </button>
      {/* Not part of the Figma component, but the chip sits over the canvas
          indefinitely otherwise. Inside the pill rather than trailing it: the
          offer and the way out are one thing to deal with, and a second pill
          beside it read as a second suggestion. Its own circle on hover, so it
          is clear the click lands on the dismiss and not on the offer. */}
      <button
        type="button"
        aria-label="Dismiss suggestions"
        onClick={onDismiss}
        className="flex size-[24px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#dcdcda]"
      >
        <X className="size-[14px] shrink-0 text-[#2f3130]" />
      </button>
    </div>
  );
}

// How long after the canvas opens the onboarding tooltip arrives. Longer than the
// suggestion chip's beat: the toolbar it points at has to be in place and read as
// settled before something calls attention to it.
const TOOLS_ONBOARDING_DELAY_MS = 700;

// The onboarding coachmark that points at the floating tool row the first time an
// author lands on a dashboard they just created — the tools moved out of the
// header and onto the canvas, so where they are is the one thing worth saying.
//
// Shape, arrow, X and pill button all come from the header's legacy-assets
// coachmark (TopBar): these are the same onboarding voice in two places, and an
// author who has just met one recognises the other as more of the same tour
// rather than as a new kind of thing. The arrow points down here because the
// tooltip sits above what it is describing.
//
// The ground is the header coachmark's #293239 — the same dark the active tab in
// the top bar carries. Onboarding is the one voice in this UI that speaks over the
// work rather than being part of it, and the dark card is how it says so: white
// cards on this band are the toolbar and the suggestion chip, which are chrome the
// author uses, not a message about it. Sharing the tab's exact dark also keeps the
// two coachmarks reading as one tour across the header and the canvas.
function ToolsOnboardingTooltip({ onDismiss }: { onDismiss: () => void }) {
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), TOOLS_ONBOARDING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!hasEntered) return null;

  return (
    <div className={`pointer-events-auto w-[400px] ${CANVAS_BAND_ENTRANCE}`}>
      <div className="relative rounded-2xl bg-[#293239] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          aria-label="Close onboarding"
          onClick={onDismiss}
          className="absolute right-2 top-2 flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
        >
          <X className="size-4 text-white" />
        </button>

        {/* pr-6 on the title row alone rather than on the whole block: only that
            row runs under the X, and the row below it needs its full width to keep
            the copy off a third line. */}
        <p className="mb-2 pr-6 text-base font-semibold leading-[20px] text-white">
          Build and style your dashboard
        </p>
        {/* The body now runs to two sentences, so it takes the card's full width and
            the dismiss drops below it. Beside the button this copy would break onto
            four narrow lines — the row layout only held while the message was one
            short sentence. */}
        {/* Full white rather than a dimmed second level, the same call the header
            coachmark makes: the paragraph is the message, not a caption under it,
            and muted grey on this ground is the one thing that would be hard to
            read at 14px. */}
        <p className="text-base leading-[20px] text-white">
          Use the toolbar below to add reports, text, and images to your canvas. You
          can also customize your dashboard’s layout and styling.
        </p>
        <div className="mt-4 flex justify-end">
          {/* Flora's default button is transparent with dark ink, which vanishes
              on this ground — so it is filled white here and takes the card's own
              dark for its label. It is the only action on the card, so it can
              afford to be the one solid thing on it. */}
          <FloraButton
            isPill
            size="small"
            onClick={onDismiss}
            className="!bg-white !text-[#293239] hover:!bg-[#f0f1f2]"
          >
            Got it
          </FloraButton>
        </div>

        {/* Arrow last so it draws over the card's own bottom edge, and centred on
            the tool row rather than on the card: the card is wider than the bar's
            middle, and an arrow off to one side would point at a single tool. No
            stroke now the card has none — on the dark ground the fill alone reads
            as the card's own corner. */}
        <div
          className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 bg-[#293239]"
          aria-hidden
        />
      </div>
    </div>
  );
}

// Viewing mode's counterpart to the tools coachmark: the one control in the filter
// row a viewer would not otherwise find a reason to press. The two are the same
// card on purpose — one dark voice introducing whichever mode you are in, one thing
// per mode, never both at once.
//
// It hangs below the filter bar instead of above it, so the arrow is on top and
// pinned left: this points at a single 32px button rather than at a whole row, and
// a centred arrow would land on the filter chips beside it.
function SavedViewsOnboardingTooltip({ onDismiss }: { onDismiss: () => void }) {
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), TOOLS_ONBOARDING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!hasEntered) return null;

  return (
    // Drops into place rather than rising: it arrives from the bar it belongs to,
    // which is above it, where the canvas-band chrome arrives from below.
    <div className="pointer-events-auto w-[360px] animate-in fade-in slide-in-from-top-3 duration-300 ease-out fill-mode-both">
      <div className="relative rounded-2xl bg-[#293239] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          aria-label="Close onboarding"
          onClick={onDismiss}
          className="absolute right-2 top-2 flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
        >
          <X className="size-4 text-white" />
        </button>

        <p className="mb-2 pr-6 text-base font-semibold leading-[20px] text-white">
          Save your dashboard view
        </p>
        <p className="text-base leading-[20px] text-white">
          Save the current filter configuration as a view to quickly return to it
          later.
        </p>
        <div className="mt-4 flex justify-end">
          <FloraButton
            isPill
            size="small"
            onClick={onDismiss}
            className="!bg-white !text-[#293239] hover:!bg-[#f0f1f2]"
          >
            Got it
          </FloraButton>
        </div>

        {/* Left rather than centred, on the bookmark button's own column — 29px in
            from the card's edge, which is where that button's centre falls given
            the card's own offset.

            12px rather than 16, and its base has to clear the card's corner
            radius: a rotated square is √2 as wide as its side, so a 16px one
            reached back into the curve, where there is no straight edge for it to
            sit on — it read as a spike stuck to the corner rather than as the
            card's own point. At 12px the base spans 22→36px, clear of the 14px
            radius and on the flat top edge. The top offset is half the rotated
            height, putting the square's centre on that edge: the half below it
            overlaps the card in the card's own colour, so there is no seam to
            show. */}
        <div
          className="absolute -top-[5px] left-[29px] size-3 -translate-x-1/2 rotate-45 bg-[#293239]"
          aria-hidden
        />
      </div>
    </div>
  );
}

const chartTypes = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    icon: <BarChartIcon className={FLORA_ICON} />,
    description: 'Compare values across categories'
  },
  {
    id: 'line-chart',
    name: 'Line Chart',
    icon: <LineChartStroke className={FLORA_ICON} />,
    description: 'Show trends over time'
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    icon: <PieChartStroke className={FLORA_ICON} />,
    description: 'Show parts of a whole'
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    icon: <ActivityStroke className={FLORA_ICON} />,
    description: 'Display data volume over time'
  },
  {
    id: 'metric-card',
    name: 'Metric Card',
    icon: <TargetStroke className={FLORA_ICON} />,
    description: 'Display key performance indicators'
  },
  {
    id: 'table',
    name: 'Data Table',
    icon: <TableStroke className={FLORA_ICON} />,
    description: 'Show detailed data in rows and columns'
  }
];

const mockReports = [
  { id: 'report-1', name: 'Customer Support Analytics', type: 'Support', lastUpdated: '2024-01-15', owner: 'John Smith', projectName: 'Customer Experience Hub', tags: [{ label: 'Support' }, { label: 'Analytics' }] },
  { id: 'report-2', name: 'Resolution Time Analysis', type: 'KPI', lastUpdated: '2024-01-14', owner: 'Sarah Chen', projectName: 'Real-time Monitoring', tags: [{ label: 'KPI' }, { label: 'Performance' }] },
  { id: 'report-3', name: 'Agent Performance Dashboard', type: 'Performance', lastUpdated: '2024-01-13', owner: 'Michael Park', projectName: 'Support Operations', tags: [{ label: 'Performance' }] },
  { id: 'report-4', name: 'Ticket Volume Trends', type: 'Analytics', lastUpdated: '2024-01-12', owner: 'Emily Rodriguez', projectName: 'Customer Experience Hub', tags: [{ label: 'Analytics' }, { label: 'Trends' }] },
  { id: 'report-5', name: 'SLA Compliance Report', type: 'Compliance', lastUpdated: '2024-01-11', owner: 'John Smith', projectName: 'Real-time Monitoring', tags: [{ label: 'Compliance' }, { label: 'SLA' }] },
  { id: 'report-6', name: 'First Contact Resolution', type: 'KPI', lastUpdated: '2024-01-10', owner: 'Sarah Chen', projectName: 'Support Operations', tags: [{ label: 'KPI' }] },
  { id: 'report-7', name: 'Customer Satisfaction Analysis', type: 'Analytics', lastUpdated: '2024-01-09', owner: 'Michael Park', projectName: 'Customer Experience Hub', tags: [{ label: 'Analytics' }, { label: 'CSAT' }] },
  { id: 'report-8', name: 'Response Time Monitoring', type: 'KPI', lastUpdated: '2024-01-08', owner: 'Emily Rodriguez', projectName: 'Real-time Monitoring', tags: [{ label: 'KPI' }, { label: 'Monitoring' }] },
  { id: 'report-9', name: 'Escalation Trends', type: 'Support', lastUpdated: '2024-01-07', owner: 'John Smith', projectName: 'Support Operations', tags: [{ label: 'Support' }] },
  { id: 'report-10', name: 'Backlog Analysis', type: 'Analytics', lastUpdated: '2024-01-06', owner: 'Sarah Chen', projectName: 'Customer Experience Hub', tags: [{ label: 'Analytics' }, { label: 'Backlog' }] },
  { id: 'report-11', name: 'Channel Performance Overview', type: 'Performance', lastUpdated: '2024-01-05', owner: 'Michael Park', projectName: 'Support Operations', tags: [{ label: 'Performance' }, { label: 'Channels' }] },
  { id: 'report-backlog', name: 'Current ticket backlog', type: 'Monitoring', lastUpdated: '2024-01-04', owner: 'Michael Park', projectName: 'Real-time Monitoring', tags: [{ label: 'Monitoring' }, { label: 'Backlog' }] },
  { id: 'report-12', name: 'Team Productivity Metrics', type: 'Performance', lastUpdated: '2024-01-04', owner: 'Emily Rodriguez', projectName: 'Real-time Monitoring', tags: [{ label: 'Performance' }] },
  { id: 'report-13', name: 'Customer Effort Score', type: 'KPI', lastUpdated: '2024-01-03', owner: 'John Smith', projectName: 'Customer Experience Hub', tags: [{ label: 'KPI' }, { label: 'CES' }] },
  { id: 'report-14', name: 'Ticket Reopen Rate', type: 'Analytics', lastUpdated: '2024-01-02', owner: 'Sarah Chen', projectName: 'Support Operations', tags: [{ label: 'Analytics' }] },
  { id: 'report-15', name: 'Queue Wait Time Report', type: 'KPI', lastUpdated: '2024-01-01', owner: 'Michael Park', projectName: 'Real-time Monitoring', tags: [{ label: 'KPI' }, { label: 'Queues' }] },
  { id: 'report-16', name: 'Regional Support Breakdown', type: 'Support', lastUpdated: '2023-12-31', owner: 'Emily Rodriguez', projectName: 'Customer Experience Hub', tags: [{ label: 'Support' }, { label: 'Regional' }] },
  { id: 'report-17', name: 'Automation Impact Summary', type: 'Analytics', lastUpdated: '2023-12-30', owner: 'John Smith', projectName: 'Support Operations', tags: [{ label: 'Analytics' }, { label: 'Automation' }] },
  { id: 'report-18', name: 'Agent Utilization Report', type: 'Performance', lastUpdated: '2023-12-29', owner: 'Sarah Chen', projectName: 'Real-time Monitoring', tags: [{ label: 'Performance' }, { label: 'Utilization' }] },
];

// Reports reading off the live stream rather than the daily historical job.
// Held as a set beside the list, not as a field on all eighteen rows, since
// only the Real-time Monitoring project's reports are live.
const REALTIME_REPORT_IDS = new Set([
  'report-2',
  'report-5',
  'report-8',
  'report-backlog',
  'report-12',
  'report-15',
  'report-18',
]);

// Columns the report picker can sort on. Each names a string field on a report,
// which is what lets one comparator serve all four.
type ReportSortColumn = 'name' | 'projectName' | 'owner' | 'lastUpdated';

// Dashboards a link can point to. Each carries its own tabs so a link can
// deep-link into a specific tab of the destination dashboard.
const mockDashboards = [
  {
    id: 'dashboard-1',
    name: 'Executive Overview',
    lastUpdated: '2024-01-15',
    owner: 'John Smith',
    projectName: 'Customer Experience Hub',
    tabs: [
      { id: 'dash-1-tab-1', name: 'Summary' },
      { id: 'dash-1-tab-2', name: 'Trends' },
      { id: 'dash-1-tab-3', name: 'Regions' },
    ],
  },
  {
    id: 'dashboard-2',
    name: 'Support Operations',
    lastUpdated: '2024-01-13',
    owner: 'Sarah Chen',
    projectName: 'Support Operations',
    tabs: [
      { id: 'dash-2-tab-1', name: 'Queues' },
      { id: 'dash-2-tab-2', name: 'Agents' },
    ],
  },
  {
    id: 'dashboard-3',
    name: 'Real-time Monitoring',
    lastUpdated: '2024-01-11',
    owner: 'Michael Park',
    projectName: 'Real-time Monitoring',
    tabs: [
      { id: 'dash-3-tab-1', name: 'Live' },
      { id: 'dash-3-tab-2', name: 'SLA' },
      { id: 'dash-3-tab-3', name: 'Alerts' },
    ],
  },
  {
    id: 'dashboard-4',
    name: 'Customer Satisfaction',
    lastUpdated: '2024-01-08',
    owner: 'Emily Rodriguez',
    projectName: 'Customer Experience Hub',
    tabs: [
      { id: 'dash-4-tab-1', name: 'CSAT' },
      { id: 'dash-4-tab-2', name: 'CES' },
    ],
  },
];

// ---- Text-widget link ----
// A link attached to text: either an internal asset (report or dashboard,
// with an optional destination tab for dashboards) or an external hyperlink.
type TextLinkAssetKind = 'report' | 'dashboard';

interface TextLink {
  linkType: LinkType; // 'asset' | 'hyperlink'
  assetKind: TextLinkAssetKind | null;
  assetId: string | null;
  assetName: string | null;
  tabId: string | null;
  tabName: string | null;
  url: string;
  passState: LinkState; // state carried through an asset link
}

function createDefaultTextLink(): TextLink {
  return {
    linkType: 'asset',
    assetKind: null,
    assetId: null,
    assetName: null,
    tabId: null,
    tabName: null,
    url: '',
    passState: 'none',
  };
}

// ---- Link widget ----
// State that a link can carry through to its destination
const LINK_STATE_OPTIONS: { value: LinkState; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: "Don't pass any state" },
  { value: 'filters', label: 'Filters', description: 'Pass the current dashboard filters' },
  { value: 'cross-filters', label: 'Cross-filters', description: 'Pass interactive cross-filter selections' },
  { value: 'all', label: 'All', description: 'Pass filters and cross-filters' },
];

const LINK_FONT_STYLES = ['Default', 'Inter', 'Georgia', 'Courier New', 'Arial'];
const LINK_FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

// Default content for a freshly created link widget
function createDefaultLinkContent(): LinkContent {
  return {
    label: '',
    linkType: 'asset',
    assetId: null,
    assetName: null,
    url: '',
    openInTab: 'current',
    passState: 'none',
    format: {
      fontStyle: 'Default',
      fontSize: 16,
      color: '#1f73b7',
      highlight: 'transparent',
      bold: false,
      italic: false,
      underline: true,
      align: 'left',
    },
  };
}

// ---- Following a link ----
// A link is only live when the dashboard is being read. In edit mode the link is
// content the author is working on, so it is rendered and behaves as text: the
// native right-click menu is the text one — cut, copy, paste, select — rather
// than the browser's link menu, and a click selects rather than navigates. An
// author who wants the destination has the link editor for it.
//
// A URL typed without a scheme is relative to the prototype's own origin, which
// would navigate out of the app rather than to the author's site.
const linkHref = (url: string) => {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

// Opens a link's destination. External URLs open for real; an internal asset is
// logged, the same stub the rest of the prototype's navigation out of the canvas
// uses — the mock library has no route back into a single report from here.
function openLinkDestination(link: {
  linkType: LinkType;
  url?: string;
  openInTab?: LinkOpenTarget;
  assetName?: string | null;
  tabName?: string | null;
  passState?: LinkState;
}) {
  if (link.linkType === 'hyperlink') {
    const href = linkHref(link.url || '');
    if (!href) return;
    // A dashboard is a place someone is working in, so a URL leaves it in a new
    // tab unless the author asked for the same one.
    if (link.openInTab === 'current') window.location.assign(href);
    else window.open(href, '_blank', 'noopener,noreferrer');
    return;
  }
  console.log('Open linked asset', {
    asset: link.assetName,
    tab: link.tabName,
    passState: link.passState,
  });
}

// ---------------------------------------------------------------------------
// Prepopulated layout for a dashboard opened from the library
// ---------------------------------------------------------------------------
// Laid out on a 12-column grid across the full canvas width so the result reads
// like a purpose-built data app rather than a scatter of widgets: each band is a
// titled section panel holding its own charts, introduced by a heading + caption
// and closed by a row of links out to related assets.
const LIB_CANVAS_W = 1627; // measured canvas width at the default viewport
const LIB_M = 24; // outer margin
const LIB_GAP = 16; // gutter between columns / rows
const LIB_COLS = 12;
const LIB_CONTENT_W = LIB_CANVAS_W - LIB_M * 2;
const LIB_COL_W = (LIB_CONTENT_W - LIB_GAP * (LIB_COLS - 1)) / LIB_COLS;

// Width/x for a span of `n` columns starting at column `c` (both 0-indexed).
const libSpan = (n: number) => Math.round(LIB_COL_W * n + LIB_GAP * (n - 1));
const libX = (c: number) => Math.round(LIB_M + (LIB_COL_W + LIB_GAP) * c);

// Headings carry their rank by size, not by weight. Semibold at these sizes
// shouts; medium reads as a heading and still lets the body text beside it stay
// legible, so `fontWeight` defaults to 500 rather than bold.
const libHeading = (
  id: string,
  text: string,
  { x, y, w, h, fontSize = 22, bold = false, fontWeight, color = '#2f3941' }:
    { x: number; y: number; w: number; h?: number; fontSize?: number; bold?: boolean; fontWeight?: number; color?: string }
): ContentItem => ({
  id,
  type: 'text',
  position: { x, y },
  size: { width: w, height: h ?? fontSize + 20 },
  // Headings sit directly on the canvas: no card chrome behind the type.
  content: {
    text,
    align: 'left',
    bold,
    fontSize,
    fontWeight,
    color,
    link: null,
    // Text boxes only honour their height once `resized` is set; anything that
    // wraps onto more than one line needs it, or the extra lines get clipped.
    style: { shadow: false, border: false, bgColor: 'transparent', resized: h !== undefined },
  },
});

// A panel that visually groups the widgets placed on top of it. Each section of
// the dashboard gets its own light tint so the bands are easy to scan; the cards
// on top stay white, which keeps every chart on a clean, readable surface.
const libPanel = (
  id: string,
  { x, y, w, h, bg = '#ffffff', border = '#e9ebed' }:
    { x: number; y: number; w: number; h: number; bg?: string; border?: string }
): ContentItem => ({
  id,
  type: 'section',
  position: { x, y },
  size: { width: w, height: h },
  content: {
    style: { shadow: false, border: true, borderColor: border, borderWidth: 1, bgColor: bg },
  },
});

const libLink = (
  id: string,
  label: string,
  { x, y, w, assetName }: { x: number; y: number; w: number; assetName: string }
): ContentItem => ({
  id,
  type: 'link',
  position: { x, y },
  size: { width: w, height: 28 },
  content: {
    ...createDefaultLinkContent(),
    label,
    linkType: 'asset',
    assetId: id,
    assetName,
    passState: 'filters',
    format: { ...createDefaultLinkContent().format, fontSize: 14 },
  },
});

// A card sitting on a tinted section panel. It has no surface or ring of its own:
// the section tint shows through, so a band reads as one area rather than as a
// tray of separate boxes. Spacing and the widget's own heading do the separating.
const libChart = (
  id: string,
  title: string,
  { x, y, w, h }: { x: number; y: number; w: number; h: number },
  content: Record<string, any>,
  { bg = 'transparent', border = false, borderColor = '#e4e6e8' }:
    { bg?: string; border?: boolean; borderColor?: string } = {}
): ContentItem => ({
  id,
  type: 'chart',
  title,
  position: { x, y },
  size: { width: w, height: h },
  content: { ...content, style: { shadow: false, border, borderColor, borderWidth: 1, bgColor: bg } },
});

// Only the executive summary carries a tint. Colouring every band turned the
// page into five competing areas and made the tint meaningless as a signal; with
// one blue band the summary reads as the thing to look at first and everything
// below it is plain reporting surface. The accents stay defined per section so a
// band can still borrow its own hue for a heading or label if it needs one.
const SO_PANEL_WHITE = { bg: '#ffffff', border: '#e9ebed' };
const SO_SECTIONS = {
  summary: { bg: '#f4f7fb', border: '#dbe6f3', accent: '#1f4f8f' },
  demand: { ...SO_PANEL_WHITE, accent: '#5b4bc4' },
  service: { ...SO_PANEL_WHITE, accent: '#a8641b' },
  experience: { ...SO_PANEL_WHITE, accent: '#12775b' },
  teams: { ...SO_PANEL_WHITE, accent: '#3f4a7e' },
};

// Vertical rhythm between bands. Tight, because the panels now carry their own
// edges: with white sections a wide gap read as five loose sheets rather than one
// document, and each panel's own bottom padding already gives its content room.
const SO_SECTION_GAP = 16;
const SO_PAD = 24; // inset from a section panel's edge to the cards on it
// Space below the last card in a section, before the panel's bottom edge. Larger
// than the top inset so each band has visible room to breathe under its content.
const SO_PAD_BOTTOM = 40;
// Heading block that sits inside a section panel: title, blurb, and the gap down
// to the first card.
const SO_HEADER_H = 82;

// Cards sit directly on the section tint rather than on their own white surface,
// so a section reads as one area instead of a tray of boxes.
const SO_CARD_CHROME = { bg: 'transparent', border: false } as const;

// The dark band the dashboard opens on. Its copy is white, so it is kept apart
// from the section tints below it.
const SO_HERO_BG = '#284173';
const SO_HERO_TEXT = '#ffffff';
const SO_HERO_TEXT_MUTED = '#dfe7f4';
// The hero headline runs light rather than medium — see so-hero-title.
const SO_HERO_TITLE_WEIGHT = 300;
// The hero breathes far more than the sections below it: 50px on top of the
// standard inset, above the first line and below the last, so the opening band
// reads as a title page rather than as another panel.
const SO_HERO_EXTRA_PAD = 50;
const SO_HERO_PAD_Y = SO_PAD + SO_HERO_EXTRA_PAD;

// Cards live inside a section panel, inset from its edges, so they run on their
// own 12-column grid measured from the panel's inner width rather than the page.
const SO_INNER_W = libSpan(12) - SO_PAD * 2;
const SO_INNER_COL = (SO_INNER_W - LIB_GAP * (LIB_COLS - 1)) / LIB_COLS;
const soIn = (n: number) => Math.round(SO_INNER_COL * n + LIB_GAP * (n - 1));
const soInX = (c: number) => Math.round(libX(0) + SO_PAD + (SO_INNER_COL + LIB_GAP) * c);

// A section: one tinted panel that carries its own heading and every card in it,
// so the title reads as part of the section rather than floating above it.
function soSection(
  key: string,
  { y, title, blurb, bg, border, bodyH }:
    { y: number; title: string; blurb: string; bg: string; border: string; bodyH: number }
): { items: ContentItem[]; bodyY: number; height: number } {
  const height = SO_PAD + SO_HEADER_H + bodyH + SO_PAD_BOTTOM;
  return {
    items: [
      libPanel(`so-${key}-panel`, { x: libX(0), y, w: libSpan(12), h: height, bg, border }),
      libHeading(`so-${key}-title`, title, {
        x: libX(0) + SO_PAD,
        y: y + SO_PAD,
        w: libSpan(9),
        fontSize: 20,
        fontWeight: 500,
        color: '#1f2933',
      }),
      libHeading(`so-${key}-blurb`, blurb, {
        x: libX(0) + SO_PAD,
        y: y + SO_PAD + 34,
        w: libSpan(10),
        h: 26,
        fontSize: 14,
        bold: false,
        color: '#68737d',
      }),
    ],
    bodyY: y + SO_PAD + SO_HEADER_H,
    height,
  };
}

// ---------------------------------------------------------------------------
// The support ticket dashboard the prototype opens on
// ---------------------------------------------------------------------------
// Two tabs, because the eight reports answer two different questions and a reader
// arrives with one of them: "how much came in and how fast did we clear it" and
// "how did it land, and who carried it". As one tab it was four bands deep, so
// half of it was below the fold and the tab strip was doing nothing.
//
// Each tab opens on its own title and description, so a tab read on its own says
// what it is rather than depending on the strip above it. The dashboard-level
// framing — the previous quarter's summary and the AI summary of the whole
// thing — sits on the first tab, where a reader lands.
//
// Unlike the service review it sits directly on the canvas, with no tinted
// section panels: the headings are plain text on the grey, and each report
// carries its own white card. That is the chrome a report gets when a reader adds
// one themselves, so what opens looks like something they could have built rather
// than a bespoke page.
const DEFAULT_DASHBOARD_HEADLINE = 'Customer support performance';
const DEFAULT_DASHBOARD_HEADLINE_SIZE = 24;
// A report on the bare canvas needs a surface of its own; on a tinted band it
// doesn't (SO_CARD_CHROME).
const ST_CARD = { bg: '#ffffff', border: true, borderColor: '#e9ebed' };
// Each widget type puts its own padding before its first glyph: a text widget's
// textarea is px-3 inside a 1px transparent border, a link's row is px-1, and a
// report's title sits inside p-3 plus pl-3, inside the card's 1px stroke.
// Positions are boxes, so placing the boxes on one column would leave the words
// in three. These offsets position the boxes so the *words* land where they are
// wanted.
//
// The numbers are the rendered pixels, not the Tailwind steps: the app's root
// font size is 14px, so a `3` step is 10.5px and a `1` step is 3.5px. Rounding
// those to 12 and 6 put the words ~2px off the column they align to.
const ST_TEXT_PAD = 11.5; // 1px border + px-3
const ST_LINK_PAD = 3.5; // px-1
const ST_CARD_TITLE_PAD = 22; // 1px stroke + p-3 + pl-3
// Text inside the lead panel: the panel's own left inset, which is the same
// measure a card gives its title, so the framing block and the reports below it
// read as one indent.
const ST_TEXT_X = libX(0) + ST_CARD_TITLE_PAD - ST_TEXT_PAD;
const ST_LINK_X = libX(0) + ST_CARD_TITLE_PAD - ST_LINK_PAD;
// A band heading sits on the bare canvas rather than inside a panel, so it lines
// up with the left edge of the cards under it, not with their titles. It is the
// label of the band, so it starts where the band starts; indenting it to the
// titles' column would leave the whole band hanging off a line nothing draws.
const ST_BAND_TEXT_X = libX(0) - ST_TEXT_PAD;
// Charts and the two ranked tables all read comfortably at one height, so every
// band runs the same depth and the page keeps a single horizontal rhythm.
const ST_ROW_H = 340;
// The exception, and it earns it: the live band is one series across the full 12
// columns, so at 340px it would be a field of empty chart. Shallow and wide also
// keeps it from reading as the first of the analytical rows below it — it is a
// status strip, not a figure to study.
const ST_LIVE_ROW_H = 220;
// Between blocks inside the lead panel — the description and the AI summary.
const ST_BAND_GAP = 32;
// A band heading sits in an equal measure of space: the same air above the words
// as below them, so the heading reads as the label of the band it opens rather
// than as a line pushed up against its first report.
//
// The gaps are measured from the *words*, not from the text widget's box, which
// is why they are built from the textarea's own inset (its 1px transparent
// border plus py-2, 8px at the app's 14px root) and its line box (18px at
// leading-snug, 24.75px). Positioning the box on the gap directly would put 8px
// more air above the words than below them.
const ST_HEADING_SPACE = 32; // visible air above and below a band heading
const ST_HEADING_INSET_Y = 8; // box top → first line box
const ST_HEADING_LINE_H = 25; // 18px at leading-snug, rounded up
// Gap from the block above to the heading's box, so the words clear it by
// ST_HEADING_SPACE.
const ST_HEADING_GAP = ST_HEADING_SPACE - ST_HEADING_INSET_Y;
// The lead section: the title, the description, the link under it and the AI
// summary, inside one panel. They are the dashboard's framing — what this is, what
// it covers, and what it currently says — and everything below the panel is the
// evidence for the last of those. Four widgets loose on the canvas made that one
// argument look like four unrelated things stacked at the top; a panel says it
// once, with an edge.
//
// A white surface behind the default grey stroke — the same chrome every report
// card on the canvas wears (ST_CARD). The panel's job is to draw the boundary of
// the block, and it does that with an edge; a tint or a coloured stroke on top of
// that would make the framing the loudest thing on a page whose point is the
// reports. White also means the AI summary, which sits on this panel with no
// surface of its own, reads on the same background it was designed against.
const ST_LEAD_PANEL = { bg: ST_CARD.bg, border: ST_CARD.borderColor };
// Inside the panel, above the title and below the summary. It matches the 24px the
// words are already inset from the panel's left edge, so the block sits centred in
// its own box rather than pinned to the top of it.
const ST_LEAD_PAD = 24;
// Heading box top → the top of the first report under it: the words, plus the
// same air below them as ST_HEADING_GAP leaves above them. Comfortably clears the
// box itself (~41px), so nothing collides.
const ST_HEADING_H = ST_HEADING_INSET_Y + ST_HEADING_LINE_H + ST_HEADING_SPACE;

// One report on a band: `span` is its width in columns, and reports are placed
// left to right in the order they are given.
interface StReport {
  id: string;
  title: string;
  span: number;
  content: Record<string, any>;
}

// One tab's canvas. The lead block is the same shape on both tabs — a 24px title
// and a line of description — and what follows differs: the first tab carries the
// dashboard-level framing (the previous quarter, and the AI summary of the whole
// dashboard), the second goes straight to its reports.
function createStTabItems({
  key,
  title,
  description,
  lastQuarterLink,
  aiSummary,
  bands,
}: {
  key: string;
  title: string;
  description: string;
  lastQuarterLink?: boolean;
  aiSummary?: boolean;
  bands: Array<{ key: string; title: string; reports: StReport[]; rowHeight?: number }>;
}): ContentItem[] {
  const items: ContentItem[] = [];
  let y = LIB_M;

  // The panel behind the lead block. Its height is whatever the block turns out to
  // be, so it is measured here and pushed at the end — and unshifted rather than
  // pushed, because widgets are drawn in array order and a panel added last would
  // cover the text it is supposed to sit behind.
  const leadTop = y;
  y += ST_LEAD_PAD;

  // ---- Title and context --------------------------------------------------
  // Plain text, not a link: it names what is on the canvas, and there is nothing
  // for a reader to open that this tab isn't already showing them.
  items.push(
    libHeading(`st-${key}-page-title`, title, {
      x: ST_TEXT_X,
      y,
      w: libSpan(6),
      fontSize: DEFAULT_DASHBOARD_HEADLINE_SIZE,
      // Medium rather than semibold: at 24px the size sets the hierarchy on its
      // own, the same call the section headings make.
      fontWeight: 500,
      color: '#1f2933',
    })
  );
  y += DEFAULT_DASHBOARD_HEADLINE_SIZE + 20;
  items.push(
    libHeading(`st-${key}-intro`, description, {
      x: ST_TEXT_X,
      y,
      w: libSpan(8),
      // A text widget only honours its height once it is marked resized, and
      // then it honours it exactly — so this has to clear the textarea's py-2
      // as well as the line itself, or the descenders are cut off.
      h: 36,
      fontSize: 14,
      bold: false,
      color: '#68737d',
    })
  );
  y += 34;
  // The one link on the canvas, and it belongs to the description: the same
  // measures for the quarter that closed, for a reader who needs to know whether
  // what they are looking at is normal. A text widget's link styles the whole
  // block, so this is its own link widget on the line below rather than a word
  // inside the sentence — and it sits at the description's 14px, not the link
  // widget's default 16px, so the two lines read as one block.
  //
  // It passes no state: the destination is a fixed quarter, so handing it this
  // dashboard's date range would argue with the report it opens.
  if (lastQuarterLink) {
    items.push({
      id: 'st-link-last-quarter',
      type: 'link',
      position: { x: ST_LINK_X, y },
      size: { width: libSpan(3), height: 28 },
      content: {
        ...createDefaultLinkContent(),
        label: 'Last quarter summary →',
        linkType: 'asset',
        assetId: 'st-last-quarter-asset',
        assetName: 'Executive service review — last quarter',
        passState: 'none',
        // The dashboard's own ink rather than link blue. It sits directly under
        // the description as the second line of one block, and a blue line there
        // reads as the loudest thing on the canvas above a row of KPIs — the
        // underline and the arrow already say it goes somewhere.
        format: { ...createDefaultLinkContent().format, fontSize: 14, color: '#2f3941' },
      },
    });
    y += 28;
  }

  // ---- What the reports say -----------------------------------------------
  // The summary sits directly under the description, above the reports it reads.
  // It is a reading of the whole dashboard, so it belongs on the tab a reader
  // lands on and above the evidence rather than after it — a reader who only has
  // a minute here should spend it on this.
  //
  // No heading over it: the tag in its own corner says what it is, and a line of
  // 18px text above it would name the widget twice. It runs the full 12 columns
  // like a band rather than at the widget's own default width, so its three
  // findings sit in three columns instead of a narrow stack beside dead space.
  //
  // No card of its own — no stroke and no fill. It is inside the lead panel with
  // the title and the description, and a white box on a tinted panel would make
  // the summary a widget sitting on the section rather than the section's last
  // paragraph. Its finding cards keep their own strokes, which is where the edges
  // belong: on the three things a reader compares.
  if (aiSummary) {
    y += ST_BAND_GAP;
    items.push(
      libChart(
        'st-summary-ai',
        'AI summary',
        { x: libX(0), y, w: libSpan(12), h: AI_SUMMARY_BAND_HEIGHT },
        createSupportTicketsAiSummary()
      )
    );
    y += AI_SUMMARY_BAND_HEIGHT;
  }

  // The panel, sized to the block it holds and drawn under it.
  y += ST_LEAD_PAD;
  items.unshift(
    libPanel(`st-${key}-lead`, {
      x: libX(0),
      y: leadTop,
      w: libSpan(12),
      h: y - leadTop,
      bg: ST_LEAD_PANEL.bg,
      border: ST_LEAD_PANEL.border,
    })
  );

  // One band: a heading on the bare canvas, then its reports laid side by side
  // across the 12-column grid.
  bands.forEach((b) => {
    y += ST_HEADING_GAP;
    items.push(
      libHeading(`st-${b.key}-title`, b.title, {
        x: ST_BAND_TEXT_X,
        y,
        w: libSpan(6),
        fontSize: 18,
        fontWeight: 500,
        color: '#1f2933',
      })
    );
    y += ST_HEADING_H;
    // One height for the whole band, so its cards sit on a common baseline; a band
    // states its own only where the shape of its content asks for it.
    const rowH = b.rowHeight ?? ST_ROW_H;
    let col = 0;
    b.reports.forEach((r) => {
      items.push(
        libChart(r.id, r.title, { x: libX(col), y, w: libSpan(r.span), h: rowH }, r.content, ST_CARD)
      );
      col += r.span;
    });
    y += rowH;
  });

  // A tab ends on its last band. The links that used to close the dashboard are
  // gone: the only one left is the previous quarter's summary under the first
  // tab's description, where a reader is oriented rather than on their way out.
  return items;
}

// ---- Right now ----------------------------------------------------------
// The tab's one live report, and the reason it leads: a reader opening this
// dashboard mid-shift wants to know what is happening now before they read what
// happened over the period. Everything below this band is the period; this band is
// the minute they are in, so it sits above the historical rows rather than after
// them, where a live figure would read as an afterthought.
//
// One report, full width. A second live figure would turn a status strip into
// another band to study, which is what the rows below are for.
const ST_LIVE_BAND = {
  key: 'live',
  title: 'Right now',
  rowHeight: ST_LIVE_ROW_H,
  reports: [
    {
      id: 'st-live-queue',
      title: 'Tickets waiting now',
      span: 12,
      content: {
        chartType: 'so-live-queue',
        reportSource: 'Real-time Monitoring',
        reportType: 'Operations',
        // No dataset stated: a live report is fed by the monitoring stream rather
        // than a stored dataset, and liveData already makes its menu name that
        // stream. Naming a warehouse table here would contradict it.
        description:
          'Tickets still waiting for a first reply, sampled every five minutes over the last hour.',
        // The one flag that makes this a live report rather than another period
        // read: it draws the live mark beside the title, names the feed in the
        // report's menu, and drops the historical cadence and timestamp from it.
        liveData: true,
        lastRefreshed: '10:42 AM',
        // The y-axis doesn't start at zero, which is a choice a reader is entitled
        // to know about — the shape of the hour depends on it.
        infoNote:
          'The queue never empties, so the axis starts at 100 rather than 0 to keep the hour’s movement visible.',
      },
    },
  ],
};

// ---- Demand -------------------------------------------------------------
// What arrived, and what it was about: the wide trend first, then the
// proportional view that explains its composition.
const ST_DEMAND_BAND = {
  key: 'demand',
  title: 'Ticket demand',
  reports: [
    {
      id: 'st-volume',
      title: 'Ticket volume by channel, by week',
      span: 8,
      content: {
        chartType: 'so-stacked-bar',
        reportSource: 'Channel Performance Overview',
        reportType: 'Performance',
        dataset: 'Support tickets',
        description: 'Weekly inbound tickets, stacked by channel. Social, web form and voice callback are grouped as Other.',
        // The Other band is the part a reader can't take at face value — nothing
        // in the chart says which channels it holds.
        infoNote: 'Social, web form and voice callback are grouped as Other.',
      },
    },
    {
      id: 'st-reasons',
      title: 'Share of tickets by reason',
      span: 4,
      content: {
        chartType: 'so-donut',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        dataset: 'Support tickets',
        description: 'Tickets grouped by primary reason code for the reporting period.',
      },
    },
  ],
};

// ---- Speed and SLA ------------------------------------------------------
const ST_SPEED_BAND = {
  key: 'speed',
  title: 'Speed and SLA',
  reports: [
    {
      id: 'st-response',
      title: 'First reply and full resolution time',
      span: 7,
      content: {
        chartType: 'so-responsiveness',
        reportSource: 'Response Time Monitoring',
        reportType: 'KPI',
        dataset: 'Support tickets',
        description: 'Median hours to first reply and to full resolution. Both measures share one axis because both are hours.',
      },
    },
    {
      id: 'st-sla-priority',
      title: 'SLA attainment by priority',
      span: 5,
      content: {
        chartType: 'so-sla-priority',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        dataset: 'SLA policies',
        description: 'Share of tickets resolved inside their SLA target, split by priority, against the 90% commitment.',
        // The reference line is unlabelled in the chart, and each priority is
        // measured against its own target rather than a shared clock.
        infoNote:
          'Each priority is measured against its own SLA target. The dashed line is the 90% commitment.',
      },
    },
  ],
};

// ---- Satisfaction and quality -------------------------------------------
// The trend answers "is it getting better?"; the table beside it answers
// "where isn't it?", so the two are read together.
const ST_QUALITY_BAND = {
  key: 'quality',
  title: 'Satisfaction and quality',
  reports: [
    {
      id: 'st-csat',
      title: 'Satisfaction trend',
      span: 5,
      content: {
        chartType: 'so-csat-trend',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        dataset: 'Satisfaction ratings',
        description: 'Weekly share of rated tickets marked good.',
      },
    },
    {
      id: 'st-issues',
      title: 'Top ticket drivers',
      span: 7,
      content: {
        chartType: 'so-table-issues',
        reportSource: 'Customer Support Analytics',
        reportType: 'Support',
        dataset: 'Support tickets',
        description: 'Ranked ticket drivers with period-over-period change and the satisfaction score each one carries.',
      },
    },
  ],
};

// ---- Team load ----------------------------------------------------------
const ST_TEAMS_BAND = {
  key: 'teams',
  title: 'Team load',
  reports: [
    // Both reports in this band name the same teams: the chart ranks them by
    // output, the table beside it says what that output is costing.
    {
      id: 'st-team-volume',
      title: 'Tickets solved by team',
      span: 6,
      content: {
        chartType: 'so-team-volume',
        reportSource: 'Team Productivity Metrics',
        reportType: 'Performance',
        dataset: 'Agent activity',
        description: 'Solved ticket count per team for the reporting period.',
      },
    },
    {
      id: 'st-teams-attention',
      title: 'Teams needing attention',
      span: 6,
      content: {
        chartType: 'so-table-teams',
        reportSource: 'Agent Utilization Report',
        reportType: 'Performance',
        dataset: 'Agent activity',
        description: 'SLA attainment, open backlog and occupancy per team, ordered by risk.',
        // Rows aren't sorted by any column shown, so the order needs explaining.
        infoNote:
          'Ordered by risk: SLA attainment first, then backlog against the team’s own occupancy.',
      },
    },
  ],
};

// The two tabs, in the order a reader works through them: what came in and how
// fast it was cleared, then how it landed and who carried it.
//
// The names say what is on each tab rather than numbering it. "Tab 1" and "Tab 2"
// make a reader open both to find out which one they wanted, which is the one
// thing a tab strip exists to save them.
function createDefaultDashboardTabs(): DashboardTab[] {
  return [
    {
      id: 'tab-1',
      name: 'Demand and speed',
      contentItems: createStTabItems({
        key: 'load',
        title: DEFAULT_DASHBOARD_HEADLINE,
        // No period stated in the copy, and nothing about the filters: the filter
        // bar sits directly above the canvas and shows its own state, so a
        // sentence describing it is a caption on a control a reader can see —
        // and the date half of it goes stale the moment they change the range.
        // The description says what the dashboard is about and stops there.
        description:
          'Inbound ticket volume, the reasons behind it, and how quickly tickets were answered and resolved.',
        lastQuarterLink: true,
        aiSummary: true,
        bands: [ST_LIVE_BAND, ST_DEMAND_BAND, ST_SPEED_BAND],
      }),
    },
    {
      id: 'tab-2',
      name: 'Satisfaction and teams',
      contentItems: createStTabItems({
        key: 'outcomes',
        // Its own title rather than the dashboard's: two tabs headed by the same
        // words would leave a reader checking the strip to know where they are.
        title: 'Satisfaction and team load',
        description:
          'Customer satisfaction outcomes, the ticket drivers behind them, and how the workload was distributed across teams.',
        bands: [ST_QUALITY_BAND, ST_TEAMS_BAND],
      }),
    },
  ];
}

function createLibraryDashboardItems(): ContentItem[] {
  const items: ContentItem[] = [];
  let y = LIB_M;

  // ---- Hero ---------------------------------------------------------------
  // Full-width dark band: headline, reporting period, and a short intro, all in
  // white. The global filter bar lives in the toolbar above the canvas, so it
  // isn't duplicated here — one filter row scopes everything below it.
  const heroH = 182 + SO_HERO_EXTRA_PAD * 2;
  items.push(
    libPanel('so-hero-panel', {
      x: libX(0),
      y,
      w: libSpan(12),
      h: heroH,
      bg: SO_HERO_BG,
      border: SO_HERO_BG,
    })
  );
  items.push(
    libHeading('so-hero-eyebrow', 'Executive service review · Q3 2026', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_HERO_PAD_Y + 4,
      w: libSpan(6),
      fontSize: 14,
      fontWeight: 500,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  items.push(
    libHeading('so-hero-title', 'Support is getting faster while demand shifts to chat', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_HERO_PAD_Y + 28,
      w: libSpan(8),
      fontSize: 32,
      // Light, not medium: at 32px on a dark band the size alone establishes the
      // hierarchy, and the thinner stroke keeps a full sentence readable instead
      // of shouting it.
      fontWeight: SO_HERO_TITLE_WEIGHT,
      color: SO_HERO_TEXT,
    })
  );
  items.push(
    libHeading(
      'so-hero-intro',
      'Weeks 27–32 (6 Jul – 16 Aug 2026) across all channels, brands and regions. Resolution time and satisfaction both improved; urgent-priority SLA and the Escalations queue are the two areas that need a decision this quarter.',
      {
        x: libX(0) + SO_PAD + 8,
        y: y + SO_HERO_PAD_Y + 80,
        w: libSpan(8),
        h: 68, // two wrapped lines — without an explicit height the copy is clipped
        fontSize: 15,
        bold: false,
        color: SO_HERO_TEXT_MUTED,
      }
    )
  );
  items.push(
    libHeading('so-hero-meta', 'Reporting period\nWk 27 – Wk 32 2026\n\nCompared with\nWk 21 – Wk 26 2026', {
      x: libX(9),
      y: y + SO_HERO_PAD_Y + 20,
      w: libSpan(3) - SO_PAD - 8,
      h: 118, // five lines of period metadata
      fontSize: 14,
      bold: false,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  y += heroH + SO_SECTION_GAP;

  // ---- Executive summary: KPI band + AI summary ----------------------------
  // Three KPIs rather than a wall of them, so the band stays readable, then the
  // AI summary across the full width beneath them.
  //
  // The summary is the real widget, not a card written to look like one: it is
  // the same component the builder's AI summary tool inserts, reading the same
  // content shape, so the mock shows what the feature actually does — sourced
  // claims that open their report, ranked findings, and hand-offs into copilot.
  // A prebuilt dashboard that faked it would be demonstrating a screenshot.
  //
  // It sits under the KPIs rather than beside them for the reason the widget's
  // own default width says: three findings need three columns, and a quarter of
  // the band gives it one narrow column with the evidence wrapping every second
  // word.
  const kpiH = 226;
  const summary = soSection('summary', {
    y,
    title: 'Executive summary',
    blurb: 'The three measures leadership commits to externally, and what changed behind them.',
    bg: SO_SECTIONS.summary.bg,
    border: SO_SECTIONS.summary.border,
    bodyH: kpiH + LIB_GAP + AI_SUMMARY_BAND_HEIGHT,
  });
  items.push(...summary.items);
  const summaryY = summary.bodyY;

  const kpis: Array<[string, string, Record<string, any>]> = [
    [
      'so-kpi-solved',
      'Tickets solved',
      {
        chartType: 'so-kpi',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Tickets moved to solved within the reporting period, all channels.',
        value: '12,480',
        change: 8.1,
        sparkId: 'solved',
        accent: '#2a78d6',
        spark: [1780, 1910, 2020, 2140, 2210, 2420],
        note: 'Volume rose while headcount held flat.',
      },
    ],
    [
      'so-kpi-resolution',
      'Median full resolution',
      {
        chartType: 'so-kpi',
        reportSource: 'Resolution Time Analysis',
        reportType: 'KPI',
        description: 'Median time from ticket creation to solved, business hours only.',
        value: '5.8 h',
        change: -36.3,
        lowerIsBetter: true,
        sparkId: 'resolution',
        accent: '#1baf7a',
        spark: [9.1, 8.6, 8.0, 7.2, 6.4, 5.8],
        note: 'Fastest since tracking began in 2024.',
      },
    ],
    [
      'so-kpi-csat',
      'Customer satisfaction',
      {
        chartType: 'so-kpi',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        description: 'Share of rated tickets marked good, across all channels.',
        value: '94.2%',
        change: 3.8,
        changeSuffix: ' pts',
        sparkId: 'csat',
        accent: '#eb6834',
        spark: [90.4, 91.1, 91.8, 92.6, 93.5, 94.2],
        note: 'Above the 92% annual goal for three weeks.',
      },
    ],
  ];
  // Four columns each now that the summary has moved below them: three KPIs
  // across nine columns left a quarter of the band empty.
  kpis.forEach(([id, title, content], i) => {
    items.push(
      libChart(id, title, { x: soInX(i * 4), y: summaryY, w: soIn(4), h: kpiH }, content)
    );
  });
  items.push(
    // No surface and no border of its own: the summary sits on the section band
    // like every other widget in this layout (SO_CARD_CHROME). Its finding cards
    // already carry their own edges, so the widget reads as a group of cards on the
    // band rather than needing a box drawn around the group.
    libChart(
      'so-summary-ai',
      'AI summary',
      {
        x: soInX(0),
        y: summaryY + kpiH + LIB_GAP,
        w: soIn(12),
        h: AI_SUMMARY_BAND_HEIGHT,
      },
      createServiceReviewAiSummary(),
      SO_CARD_CHROME
    )
  );
  y += summary.height + SO_SECTION_GAP;

  // ---- Demand & contact drivers ------------------------------------------
  // Wide composition chart paired with a smaller proportional view.
  const demandH = 356;
  const demand = soSection('demand', {
    y,
    title: 'Demand and contact drivers',
    blurb: 'Where contacts arrive from and what customers are contacting us about — the input side of the queue.',
    bg: SO_SECTIONS.demand.bg,
    border: SO_SECTIONS.demand.border,
    bodyH: demandH,
  });
  items.push(...demand.items);
  items.push(
    libChart(
      'so-demand-channels',
      'Contact volume by channel, by week',
      { x: soInX(0), y: demand.bodyY, w: soIn(8), h: demandH },
      {
        chartType: 'so-stacked-bar',
        reportSource: 'Channel Performance Overview',
        reportType: 'Performance',
        description: 'Weekly inbound contacts, stacked by channel. Social, web form and voice callback are grouped as Other.',
      }
    )
  );
  items.push(
    libChart(
      'so-demand-reasons',
      'Share of contacts by reason',
      { x: soInX(8), y: demand.bodyY, w: soIn(4), h: demandH },
      {
        chartType: 'so-donut',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Contacts grouped by primary reason code for the reporting period.',
      }
    )
  );
  y += demand.height + SO_SECTION_GAP;

  // ---- Service efficiency & SLA ------------------------------------------
  // Two comparison charts side by side. The Risk / Opportunity callout row that
  // used to close this band is gone: it said what the AI summary's first and third
  // findings now say, in the same words and with the same numbers, so the
  // dashboard was making its two most important points twice — and the summary is
  // the version that carries its sources and its next steps.
  const serviceChartH = 330;
  const service = soSection('service', {
    y,
    title: 'Service efficiency and SLA',
    blurb: 'How quickly we respond and resolve, and whether we are keeping the commitments we sold.',
    bg: SO_SECTIONS.service.bg,
    border: SO_SECTIONS.service.border,
    bodyH: serviceChartH,
  });
  items.push(...service.items);
  items.push(
    libChart(
      'so-service-response',
      'First reply and full resolution time',
      { x: soInX(0), y: service.bodyY, w: soIn(7), h: serviceChartH },
      {
        chartType: 'so-responsiveness',
        reportSource: 'Response Time Monitoring',
        reportType: 'KPI',
        description: 'Median hours to first reply and to full resolution. Both measures share one axis because both are hours.',
      }
    )
  );
  items.push(
    libChart(
      'so-service-sla',
      'SLA attainment by priority',
      { x: soInX(7), y: service.bodyY, w: soIn(5), h: serviceChartH },
      {
        chartType: 'so-sla-priority',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        description: 'Share of tickets resolved inside their SLA target, split by priority, against the 90% commitment.',
      }
    )
  );
  y += service.height + SO_SECTION_GAP;

  // ---- Customer experience & quality -------------------------------------
  // A trend chart next to a ranked detail table.
  const cxH = 340;
  const cx = soSection('experience', {
    y,
    title: 'Customer experience and quality',
    blurb: 'Whether faster service is also better service, and which issues cost customers the most effort.',
    bg: SO_SECTIONS.experience.bg,
    border: SO_SECTIONS.experience.border,
    bodyH: cxH,
  });
  items.push(...cx.items);
  items.push(
    libChart(
      'so-cx-csat',
      'Satisfaction trend',
      { x: soInX(0), y: cx.bodyY, w: soIn(5), h: cxH },
      {
        chartType: 'so-csat-trend',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        description: 'Weekly share of rated tickets marked good.',
      }
    )
  );
  items.push(
    libChart(
      'so-cx-issues',
      'Top customer issues by volume',
      { x: soInX(5), y: cx.bodyY, w: soIn(7), h: cxH },
      {
        chartType: 'so-table-issues',
        reportSource: 'Customer Support Analytics',
        reportType: 'Support',
        description: 'Ranked customer issues with period-over-period change and the satisfaction score they carry.',
      }
    )
  );
  y += cx.height + SO_SECTION_GAP;

  // ---- Team performance & capacity ---------------------------------------
  const teamH = 336;
  const teams = soSection('teams', {
    y,
    title: 'Team performance and capacity',
    blurb: 'Who is carrying the load and which teams have no headroom left if volume keeps climbing.',
    bg: SO_SECTIONS.teams.bg,
    border: SO_SECTIONS.teams.border,
    bodyH: teamH,
  });
  items.push(...teams.items);
  items.push(
    libChart(
      'so-teams-volume',
      'Tickets solved by team',
      { x: soInX(0), y: teams.bodyY, w: soIn(6), h: teamH },
      {
        chartType: 'so-team-volume',
        reportSource: 'Team Productivity Metrics',
        reportType: 'Performance',
        description: 'Solved ticket count per team for the reporting period.',
      }
    )
  );
  items.push(
    libChart(
      'so-teams-attention',
      'Teams needing attention',
      { x: soInX(6), y: teams.bodyY, w: soIn(6), h: teamH },
      {
        chartType: 'so-table-teams',
        reportSource: 'Agent Utilization Report',
        reportType: 'Performance',
        description: 'SLA attainment, open backlog and occupancy per team, ordered by risk.',
      }
    )
  );
  y += teams.height + 28;

  // ---- Footer: dig-deeper links ------------------------------------------
  items.push({
    id: 'so-rule-footer',
    type: 'separator',
    position: { x: libX(0), y },
    size: { width: libSpan(12), height: 12 },
    content: { style: { borderWidth: 1, borderColor: '#e4e6e8' } },
  });
  y += 20;
  items.push(
    libHeading('so-h-more', 'Dig deeper', { x: libX(0), y, w: libSpan(4), fontSize: 16, fontWeight: 500, color: '#68737d' })
  );
  y += 28;
  const links: Array<[string, string, string]> = [
    ['so-link-1', 'SLA compliance report →', 'SLA Compliance Report'],
    ['so-link-2', 'Escalation trends →', 'Escalation Trends'],
    ['so-link-3', 'Backlog analysis →', 'Backlog Analysis'],
    ['so-link-4', 'Agent utilization →', 'Agent Utilization Report'],
  ];
  links.forEach(([id, label, assetName], i) => {
    items.push(libLink(id, label, { x: libX(i * 3), y, w: libSpan(3), assetName }));
  });

  return items;
}

// ---------------------------------------------------------------------------
// Prepopulated layout for the support operations monitoring dashboard
// ---------------------------------------------------------------------------
// This used to be a hand-built page of its own. It is a dashboard, so it is
// authored as dashboard content and opened in the builder like any other — which
// means it inherits tabs, edit mode, saved views, sharing and, crucially, the
// one global filter bar in the toolbar. The page's own row of filter chips is
// gone: duplicating filters inside the canvas gave two sources of truth for the
// same scope.
// Same rule as the service review: the executive summary is the one tinted band,
// every other section sits on white. See SO_SECTIONS.
const MON_SECTIONS = {
  exec: { bg: '#f4f8fc', border: '#c8dcec', accent: '#144a75' },
  demand: { ...SO_PANEL_WHITE, accent: '#5f4fd1' },
  sla: { ...SO_PANEL_WHITE, accent: '#ad5918' },
  cx: { ...SO_PANEL_WHITE, accent: '#0b7d6e' },
  team: { ...SO_PANEL_WHITE, accent: '#3d4fa1' },
  risk: { ...SO_PANEL_WHITE, accent: '#a3232b' },
};

function createMonitoringDashboardItems(): ContentItem[] {
  const items: ContentItem[] = [];
  let y = LIB_M;

  // ---- Hero ---------------------------------------------------------------
  // The lede: what the period says in one sentence, so the rest of the
  // dashboard is read as evidence for it rather than as a pile of charts.
  const heroH = 184 + SO_HERO_EXTRA_PAD * 2;
  items.push(
    libPanel('mon-hero-panel', {
      x: libX(0),
      y,
      w: libSpan(12),
      h: heroH,
      bg: SO_HERO_BG,
      border: SO_HERO_BG,
    })
  );
  items.push(
    libHeading('mon-hero-eyebrow', 'Live · updated 2 minutes ago', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_HERO_PAD_Y + 4,
      w: libSpan(6),
      fontSize: 14,
      fontWeight: 500,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  items.push(
    libHeading('mon-hero-title', 'Support operations, at a glance', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_HERO_PAD_Y + 28,
      w: libSpan(8),
      fontSize: 32,
      fontWeight: SO_HERO_TITLE_WEIGHT,
      color: SO_HERO_TEXT,
    })
  );
  items.push(
    libHeading(
      'mon-hero-intro',
      'Demand is running 18% above forecast, driven almost entirely by billing contacts. Response SLA is holding, but resolution SLA has slipped for five consecutive weeks and needs a capacity decision this week. CSAT and AI containment both continue to improve.',
      {
        x: libX(0) + SO_PAD + 8,
        y: y + SO_HERO_PAD_Y + 80,
        w: libSpan(8),
        h: 70, // two wrapped lines — text boxes clip without an explicit height
        fontSize: 15,
        bold: false,
        color: SO_HERO_TEXT_MUTED,
      }
    )
  );
  items.push(
    libHeading('mon-hero-meta', 'Reporting period\n1 – 31 July 2026\n\nCompared with\n1 – 30 June 2026', {
      x: libX(9),
      y: y + SO_HERO_PAD_Y + 20,
      w: libSpan(3) - SO_PAD - 8,
      h: 118,
      fontSize: 14,
      bold: false,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  y += heroH + SO_SECTION_GAP;

  // ---- Executive summary --------------------------------------------------
  // Four headline numbers, then the demand-vs-plan chart that explains them, then
  // the AI summary reading the whole band.
  //
  // The summary here is the real widget — the same component the builder's AI
  // summary tool inserts. It replaces the card that used to sit beside the volume
  // chart wearing the same title: a mock of a summary can't show the sourced
  // claims or the copilot hand-offs, which are most of what the widget is.
  // Full width, because that is where three findings get three columns.
  const kpiH = 200;
  const execRowH = 318;
  const exec = soSection('mon-exec', {
    y,
    title: 'Executive summary',
    blurb: 'The four numbers leaders are asking about. Resolution SLA is the one exception this month — everything else is on or ahead of target.',
    bg: MON_SECTIONS.exec.bg,
    border: MON_SECTIONS.exec.border,
    bodyH: kpiH + LIB_GAP + execRowH + LIB_GAP + AI_SUMMARY_BAND_HEIGHT,
  });
  items.push(...exec.items);

  const kpis: Array<[string, string, Record<string, any>]> = [
    [
      'mon-kpi-solved',
      'Tickets solved',
      {
        chartType: 'mon-kpi',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Tickets moved to solved in the reporting period, all channels.',
        value: '12,480',
        change: 8.1,
        note: 'Volume rose while headcount held flat.',
      },
    ],
    [
      'mon-kpi-sla',
      'Resolution SLA met',
      {
        chartType: 'mon-kpi',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        description: 'Share of tickets resolved inside their SLA target, against the 90% commitment.',
        value: '81',
        unit: '%',
        change: -9,
        changeSuffix: ' pts',
        // The one number that is off target, so it carries a status pill — the
        // word does the work, the colour only reinforces it.
        state: 'critical',
        note: 'Target 90% · declining for five weeks.',
      },
    ],
    [
      'mon-kpi-csat',
      'Customer satisfaction',
      {
        chartType: 'mon-kpi',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        description: 'Share of rated tickets marked good, all channels.',
        value: '94.6',
        unit: '%',
        change: 1.5,
        changeSuffix: ' pts',
        note: 'Above the 92% target all month.',
      },
    ],
    [
      'mon-kpi-ai',
      'AI containment',
      {
        chartType: 'mon-kpi',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Conversations resolved by the AI agent with no agent involvement.',
        value: '34',
        unit: '%',
        change: 4,
        changeSuffix: ' pts',
        note: '4,240 conversations contained.',
      },
    ],
  ];
  kpis.forEach(([id, title, content], i) => {
    items.push(libChart(id, title, { x: soInX(i * 3), y: exec.bodyY, w: soIn(3), h: kpiH }, content));
  });
  const execRowY = exec.bodyY + kpiH + LIB_GAP;

  items.push(
    libChart(
      'mon-exec-volume',
      'Ticket volume vs. forecast',
      { x: soInX(0), y: execRowY, w: soIn(12), h: execRowH },
      {
        chartType: 'mon-volume-forecast',
        reportSource: 'Real-time Monitoring',
        reportType: 'Monitoring',
        description: 'Contacts received per hour against the staffing forecast for the same hour.',
      }
    )
  );
  items.push(
    // No surface of its own, same as the service review's: the finding cards carry
    // the edges, so a box around them would be a second one.
    libChart(
      'mon-exec-ai',
      'AI summary',
      {
        x: soInX(0),
        y: execRowY + execRowH + LIB_GAP,
        w: soIn(12),
        h: AI_SUMMARY_BAND_HEIGHT,
      },
      createMonitoringAiSummary(),
      SO_CARD_CHROME
    )
  );
  y += exec.height + SO_SECTION_GAP;

  // ---- Demand and contact drivers ----------------------------------------
  // Composition over time next to the ranked list: one says which channels
  // absorbed the growth, the other says what customers were contacting about.
  const demandH = 356;
  const demand = soSection('mon-demand', {
    y,
    title: 'Demand and contact drivers',
    blurb: 'Where the volume is coming from, and what customers are actually contacting us about.',
    bg: MON_SECTIONS.demand.bg,
    border: MON_SECTIONS.demand.border,
    bodyH: demandH,
  });
  items.push(...demand.items);
  items.push(
    libChart(
      'mon-demand-channels',
      'Ticket volume by channel',
      { x: soInX(0), y: demand.bodyY, w: soIn(7), h: demandH },
      {
        chartType: 'mon-channel-mix',
        reportSource: 'Channel Performance Overview',
        reportType: 'Performance',
        description: 'Daily inbound contacts stacked by channel for the current week.',
      }
    )
  );
  items.push(
    libChart(
      'mon-demand-drivers',
      'Top contact drivers',
      { x: soInX(7), y: demand.bodyY, w: soIn(5), h: demandH },
      {
        chartType: 'mon-drivers',
        reportSource: 'Customer Support Analytics',
        reportType: 'Support',
        description: 'Ranked by volume this month, with change against the previous period.',
      }
    )
  );
  y += demand.height + SO_SECTION_GAP;

  // ---- Service efficiency and SLA ----------------------------------------
  // The breach gets called out above the charts that evidence it, so the reader
  // meets the conclusion before the detail.
  const slaCalloutH = 150;
  const slaH = 324;
  const sla = soSection('mon-sla', {
    y,
    title: 'Service efficiency and SLA',
    blurb: 'Response is holding; resolution is not. Added volume is being absorbed in resolution time, and that is where the target is missed.',
    bg: MON_SECTIONS.sla.bg,
    border: MON_SECTIONS.sla.border,
    bodyH: slaCalloutH + LIB_GAP + slaH,
  });
  items.push(...sla.items);
  items.push(
    libChart(
      'mon-sla-callout',
      'Threshold breach',
      { x: soInX(0), y: sla.bodyY, w: soIn(12), h: slaCalloutH },
      {
        chartType: 'mon-callout',
        tone: 'watch',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        heading: 'Resolution SLA has been below target for five consecutive weeks',
        body:
          '81% against a 90% target, down 9 points since the start of the month. 212 of the 412 at-risk tickets sit in the Billing queue.',
      },
      SO_CARD_CHROME
    )
  );
  const slaChartY = sla.bodyY + slaCalloutH + LIB_GAP;

  items.push(
    libChart(
      'mon-sla-trend',
      'SLA attainment over time',
      { x: soInX(0), y: slaChartY, w: soIn(7), h: slaH },
      {
        chartType: 'mon-sla-trend',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        description: 'Weekly response and resolution SLA attainment. Both are percentages, so they share one axis.',
      }
    )
  );
  items.push(
    libChart(
      'mon-sla-priority',
      'SLA attainment by priority',
      { x: soInX(7), y: slaChartY, w: soIn(5), h: slaH },
      {
        chartType: 'mon-sla-priority',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        description: 'Attainment against each priority band’s own target.',
      }
    )
  );
  y += sla.height + SO_SECTION_GAP;

  // ---- Customer experience and quality -----------------------------------
  const cxH = 328;
  const cx = soSection('mon-cx', {
    y,
    title: 'Customer experience and quality',
    blurb: 'Satisfaction is improving despite the pressure — first response stayed fast and AI containment absorbed the simpler contacts.',
    bg: MON_SECTIONS.cx.bg,
    border: MON_SECTIONS.cx.border,
    bodyH: cxH,
  });
  items.push(...cx.items);
  items.push(
    libChart(
      'mon-cx-csat',
      'Satisfaction trend',
      { x: soInX(0), y: cx.bodyY, w: soIn(7), h: cxH },
      {
        chartType: 'mon-csat-trend',
        reportSource: 'Customer Satisfaction Analysis',
        reportType: 'Analytics',
        description: 'Weekly share of rated tickets marked good.',
      }
    )
  );
  items.push(
    libChart(
      'mon-cx-resolution',
      'How tickets were resolved',
      { x: soInX(7), y: cx.bodyY, w: soIn(5), h: cxH },
      {
        chartType: 'mon-resolution-mix',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        description: 'Three parts of one whole: closed by the AI agent, closed by an agent, or escalated.',
      }
    )
  );
  y += cx.height + SO_SECTION_GAP;

  // ---- Team performance and capacity -------------------------------------
  const teamH = 336;
  const teams = soSection('mon-team', {
    y,
    title: 'Team performance and capacity',
    blurb: 'One team is carrying the overload. Every other team has headroom, which makes reallocation the fastest available lever.',
    bg: MON_SECTIONS.team.bg,
    border: MON_SECTIONS.team.border,
    bodyH: teamH,
  });
  items.push(...teams.items);
  items.push(
    libChart(
      'mon-team-load',
      'Load against planned capacity',
      { x: soInX(0), y: teams.bodyY, w: soIn(5), h: teamH },
      {
        chartType: 'mon-team-load',
        reportSource: 'Agent Utilization Report',
        reportType: 'Performance',
        description: '100% is the volume each team is staffed to handle this month.',
      }
    )
  );
  items.push(
    libChart(
      'mon-team-table',
      'Teams requiring attention',
      { x: soInX(5), y: teams.bodyY, w: soIn(7), h: teamH },
      {
        chartType: 'mon-team-table',
        reportSource: 'Agent Utilization Report',
        reportType: 'Performance',
        description: 'Ranked by backlog. Status combines SLA attainment and capacity headroom.',
      }
    )
  );
  y += teams.height + SO_SECTION_GAP;

  // ---- What changed and where it lands -----------------------------------
  // The dashboard closes on a read of the period rather than on another chart.
  const insightH = 188;
  const risk = soSection('mon-risk', {
    y,
    title: 'What changed and where it lands',
    blurb: 'The movements behind the numbers above, and where the current trajectory ends up.',
    bg: MON_SECTIONS.risk.bg,
    border: MON_SECTIONS.risk.border,
    bodyH: insightH,
  });
  items.push(...risk.items);
  const insightY = risk.bodyY;

  items.push(
    libChart(
      'mon-risk-changed',
      'What changed',
      { x: soInX(0), y: insightY, w: soIn(6), h: insightH },
      {
        chartType: 'mon-narrative',
        reportSource: 'Real-time Monitoring',
        reportType: 'Monitoring',
        heading: 'Material changes this period',
        summary: 'Five movements account for everything above.',
        points: [
          'Resolution SLA −9 pts — the first breach of target this year.',
          'Billing volume +18%; AI containment +4 pts; CSAT +1.5 pts.',
          'Agent headcount unchanged.',
        ],
      },
      SO_CARD_CHROME
    )
  );
  items.push(
    libChart(
      'mon-risk-projection',
      'If nothing changes',
      { x: soInX(6), y: insightY, w: soIn(6), h: insightH },
      {
        chartType: 'mon-narrative',
        reportSource: 'Real-time Monitoring',
        reportType: 'Monitoring',
        heading: 'Projected impact by month end',
        summary: 'On the current trajectory, this period’s one miss becomes next period’s two.',
        points: [
          'Resolution SLA reaches 76%; the billing backlog grows to ~340 tickets.',
          'CSAT lags resolution by about three weeks, so the gain is at risk from mid-August.',
        ],
      },
      SO_CARD_CHROME
    )
  );
  y += risk.height + 28;

  // ---- Footer: dig-deeper links ------------------------------------------
  items.push({
    id: 'mon-rule-footer',
    type: 'separator',
    position: { x: libX(0), y },
    size: { width: libSpan(12), height: 12 },
    content: { style: { borderWidth: 1, borderColor: '#e4e6e8' } },
  });
  y += 20;
  items.push(
    libHeading('mon-h-more', 'Dig deeper', { x: libX(0), y, w: libSpan(4), fontSize: 16, fontWeight: 500, color: '#68737d' })
  );
  y += 28;
  const monLinks: Array<[string, string, string]> = [
    ['mon-link-1', 'At-risk tickets →', 'SLA Compliance Report'],
    ['mon-link-2', 'Billing queue backlog →', 'Backlog Analysis'],
    ['mon-link-3', 'Agent utilization →', 'Agent Utilization Report'],
    ['mon-link-4', 'Channel performance →', 'Channel Performance Overview'],
  ];
  monLinks.forEach(([id, label, assetName], i) => {
    items.push(libLink(id, label, { x: libX(i * 3), y, w: libSpan(3), assetName }));
  });

  return items;
}

// The monitoring dashboard is a specific saved dashboard, so it is matched by
// name; every other prebuilt dashboard gets the service-review layout.
const MONITORING_DASHBOARD_TITLE = 'Real-time Monitoring';

const filterOptions = [
  {
    id: 'date-range',
    label: 'Date Range',
    values: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'This month', 'Last month', 'Custom range'],
  },
  {
    id: 'status',
    label: 'Status',
    values: ['All', 'Open', 'In Progress', 'Pending', 'Resolved', 'Closed'],
  },
  {
    id: 'priority',
    label: 'Priority',
    values: ['All', 'Low', 'Medium', 'High', 'Urgent'],
  },
  {
    id: 'agent',
    label: 'Agent',
    values: ['All Agents', 'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emily Davis', 'Unassigned'],
  },
  {
    id: 'category',
    label: 'Category',
    values: ['All', 'Support', 'Technical', 'Billing', 'Sales', 'General Inquiry'],
  },
  {
    id: 'region',
    label: 'Region',
    // EMEA and APAC sit alongside the single regions they group, because that is
    // how support orgs are actually structured — one team covers the whole patch,
    // and a regional weekly review filters by the team's patch, not by a
    // continent. Each acronym leads the regions it covers, so the list reads as
    // territory then parts rather than as one flat set of unrelated names.
    values: ['All Regions', 'North America', 'EMEA', 'Europe', 'Middle East', 'APAC', 'Asia Pacific', 'Latin America'],
  },
  {
    id: 'channel',
    label: 'Channel',
    values: ['All Channels', 'Email', 'Chat', 'Phone', 'Web', 'Social', 'Messaging'],
  },
  {
    id: 'team',
    label: 'Team',
    values: ['All Teams', 'Support', 'Sales', 'Billing', 'Technical', 'Escalations'],
  },
  {
    id: 'group',
    label: 'Group',
    values: ['All Groups', 'Tier 1', 'Tier 2', 'Tier 3', 'VIP', 'Enterprise'],
  },
  {
    id: 'brand',
    label: 'Brand',
    values: ['All Brands', 'Primary', 'Secondary', 'Partner'],
  },
  {
    id: 'organization',
    label: 'Organization',
    values: ['All Organizations', 'Acme Corp', 'Globex', 'Initech', 'Umbrella'],
  },
  {
    id: 'tag',
    label: 'Tag',
    values: ['All Tags', 'Bug', 'Feature Request', 'Billing Issue', 'Outage', 'Follow-up'],
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction',
    values: ['All Ratings', 'Good', 'Bad', 'Offered', 'Unoffered'],
  },
  {
    id: 'sla-policy',
    label: 'SLA Policy',
    values: ['All Policies', 'Standard', 'Premium', 'Enterprise', 'VIP'],
  },
  {
    id: 'requester',
    label: 'Requester',
    values: ['All Requesters', 'End User', 'Agent', 'Admin', 'Anonymous'],
  },
  {
    id: 'assignee',
    label: 'Assignee',
    values: ['All Assignees', 'Assigned', 'Unassigned', 'Me'],
  },
  {
    id: 'ticket-form',
    label: 'Ticket Form',
    values: ['All Forms', 'Default', 'Technical Support', 'Billing', 'Sales Inquiry'],
  },
  {
    id: 'language',
    label: 'Language',
    values: ['All Languages', 'English', 'Spanish', 'French', 'German', 'Japanese'],
  },
  {
    id: 'country',
    label: 'Country',
    values: ['All Countries', 'United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'],
  },
  {
    id: 'time-zone',
    label: 'Time Zone',
    values: ['All Time Zones', 'UTC', 'EST', 'PST', 'CET', 'JST'],
  },
  {
    id: 'product',
    label: 'Product',
    values: ['All Products', 'Support Suite', 'Sell', 'Guide', 'Chat', 'Talk'],
  },
  {
    id: 'plan-type',
    label: 'Plan Type',
    values: ['All Plans', 'Team', 'Professional', 'Enterprise', 'Trial'],
  },
  {
    id: 'account-status',
    label: 'Account Status',
    values: ['All Statuses', 'Active', 'Suspended', 'Trial', 'Churned'],
  },
  {
    id: 'escalation-level',
    label: 'Escalation Level',
    values: ['All Levels', 'None', 'Level 1', 'Level 2', 'Level 3'],
  },
  {
    id: 'first-reply-time',
    label: 'First Reply Time',
    values: ['Any', 'Under 1 hour', '1–4 hours', '4–24 hours', 'Over 24 hours'],
  },
  {
    id: 'resolution-time',
    label: 'Resolution Time',
    values: ['Any', 'Under 4 hours', '4–24 hours', '1–3 days', 'Over 3 days'],
  },
  {
    id: 'ticket-type',
    label: 'Ticket Type',
    values: ['All Types', 'Question', 'Incident', 'Problem', 'Task'],
  },
  {
    id: 'source',
    label: 'Source',
    values: ['All Sources', 'Web Form', 'Email', 'API', 'Import', 'Agent Created'],
  },
  {
    id: 'device-type',
    label: 'Device Type',
    values: ['All Devices', 'Desktop', 'Mobile', 'Tablet', 'Unknown'],
  },
  {
    id: 'browser',
    label: 'Browser',
    values: ['All Browsers', 'Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
  },
  {
    id: 'operating-system',
    label: 'Operating System',
    values: ['All OS', 'Windows', 'macOS', 'Linux', 'iOS', 'Android'],
  },
  {
    id: 'custom-field',
    label: 'Custom Field',
    values: ['Any Value', 'Option A', 'Option B', 'Option C'],
  },
];

type ActiveFilter = { id: string; label: string; value: string; typeId: string };

// A named filter row an author can come back to. The cross filter chip is part of
// that row, so it is saved with the rest — a view that restored every filter
// except the one you dismissed wouldn't be the row you saved. Optional because
// the views a dashboard ships with predate it; absent means the default.
type SavedView = {
  id: string;
  name: string;
  filters: ActiveFilter[];
  showEventFilter?: boolean;
};

// The filter row every dashboard opens with: a Last 30 days date range, and
// default filters for region and channel. This is what Reset returns
// the row to, and what the row is compared against to decide whether there is
// anything to reset — so the two can't disagree about what "default" means.
const DEFAULT_FILTERS: ActiveFilter[] = [
  { id: 'filter-default-date-range', label: 'Date Range', value: 'Last 30 days', typeId: 'date-range' },
  { id: 'filter-default-region', label: 'Region', value: 'All Regions', typeId: 'region' },
  { id: 'filter-default-channel', label: 'Channel', value: 'All Channels', typeId: 'channel' },
];
// Off. A cross filter is something a reader creates by clicking into a figure, so
// a dashboard that opens with one already applied is showing a slice nobody asked
// for — and "Deal created / In admin" named a slice that has nothing to do with
// the support data on this dashboard. The chip itself is kept: it is still what a
// real cross filter would draw, and saved views still carry it, so a view that
// captures one restores it.
const DEFAULT_SHOW_EVENT_FILTER = false;

// Changed rather than merely present: a filter added or removed, a value picked
// that isn't the one it opened with, or the cross filter chip dismissed. Matched
// by type and value rather than by index, so filters reordered — or a default one
// removed and added back — still count as untouched.
function isDefaultFilterState(filters: ActiveFilter[], showEventFilter: boolean) {
  return (
    showEventFilter === DEFAULT_SHOW_EVENT_FILTER &&
    filters.length === DEFAULT_FILTERS.length &&
    DEFAULT_FILTERS.every((d) =>
      filters.some((f) => f.typeId === d.typeId && f.value === d.value)
    )
  );
}

// The width the filter row's leading control is held to in both modes, so the
// first filter chip starts in the same place whichever mode you are in: a 32px
// icon button — add filter when editing, saved views when viewing — plus 7px of
// gap and the pixel of rule that closes the slot. The bar switches modes in place
// under an unchanged row of filters, and chips that slid sideways as it switched
// would read as the filters themselves having changed.
const FILTER_ROW_LEAD_WIDTH = 40;

// The rule closing that slot, shared by both modes so they can't drift apart.
// 20px, not the full 32: a rule the height of the controls either side reads as a
// border on both of them. Pushed to the slot's right edge, so whatever padding the
// slot needs to hold its width sits behind the rule and the rule stays the
// boundary between the leading control and the filters after it.
const FILTER_ROW_LEAD_RULE = 'ml-auto h-5 w-px shrink-0 bg-[#dcdcda]';

// Something the menu can do to the filter row as a whole, rather than a filter to
// add — linking the filters that are there, for instance.
type FilterMenuAction = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
};

function AddFilterMenu({
  onAdd,
  excludeTypeIds = [],
  actions = [],
}: {
  onAdd: (typeId: string) => void;
  excludeTypeIds?: string[];
  /* Listed under the filter types, behind a rule. */
  actions?: FilterMenuAction[];
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const available = filterOptions.filter((f) => !excludeTypeIds.includes(f.id));
  const filtered = available.filter((f) =>
    f.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Same 32px filter icon as viewing mode, so switching modes doesn't shift the
  // filter bar — only the trigger's behaviour changes.
  const filterIcon = (
    <Filter className={`${FLORA_HEADER_ICON} !text-[#646864]`} aria-hidden />
  );
  const triggerClass = `w-[32px] shrink-0 !p-0 ${FLORA_BTN} !h-[32px]`;

  // Only dead once there is nothing left to add and nothing else it could do:
  // with actions in the menu the trigger still opens onto something, so it stays
  // live even when every filter type is already in the row.
  if (available.length === 0 && actions.length === 0) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        className={triggerClass}
        aria-label="Add filter"
      >
        {filterIcon}
      </Button>
    );
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setSearch('');
      }}
    >
      {/* bottom-start, not bottom: the icon is the leftmost thing in the filter
          bar, so a centred tooltip clips against the card's edge. */}
      <FloraTooltip
        content={toolTooltip('Add filter', ADD_FILTER_SHORTCUT)}
        placement="bottom-start"
        size="small"
        appendToNode={typeof document !== 'undefined' ? document.body : undefined}
        zIndex={99999}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`${triggerClass} hover:bg-muted`}
            aria-label="Add filter"
          >
            {filterIcon}
          </Button>
        </DropdownMenuTrigger>
      </FloraTooltip>
      <DropdownMenuContent align="start" className={FILTER_MENU_CONTENT_CLASS}>
        {/* Nothing to search once every filter type is in the row — the menu is
            then only its actions, and a search box over an empty list would be
            the biggest thing in it. */}
        {available.length > 0 && (
          <div
            className={FILTER_MENU_SEARCH_CLASS}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <FloraSearchInput
              placeholder="Search filters"
              aria-label="Search filters"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              width="100%"
            />
          </div>
        )}
        <div
          className={FILTER_MENU_LIST_CLASS}
          style={{ maxHeight: FILTER_MENU_LIST_MAX_HEIGHT }}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-[4px]">
              <MD tag="span" className="!text-muted-foreground">
                {available.length === 0 ? 'All filters added' : 'No filters found'}
              </MD>
            </div>
          ) : (
            filtered.map((filterType) => (
              <DropdownMenuItem
                key={filterType.id}
                className={FILTER_MENU_ITEM_CLASS}
                onClick={() => {
                  onAdd(filterType.id);
                  setSearch('');
                  setOpen(false);
                }}
              >
                <MD tag="span" className="!text-foreground">{filterType.label}</MD>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {/* Acting on the row rather than adding to it, so they sit under the list
            behind a rule — the rule alone says they are a different kind of thing,
            without a heading over two entries. Outside the list's scroll box, so
            they hold the foot of the menu instead of scrolling away with the
            filter types. */}
        {actions.length > 0 && (
          <>
            {/* mx-0: the menu's own padding is zero, so the separator's default
                pull-out would hang past its edges. my-0 too — the list and the
                actions bring their own padding either side of the rule. */}
            <DropdownMenuSeparator className="mx-0 my-0" />
            {/* Roomier than the list above it: with the heading gone, the space
                either side of these is what holds them apart from the filter
                types and off the bottom edge of the menu. */}
            <div className="py-2">
              {actions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <DropdownMenuItem
                    key={action.id}
                    className={`gap-2 ${FILTER_MENU_ITEM_CLASS}`}
                    onClick={() => {
                      setSearch('');
                      setOpen(false);
                      action.onSelect();
                    }}
                  >
                    {ActionIcon && <ActionIcon className={FLORA_MENU_ICON} />}
                    <MD tag="span" className="!text-foreground">{action.label}</MD>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SelectReportModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (reportId: string) => void;
}) {
  const [search, setSearch] = useState('');
  // Opens on the order the list has always had — newest first — so sorting is
  // something the author reaches for rather than something that greets them.
  const [sort, setSort] = useState<{ column: ReportSortColumn; direction: 'asc' | 'desc' }>({
    column: 'lastUpdated',
    direction: 'desc',
  });
  const normalizedSearch = search.trim().toLowerCase();
  const filteredReports = mockReports.filter((report) => {
    if (!normalizedSearch) return true;
    return (
      report.name.toLowerCase().includes(normalizedSearch) ||
      report.type.toLowerCase().includes(normalizedSearch) ||
      report.owner.toLowerCase().includes(normalizedSearch) ||
      report.projectName.toLowerCase().includes(normalizedSearch) ||
      report.tags.some((tag) => tag.label.toLowerCase().includes(normalizedSearch))
    );
  });
  // lastUpdated is ISO, so the same string compare orders names and dates alike.
  const sortedReports = [...filteredReports].sort((a, b) => {
    const result = a[sort.column].localeCompare(b[sort.column]);
    return sort.direction === 'asc' ? result : -result;
  });

  // A fresh column starts ascending, except dates: nobody wants the oldest
  // report first. Clicking the column already sorted flips it.
  const toggleSort = (column: ReportSortColumn) =>
    setSort((current) =>
      current.column === column
        ? { column, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: column === 'lastUpdated' ? 'desc' : 'asc' },
    );

  const sortableHeader = (column: ReportSortColumn, label: string, width: string) => (
    <Table.SortableCell
      width={width}
      sort={sort.column === column ? sort.direction : undefined}
      onClick={() => toggleSort(column)}
    >
      {floraTableHeader(label)}
    </Table.SortableCell>
  );

  return (
    <Modal onClose={onClose} isLarge restoreFocus>
      <Modal.Header tag="h2">Select report</Modal.Header>
      <Modal.Body className="dashboard-reports-modal-body">
        <div
          className="dashboard-reports-modal-search"
          onKeyDown={(event) => event.stopPropagation()}
        >
          <FloraSearchInput
            placeholder="Search reports"
            aria-label="Search reports"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            width="100%"
          />
        </div>
        <div className={REPORTS_MODAL_LIST_CLASS}>
          {filteredReports.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <MD tag="span" className="!text-muted-foreground">No reports found</MD>
            </div>
          ) : (
            <Table size="small">
              {/* The table lays out fixed, so the four columns would otherwise
                  split the modal evenly and clip the one thing the author is
                  actually reading. Name takes the room it needs to sit whole;
                  the metadata beside it truncates instead. */}
              <Table.Head>
                <Table.HeaderRow>
                  {sortableHeader('name', 'Name', '38%')}
                  {sortableHeader('projectName', 'Project Name', '22%')}
                  {sortableHeader('owner', 'Owner', '19%')}
                  {sortableHeader('lastUpdated', 'Last Updated', '21%')}
                </Table.HeaderRow>
              </Table.Head>
              <Table.Body>
                {sortedReports.map((report) => (
                  <Table.Row
                    key={report.id}
                    onClick={() => onSelect(report.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Table.Cell>
                      <div className="flex items-center gap-[8px]">
                        <BarChartIcon className={FLORA_LIBRARY_ICON} />
                        {REALTIME_REPORT_IDS.has(report.id) && (
                          <FloraTooltip content="Real-time data" placement="top" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                            <span className="relative flex size-[8px] shrink-0">
                              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                              <span className="relative size-[8px] rounded-full bg-green-500" />
                            </span>
                          </FloraTooltip>
                        )}
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} whitespace-nowrap`}>{report.name}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <div className="flex min-w-0 items-center gap-[6px]">
                        <Folder className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} block min-w-0 truncate`}>{report.projectName}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <div className="flex min-w-0 items-center gap-[6px]">
                        <UserCircle className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} block min-w-0 truncate`}>{report.owner}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <div className="flex min-w-0 items-center gap-[6px]">
                        <Clock className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} block min-w-0 truncate`}>{report.lastUpdated}</MD>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </Modal.Body>
      <Modal.Close aria-label="Close" />
    </Modal>
  );
}

// Compact Flora combobox used as a plain single-select dropdown.
function FloraSelectField({
  label,
  value,
  options,
  onChange,
  ariaLabel,
  dense = false,
  escapeOverflow = false,
}: {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  dense?: boolean;
  // Garden decides down-or-up from the nearest scrolling ancestor's clip, so a
  // select low in a modal or drawer body opens upward over its own label. Set
  // this where that happens: the listbox is then appended to the document and
  // measured against the viewport, which puts the options back below the
  // control. Off by default — a listbox in the page flow inherits the
  // container's stacking and scrolls with it, which is what most fields want.
  escapeOverflow?: boolean;
}) {
  // dense drops the combobox to 12px, but the line box must stay 20px to match
  // the height Garden gives the trigger value and each option's content box —
  // a 14px leading would sit the text at the top of both instead of centered.
  return (
    <ComboboxField className={dense ? '[&_[data-garden-id="dropdowns.combobox"]_*]:!text-[12px] [&_[data-garden-id="dropdowns.combobox"]_*]:!leading-[20px]' : undefined}>
      {label ? (
        <ComboboxField.Label className={dense ? '!text-[12px] !leading-4 !font-normal text-foreground' : 'text-sm font-medium text-foreground'}>{label}</ComboboxField.Label>
      ) : (
        <ComboboxField.Label hidden>{ariaLabel || label || 'Select'}</ComboboxField.Label>
      )}
      <Combobox
        isCompact
        isEditable={false}
        selectionValue={value}
        listboxAriaLabel={ariaLabel || label || 'Select'}
        listboxAppendToNode={
          escapeOverflow && typeof document !== 'undefined' ? document.body : undefined
        }
        // Above the modal backdrop's 400, since an appended listbox is no longer
        // inside the modal's own stacking context.
        listboxZIndex={escapeOverflow ? 9999 : undefined}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            const next = Array.isArray(changes.selectionValue)
              ? changes.selectionValue[0]
              : changes.selectionValue;
            if (typeof next === 'string') onChange(next);
          }
        }}
      >
        {options.map((o) => (
          <Option key={o.value} value={o.value} label={o.label} isSelected={o.value === value}>
            {o.label}
          </Option>
        ))}
      </Combobox>
    </ComboboxField>
  );
}

// Contextual link editor for the Text widget, shown as a popover next to the
// floating text toolbar (not a modal). Lets the user attach either an internal
// asset (a report, or a dashboard with a destination tab) or an external
// hyperlink. Link type and dashboard tab are chosen with select dropdowns.
function TextLinkEditor({
  initialLink,
  onSave,
  onRemove,
}: {
  initialLink: TextLink | null;
  onSave: (link: TextLink) => void;
  onRemove: () => void;
}) {
  const [form, setForm] = useState<TextLink>(initialLink || createDefaultTextLink());
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();

  // Combined, searchable list of dashboards and reports.
  const assetResults = [
    ...mockDashboards.map((d) => ({
      kind: 'dashboard' as TextLinkAssetKind,
      id: d.id,
      name: d.name,
      projectName: d.projectName,
      tabs: d.tabs,
    })),
    ...mockReports.map((r) => ({
      kind: 'report' as TextLinkAssetKind,
      id: r.id,
      name: r.name,
      projectName: r.projectName,
      tabs: undefined as { id: string; name: string }[] | undefined,
    })),
  ].filter((a) =>
    !normalizedSearch ||
    a.name.toLowerCase().includes(normalizedSearch) ||
    a.projectName.toLowerCase().includes(normalizedSearch),
  );

  const selectedDashboard =
    form.assetKind === 'dashboard' && form.assetId
      ? mockDashboards.find((d) => d.id === form.assetId) || null
      : null;

  const destinationValid =
    form.linkType === 'hyperlink' ? form.url.trim().length > 0 : !!form.assetId;
  const canSave = destinationValid;

  const listRowBase =
    'flex w-full items-center justify-between gap-2 rounded-[6px] border px-3 py-2 text-left text-sm transition-colors';

  const selectAsset = (asset: {
    kind: TextLinkAssetKind;
    id: string;
    name: string;
    tabs?: { id: string; name: string }[];
  }) =>
    setForm((prev) => ({
      ...prev,
      assetKind: asset.kind,
      assetId: asset.id,
      assetName: asset.name,
      // Dashboards default to their first tab; reports carry no tab.
      tabId: asset.kind === 'dashboard' ? asset.tabs?.[0]?.id ?? null : null,
      tabName: asset.kind === 'dashboard' ? asset.tabs?.[0]?.name ?? null : null,
    }));

  return (
    <div className="space-y-3" onKeyDown={(e) => e.stopPropagation()}>
      {/* Link type — select */}
      <FloraSelectField
        label="Link to"
        ariaLabel="Link type"
        value={form.linkType}
        options={[
          { value: 'asset', label: 'Asset' },
          { value: 'hyperlink', label: 'URL' },
        ]}
        onChange={(value) => setForm((prev) => ({ ...prev, linkType: value as LinkType }))}
      />

      {form.linkType === 'asset' ? (
        <>
          {/* Single search across dashboards and reports */}
          <FloraSearchInput
            placeholder="Search dashboards and reports"
            aria-label="Search dashboards and reports"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width="100%"
          />

          <div className="max-h-[220px] overflow-y-auto rounded-[8px] border border-[#dcdcda] p-1.5 space-y-1 [scrollbar-gutter:stable]">
            {assetResults.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">No assets found</div>
            ) : (
              assetResults.map((a) => {
                const active = form.assetId === a.id;
                return (
                  <button
                    key={`${a.kind}-${a.id}`}
                    type="button"
                    onClick={() => selectAsset(a)}
                    className={`${listRowBase} ${
                      active ? 'border-[#1f73b7] bg-[#1f73b7]/5' : 'border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {a.kind === 'dashboard' ? (
                        <LayoutStroke className={FLORA_ICON} />
                      ) : (
                        <BarChartIcon className={FLORA_ICON} />
                      )}
                      <span className="block truncate text-foreground">{a.name}</span>
                    </span>
                    {active && <Check className={FLORA_ICON} />}
                  </button>
                );
              })
            )}
          </div>

          {/* Destination tab — select (only for dashboards) */}
          {selectedDashboard && (
            <FloraSelectField
              label="Destination tab"
              ariaLabel="Destination tab"
              value={form.tabId ?? ''}
              options={selectedDashboard.tabs.map((t) => ({ value: t.id, label: t.name }))}
              onChange={(value) => {
                const tab = selectedDashboard.tabs.find((t) => t.id === value);
                setForm((prev) => ({ ...prev, tabId: tab?.id ?? null, tabName: tab?.name ?? null }));
              }}
            />
          )}

          {/* Filter state passthrough — select (once an asset is chosen) */}
          {form.assetId && (
            <FloraSelectField
              label="Filter state"
              ariaLabel="Filter state"
              value={form.passState}
              options={LINK_STATE_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label }))}
              onChange={(value) => setForm((prev) => ({ ...prev, passState: value as LinkState }))}
            />
          )}
        </>
      ) : (
        <div className="space-y-1.5">
          <span className="text-sm font-medium text-foreground">URL</span>
          <Input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://example.com"
            onKeyDown={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        {initialLink ? (
          <FloraButton isPill={false} size="small" isDanger onClick={onRemove}>
            Remove
          </FloraButton>
        ) : (
          <span />
        )}
        <FloraButton
          isPrimary
          isPill={false}
          size="small"
          disabled={!canSave}
          onClick={() => onSave(form)}
        >
          {initialLink ? 'Save' : 'Add link'}
        </FloraButton>
      </div>
    </div>
  );
}

// Configuration modal for the Link widget: label, link type (asset / hyperlink),
// destination, tab target, state passthrough, and full text formatting.
function LinkConfigModal({
  initialContent,
  tabs,
  onClose,
  onSave,
}: {
  initialContent: LinkContent;
  tabs: { id: string; name: string }[];
  onClose: () => void;
  onSave: (content: LinkContent) => void;
}) {
  const [form, setForm] = useState<LinkContent>(initialContent);
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  const setFormat = (patch: Partial<LinkFormat>) =>
    setForm((prev) => ({ ...prev, format: { ...prev.format, ...patch } }));

  const clampSize = (n: number) => Math.max(8, Math.min(96, Math.round(n)));

  const destinationValid =
    form.linkType === 'asset' ? !!form.assetId : form.url.trim().length > 0;
  const canSave = form.label.trim().length > 0 && destinationValid;

  const previewText = form.label.trim() || 'Link text';
  const previewStyle: React.CSSProperties = {
    fontFamily: form.format.fontStyle === 'Default' ? undefined : form.format.fontStyle,
    fontSize: `${form.format.fontSize}px`,
    color: form.format.color,
    backgroundColor:
      form.format.highlight && form.format.highlight !== 'transparent'
        ? form.format.highlight
        : undefined,
    fontWeight: form.format.bold ? 700 : 400,
    fontStyle: form.format.italic ? 'italic' : 'normal',
    textDecoration: form.format.underline ? 'underline' : 'none',
    textAlign: form.format.align,
  };

  const fmtBtn = (active: boolean) =>
    `flex h-8 w-8 items-center justify-center rounded-[6px] border transition-colors ${
      active
        ? 'border-[#1f73b7] bg-[#1f73b7]/10 text-[#1f73b7]'
        : 'border-[#dcdcda] bg-white text-foreground hover:bg-muted'
    }`;

  const alignIconFor = (a: 'left' | 'center' | 'right') =>
    a === 'center' ? (
      <AlignCenter className={FLORA_ICON} style={{ width: 16, height: 16 }} />
    ) : a === 'right' ? (
      <AlignRight className={FLORA_ICON} style={{ width: 16, height: 16 }} />
    ) : (
      <AlignLeft className={FLORA_ICON} style={{ width: 16, height: 16 }} />
    );

  return (
    <>
      <Modal onClose={onClose} restoreFocus>
        <Modal.Header tag="h2">Add link</Modal.Header>
        <Modal.Body>
          <div className="space-y-5 py-1">
            {/* Label */}
            <div className="space-y-1.5">
              <label htmlFor="link-label" className="text-sm font-medium text-foreground">
                Label
              </label>
              <Input
                id="link-label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="e.g., View full report"
                onKeyDown={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>

            {/* Link type */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-foreground">Link type</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, linkType: 'asset' })}
                  className={`flex flex-col items-start gap-0.5 rounded-[8px] border p-3 text-left transition-colors ${
                    form.linkType === 'asset'
                      ? 'border-[#1f73b7] bg-[#1f73b7]/5'
                      : 'border-[#dcdcda] hover:bg-muted/40'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <BarChartIcon className={FLORA_ICON} /> Asset
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Link to an internal dashboard or report
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, linkType: 'hyperlink' })}
                  className={`flex flex-col items-start gap-0.5 rounded-[8px] border p-3 text-left transition-colors ${
                    form.linkType === 'hyperlink'
                      ? 'border-[#1f73b7] bg-[#1f73b7]/5'
                      : 'border-[#dcdcda] hover:bg-muted/40'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <ExternalLink className={FLORA_ICON} /> URL
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Link to an external URL
                  </span>
                </button>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-foreground">
                {form.linkType === 'asset' ? 'Destination asset' : 'URL'}
              </span>
              {form.linkType === 'asset' ? (
                <button
                  type="button"
                  onClick={() => setShowAssetPicker(true)}
                  className="flex h-9 w-full items-center justify-between rounded-[6px] border border-[#dcdcda] bg-white px-3 text-left text-sm hover:bg-muted/40 transition-colors"
                >
                  <span className={form.assetName ? 'text-foreground' : 'text-muted-foreground'}>
                    {form.assetName || 'Select a report or dashboard'}
                  </span>
                  <ChevronDown className={FLORA_ICON} />
                </button>
              ) : (
                <Input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://example.com"
                  onKeyDown={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {/* Open in tab (optional) */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-foreground">
                Open in <span className="font-normal text-muted-foreground">(optional)</span>
              </span>
              <div className="relative">
                <select
                  value={form.openInTab}
                  onChange={(e) => setForm({ ...form, openInTab: e.target.value })}
                  className="h-9 w-full appearance-none rounded-[6px] border border-[#dcdcda] bg-white px-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#1f73b7]"
                >
                  <option value="current">Current tab</option>
                  <option value="new-tab">New browser tab</option>
                  {tabs.length > 0 && (
                    <optgroup label="Dashboard tabs">
                      {tabs.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <ChevronDown
                  className={`${FLORA_ICON} pointer-events-none absolute right-3 top-1/2 -translate-y-1/2`}
                />
              </div>
            </div>

            {/* State passthrough */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-foreground">Pass state through link</span>
              <div className="grid grid-cols-2 gap-2">
                {LINK_STATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, passState: opt.value })}
                    className={`flex items-start gap-2 rounded-[8px] border p-2.5 text-left transition-colors ${
                      form.passState === opt.value
                        ? 'border-[#1f73b7] bg-[#1f73b7]/5'
                        : 'border-[#dcdcda] hover:bg-muted/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        form.passState === opt.value ? 'border-[#1f73b7]' : 'border-[#c2c8cc]'
                      }`}
                    >
                      {form.passState === opt.value && (
                        <span className="h-2 w-2 rounded-full bg-[#1f73b7]" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-foreground">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Text formatting */}
            <div className="space-y-2.5">
              <span className="text-sm font-medium text-foreground">Text formatting</span>

              {/* Font style + size row */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    value={form.format.fontStyle}
                    onChange={(e) => setFormat({ fontStyle: e.target.value })}
                    aria-label="Font style"
                    className="h-8 w-full appearance-none rounded-[6px] border border-[#dcdcda] bg-white px-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#1f73b7]"
                  >
                    {LINK_FONT_STYLES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`${FLORA_ICON} pointer-events-none absolute right-2 top-1/2 -translate-y-1/2`} />
                </div>
                <div className="relative w-24">
                  <select
                    value={form.format.fontSize}
                    onChange={(e) => setFormat({ fontSize: clampSize(parseInt(e.target.value, 10)) })}
                    aria-label="Font size"
                    className="h-8 w-full appearance-none rounded-[6px] border border-[#dcdcda] bg-white px-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#1f73b7]"
                  >
                    {LINK_FONT_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}px
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`${FLORA_ICON} pointer-events-none absolute right-2 top-1/2 -translate-y-1/2`} />
                </div>
              </div>

              {/* Style toggles + alignment */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  className={fmtBtn(form.format.bold)}
                  onClick={() => setFormat({ bold: !form.format.bold })}
                  aria-label="Bold"
                  aria-pressed={form.format.bold}
                >
                  <Bold className={FLORA_ICON} style={{ width: 16, height: 16 }} />
                </button>
                <button
                  type="button"
                  className={fmtBtn(form.format.italic)}
                  onClick={() => setFormat({ italic: !form.format.italic })}
                  aria-label="Italic"
                  aria-pressed={form.format.italic}
                >
                  <Italic className={FLORA_ICON} style={{ width: 16, height: 16 }} />
                </button>
                <button
                  type="button"
                  className={`${fmtBtn(form.format.underline)} underline`}
                  onClick={() => setFormat({ underline: !form.format.underline })}
                  aria-label="Underline"
                  aria-pressed={form.format.underline}
                >
                  <span className="text-sm font-medium leading-none">U</span>
                </button>

                <div className="mx-0.5 h-6 w-px bg-[#dcdcda]" />

                {(['left', 'center', 'right'] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={fmtBtn(form.format.align === a)}
                    onClick={() => setFormat({ align: a })}
                    aria-label={`Align ${a}`}
                    aria-pressed={form.format.align === a}
                  >
                    {alignIconFor(a)}
                  </button>
                ))}
              </div>

              {/* Color + highlight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">Text color</span>
                  <FloraColorPicker
                    value={form.format.color}
                    onChange={(c) => setFormat({ color: c })}
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">Highlight</span>
                  <FloraColorPicker
                    value={form.format.highlight}
                    onChange={(c) => setFormat({ highlight: c })}
                    allowTransparent
                  />
                </div>
              </div>

              {/* Live preview */}
              <div className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Preview</span>
                <div className="rounded-[8px] border border-[#dcdcda] bg-[#fafafa] px-3 py-3">
                  <div style={{ textAlign: form.format.align }}>
                    <span
                      className="inline-flex items-center gap-1 rounded-[3px] px-0.5 cursor-pointer"
                      style={previewStyle}
                    >
                      {form.linkType === 'hyperlink' && (
                        <ExternalLink style={{ width: form.format.fontSize * 0.8, height: form.format.fontSize * 0.8 }} />
                      )}
                      {previewText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterItem>
            <FloraButton onClick={onClose}>
              Cancel
            </FloraButton>
          </Modal.FooterItem>
          <Modal.FooterItem>
            <FloraButton
              isPrimary
              disabled={!canSave}
              onClick={() => onSave(form)}
            >
              Add link
            </FloraButton>
          </Modal.FooterItem>
        </Modal.Footer>
        <Modal.Close aria-label="Close" />
      </Modal>

      {showAssetPicker && (
        <SelectReportModal
          onClose={() => setShowAssetPicker(false)}
          onSelect={(reportId) => {
            const report = mockReports.find((r) => r.id === reportId);
            setForm((prev) => ({
              ...prev,
              assetId: reportId,
              assetName: report?.name || null,
            }));
            setShowAssetPicker(false);
          }}
        />
      )}
    </>
  );
}

function DashboardFilterValuePanel({
  filterLabel,
  values,
  selectedValues,
  open,
  onOpenChange,
  onApply,
  onRemove,
  allowRemove = true,
  trigger,
}: {
  filterLabel: string;
  values: string[];
  selectedValues: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (values: string[]) => void;
  onRemove: () => void;
  // Viewing mode can change values but not the dashboard's set of filters, so
  // it hides the destructive action and clears the selection instead.
  allowRemove?: boolean;
  trigger: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('filter');
  const [search, setSearch] = useState('');
  const [scopedSearch, setScopedSearch] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [draft, setDraft] = useState<string[]>(selectedValues);

  useEffect(() => {
    if (open) {
      setDraft([...selectedValues]);
      setSearch('');
      setScopedSearch(false);
      setShowAdvanced(false);
      setCaseSensitive(false);
      setActiveTab('filter');
    }
  }, [open, selectedValues]);

  const searchPool = scopedSearch ? values.filter((value) => draft.includes(value)) : values;
  const trimmedSearch = search.trim();
  const normalizedSearch = caseSensitive ? trimmedSearch : trimmedSearch.toLowerCase();
  const filteredValues = searchPool.filter((value) => {
    if (!normalizedSearch) return true;
    return (caseSensitive ? value : value.toLowerCase()).includes(normalizedSearch);
  });

  const toggleValue = (value: string) => {
    setDraft((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSelectAll = () => {
    setDraft((current) => {
      const next = new Set(current);
      filteredValues.forEach((value) => next.add(value));
      return Array.from(next);
    });
  };

  // The inverse of Select all: both act on the values currently listed, so with
  // a search applied they stay symmetric rather than one scoping and one not.
  const handleClearAll = () => {
    setDraft((current) => current.filter((value) => !filteredValues.includes(value)));
  };

  const handleApply = () => {
    if (draft.length === 0 && allowRemove) {
      onRemove();
    } else {
      onApply(draft);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleRemove = () => {
    onRemove();
    onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" sideOffset={4} className={FILTER_VALUE_PANEL_CLASS}>
        <Tabs
          selectedItem={activeTab}
          onChange={(item) => {
            if (item) setActiveTab(String(item));
          }}
        >
          <Tabs.TabList className="dashboard-filter-panel-tabs">
            <Tabs.Tab item="filter">Filter</Tabs.Tab>
            <Tabs.Tab item="filter-sets">Filter sets</Tabs.Tab>
            <Tabs.Tab item="dynamic-filter-set">Dynamic filter set</Tabs.Tab>
          </Tabs.TabList>

          {activeTab === 'filter' && (
            <div className="dashboard-filter-panel-body">
              {/* Top row: the bulk actions on the left, the overflow menu of
                  search toggles on the right. Both are panel-level controls, so
                  they sit together above the search field rather than the
                  overflow crowding the input. */}
              <div className="dashboard-filter-panel-list-header">
                <Anchor
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSelectAll();
                  }}
                >
                  Select all
                </Anchor>
                <Anchor
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClearAll();
                  }}
                >
                  Clear all
                </Anchor>
                <DropdownMenu>
                  <FloraTooltip content="Search options" placement="bottom-end" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Search options"
                        className="dashboard-filter-panel-search-more hover:bg-muted"
                      >
                        <MoreVertical className={`${FLORA_HEADER_ICON} !text-[#646864]`} />
                      </Button>
                    </DropdownMenuTrigger>
                  </FloraTooltip>
                  {/* The filter panel sits at z-[200], so the default z-50 would
                      render this menu behind it. The menu portals outside the
                      panel, so it can't inherit the panel's 12px rule — the
                      class below matches it. */}
                  <DropdownMenuContent
                    align="end"
                    className="dashboard-filter-panel-search-menu z-[300]"
                  >
                    <DropdownMenuCheckboxItem
                      checked={scopedSearch}
                      onCheckedChange={(checked) => setScopedSearch(Boolean(checked))}
                      onSelect={(event) => event.preventDefault()}
                    >
                      <MD tag="span" className="!text-foreground">Scoped search</MD>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showAdvanced}
                      onCheckedChange={(checked) => setShowAdvanced(Boolean(checked))}
                      onSelect={(event) => event.preventDefault()}
                    >
                      <MD tag="span" className="!text-foreground">Show advanced options</MD>
                    </DropdownMenuCheckboxItem>
                    {showAdvanced && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={caseSensitive}
                          onCheckedChange={(checked) => setCaseSensitive(Boolean(checked))}
                          onSelect={(event) => event.preventDefault()}
                        >
                          <MD tag="span" className="!text-foreground">Match case</MD>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuItem className="gap-2" onClick={() => console.log('Filter by expression')}>
                          <Filter className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Filter by expression</MD>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Search and the value list form one bordered unit: the search
                  sits directly on top of the list it filters, sharing its width
                  and a single seam between them. */}
              <div className="dashboard-filter-panel-value-group">
                <div
                  className="dashboard-filter-panel-search"
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <Field>
                    <FloraSearchInput
                      placeholder="Search by value"
                      aria-label="Search by value"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      width="100%"
                    />
                  </Field>
                </div>

                <div className="dashboard-filter-panel-list" role="listbox" aria-label={filterLabel}>
                  {filteredValues.length === 0 ? (
                    <div className="dashboard-filter-panel-empty">
                      <MD tag="span" className="!text-muted-foreground">No values found</MD>
                    </div>
                  ) : (
                    filteredValues.map((value) => {
                      const isSelected = draft.includes(value);
                      return (
                        <button
                          key={value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className="dashboard-filter-panel-item"
                          data-selected={isSelected ? 'true' : 'false'}
                          onClick={() => toggleValue(value)}
                        >
                          {isSelected && (
                            <Check className="dashboard-filter-panel-item-check" aria-hidden />
                          )}
                          <MD tag="span" className="dashboard-filter-panel-item-label">
                            {value}
                          </MD>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'filter-sets' && (
            <div className="dashboard-filter-panel-placeholder">
              <MD tag="span" className="!text-muted-foreground">Filter sets are not available yet.</MD>
            </div>
          )}

          {activeTab === 'dynamic-filter-set' && (
            <div className="dashboard-filter-panel-placeholder">
              <MD tag="span" className="!text-muted-foreground">Dynamic filter sets are not available yet.</MD>
            </div>
          )}
        </Tabs>

        {/* Clearing the selection now lives beside Select all, so the footer is
            just delete (editing only) plus the commit actions. */}
        <div className="dashboard-filter-panel-footer">
          {allowRemove && (
            <IconButton
              aria-label={`Remove ${filterLabel} filter`}
              size="small"
              isDanger
              className="dashboard-filter-panel-remove-btn"
              onClick={handleRemove}
            >
              <Trash2 className={FLORA_DANGER_ICON} aria-hidden />
            </IconButton>
          )}
          <div className="dashboard-filter-panel-footer-actions">
            <FloraButton size="small" onClick={handleCancel}>
              Cancel
            </FloraButton>
            <FloraButton size="small" isPrimary onClick={handleApply}>
              Apply
            </FloraButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DashboardActiveFilter({
  filter,
  isEditing,
  onUpdate,
  onRemove,
}: {
  filter: ActiveFilter;
  isEditing: boolean;
  onUpdate: (filterId: string, value: string) => void;
  onRemove: (filterId: string) => void;
}) {
  const filterType = filterOptions.find((f) => f.id === filter.typeId);
  const selectedValues = filter.value.split(', ').filter(Boolean);
  const visibleTags = selectedValues.slice(0, FILTER_ACTIVE_VISIBLE_TAGS);
  const overflowValues = selectedValues.slice(FILTER_ACTIVE_VISIBLE_TAGS);
  const overflowCount = overflowValues.length;
  const [panelOpen, setPanelOpen] = useState(false);

  const filterContent = (
    <>
      <MD tag="span" className={FILTER_ACTIVE_LABEL}>
        {filter.label}
      </MD>
      {visibleTags.length > 0 && (
        <MD tag="span" className={FILTER_ACTIVE_VALUES}>
          {visibleTags.join(', ')}
        </MD>
      )}
      {overflowCount > 0 && (
        <FloraTooltip content={overflowValues.join(', ')} placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
          <span className="inline-flex shrink-0">
            <MD tag="span" className={FILTER_ACTIVE_OVERFLOW}>
              + {overflowCount} more
            </MD>
          </span>
        </FloraTooltip>
      )}
    </>
  );

  // Both modes open the same value panel — picking values is a viewing action,
  // not an authoring one. Only editing may delete the filter from the
  // dashboard, so viewing gets Clear instead of the danger button.
  return (
    <DashboardFilterValuePanel
      filterLabel={filter.label}
      values={filterType?.values ?? []}
      selectedValues={selectedValues}
      open={panelOpen}
      onOpenChange={setPanelOpen}
      onApply={(values) => onUpdate(filter.id, values.join(', '))}
      onRemove={() => onRemove(filter.id)}
      allowRemove={isEditing}
      trigger={
        <button
          type="button"
          className={`dashboard-active-filter shrink-0 ${FILTER_ACTIVE_SHELL} m-0 cursor-pointer text-left font-inherit`}
          aria-label={
            isEditing ? `Edit ${filter.label} filter` : `Select ${filter.label} values`
          }
        >
          {filterContent}
        </button>
      }
    />
  );
}

export function DashboardBuilder({ dashboardTitle, projectName, onSave, onCancel, onClose, onUpdateTitle, isFromCard, initialData, onOpenAnalyticsAssistant, onNavigateToProject }: DashboardBuilderProps) {
  // Determine if this is an existing dashboard from the library
  const isExistingDashboard = initialData?.isNew === false && initialData?.fromCard === true;
  const shouldPrepopulate = isFromCard || isExistingDashboard;
  // The tab the prototype boots with, as opposed to one the user created while
  // it was running: it opens on the support ticket mockup, not an empty canvas.
  const isDefaultDashboard = Boolean(initialData?.isDefaultDashboard);
  // A dashboard that arrives with content — opened from the library, or the one
  // the prototype boots with — starts in view mode. A dashboard the user just
  // created is blank, so it starts in edit mode. (initialData.isNew can't be
  // used here: the library open paths set it to true as well, and it also drives
  // the pre-created dashboard routing.)
  const startsInEditMode = !shouldPrepopulate && !isDefaultDashboard;
  // A brand-new dashboard has no project or subproject until it is saved, so
  // there is no location to point at yet. Anything that arrives already named
  // and populated does.
  const [hasLocation, setHasLocation] = useState(shouldPrepopulate || isDefaultDashboard);

  // Which prebuilt content an opened dashboard arrives with. The monitoring
  // dashboard has its own layout; anything else opened from the library gets the
  // service-review one.
  const openedDashboardName = dashboardTitle || initialData?.dashboardName;
  // Lazily, because two of these three branches build a whole canvas and only the
  // first render's value is ever kept. The support ticket dashboard is the only
  // one that opens on more than one tab.
  const [tabs, setTabs] = useState<DashboardTab[]>(() => {
    if (!shouldPrepopulate) {
      return isDefaultDashboard
        ? createDefaultDashboardTabs()
        : [{ id: 'tab-1', name: 'Tab 1', contentItems: [] }]; // a dashboard the user just created starts blank
    }
    return [
      {
        id: 'tab-1',
        name: 'Tab 1',
        contentItems:
          openedDashboardName === MONITORING_DASHBOARD_TITLE
            ? createMonitoringDashboardItems()
            : createLibraryDashboardItems(),
      },
    ];
  });
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const canvasSurfaceRef = useRef<HTMLDivElement | null>(null);
  // The surface's scroll parent. Widgets are absolutely positioned on the surface,
  // which is sized to the viewport — it's the parent that scrolls them.
  const canvasScrollRef = useRef<HTMLDivElement | null>(null);
  // An explicit point to place a widget at, rather than the next slot in the
  // flow: the click point plus the canvas size measured at that moment, which is
  // what a placed widget is clamped to. Nothing supplies one now that a canvas
  // click is only a deselect — tools come from the floating toolbar and flow on
  // from the last widget — but the placement path still takes one.
  type CanvasInsertAt = {
    x: number;
    y: number;
    bounds: { width: number; height: number };
  } | null;
  // Adding a Report opens the report modal first, so the point has to outlive the
  // click — the position is only used once a report comes back.
  const pendingInsertAtRef = useRef<CanvasInsertAt>(null);
  const [dragOverImageId, setDragOverImageId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  // Id of the text item whose link picker (TextLinkModal) is open, if any
  const [textLinkModalItemId, setTextLinkModalItemId] = useState<string | null>(null);
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);
  // Id of the currently selected/active widget. Its contextual toolbar and
  // resize handles are only shown once it is clicked.
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(startsInEditMode);
  // A viewer can pause the authored rate for their own session — useful while
  // reading a chart that keeps redrawing. Setting the rate to Paused in edit
  // mode is the same end state, so the two stay in sync.
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(REFRESH_RATE_INITIAL !== 'manual');
  const [refreshRate, setRefreshRate] = useState(REFRESH_RATE_INITIAL);
  // The rate is authored, not read: it is a property of the dashboard the same
  // way its widgets are, so it is set in edit mode and only displayed to a
  // viewer. The draft lets an author back out of a change with Cancel.
  const [showRefreshRateModal, setShowRefreshRateModal] = useState(false);
  const [refreshRateDraft, setRefreshRateDraft] = useState(REFRESH_RATE_INITIAL);
  const handleOpenRefreshRateModal = () => {
    setRefreshRateDraft(refreshRate);
    setShowRefreshRateModal(true);
  };
  const handleConfirmRefreshRate = () => {
    setRefreshRate(refreshRateDraft);
    setIsAutoRefreshing(refreshRateDraft !== 'manual');
    setShowRefreshRateModal(false);
  };
  // The header readout has room for "30 sec", not "30 seconds".
  const refreshRateShortLabel =
    REFRESH_RATE_OPTIONS.find((o) => o.value === refreshRate)?.short ?? refreshRate;
  // Helper function to refresh live data timestamps
  const refreshLiveData = useCallback(() => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id !== activeTabId) return tab;

        return {
          ...tab,
          contentItems: tab.contentItems.map((item) => {
            // Only update items with liveData
            if (!item.content?.liveData) return item;

            // Update the lastRefreshed timestamp
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });

            return {
              ...item,
              content: {
                ...item.content,
                lastRefreshed: timeString,
              },
            };
          }),
        };
      })
    );
  }, [activeTabId, setTabs]);
  // The split button's menu carries both halves of the schedule: whether it runs
  // at all, and how often. Picking a rate implies running — nobody chooses
  // "every 30 sec" to leave it paused — so it resumes too.
  const handleRefreshMenuChange = (changes: { type?: string; value?: string }) => {
    if (changes.type !== 'menuItem:click' || !changes.value) return;
    if (changes.value === 'toggle') {
      // Resuming a dashboard authored as manual has no rate to go back to, so
      // it starts on the default.
      if (!isAutoRefreshing && refreshRate === 'manual') setRefreshRate(REFRESH_RATE_DEFAULT);
      setIsAutoRefreshing(!isAutoRefreshing);
      return;
    }
    if (changes.value === 'refresh-now') {
      // Trigger an immediate refresh of live data
      refreshLiveData();
      return;
    }
    if (changes.value.startsWith('rate:')) {
      setRefreshRate(changes.value.slice('rate:'.length));
      setIsAutoRefreshing(true);
    }
  };
  const [showChartModal, setShowChartModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(dashboardTitle || initialData?.dashboardName || 'New dashboard');
  // Starring is a viewing-mode action — the star sits where the rename pencil
  // would be in edit mode.
  const [isStarred, setIsStarred] = useState(false);
  const displayProjectName = projectName || initialData?.projectName || 'My project';
  const displaySubprojectName = initialData?.subprojectName || 'Subproject';
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  // Picking a folder in the location menu leaves the builder and opens that
  // project in the library.
  const handleOpenLocation = (folderName: string) => {
    setIsLocationMenuOpen(false);
    onNavigateToProject?.(folderName);
  };
  // Every dashboard (new or opened) starts on the default filter row
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(DEFAULT_FILTERS);
  const [showEventFilter, setShowEventFilter] = useState(DEFAULT_SHOW_EVENT_FILTER);
  // Whether the row is still the one the dashboard opened with — what the Reset
  // button keys off.
  const isFilterStateDefault = isDefaultFilterState(activeFilters, showEventFilter);
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);
  const [isBookmarkModified, setIsBookmarkModified] = useState(false);
  const [showSaveBookmarkModal, setShowSaveBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');
  const [isSavingAsNew, setIsSavingAsNew] = useState(false);
  // The right-side panels are siblings of the canvas rather than overlays, so at
  // most one can be open — two 384px columns would leave the canvas too narrow to
  // be the thing you are editing. One piece of state rather than a boolean each,
  // so opening a panel closes whichever was open instead of stacking.
  const [openPanel, setOpenPanel] = useState<
    'layout' | 'contextGraph' | 'copilot' | 'versionHistory' | 'aiSummary' | null
  >(null);
  const showVersionHistory = openPanel === 'versionHistory';
  const showCopilot = openPanel === 'copilot';
  const showContextGraph = openPanel === 'contextGraph';
  const showLayoutSettings = openPanel === 'layout';
  // Toggling: clicking the button that opened a panel closes it again.
  const togglePanel = (panel: typeof openPanel) =>
    setOpenPanel((current) => (current === panel ? null : panel));
  // The copilot composer's text, held here rather than in the textarea, so an AI
  // summary's follow-up question can open the panel with the question already in
  // it and the viewer can edit before sending.
  const [copilotPrompt, setCopilotPrompt] = useState('');
  // Which widget copilot is pointed at, when it was opened from one. null means
  // the whole dashboard — the centre toolbar's button and an AI summary's
  // follow-up both open it that way.
  const [copilotSubjectId, setCopilotSubjectId] = useState<string | null>(null);
  // Which AI summary's settings drawer is open, by widget id rather than a boolean:
  // a dashboard can hold more than one summary, and the drawer has to know whose
  // settings it is editing. Which panel is open still lives in openPanel — this is
  // only the subject of the AI summary one.
  const [aiSummarySettingsItemId, setAiSummarySettingsItemId] = useState<string | null>(null);
  // Layout and appearance apply to the whole dashboard, so unlike a widget's
  // settings they live on the builder rather than travelling with an item.
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>(createLayoutSettings);
  // Dismissing the canvas tip is sticky for the session — it shouldn't come back
  // every time the user toggles out of and back into edit mode.
  const [tipDismissed, setTipDismissed] = useState(false);
  // The tools coachmark is for the moment an author first has tools to use, which
  // is either of the two ways into edit mode: a blank dashboard they just created
  // and so opens in edit mode, or switching a populated one from viewing to
  // editing. Both are the first time the tool row appears, and where it went is
  // the one thing worth saying. Not gated on how the dashboard arrived — the
  // author of an existing dashboard needs telling as much as the author of a new
  // one, and view mode never shows the row.
  //
  // Closing it is sticky for the session the same way the tip is — it is a
  // one-time introduction, so toggling out of edit mode and back must not bring
  // it back.
  const [toolsOnboardingDismissed, setToolsOnboardingDismissed] = useState(false);
  // The same one-time-per-session introduction for viewing mode's saved views
  // control. Sticky for the same reason: switching modes is not a request to be
  // told again.
  const [savedViewsOnboardingDismissed, setSavedViewsOnboardingDismissed] = useState(false);
  // Discarding throws away unsaved edits, so it asks first.
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // ---- Editing toolbar overflow -------------------------------------------
  // Two separate squeezes, measured together because they read the same atoms.
  // The floating toolbar is free to spend the whole width of the canvas it is
  // centred over, keeping FLOATING_TOOLBAR_SIDE_GAP clear of each edge; past that
  // it gives tools up one at a time, widest first — the tail of the insert tools,
  // then dev mode, then layout — and everything hidden is reachable from a menu
  // under a chevron standing in the tool row's own position. Separately, the
  // header's mode toggle sheds its label once the title and the actions come
  // within TOOLBAR_MIN_SIDE_GAP of each other.
  const headerTitleRef = useRef<HTMLDivElement | null>(null);
  const headerActionsRef = useRef<HTMLDivElement | null>(null);
  const headerToolbarSlotRef = useRef<HTMLDivElement | null>(null);
  const canvasToolbarSlotRef = useRef<HTMLDivElement | null>(null);
  const headerToolbarRef = useRef<HTMLDivElement | null>(null);
  const [visibleToolCount, setVisibleToolCount] = useState(toolbarItems.length);
  // Layout and dev mode are near the end of the queue: they aren't insert tools,
  // so they only fold once the insert tools are down to the first one — and then
  // singly, dev mode before layout, rather than the pair going at once.
  const [visibleTrailingCount, setVisibleTrailingCount] = useState(TOOLBAR_TRAILING_TOOLS);
  const [isToolOverflowMenuOpen, setIsToolOverflowMenuOpen] = useState(false);
  // Both modes: the Editing/Viewing toggle sheds its label as soon as the row
  // runs out of slack, before any tool folds. Its icon already says which mode
  // you are in and the tooltip carries the word, so the label is the cheapest
  // thing in the row to give up — and it buys back two tools' worth of room.
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  // How much of the strip is free to the left of the centred bar — what the
  // suggestion in the corner has to fit in. Measured with the rest of the row,
  // since it depends on the same two numbers: how wide the bar ended up and how
  // much strip it is centred in.
  const [suggestionRoom, setSuggestionRoom] = useState(SUGGESTION_MAX_WIDTH);
  // Under that it stacks above the bar instead, centred on it.
  const isSuggestionBeside = suggestionRoom >= SUGGESTION_SIDE_ROOM;

  useLayoutEffect(() => {
    const slot = headerToolbarSlotRef.current;
    if (!slot) return;

    const measure = () => {
      const toolbar = headerToolbarRef.current;

      // Read the atoms off the rendered toolbar instead of assuming px values:
      // the row is laid out in rem against a 14px root, and a browser zoom or a
      // theme change would move all of these.
      const toolbarStyle = toolbar ? getComputedStyle(toolbar) : null;
      const gap = (toolbarStyle && parseFloat(toolbarStyle.columnGap)) || TOOLBAR_FALLBACK_GAP;
      const padding = toolbarStyle
        ? (parseFloat(toolbarStyle.paddingLeft) || 0) + (parseFloat(toolbarStyle.paddingRight) || 0)
        : TOOLBAR_FALLBACK_PADDING;
      // Every button in the row is the same size, so the first one stands in for
      // all of them — including the chevron, which is one more of the same.
      const button = toolbar?.querySelector<HTMLElement>('[data-toolbar-button]');
      const buttonWidth = button?.getBoundingClientRect().width || TOOLBAR_FALLBACK_BUTTON;
      const divider = toolbar?.querySelector<HTMLElement>('[data-toolbar-divider]');
      const dividerWidth = divider
        ? divider.getBoundingClientRect().width +
          (parseFloat(getComputedStyle(divider).marginLeft) || 0) +
          (parseFloat(getComputedStyle(divider).marginRight) || 0)
        : TOOLBAR_FALLBACK_DIVIDER;

      // What the row would measure with `tools` insert tools and `trailing`
      // settings tools showing. The divider is a flex item too, so it carries a
      // gap on each side like the buttons do; the chevron appears the moment
      // anything is hidden, and takes a button's worth of room.
      const widthOf = (tools: number, trailing: number) => {
        const hasChevron = tools < toolbarItems.length || trailing < TOOLBAR_TRAILING_TOOLS;
        const buttons = tools + trailing + (hasChevron ? 1 : 0);
        const items = buttons + (trailing > 0 ? 1 : 0);
        return (
          padding +
          buttons * buttonWidth +
          (trailing > 0 ? dividerWidth : 0) +
          Math.max(0, items - 1) * gap
        );
      };

      // The slot is flex-1 from a 0 basis, so its width is whatever the title and
      // the actions leave. Its padding is the clearance, so the content box is
      // what the two sides have to spare.
      const slotStyle = getComputedStyle(slot);
      const room =
        slot.clientWidth -
        (parseFloat(slotStyle.paddingLeft) || 0) -
        (parseFloat(slotStyle.paddingRight) || 0);
      // The toggle is in the actions group, so its label is already priced into
      // the room measured above. Quote the with-label state off the one
      // measurement, or the two would chase each other: shedding the label widens
      // the slot, which would look like room for the label again.
      const roomWithLabel = isHeaderCompact ? room - MODE_TOGGLE_LABEL_WIDTH : room;
      setIsHeaderCompact(roomWithLabel <= 0);

      // The toolbar's own room is the strip it is centred in, less its clearance.
      const bar = canvasToolbarSlotRef.current;
      const barStyle = bar ? getComputedStyle(bar) : null;
      const barRoom = bar
        ? bar.clientWidth -
          (parseFloat(barStyle!.paddingLeft) || 0) -
          (parseFloat(barStyle!.paddingRight) || 0)
        : 0;

      // The suggestion sits in the corner the bar is centred away from, so what it
      // has to fit in is the half of the strip the centred bar doesn't use.
      const barWidth = toolbar?.getBoundingClientRect().width || 0;
      setSuggestionRoom(Math.max(0, (barRoom - barWidth) / 2));

      // Nothing folds while the whole row still fits.
      const wholeRow = toolbar ? widthOf(toolbarItems.length, TOOLBAR_TRAILING_TOOLS) : 0;
      if (!toolbar || wholeRow <= barRoom) {
        setVisibleToolCount(toolbarItems.length);
        setVisibleTrailingCount(TOOLBAR_TRAILING_TOOLS);
        return;
      }

      // Out of slack: one queue ordered widest first, so each further step of the
      // squeeze hides exactly one more thing — the tail of the insert tools, then
      // dev mode, then layout, and only then the first insert tool.
      const steps: Array<{ tools: number; trailing: number }> = [];
      for (let tools = toolbarItems.length; tools >= 1; tools--) {
        steps.push({ tools, trailing: TOOLBAR_TRAILING_TOOLS });
      }
      for (let trailing = TOOLBAR_TRAILING_TOOLS - 1; trailing >= 0; trailing--) {
        steps.push({ tools: 1, trailing });
      }
      steps.push({ tools: 0, trailing: 0 });

      const step =
        steps.find((candidate) => widthOf(candidate.tools, candidate.trailing) <= barRoom) ??
        steps[steps.length - 1];

      setVisibleToolCount(step.tools);
      setVisibleTrailingCount(step.trailing);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    if (headerTitleRef.current) observer.observe(headerTitleRef.current);
    if (headerActionsRef.current) observer.observe(headerActionsRef.current);
    if (canvasToolbarSlotRef.current) observer.observe(canvasToolbarSlotRef.current);
    return () => observer.disconnect();
  }, [isEditing, isHeaderCompact]);

  const overflowTools = toolbarItems.slice(visibleToolCount);

  // The two tools past the divider, in the order they give way — dev mode first,
  // since layout and appearance is the one an author actually keeps reaching for.
  // The row keeps the tooltip wording; the menu spells the label out in full.
  const trailingTools = [
    {
      id: 'layout',
      label: 'Edit layout and appearance',
      menuLabel: 'Layout and appearance',
      Icon: Palette,
      expanded: showLayoutSettings,
      onSelect: () => togglePanel('layout'),
    },
    {
      id: 'dev',
      label: 'Edit in dev mode',
      menuLabel: 'Dev mode',
      Icon: TerminalStroke,
      expanded: undefined,
      onSelect: () => console.log('Edit in dev mode'),
    },
  ];
  const visibleTrailingTools = trailingTools.slice(0, visibleTrailingCount);
  const overflowTrailingTools = trailingTools.slice(visibleTrailingCount);

  // Save dashboard modal (name / description / url / project)
  const [showSaveDashboardModal, setShowSaveDashboardModal] = useState(false);
  const [saveForm, setSaveForm] = useState({ name: '', description: '', url: '', projectId: '' });
  const [projectList, setProjectList] = useState<{ id: string; name: string }[]>([
    { id: 'proj-my-project', name: 'My project' },
    { id: 'proj-sales', name: 'Sales analytics' },
    { id: 'proj-support', name: 'Support insights' },
  ]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Link widget configuration modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkModalItemId, setLinkModalItemId] = useState<string | null>(null);

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const contentItems = activeTab?.contentItems || [];

  // Widgets flow on from the last one and wrap down the canvas, so once a
  // dashboard fills the viewport the next thing added lands below the fold: the
  // author clicks Report and nothing appears to happen. Follow whatever was just
  // added into view.
  //
  // Watching the item list rather than each add path means every route in behaves
  // the same — the floating toolbar, the report modal, a suggestion chip — and a
  // new one added later gets this for free. Two cases look like an add but
  // aren't: the first render of a dashboard that opens with content, and a tab
  // switch, which swaps the whole list. Both only reset the baseline.
  const seenCanvasItemsRef = useRef<{ tabId: string; ids: Set<string> } | null>(null);

  useEffect(() => {
    const previous = seenCanvasItemsRef.current;
    seenCanvasItemsRef.current = {
      tabId: activeTabId,
      ids: new Set(contentItems.map(item => item.id)),
    };
    if (!previous || previous.tabId !== activeTabId) return;

    const added = contentItems.filter(item => !previous.ids.has(item.id));
    if (added.length === 0) return;

    const scroller = canvasScrollRef.current;
    if (!scroller) return;

    // Two adds can land in one render pass — the suggestion chips sit side by
    // side — so aim at the lowest of them rather than the last in the list.
    const lowest = added.reduce(
      (furthest, item) => Math.max(furthest, item.position.y + item.size.height),
      0
    );
    const highest = added.reduce(
      (nearest, item) => Math.min(nearest, item.position.y),
      Infinity
    );
    const viewportBottom = scroller.scrollTop + scroller.clientHeight;

    // Only move if the widget isn't already fully in view: an add that lands on
    // screen shouldn't shift the canvas under the author. CANVAS_WIDGET_PADDING
    // is the gap the flow already leaves between widgets, so scrolling to it
    // leaves the same margin below the new one that it has from its neighbours.
    if (lowest + CANVAS_WIDGET_PADDING > viewportBottom) {
      scroller.scrollTo({
        top: lowest + CANVAS_WIDGET_PADDING - scroller.clientHeight,
        behavior: 'smooth',
      });
    } else if (highest - CANVAS_WIDGET_PADDING < scroller.scrollTop) {
      scroller.scrollTo({
        top: Math.max(0, highest - CANVAS_WIDGET_PADDING),
        behavior: 'smooth',
      });
    }
  }, [contentItems, activeTabId]);

  // Simulate data updates for real-time reports (with green dot) when auto-refresh is on
  useEffect(() => {
    if (!isAutoRefreshing) return;

    const interval = setInterval(() => {
      refreshLiveData();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isAutoRefreshing, activeTabId, refreshLiveData]);

  // Simulate data updates when filters are applied
  useEffect(() => {
    // Skip on initial mount with default filters
    if (isFilterStateDefault) return;

    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id !== activeTabId) return tab;

        return {
          ...tab,
          contentItems: tab.contentItems.map((item) => {
            // Update all report types
            if (item.type !== 'report' && item.type !== 'kpi' && item.type !== 'table') return item;

            // Update the lastRefreshed timestamp
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });

            return {
              ...item,
              content: {
                ...item.content,
                lastRefreshed: item.content?.liveData ? timeString : item.content?.lastRefreshed,
              },
            };
          }),
        };
      })
    );
  }, [activeFilters, activeTabId, isFilterStateDefault, setTabs]);

  // Resolved from the current tab's items, so the drawer closes on its own if the
  // summary it was editing is deleted or the author switches tabs.
  const aiSummarySettingsItem =
    isEditing && openPanel === 'aiSummary'
      ? contentItems.find(item => item.id === aiSummarySettingsItemId)
      : undefined;
  // Resolved the same way, so copilot falls back to the whole dashboard on its own
  // if the widget it was pointed at is deleted or the author switches tabs — a
  // panel still naming a widget that is gone would be pointed at nothing.
  const copilotSubject = copilotSubjectId
    ? contentItems.find(item => item.id === copilotSubjectId)
    : undefined;
  const copilotPlaceholder = copilotSubject
    ? `Ask copilot to edit ${copilotSubject.title}`
    : 'Ask copilot to edit this dashboard';

  // Mock saved filtered views. State rather than a const: the menu's save actions
  // write back into this list, and a view that didn't turn up in the menu after
  // being saved would read as the save having failed.
  const [savedFilteredViews, setSavedFilteredViews] = useState<SavedView[]>([
    // A regional manager's Monday-morning row: the week just gone, their region
    // only. Both chips are spelled out rather than leaning on the dashboard's
    // default date range — applying a view replaces the whole row, so a view that
    // named only the region would silently widen the window back to 30 days.
    {
      id: 'view-emea-weekly',
      name: 'EMEA weekly review',
      filters: [
        { id: 'f-emea-date', label: 'Date Range', value: 'Last 7 days', typeId: 'date-range' },
        { id: 'f-emea-region', label: 'Region', value: 'EMEA', typeId: 'region' },
      ],
    },
    { id: 'view-1', name: 'Q4 2024 Performance', filters: [{ id: 'f1', label: 'Time Period', value: 'Q4 2024', typeId: 'timeframe' }] },
    { id: 'view-2', name: 'North America Region', filters: [{ id: 'f2', label: 'Region', value: 'North America', typeId: 'region' }] },
    { id: 'view-3', name: 'Enterprise Customers', filters: [{ id: 'f3', label: 'Customer Segment', value: 'Enterprise', typeId: 'segment' }] },
  ]);

  // Mock version history data
  const versionHistory = [
    {
      id: 'v1',
      timestamp: '2024-02-25T14:30:00',
      user: 'Sarah Chen',
      action: 'Added bar chart',
      description: 'Added "Response Time by Channel" bar chart to Overview tab'
    },
    {
      id: 'v2',
      timestamp: '2024-02-25T13:45:00',
      user: 'Sarah Chen',
      action: 'Updated filters',
      description: 'Modified date range filter to include last 90 days'
    },
    {
      id: 'v3',
      timestamp: '2024-02-25T11:20:00',
      user: 'Michael Park',
      action: 'Added new tab',
      description: 'Created "Team Performance" tab with 3 charts'
    },
    {
      id: 'v4',
      timestamp: '2024-02-24T16:15:00',
      user: 'Sarah Chen',
      action: 'Removed chart',
      description: 'Removed "Outdated Metrics" line chart from Overview tab'
    },
    {
      id: 'v5',
      timestamp: '2024-02-24T10:00:00',
      user: 'Emily Rodriguez',
      action: 'Dashboard created',
      description: 'Initial dashboard creation with Overview tab'
    }
  ];

  const setContentItems = (items: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => {
    setTabs(prevTabs => prevTabs.map(tab => {
      if (tab.id === activeTabId) {
        return {
          ...tab,
          contentItems: typeof items === 'function' ? items(tab.contentItems) : items
        };
      }
      return tab;
    }));
  };

  // Compute a position for a new item so it sits next to the previous one
  // (flows left-to-right and wraps to a new row) instead of stacking on top.
  const CANVAS_MAX_WIDTH = 1200;
  // `items` defaults to current state, but callers that add inside a functional
  // setState pass the in-flight list so back-to-back adds don't both position
  // against the same stale array.
  const getNextPosition = (
    size: { width: number; height: number },
    items: ContentItem[] = contentItems
  ) => {
    if (items.length === 0) {
      return { x: CANVAS_WIDGET_PADDING, y: CANVAS_WIDGET_PADDING };
    }
    // Place to the right of the item with the largest right edge on the current top row
    const last = items[items.length - 1];
    const candidateX = last.position.x + last.size.width + CANVAS_WIDGET_PADDING;

    if (candidateX + size.width <= CANVAS_MAX_WIDTH) {
      return { x: candidateX, y: last.position.y };
    }

    // Wrap to a new row below the tallest item so far
    const nextRowY = items.reduce(
      (maxBottom, item) => Math.max(maxBottom, item.position.y + item.size.height),
      0
    ) + CANVAS_WIDGET_PADDING;
    return { x: CANVAS_WIDGET_PADDING, y: nextRowY };
  };

  // Where a newly added widget goes: an explicit point when one was given,
  // otherwise the next slot in the flow. The point is the widget's top-left,
  // pulled back inside the canvas when it is close enough to the right edge that
  // the widget would hang off it. Only x is clamped — the canvas scrolls down but
  // not sideways, so a low point is a real position.
  const resolvePosition = (
    size: { width: number; height: number },
    at: CanvasInsertAt,
    items?: ContentItem[]
  ) => {
    if (!at) return getNextPosition(size, items);
    return {
      x: Math.max(0, Math.min(at.x, at.bounds.width - size.width)),
      y: Math.max(0, at.y),
    };
  };

  const handleAddTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: DashboardTab = {
      id: newTabId,
      name: `Tab ${tabs.length + 1}`,
      contentItems: []
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  const handleRemoveTab = (tabId: string) => {
    if (tabs.length === 1) return; // Don't remove the last tab
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(updatedTabs[0].id);
    }
  };

  const handleStartEditingTabName = (tabId: string, currentName: string) => {
    setEditingTabId(tabId);
    setEditingTabName(currentName);
  };

  const handleSaveTabName = () => {
    if (editingTabId && editingTabName.trim()) {
      setTabs(prevTabs => prevTabs.map(tab => 
        tab.id === editingTabId 
          ? { ...tab, name: editingTabName.trim() }
          : tab
      ));
    }
    setEditingTabId(null);
    setEditingTabName('');
  };

  const handleCancelEditingTabName = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };


  // `at` is where the widget lands when the caller has a point in mind; without
  // it — which is every caller now — the widget flows on from the last one.
  const handleToolSelect = (toolId: string, at: CanvasInsertAt = null) => {
    if (toolId === 'chart') {
      pendingInsertAtRef.current = at;
      setShowReportsModal(true);
    } else if (toolId === 'image') {
      // Drop an empty image box onto the canvas with a drop/select placeholder
      const newItem: ContentItem = {
        id: `image-${Date.now()}`,
        type: 'image',
        position: resolvePosition({ width: 320, height: 220 }, at),
        size: { width: 320, height: 220 },
        title: 'Image',
        content: { imageUrl: null, style: { shadow: false, border: true, bgColor: '#ffffff' } }
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(newItem.id);
    } else if (toolId === 'text') {
      // Drop an editable text box next to the last element, ready to type
      const id = `text-${Date.now()}`;
      const newItem: ContentItem = {
        id,
        type: 'text',
        position: resolvePosition({ width: 260, height: 64 }, at),
        size: { width: 260, height: 64 },
        content: { text: '', align: 'left', bold: false, link: null, style: { shadow: false, border: true, bgColor: '#ffffff' } }
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
      setEditingTextId(id);
    } else if (toolId === 'separator') {
      // Drop a horizontal divider line onto the canvas
      const id = `separator-${Date.now()}`;
      const newItem: ContentItem = {
        id,
        type: 'separator',
        position: resolvePosition({ width: 320, height: 24 }, at),
        size: { width: 320, height: 24 },
        content: { style: { borderWidth: 2, borderColor: '#5C6970' } }
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
    } else if (toolId === 'section') {
      // Drop a blank rectangle: white background + stroke by default
      const id = `section-${Date.now()}`;
      const newItem: ContentItem = {
        id,
        type: 'section',
        position: resolvePosition({ width: 400, height: 240 }, at),
        size: { width: 400, height: 240 },
        content: { style: { shadow: false, border: true, borderColor: '#D8DCDE', borderWidth: 1, bgColor: '#FFFFFF' } }
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
    } else if (toolId === 'parameter') {
      // Drop a parameter control, ready for the author to name and give options.
      // The height is the 32px control plus an even 16px of padding and the 1px
      // border on each side, so the dropdown sits centred with equal breathing room.
      const id = `parameter-${Date.now()}`;
      const size = { width: 260, height: 66 };
      const newItem: ContentItem = {
        id,
        type: 'parameter',
        position: resolvePosition(size, at),
        size,
        title: 'Parameter',
        content: createParameterContent(),
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
    } else if (toolId === 'fetch') {
      // Drop a fetch block pointed at the default source; the author repoints it
      const id = `fetch-${Date.now()}`;
      const size = { width: 300, height: 108 };
      const newItem: ContentItem = {
        id,
        type: 'fetch',
        position: resolvePosition(size, at),
        size,
        title: 'Fetch',
        content: createFetchContent(),
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
    } else if (toolId === 'narrative') {
      // Drop an AI summary. It lands fully revealed — full width so the headline
      // has room to sit on one line beside its tags — and stays that way; there
      // is nothing to open. White on the same border as a report, because it is a
      // widget on the dashboard like any other: the tag in its corner says what
      // wrote it, and a tinted surface on top of that was styling the whole box to
      // make a point the tag already makes. An author can still tint it.
      const id = `narrative-${Date.now()}`;
      const size = { width: AI_SUMMARY_WIDTH, height: AI_SUMMARY_HEIGHT };
      const newItem: ContentItem = {
        id,
        type: 'chart',
        position: resolvePosition(size, at),
        size,
        title: 'AI summary',
        content: {
          ...createAiSummaryContent(),
          style: { shadow: false, border: true, borderColor: '#e4e6e8', borderWidth: 1, bgColor: '#ffffff' },
        },
      };
      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      setSelectedItemId(id);
    } else {
      setSelectedTool(toolId === selectedTool ? null : toolId);
    }
  };

  // Save / update / remove a link on a text item
  const handleSaveTextLink = (link: TextLink) => {
    if (textLinkModalItemId) {
      handleUpdateTextContent(textLinkModalItemId, { link });
    }
    setTextLinkModalItemId(null);
  };

  const handleRemoveTextLink = () => {
    if (textLinkModalItemId) {
      handleUpdateTextContent(textLinkModalItemId, { link: null });
    }
    setTextLinkModalItemId(null);
  };

  const handleUpdateTextContent = (itemId: string, patch: Record<string, any>) => {
    setContentItems(items =>
      items.map(i =>
        i.id === itemId ? { ...i, content: { ...i.content, ...patch } } : i
      )
    );
  };

  // A report summary's follow-up question hands off to copilot rather than
  // answering in place: the answer is a conversation, and copilot is where
  // conversations about this dashboard already happen. The question lands in the
  // composer instead of sending itself, so a viewer can edit it before asking.
  //
  // The dashboard-level AI summary widget no longer offers one — it is a reading
  // and nothing else — so this is the per-report band's affordance and copilot's
  // own suggestion pills.
  const handleAskCopilot = (question: string) => {
    setCopilotPrompt(question);
    setCopilotSubjectId(null);
    setOpenPanel('copilot');
  };

  // Pointing copilot at one widget. Opening from a widget's menu names that
  // widget as the subject rather than dropping "the ticket volume chart" into the
  // composer as text: the author already said which one by opening its menu, and
  // a prompt they then have to edit around is worse than an empty one. The panel
  // says what it is pointed at, and its suggestions are about that widget.
  const handleCreateWithCopilot = (item: any) => {
    setSelectedItemId(item.id);
    setCopilotSubjectId(item.id);
    setCopilotPrompt('');
    setOpenPanel('copilot');
  };

  // Turning a report's own summary on or off. The card grows to make room for the
  // band and shrinks back when it is removed, so the chart above it keeps the
  // space it had — a summary that appears by squeezing the chart it describes
  // would be a bad trade the author never agreed to.
  const handleToggleReportSummary = (item: any) => {
    const on = hasReportSummary(item.content);
    setContentItems(items =>
      items.map(i =>
        i.id === item.id
          ? {
              ...i,
              size: {
                ...i.size,
                height: on
                  ? Math.max(120, i.size.height - REPORT_SUMMARY_EXTRA_HEIGHT)
                  : i.size.height + REPORT_SUMMARY_EXTRA_HEIGHT,
              },
              content: {
                ...i.content,
                reportSummary: on ? { ...i.content?.reportSummary, enabled: false } : createReportSummary(i.title),
              },
            }
          : i
      )
    );
  };

  // An underlined claim in the summary opens the report it was read from. The
  // prototype has no report viewer wired to arbitrary names, so this logs the
  // report the same way the widget toolbar's "open report" does.
  const handleOpenAiSummarySource = (report: string) => {
    console.log('Open source report', report);
  };

  // "Copy text" copies the summary as it reads on screen — the headline, then each
  // section — because what people do with a summary is paste it into a ticket or a
  // channel. The source markup is stripped to its visible label: `[x](Report)`
  // means nothing outside this widget.
  const handleCopyAiSummaryText = (content: any) => {
    const plain = (s: string) => s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
    const lines: string[] = [];
    // "AI summary" leads the paste because on screen it is a tag in the corner —
    // pasted elsewhere there is no corner, and a takeaway with no attribution
    // reads as the paster's own conclusion.
    if (content?.takeaway?.text) {
      lines.push('AI summary');
      lines.push(plain(content.takeaway.text), '');
    }
    // Findings are pasted in the order they are ranked, each headline followed by
    // the paragraph that argues it — the ranking is the summary's main claim, and
    // a flat paste of nine sentences loses it.
    (content?.findings || []).forEach((finding: any) => {
      lines.push(finding.label);
      lines.push(plain(finding.headline));
      if (finding.insight) lines.push(plain(finding.insight));
      lines.push('');
    });
    const text = lines.join('\n').trim();
    // Clipboard writes reject outside a secure context, so a failure is logged
    // rather than left to an unhandled rejection.
    navigator.clipboard?.writeText(text).catch((error) => console.log('Copy failed', error));
    console.log('Copied AI summary text');
  };

  // Save the configured link back onto its widget, or drop the widget if the
  // modal is dismissed before a brand-new link was ever completed.
  const handleSaveLink = (content: LinkContent) => {
    if (linkModalItemId) {
      setContentItems(items =>
        items.map(i => (i.id === linkModalItemId ? { ...i, content } : i))
      );
    }
    setShowLinkModal(false);
    setLinkModalItemId(null);
  };

  const handleCloseLinkModal = () => {
    // Discard an empty, never-configured link widget on cancel
    if (linkModalItemId) {
      setContentItems(items =>
        items.filter(i => !(i.id === linkModalItemId && i.type === 'link' && !i.content?.label?.trim()))
      );
    }
    setShowLinkModal(false);
    setLinkModalItemId(null);
  };

  const handleEditLink = (itemId: string) => {
    setLinkModalItemId(itemId);
    setShowLinkModal(true);
  };

  // Pointer-based resize from any of the 8 handles (corners + edges).
  // `dir` encodes which edges move: n/s adjust top/height, w/e adjust left/width.
  const handleResizeStart = (
    e: React.MouseEvent,
    item: ContentItem,
    dir: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw',
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingItemId(item.id);
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = item.size.width;
    const startH = item.size.height || 64;
    const startLeft = item.position.x;
    const startTop = item.position.y;
    const MIN_W = 120;
    const MIN_H =
      item.type === 'separator' ? 24
      : item.type === 'text' ? 40
      : item.type === 'parameter' ? 66
      : item.type === 'fetch' ? 108
      : 100;

    const hasN = dir.includes('n');
    const hasS = dir.includes('s');
    const hasW = dir.includes('w');
    const hasE = dir.includes('e');

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      let newW = startW;
      let newH = startH;
      let newLeft = startLeft;
      let newTop = startTop;

      if (hasE) {
        newW = Math.max(MIN_W, startW + dx);
      } else if (hasW) {
        newW = Math.max(MIN_W, startW - dx);
        newLeft = startLeft + (startW - newW);
      }

      if (hasS) {
        newH = Math.max(MIN_H, startH + dy);
      } else if (hasN) {
        newH = Math.max(MIN_H, startH - dy);
        newTop = startTop + (startH - newH);
      }

      setContentItems(items =>
        items.map(i =>
          i.id === item.id
            ? {
                ...i,
                position: { x: newLeft, y: newTop },
                size: { width: newW, height: newH },
                content: { ...i.content, style: { ...(i.content?.style || {}), resized: true } },
              }
            : i
        )
      );
    };
    const onUp = () => {
      setResizingItemId(null);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Read a selected/dropped file into a data URL and store it on the image item
  const handleSetItemImage = (itemId: string, file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setContentItems(items =>
        items.map(i =>
          i.id === itemId
            ? { ...i, title: file.name, content: { ...i.content, imageUrl: dataUrl, fileName: file.name } }
            : i
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAddFilter = (filterTypeId: string) => {
    const filterType = filterOptions.find(f => f.id === filterTypeId);
    if (!filterType) return;

    // Add filter with first value as default
    const newFilter = {
      id: `filter-${Date.now()}`,
      label: filterType.label,
      value: filterType.values[0],
      typeId: filterTypeId
    };

    setActiveFilters([...activeFilters, newFilter]);
    if (activeBookmarkId) {
      setIsBookmarkModified(true);
    }
  };

  const handleUpdateFilterValue = (filterId: string, newValue: string) => {
    setActiveFilters(activeFilters.map(f =>
      f.id === filterId ? { ...f, value: newValue } : f
    ));
    if (activeBookmarkId) {
      setIsBookmarkModified(true);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    if (activeBookmarkId) {
      setIsBookmarkModified(true);
    }
  };

  // The cross filter chip is part of the row a view saves, so dismissing it
  // counts as editing that view — same as removing any other chip.
  const handleRemoveEventFilter = () => {
    setShowEventFilter(false);
    if (activeBookmarkId) {
      setIsBookmarkModified(true);
    }
  };

  // Back to the row the dashboard opened with, not to no filters at all: an empty
  // row is its own change from the default, and clearing to it would leave the
  // button on screen with nothing left for it to do.
  //
  // It drops the applied saved view with it. A view is a name for a particular
  // row, so once the row is back to the default the name no longer describes what
  // is on screen — leaving "EMEA weekly review" in the control over default
  // filters would misname the thing a viewer is reading. Reset is the way back to
  // the unfiltered, unnamed dashboard, so it clears both halves of where you were.
  const handleResetFilters = () => {
    setActiveFilters(DEFAULT_FILTERS);
    setShowEventFilter(DEFAULT_SHOW_EVENT_FILTER);
    setActiveBookmarkId(null);
    setIsBookmarkModified(false);
  };

  // Reloading in two stages: 'data' while the reports refetch, then 'summary'
  // while the AI summary is rewritten from what came back. One value rather than
  // two booleans, because the stages are sequential — nothing is ever in both.
  type ReloadPhase = 'idle' | 'data' | 'summary';
  const [reloadPhase, setReloadPhase] = useState<ReloadPhase>('idle');
  const reloadTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isReloading = reloadPhase !== 'idle';

  useEffect(() => () => reloadTimersRef.current.forEach(clearTimeout), []);

  // Dates every AI summary to now, across all tabs: the whole dashboard reloaded,
  // not just the tab that happened to be open.
  const stampSummariesRefreshed = () => {
    setTabs(prevTabs =>
      prevTabs.map(tab => ({
        ...tab,
        contentItems: tab.contentItems.map(item =>
          isAiSummaryChart(item.content?.chartType)
            ? {
                ...item,
                content: {
                  ...item.content,
                  freshness: { dataRefreshed: 'just now', summaryUpdated: 'just now' },
                },
              }
            : item
        ),
      }))
    );
  };

  // Applying a view changes what every widget is reading, so the dashboard has to
  // go and read it again. Without that the filter row changes and nothing else
  // does, which reads as the view not having applied — the numbers look like they
  // were already the answer.
  const simulateDashboardReload = () => {
    if (reloadTimersRef.current.length) {
      // A second view applied mid-reload restarts the run rather than racing the
      // first one's timers to 'idle'.
      reloadTimersRef.current.forEach(clearTimeout);
      reloadTimersRef.current = [];
    }
    setReloadPhase('data');
    reloadTimersRef.current = [
      setTimeout(() => setReloadPhase('summary'), RELOAD_DATA_MS),
      setTimeout(() => {
        setReloadPhase('idle');
        reloadTimersRef.current = [];
        // The summary's own footnote is how a reader dates it, so it has to move
        // when the summary is rewritten — a fresh summary still claiming it read
        // hour-old data is the one part of this that would be a lie.
        stampSummariesRefreshed();
      }, RELOAD_DATA_MS + RELOAD_SUMMARY_MS),
    ];
  };

  const handleApplySavedView = (viewId: string) => {
    const view = savedFilteredViews.find(v => v.id === viewId);
    if (view) {
      setActiveFilters(view.filters);
      setShowEventFilter(view.showEventFilter ?? DEFAULT_SHOW_EVENT_FILTER);
      setActiveBookmarkId(viewId);
      setIsBookmarkModified(false);
      simulateDashboardReload();
    }
  };

  // Deselect any active saved view (return to no view / empty selection)
  const handleClearSavedView = () => {
    setActiveBookmarkId(null);
    setIsBookmarkModified(false);
    setIsSavedViewsMenuOpen(false);
  };
  const [isSavedViewsMenuOpen, setIsSavedViewsMenuOpen] = useState(false);

  const handleDeleteBookmark = (viewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFilteredViews(views => views.filter(v => v.id !== viewId));
    // The filters stay on screen: deleting the view the row came from doesn't
    // undo the row, it just leaves it unnamed — the menu then offers to save it
    // again like any other unsaved row.
    if (activeBookmarkId === viewId) {
      setActiveBookmarkId(null);
      setIsBookmarkModified(false);
    }
  };

  // Overwrites the open view with the row as it stands now.
  const handleSaveBookmark = () => {
    if (!activeBookmarkId) return;
    setSavedFilteredViews(views =>
      views.map(v =>
        v.id === activeBookmarkId ? { ...v, filters: activeFilters, showEventFilter } : v
      )
    );
    setIsBookmarkModified(false);
  };

  // Both paths end in the name dialog — a new view needs a name, and the only
  // difference is what the dialog is for: naming the row you just built, or
  // branching off the view you have open without touching it.
  const handleSaveAsNewBookmark = () => {
    setIsSavingAsNew(true);
    setBookmarkName('');
    setShowSaveBookmarkModal(true);
  };

  const handleOpenSaveBookmarkModal = () => {
    setIsSavingAsNew(false);
    setBookmarkName('');
    setShowSaveBookmarkModal(true);
  };

  // The new view is applied as well as created: it holds the filters already on
  // screen, so selecting it changes nothing about the row — and leaving it
  // unselected would say the author is still looking at something unsaved.
  const handleConfirmSaveBookmark = () => {
    const name = bookmarkName.trim();
    if (!name) return;

    const view: SavedView = {
      id: `view-${Date.now()}`,
      name,
      filters: activeFilters,
      showEventFilter,
    };

    setSavedFilteredViews(views => [...views, view]);
    setActiveBookmarkId(view.id);
    setIsBookmarkModified(false);
    setShowSaveBookmarkModal(false);
    setBookmarkName('');
  };

  const handleReportSelect = (reportId: string) => {
    setShowReportsModal(false);
    const selectedReport = mockReports.find(r => r.id === reportId);
    // Consumed either way: a report picked through the toolbar has no click point,
    // and a stale one would drop the next report in the wrong place.
    const at = pendingInsertAtRef.current;
    pendingInsertAtRef.current = null;

    // Create KPI automated resolution time chart based on selected report
    const newItem: ContentItem = {
      id: `kpi-resolution-${Date.now()}`,
      type: 'chart',
      position: resolvePosition({ width: 350, height: 250 }, at),
      size: { width: 350, height: 250 },
      title: `${selectedReport?.name} - Resolution Time KPI`,
      content: {
        chartType: 'kpi-resolution-time',
        reportSource: selectedReport?.name,
        reportType: selectedReport?.type,
        kpiData: {
          averageResolutionTime: '2.3 hours',
          trend: '+12%',
          lastUpdated: selectedReport?.lastUpdated
        },
        // Reports default to a stroke/border with no drop shadow
        style: { shadow: false, border: true }
      }
    };

    // Added, not selected. A report's contextual toolbar carries the whole
    // cross-filtering panel, which is tall enough to cover the report it belongs
    // to — so opening it on add hides the thing the author just asked for. The
    // toolbar is a response to clicking a report, and nothing here is a click.
    setContentItems([...contentItems, newItem]);
  };

  const handleChartSelect = (chartType: string) => {
    setSelectedTool('chart');
    setShowChartModal(false);
    
    // Store the specific chart type for later use
    const newItem: ContentItem = {
      id: `${chartType}-${Date.now()}`,
      type: 'chart',
      position: getNextPosition({ width: 300, height: 200 }),
      size: { width: 300, height: 200 },
      title: chartTypes.find(c => c.id === chartType)?.name || 'Chart',
      content: { chartType, style: { shadow: false, border: true } }
    };

    setContentItems([...contentItems, newItem]);
    setSelectedTool(null);
  };

  // Applies a canvas suggestion, dropping its report through the same
  // getNextPosition flow as any manually added one.
  const handleSuggestionAction = (suggestion: SuggestionAction) => {
    const id = `${suggestion.id}-${Date.now()}`;

    // Functional update: the chips sit side by side, so two clicks can land in
    // one render pass — reading `contentItems` directly would drop the first
    // report and position the second on top of it.
    // Left unselected for the same reason as a report added through the modal:
    // the toolbar belongs to a click on the report, not to its arrival.
    setContentItems((prev) => [
      ...prev,
      { ...suggestion.report, id, position: getNextPosition(suggestion.report.size, prev) },
    ]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Clicking empty canvas deselects any active text editor / selected widget
    if (editingTextId) setEditingTextId(null);
    setSelectedItemId(null);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool) {
      const newItem: ContentItem = {
        id: `${selectedTool}-${Date.now()}`,
        type: selectedTool as any,
        position: { x, y },
        size: { width: 200, height: 100 },
        title: `New ${selectedTool}`,
        content: selectedTool === 'text' ? 'Enter your text here...' : undefined
      };

      setContentItems([...contentItems, newItem]);
      setSelectedTool(null);
      return;
    }

    // Past the selected-tool branch, a click on the background is just a click in
    // either mode: it deselects, and nothing opens over it. Widgets are added from
    // the floating toolbar, where the whole set of tools is already visible.
  };

  const handleOpenSaveDashboardModal = () => {
    // Prefill from the current dashboard state
    setSaveForm({
      name: editedTitle,
      description: '',
      url: '',
      projectId: projectList.find(p => p.name === displayProjectName)?.id || projectList[0]?.id || '',
    });
    setIsCreatingProject(false);
    setNewProjectName('');
    setShowSaveDashboardModal(true);
  };

  const handleCreateProject = () => {
    const name = newProjectName.trim();
    if (!name) return;
    const id = `proj-${Date.now()}`;
    setProjectList(prev => [...prev, { id, name }]);
    setSaveForm(f => ({ ...f, projectId: id }));
    setNewProjectName('');
    setIsCreatingProject(false);
  };

  const handleConfirmSaveDashboard = () => {
    if (!saveForm.name.trim()) return;
    const project = projectList.find(p => p.id === saveForm.projectId);
    const dashboardConfig = {
      title: saveForm.name.trim(),
      description: saveForm.description.trim(),
      url: saveForm.url.trim(),
      projectId: saveForm.projectId,
      projectName: project?.name || displayProjectName,
      contentItems,
      layout: 'canvas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEditedTitle(saveForm.name.trim());
    onUpdateTitle?.(saveForm.name.trim());
    onSave?.(dashboardConfig);
    // Saving picks a project, so the dashboard now has a location to show.
    setHasLocation(true);
    setShowSaveDashboardModal(false);
  };

  const formatTitle = (title: string) => {
    // Convert "New Dashboard" to breadcrumb format
    const parts = title.split(' ');
    return parts.length > 1 ? `${parts[0].toLowerCase()}1 / My Queries / ${parts.join('_').toLowerCase()}` : `path1 / My Queries / ${title.toLowerCase()}`;
  };

  // Viewing only: saved views leads the filter row, in the slot edit mode gives
  // the filter control. A view is a saved set of these filters, so it belongs to
  // the row it summarises rather than to the title — and an author in edit mode
  // is changing the dashboard itself, not picking a view.
  //
  // First element of the first row, inside the chips' wrapping flow: the row reads
  // left to right as view, then the filters it holds, then the reset that clears
  // them. Extracted to a const because that much JSX inline would bury the row's
  // structure.
  //
  // Collapsed to the bookmark alone while nothing is picked: the glyph is the
  // whole control, so it takes no more room than the filter icon it replaces, and
  // no chevron is needed to say a menu follows a lone icon in a toolbar. Choosing
  // a view is what earns the words — the control then grows to a chip naming what
  // is on screen, with the chevron for switching.
  //
  // A rule closes the slot either way: the chips after it are the filters
  // themselves, and without a divider a selected view reads as the first of them.
  //
  // What the foot of the menu can offer, which is never both at once:
  // - a view is open and the row has been edited since → write the changes back to
  //   it, or branch them off into a new view and leave it as it was
  // - no view is open and the row differs from the one the dashboard opens with →
  //   there is something worth keeping, so offer to name it
  // A row still at its default has nothing to save that reopening the dashboard
  // wouldn't give you back, so neither appears and the menu is just the list.
  const canUpdateSavedView = Boolean(activeBookmarkId) && isBookmarkModified;
  const canSaveNewView = !activeBookmarkId && !isFilterStateDefault;

  const savedViewsControl = !isEditing ? (
    // Held to the width of edit mode's wider control so the chips after it don't
    // shift. A selected view names itself and outgrows that on its own, at which
    // point the row moves because its content did.
    <div
      className="flex shrink-0 items-center gap-2"
      style={{ minWidth: FILTER_ROW_LEAD_WIDTH }}
    >
      <DropdownMenu open={isSavedViewsMenuOpen} onOpenChange={setIsSavedViewsMenuOpen}>
        {activeBookmarkId ? (
          /* A selected view fills the whole control light blue rather than
             tinting just the name, so the chip reads as one highlighted area. The
             fill is the whole shape — no border, which is what separates it from
             the bordered filter chips after the rule. The clear button sits with
             the chevron, next to the other affordance rather than in the label. */
          <div className="flex h-[32px] shrink-0 items-center gap-1 rounded-[8px] bg-[#e4eaf6] pl-2 pr-1.5">
            <Bookmark className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Saved views"
                className="flex items-center text-[12px] !font-normal !leading-[20px] text-[#2f3130]"
              >
                {savedFilteredViews.find(v => v.id === activeBookmarkId)?.name}
              </button>
            </DropdownMenuTrigger>
            <button
              type="button"
              aria-label="Clear saved view"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); handleClearSavedView(); }}
              className="flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-[#1f73b7]/15"
            >
              <X style={{ width: 12, height: 12 }} />
            </button>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Saved views" className="flex items-center">
                <ChevronDown className={FLORA_BAR_ICON} />
              </button>
            </DropdownMenuTrigger>
          </div>
        ) : (
          /* Borderless like edit mode's filter control beside it: the chips carry
             the borders in this row, and a framed button in front of them would
             read as another chip. */
          <FloraTooltip content="Saved views" placement="bottom-start" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Saved views"
                className={`w-[32px] shrink-0 !p-0 hover:bg-muted ${FLORA_BTN} !h-[32px] !rounded-[6px]`}
              >
                <Bookmark className={`${FLORA_HEADER_ICON} !text-[#646864]`} />
              </Button>
            </DropdownMenuTrigger>
          </FloraTooltip>
        )}
        {/* Anchored to the left: the trigger is the leftmost thing in the row, so
            the menu opens under it rather than reaching back across the bar. */}
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className={FLORA_MENU_TITLE}>
            Saved views
          </DropdownMenuLabel>
          {savedFilteredViews.length === 0 && (
            <div className="px-3 py-2">
              <MD tag="span" className="!text-muted-foreground">No saved views</MD>
            </div>
          )}
          {savedFilteredViews.map((view) => (
            <DropdownMenuItem
              key={view.id}
              onClick={() => handleApplySavedView(view.id)}
              // The applied view carries the same highlight in the menu as it
              // does in the chip, a step darker under the cursor so hovering the
              // row it is already on still responds.
              className={`flex items-center justify-between group ${activeBookmarkId === view.id ? 'bg-[#e4eaf6] focus:bg-[#d8e1f2] data-[highlighted]:bg-[#d8e1f2]' : ''}`}
            >
              <div className="flex items-center gap-2">
                {activeBookmarkId === view.id && (
                  <Check className={FLORA_MENU_ICON} />
                )}
                <MD tag="span" className={`!text-foreground ${activeBookmarkId === view.id ? '' : 'ml-6'}`}>{view.name}</MD>
              </div>
              <button
                onClick={(e) => handleDeleteBookmark(view.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
              >
                <Trash2 className={FLORA_MENU_ICON} />
              </button>
            </DropdownMenuItem>
          ))}
          {/* The save actions live under the list, behind a rule: the list is what
              you can switch to, and these act on the row you are looking at — an
              unruled item at the foot of the names would read as one more view.
              Never both sets at once, so the foot of the menu is one decision:
              which view to write to, or whether to keep this row at all. */}
          {(canUpdateSavedView || canSaveNewView) && <DropdownMenuSeparator />}
          {/* Wordy actions, no icons — like the dashboard's own Save as new in the
              header. The names above carry the check column, so these keep the
              same 24px indent: it is one column of text down the menu, rather
              than a section that starts further left than the list it follows. */}
          {canUpdateSavedView && (
            <>
              <DropdownMenuItem onClick={handleSaveBookmark}>
                <MD tag="span" className="ml-6 !text-foreground">Save</MD>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSaveAsNewBookmark}>
                <MD tag="span" className="ml-6 !text-foreground">Save as new</MD>
              </DropdownMenuItem>
            </>
          )}
          {canSaveNewView && (
            <DropdownMenuItem onClick={handleOpenSaveBookmarkModal}>
              <MD tag="span" className="ml-6 !text-foreground">Save view</MD>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <span aria-hidden="true" className={FILTER_ROW_LEAD_RULE} />
    </div>
  ) : null;

  return (
    <div className="h-full w-full flex gap-2 min-w-0">
      <div className="flex-1 min-w-0 flex flex-col bg-white rounded-[24px] overflow-hidden transition-all duration-300">
        {/* Header with breadcrumb navigation */}
        <div className="border-b border-border bg-white px-6 py-2">
          <div className="relative flex items-center justify-between">
            <div ref={headerTitleRef} className="flex shrink-0 items-center gap-3 group">
              {isEditingTitle && isEditing ? (
                <div className="flex items-center gap-1">
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onUpdateTitle?.(editedTitle);
                        setIsEditingTitle(false);
                      } else if (e.key === 'Escape') {
                        setEditedTitle(dashboardTitle || initialData?.dashboardName || 'New dashboard');
                        setIsEditingTitle(false);
                      }
                    }}
                    className="h-8 !text-base"
                    autoFocus
                  />
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => {
                      onUpdateTitle?.(editedTitle);
                      setIsEditingTitle(false);
                    }}
                    aria-label="Accept name"
                  >
                    <Check className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                  </IconButton>
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => {
                      setEditedTitle(dashboardTitle || initialData?.dashboardName || 'New dashboard');
                      setIsEditingTitle(false);
                    }}
                    aria-label="Cancel name edit"
                  >
                    <X className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                  </IconButton>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-base font-normal">
                  {hasLocation && (
                  <DropdownMenu open={isLocationMenuOpen} onOpenChange={setIsLocationMenuOpen}>
                    {/* The menu itself lists the breadcrumb trail, so the tooltip
                        only needs to name what the icon opens. */}
                    <FloraTooltip content="Location" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          // 32px matches the filter bar's icon box below, so the
                          // folder and filter glyphs share one left edge.
                          className="flex h-[32px] w-[32px] items-center justify-center rounded text-[#68737d] hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                          aria-label="Dashboard location"
                        >
                          <Folder className={FLORA_BAR_ICON} />
                        </button>
                      </DropdownMenuTrigger>
                    </FloraTooltip>
                    {/* No title row — the trigger's tooltip already names the menu,
                        so it stays compact: tighter padding and width to fit. */}
                    <DropdownMenuContent align="start" className="max-w-64 min-w-[10rem] !p-1">
                      {/* Parent folder */}
                      <DropdownMenuItem
                        onClick={() => handleOpenLocation(displayProjectName)}
                        className="flex items-center gap-2 cursor-pointer !px-2 !py-1"
                      >
                        <Folder className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground truncate">{displayProjectName}</MD>
                      </DropdownMenuItem>
                      {/* Subfolder — the elbow marks it as nested inside the folder above */}
                      <DropdownMenuItem
                        onClick={() => handleOpenLocation(displaySubprojectName)}
                        className="flex items-center gap-2 cursor-pointer !px-2 !py-1"
                      >
                        <span className="flex items-center gap-1 pl-3">
                          <NestedInParent className={FLORA_MENU_ICON} aria-hidden="true" />
                          <Folder className={FLORA_MENU_ICON} />
                        </span>
                        <MD tag="span" className="!text-foreground truncate">{displaySubprojectName}</MD>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  )}
                  {isEditing ? (
                    <span
                      className="group/name flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-1.5 py-0.5 rounded transition-colors"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      <span className="text-foreground">{editedTitle}</span>
                      <Edit2 className={`${FLORA_BAR_ICON} opacity-0 group-hover/name:opacity-100 transition-opacity`} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-1.5 py-0.5">
                      <span className="text-foreground">{editedTitle}</span>
                      <FloraTooltip
                        content={isStarred ? 'Remove from starred' : 'Add to starred'}
                        placement="bottom"
                        size="small"
                        appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                        zIndex={99999}
                      >
                        <button
                          type="button"
                          onClick={() => setIsStarred((prev) => !prev)}
                          aria-label={isStarred ? 'Remove from starred' : 'Add to starred'}
                          aria-pressed={isStarred}
                          // 28px, not h-6: at the 14px root that resolves to 21px,
                          // which leaves the 20px glyph no room for its hover fill.
                          className="ml-0.5 flex h-[28px] w-[28px] items-center justify-center rounded hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          {isStarred ? (
                            <Star className={FLORA_BAR_ICON} style={{ ...FLORA_BAR_ICON_SIZE, color: '#eba30b' }} />
                          ) : (
                            <StarStroke className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                          )}
                        </button>
                      </FloraTooltip>
                    </span>
                  )}
                </div>
              )}
            </div>
            {/* The room the title and the actions leave each other. The tools
                used to sit here; they now float over the canvas, so this is a
                plain spacer — but it is still what tells the mode toggle when the
                two sides have come close enough to shed its label. */}
            <div
              ref={headerToolbarSlotRef}
              className="flex flex-1 min-w-0 items-center justify-center overflow-hidden"
              style={{ paddingLeft: TOOLBAR_MIN_SIDE_GAP, paddingRight: TOOLBAR_MIN_SIDE_GAP }}
            />
            <div ref={headerActionsRef} className="flex shrink-0 items-center gap-2">
              {/* Viewing controls */}
              {!isEditing && (
                <>
                {/* Full screen belongs to reading, not authoring: it trades the
                    chrome for canvas, which only helps someone looking. */}
                <FloraTooltip content="Full screen" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => console.log('Maximise dashboard to full screen')}
                    aria-label="Full screen"
                    className="dashboard-icon-action"
                  >
                    <ArrowDiagonalOut className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                  </IconButton>
                </FloraTooltip>

                {/* Refresh, pause and the rate are one control — they are all
                    about the same thing, when this data updates. The divider
                    splits it where the meaning splits: fetching now is the glyph
                    on the left, one click and done, and everything about the
                    schedule is the half on the right — which carries the state it
                    governs, a green dot and the current rate while live, a pause
                    glyph and "Paused" while stopped. */}
                <SplitButton className="flora-split-button dashboard-refresh-split-button">
                  {/* Both halves name the data they act on: a dashboard also
                      holds historical data, which this control never touches, so
                      "refresh" on its own would overclaim. */}
                  <FloraTooltip content="Refresh real-time data now" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                    {/* Icon-only, so the divider lands immediately after the
                        glyph rather than after a label the schedule half owns. */}
                    <IconButton
                      size="small"
                      onClick={refreshLiveData}
                      aria-label="Refresh real-time data now"
                      className="dashboard-icon-action"
                    >
                      {/* Spins through a reload however it was started, so the
                          control that means "refresh" also reports one. */}
                      <ArrowRotateRight
                        className={`${FLORA_BAR_ICON} ${isReloading ? 'animate-spin' : ''}`}
                        style={FLORA_BAR_ICON_SIZE}
                      />
                    </IconButton>
                  </FloraTooltip>
                  <Menu
                    className="flora-split-button-menu"
                    placement="bottom-end"
                    hasArrow={false}
                    appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                    zIndex={9999}
                    onChange={handleRefreshMenuChange}
                    // The rate reads as the trigger's own label: it is what the
                    // menu behind it changes, so tapping the words that state the
                    // schedule is what opens the schedule.
                    button={(props) => (
                      <FloraTooltip content="Real-time data refresh" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                      <FloraButton
                        {...props}
                        size="small"
                        aria-label="Real-time data refresh"
                        className="dashboard-icon-action"
                      >
                        <span className="flex items-center gap-[6px]">
                          {isAutoRefreshing ? (
                            <span
                              aria-hidden="true"
                              // Static: the dot says the schedule is live, which
                              // is a steady fact. A pulse in a header bar reads
                              // as something wanting attention.
                              className="h-2 w-2 shrink-0 rounded-full bg-[#038153]"
                            />
                          ) : (
                            // Stopped is the state worth a glyph rather than a
                            // second colour of dot: a grey dot only means
                            // "not green", while the pause bars say which state
                            // this is on their own, and they match the Pause
                            // item in the menu behind the trigger. Sized to the
                            // dot it replaces so the label never shifts.
                            <PauseFill
                              aria-hidden="true"
                              className="!size-[12px] shrink-0 text-[#68737d]"
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                          <span className="whitespace-nowrap text-[12px] font-normal leading-4 text-[#2f3130]">
                            {isAutoRefreshing ? refreshRateShortLabel : 'Paused'}
                          </span>
                        </span>
                        <FloraButton.EndIcon>
                          <ChevronDown className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                        </FloraButton.EndIcon>
                      </FloraButton>
                      </FloraTooltip>
                    )}
                  >
                    {/* The rates lead: choosing one is what this menu is mostly
                        opened for. Paused is left out of them — it is the item
                        below, and offering it twice makes them look like two
                        settings.

                        The group's heading carries the menu's title and whose
                        setting it is. The title names the rates well enough on
                        its own, so they answer to it directly. `legend` is the
                        accessible name, which has to be a plain string;
                        `content` is what gets drawn, so both lines live there.

                        Scope sits directly under the title because it qualifies
                        the title, and it is read before any rate is picked: a
                        viewer changing the rate here changes it for themselves,
                        while the rate an author sets in edit mode is the
                        dashboard's own. Without it the two look like the same
                        control, and a viewer speeding it up would think they had
                        done it to everyone. */}
                    <ItemGroup
                      legend="Real-time data refresh rate"
                      content={
                        <span className="flex flex-col gap-[2px]">
                          <span className="text-[13px] font-semibold leading-[18px] text-foreground">
                            Real-time data refresh rate
                          </span>
                          <span className="text-[12px] font-normal leading-4 text-muted-foreground">
                            Only affects your view
                          </span>
                        </span>
                      }
                    >
                      {REFRESH_RATE_OPTIONS.filter((option) => option.value !== 'manual').map((option) => (
                        <Item
                          key={option.value}
                          value={`rate:${option.value}`}
                          // Always rendered, hidden when it isn't the current
                          // rate, so every label shares one left edge. Opacity
                          // is inline because Flora re-clones the icon it is
                          // given and drops utility classes it doesn't know.
                          icon={
                            <Check
                              className={FLORA_MENU_ICON}
                              style={{ opacity: refreshRate === option.value ? 1 : 0 }}
                            />
                          }
                        >
                          {option.label}
                        </Item>
                      ))}
                    </ItemGroup>
                    {/* Stopping the schedule isn't one of the rates, so it sits
                        under a rule at the foot of the menu: the action, not the
                        state — pause while it is running, resume while it is
                        stopped. */}
                    <FloraSeparator />
                    <Item
                      value="toggle"
                      icon={
                        isAutoRefreshing ? (
                          <Pause className={FLORA_MENU_ICON} />
                        ) : (
                          <Play className={FLORA_MENU_ICON} />
                        )
                      }
                    >
                      {isAutoRefreshing ? 'Pause refresh' : 'Resume refresh'}
                    </Item>
                    <Item
                      value="refresh-now"
                      icon={<ArrowRotateRight className={FLORA_MENU_ICON} />}
                    >
                      Refresh now
                    </Item>
                    {/* Everything above governs real-time data only; the rest of
                        the canvas is historical, on a daily job nobody can set
                        from here. So it closes as a footnote: the cadence alone,
                        which is the part that qualifies the rates above. The
                        last-run stamp stays in the author modal — in a menu
                        opened to change the schedule it is a second thing to
                        read that no choice here depends on.
                        An `li` because the menu is a `ul`; no `value`, so Garden
                        skips it when it collects the focusable items. */}
                    <FloraSeparator />
                    {/* 36px on the left is where Garden starts the group heading
                        above, which is the line this answers to — it is the
                        menu's own copy, not an item, so it shares the heading's
                        edge rather than the labels' icon-indented one. */}
                    <li role="presentation" className="py-2 pl-9 pr-3">
                      <span className="text-[12px] font-normal leading-4 text-[#68737d]">
                        {HISTORICAL_REFRESH_CADENCE}
                      </span>
                    </li>
                  </Menu>
                </SplitButton>
                </>
              )}
              {isEditing && (
                <div className="dashboard-history-actions flex items-center gap-0.5">
                  <FloraTooltip content="Undo" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                    <IconButton
                      isPill
                      size="small"
                      onClick={() => console.log('Undo action')}
                      aria-label="Undo"
                    >
                      <UndoReturn className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                    </IconButton>
                  </FloraTooltip>
                  <FloraTooltip content="Redo" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                    <IconButton
                      isPill
                      size="small"
                      onClick={() => console.log('Redo action')}
                      aria-label="Redo"
                    >
                      <RedoReturn className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                    </IconButton>
                  </FloraTooltip>
                </div>
              )}
              {/* The mode toggle keeps a fixed width so swapping the
                  Viewing/Editing label doesn't shift it. Narrow headers drop the
                  label; the tooltip then carries the word, so it is always
                  available even when the button is icon-only. */}
              <FloraTooltip
                content={isEditing ? 'Editing — switch to viewing' : 'Viewing — switch to editing'}
                placement="bottom"
                size="small"
                appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                zIndex={99999}
              >
                <FloraButton
                  isPill
                  size="small"
                  // Switching mode closes whatever panel is open. Most of them are
                  // about authoring and have no meaning to a reader, and the canvas
                  // is the thing that just changed — so the switch shows it in full
                  // rather than through a 384px slot.
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setOpenPanel(null);
                  }}
                  aria-label={isEditing ? 'Editing' : 'Viewing'}
                  className={isHeaderCompact ? 'dashboard-mode-toggle-compact' : 'dashboard-mode-toggle'}
                >
                  <FloraButton.StartIcon>
                    {isEditing ? (
                      <Edit2 className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                    ) : (
                      <EyeStroke className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                    )}
                  </FloraButton.StartIcon>
                  {!isHeaderCompact && (isEditing ? 'Editing' : 'Viewing')}
                </FloraButton>
              </FloraTooltip>
              {/* Save (editing) and Share (viewing) are the same fixed width and
                  share one slot, with an overflow menu always beside them — so
                  switching mode swaps labels without shifting anything. */}
              <div className="flex shrink-0 items-center gap-2">
              {isEditing ? (
              <SplitButton className="flora-split-button dashboard-primary-split-button">
                <FloraButton
                  isPrimary
                  isPill
                  size="small"
                  onClick={handleOpenSaveDashboardModal}
                >
                  Save
                </FloraButton>
                <Menu
                  className="flora-split-button-menu"
                  placement="bottom-end"
                  hasArrow={false}
                  appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                  zIndex={9999}
                  onChange={(changes) => {
                    if (changes.type !== 'menuItem:click' || !changes.value) return;
                    if (changes.value === 'save-as') {
                      console.log('Save as');
                    }
                  }}
                  button={(props) => (
                    <ChevronButton {...props} isPrimary isPill size="small" />
                  )}
                >
                  <Item value="save-as">
                    <MD tag="span" className="!text-foreground">Save as new</MD>
                  </Item>
                </Menu>
              </SplitButton>
              ) : (
              /* Share stands alone — its secondary actions moved out to the
                 overflow menu on the right. */
              <FloraButton
                isPrimary
                isPill
                size="small"
                className="dashboard-primary-action-button"
                onClick={() => console.log('Share dashboard')}
              >
                Share
              </FloraButton>
              )}
              {/* Overflow menu — mode-specific contents, but always present so
                  the slot beside the primary button never changes width. */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <DropdownMenu>
                  <FloraTooltip content="More options" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                    <DropdownMenuTrigger asChild>
                      <IconButton isPill size="small" aria-label="More dashboard options" className="shrink-0">
                        <MoreVertical className={FLORA_BAR_ICON} style={FLORA_BAR_ICON_SIZE} />
                      </IconButton>
                    </DropdownMenuTrigger>
                  </FloraTooltip>
                  <DropdownMenuContent align="end" className="w-52">
                    {isEditing ? (
                      <>
                        {/* Set once and rarely revisited, so it belongs here
                            rather than in a permanent slot in the header. */}
                        <DropdownMenuItem className="gap-2" onClick={handleOpenRefreshRateModal}>
                          <ArrowRotateRight className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Edit data refresh rate</MD>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2" onClick={() => setOpenPanel('versionHistory')}>
                          <History className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Version history</MD>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => setShowDiscardModal(true)}>
                          <UndoReturn className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Discard all edits</MD>
                        </DropdownMenuItem>
                        {/* Re-runs every report's query, for an author who has
                            just changed the data behind one of them. It sits with
                            discard because both put the canvas back in step with
                            what it is meant to be showing. */}
                        <DropdownMenuItem className="gap-2" onClick={() => console.log('Sync reports')}>
                          <RefreshCw className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Sync reports</MD>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => console.log('Archive')}>
                          <MD tag="span" className="!text-destructive">Archive</MD>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        {/* Context graph answers "where do these numbers come
                            from" — a question a reader asks occasionally, so it
                            lives here rather than taking a permanent slot in the
                            viewing chrome. */}
                        <DropdownMenuItem className="gap-2" onClick={() => setOpenPanel('contextGraph')}>
                          <FlowStroke className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Context graph</MD>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2" onClick={() => console.log('Export')}>
                          <Download className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Export</MD>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => console.log('Schedule delivery')}>
                          <Clock className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Schedule delivery</MD>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - Always visible */}
        {/* relative so the saved views coachmark can hang off the bar's own bottom
            edge; z-30 puts the bar (and so the card) over the tab strip and canvas
            below it, which the card overlaps by design. */}
        <div className="relative z-30 border-b border-border bg-white px-6 py-2">
          {/* Viewing mode's coachmark, below the bar and on the bookmark button's
              own gutter. Absolute against the bar rather than in the row, so a
              360px card can't wrap the filter chips onto a second line.
              Held 8px from the shell's edge rather than on the bar's own gutter, so
              the bookmark button's centre falls 29px into the card — past the
              rounded corner, which is the only place an arrow can meet a straight
              edge. Stated in px because the 14px root under-resolves rem, and this
              offset has to line up with a button measured in px. */}
          {!isEditing && !savedViewsOnboardingDismissed && (
            <div className="absolute left-[8px] top-full z-[140] pt-2">
              <SavedViewsOnboardingTooltip
                onDismiss={() => setSavedViewsOnboardingDismissed(true)}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            {savedViewsControl}
            {/* Editing only: one filter button, whose menu carries both the
                filters to add and the actions on the row — a lone icon needs no
                chevron to say a menu follows it, and the row's actions were the
                only thing the second half of the old split button held. Viewing
                leads the row with saved views instead, and closes it with reset. */}
            {isEditing && (
              <div
                className="flex h-[32px] shrink-0 items-center gap-2"
                // The same slot viewing mode's saved views control fills, to the
                // pixel: same button, same gap, same rule. The width is stated
                // rather than left to the content so resizing one mode's control
                // without the other can't shift the chips.
                style={{ minWidth: FILTER_ROW_LEAD_WIDTH }}
              >
                <AddFilterMenu
                  onAdd={handleAddFilter}
                  excludeTypeIds={activeFilters.map((f) => f.typeId)}
                  actions={[
                    { id: 'link-filters', label: 'Link filters', icon: Connector, onSelect: () => console.log('Link filters') },
                  ]}
                />
                <span aria-hidden="true" className={FILTER_ROW_LEAD_RULE} />
              </div>
            )}

            {activeFilters.map((filter) => (
              <DashboardActiveFilter
                key={filter.id}
                filter={filter}
                isEditing={isEditing}
                onUpdate={handleUpdateFilterValue}
                onRemove={handleRemoveFilter}
              />
            ))}

            {/* Event filter chip (from Figma) — sits next to the default time filter */}
            {showEventFilter && (
              <div className="inline-flex h-[32px] w-fit shrink-0 items-center gap-2 rounded-[8px] border border-[#dcdcda] bg-white px-2">
                <FloraTooltip content="Cross filter" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                  <span className="inline-flex shrink-0">
                    <CheckSquareStroke className="text-[#2f3130]" style={{ width: 16, height: 16 }} aria-hidden />
                  </span>
                </FloraTooltip>
                <MD tag="span" className={FILTER_ACTIVE_LABEL}>
                  Deal created
                </MD>
                <MD tag="span" className={FILTER_ACTIVE_VALUES}>
                  In admin
                </MD>
                <button
                  type="button"
                  aria-label="Remove filter"
                  onClick={handleRemoveEventFilter}
                  className="ml-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#68737d] transition-colors hover:bg-[#f0f0f0] hover:text-[#2f3130]"
                >
                  <X style={{ width: 12, height: 12 }} aria-hidden />
                </button>
              </div>
            )}

            {/* Viewing mode's only filter action. It follows the last chip
                rather than holding the right edge, so it stays next to the
                filters it clears however many rows they take — and it only
                appears once the row differs from the default it opened with, so
                it isn't offering to undo something nobody did — or once a saved
                view is applied, since reset drops that too and a view whose
                filters happen to match the default is still something to leave. */}
            {!isEditing && (!isFilterStateDefault || activeBookmarkId) && (
              <FloraTooltip content="Reset filters" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Reset filters"
                  onClick={handleResetFilters}
                  className={`shrink-0 gap-1.5 !px-2 hover:bg-muted ${FLORA_BTN} !h-[32px]`}
                >
                  <UndoReturn className={`${FLORA_HEADER_ICON} !text-[#646864]`} />
                  <MD tag="span" className="!text-[12px] !leading-[20px] !font-normal !text-[#2f3130]">Reset</MD>
                </Button>
              </FloraTooltip>
            )}
           </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tab-bar flex items-end min-h-[40px] border-b border-border bg-white px-6">
          <Tabs
            selectedItem={activeTabId}
            onChange={(item) => {
              if (!editingTabId && item) setActiveTabId(String(item));
            }}
          >
            <Tabs.TabList>
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.id} item={tab.id}>
                  {editingTabId === tab.id ? (
                    <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                      <Input
                        value={editingTabName}
                        onChange={(e) => setEditingTabName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveTabName();
                          } else if (e.key === 'Escape') {
                            handleCancelEditingTabName();
                          }
                        }}
                        // 14px, matching the tab label it replaces, so renaming a
                        // tab doesn't resize the text under the cursor.
                        className="h-6 w-32 !text-[14px] !leading-[20px]"
                        autoFocus
                        onBlur={handleSaveTabName}
                      />
                    </span>
                  ) : (
                    tab.name
                  )}
                </Tabs.Tab>
              ))}
              {isEditing && (
                <IconButton
                  size="small"
                  onClick={handleAddTab}
                  aria-label="Add tab"
                  className="dashboard-tab-add"
                >
                  <Plus className={`${FLORA_TAB_ADD_ICON} text-muted-foreground`} />
                </IconButton>
              )}
            </Tabs.TabList>
          </Tabs>
        </div>

        {/* Canvas Area. The scroll container is nested inside a static wrapper so
            the floating tip stays pinned to the corner as the canvas scrolls. */}
        <div className="relative flex-1 min-h-0">
          <div ref={canvasScrollRef} className="h-full overflow-auto" style={{ backgroundColor: CANVAS_BG }}>
          <div
            ref={canvasSurfaceRef}
            // Default cursor in both modes: the canvas isn't a place things get
            // dropped by clicking, so a crosshair promised an insert that no
            // longer happens.
            className="relative w-full h-full min-h-[600px]"
            style={{
              backgroundColor: CANVAS_BG,
              ...(isEditing
                ? {
                    backgroundImage: 'radial-gradient(#d1d5db 1.2px, transparent 1.2px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '10px 10px',
                  }
                : {}),
            }}
            onClick={handleCanvasClick}
          >
            {contentItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              </div>
            )}

            {/* Render content items */}
            {contentItems.map((item) => {
              // Text items render as a bare, editable box with a floating toolbar
              if (item.type === 'text') {
                const isTextEditing = editingTextId === item.id;
                // Selection is an authoring affordance — view mode never shows it
                const isTextSelected = isEditing && selectedItemId === item.id;
                const toolbarBelow = item.position.y < 60; // flip toolbar below when near the top
                const align = item.content?.align || 'left';
                const textSize = item.content?.fontSize || 16;
                const textColor = item.content?.color || '#2f3941';
                const clampSize = (n: number) => Math.max(8, Math.min(200, Math.round(n)));
                const alignIcon =
                  align === 'center' ? <AlignCenter className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  : align === 'right' ? <AlignRight className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  : <AlignLeft className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />;
                return (
                  <div
                    key={item.id}
                    className={`absolute group/text rounded-[16px] ${isTextSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.content?.style?.resized ? item.size.height : undefined,
                    }}
                    onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
                  >
                    {/* Floating contextual toolbar */}
                    {isEditing && (isTextEditing || isTextSelected) && (
                      <div
                        className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${toolbarBelow ? 'top-full mt-2' : '-top-12'}`}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <button
                          className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${item.content?.bold ? 'bg-muted' : 'hover:bg-muted'}`}
                          onClick={() => handleUpdateTextContent(item.id, { bold: !item.content?.bold })}
                          aria-label="Bold"
                        >
                          <Bold className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                        </button>
                        <button
                          className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${item.content?.underline ? 'bg-muted' : 'hover:bg-muted'}`}
                          onClick={() => handleUpdateTextContent(item.id, { underline: !item.content?.underline })}
                          aria-label="Underline"
                        >
                          <span className="text-sm font-medium leading-none text-foreground underline">U</span>
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 items-center gap-1 rounded-[8px] px-2 hover:bg-muted transition-colors"
                              aria-label="Text alignment"
                            >
                              <span className="text-foreground">{alignIcon}</span>
                              <ChevronDown className="size-[14px] shrink-0 text-muted-foreground" style={{ width: 14, height: 14 }} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleUpdateTextContent(item.id, { align: 'left' })}>
                              <AlignLeft className={FLORA_MENU_ICON} /> <MD tag="span" className="!text-foreground ml-2">Left</MD>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateTextContent(item.id, { align: 'center' })}>
                              <AlignCenter className={FLORA_MENU_ICON} /> <MD tag="span" className="!text-foreground ml-2">Center</MD>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateTextContent(item.id, { align: 'right' })}>
                              <AlignRight className={FLORA_MENU_ICON} /> <MD tag="span" className="!text-foreground ml-2">Right</MD>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />

                        {/* Font size selector */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 items-center gap-1 rounded-[8px] px-2 hover:bg-muted transition-colors"
                              aria-label="Text size"
                            >
                              <span className="text-sm leading-none text-foreground">{textSize}</span>
                              <ChevronDown className="size-[14px] shrink-0 text-muted-foreground" style={{ width: 14, height: 14 }} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="min-w-[64px] max-h-64 overflow-y-auto">
                            {[10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64].map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() => handleUpdateTextContent(item.id, { fontSize: clampSize(s) })}
                                className={textSize === s ? 'bg-muted' : ''}
                              >
                                <MD tag="span" className="!text-foreground">{s}</MD>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Text color */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 items-center gap-1 rounded-[8px] px-2 hover:bg-muted transition-colors"
                              aria-label="Text color"
                            >
                              <TextColor className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                              <ChevronDown className="size-[14px] shrink-0 text-muted-foreground" style={{ width: 14, height: 14 }} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56 p-3">
                            <span className="mb-2 block text-xs text-muted-foreground">Text color</span>
                            <div onClick={(e) => e.stopPropagation()}>
                              <FloraColorPicker
                                value={textColor}
                                onChange={(c) => handleUpdateTextContent(item.id, { color: c })}
                                palette={TEXT_STYLE_PALETTE}
                              />
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />

                        <Popover
                          open={textLinkModalItemId === item.id}
                          onOpenChange={(open) => setTextLinkModalItemId(open ? item.id : null)}
                        >
                          <PopoverTrigger asChild>
                            <button
                              className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${item.content?.link ? 'bg-muted' : 'hover:bg-muted'}`}
                              aria-label={item.content?.link ? 'Edit link' : 'Add link'}
                            >
                              <Link className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            side="bottom"
                            sideOffset={8}
                            collisionPadding={16}
                            className="w-80 max-h-[min(70vh,var(--radix-popover-content-available-height))] overflow-y-auto"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                          >
                            <TextLinkEditor
                              key={item.id + (item.content?.link ? '-edit' : '-new')}
                              initialLink={(item.content?.link as TextLink | null) || null}
                              onSave={handleSaveTextLink}
                              onRemove={handleRemoveTextLink}
                            />
                          </PopoverContent>
                        </Popover>

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] hover:bg-muted transition-colors"
                          onClick={() => handleUpdateTextContent(item.id, { list: !item.content?.list })}
                          aria-label="Bulleted list"
                        >
                          <List className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                        </button>

                        <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />

                        {(() => {
                          const ts = item.content?.style || {};
                          const sShadow = ts.shadow === true;
                          const sBorder = ts.border === true;
                          const sBorderColor = ts.borderColor || '#e5e7eb';
                          const sBorderWidth = ts.borderWidth ?? 1;
                          const sBg = ts.bgColor || 'transparent';
                          const patchStyle = (patch: Record<string, any>) =>
                            handleUpdateTextContent(item.id, { style: { ...ts, ...patch } });
                          return (
                            <>
                              {/* Component background */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sBg !== 'transparent' ? 'bg-muted' : 'hover:bg-muted'}`}
                                    aria-label="Component background"
                                  >
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#dcdcda]" style={{ backgroundColor: sBg === 'transparent' ? '#ffffff' : sBg }} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 p-3">
                                  <span className="mb-2 block text-xs text-muted-foreground">Background</span>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <FloraColorPicker value={sBg} onChange={(c) => patchStyle({ bgColor: c })} allowTransparent palette={TEXT_STYLE_PALETTE} />
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* Drop shadow toggle */}
                              <button
                                className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sShadow ? 'bg-muted' : 'hover:bg-muted'}`}
                                onClick={() => patchStyle({ shadow: !sShadow })}
                                aria-label="Drop shadow"
                                aria-pressed={sShadow}
                              >
                                <Sun className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                              </button>

                              {/* Border: toggle + weight + color */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    className={`flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${sBorder ? 'bg-muted' : 'hover:bg-muted'}`}
                                    aria-label="Border"
                                  >
                                    <StopStroke className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 p-3 space-y-3">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-muted-foreground">Border</span>
                                    <button
                                      role="switch"
                                      aria-checked={sBorder}
                                      aria-label="Toggle border"
                                      onClick={(e) => { e.stopPropagation(); patchStyle({ border: !sBorder }); }}
                                      className={`relative h-5 w-9 rounded-full transition-colors ${sBorder ? 'bg-[#1f73b7]' : 'bg-[#dcdcda]'}`}
                                    >
                                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${sBorder ? 'left-[18px]' : 'left-0.5'}`} />
                                    </button>
                                  </div>
                                  <div className={`space-y-3 ${sBorder ? '' : 'opacity-40 pointer-events-none'}`}>
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-xs text-muted-foreground">Weight</span>
                                      <div className="flex items-center rounded-[8px] border border-[#dcdcda]" onClick={(e) => e.stopPropagation()}>
                                        <input
                                          type="number"
                                          min={1}
                                          max={20}
                                          value={sBorderWidth}
                                          onChange={(e) => {
                                            const n = parseInt(e.target.value, 10);
                                            if (!Number.isNaN(n)) patchStyle({ border: true, borderWidth: Math.max(1, Math.min(20, n)) });
                                          }}
                                          className="h-7 w-12 rounded-[8px] bg-transparent px-2 text-sm text-foreground [appearance:textfield] focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                          aria-label="Border weight in pixels"
                                        />
                                        <span className="pr-2 text-xs text-muted-foreground">px</span>
                                      </div>
                                    </div>
                                    <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                      <span className="text-xs text-muted-foreground">Border color</span>
                                      <FloraColorPicker value={sBorderColor} onChange={(c) => patchStyle({ border: true, borderColor: c })} palette={TEXT_STYLE_PALETTE} />
                                    </div>
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* Delete component */}
                              <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-[#c72a1c]/10"
                                onClick={(e) => { e.stopPropagation(); setContentItems(items => items.filter(i => i.id !== item.id)); }}
                                aria-label="Delete component"
                              >
                                <Trash2 className="size-[16px] shrink-0" style={{ width: 16, height: 16, color: '#c72a1c' }} />
                              </button>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Editable text field */}
                    {(() => {
                      const ts = item.content?.style || {};
                      const tShadow = ts.shadow === true; // text default OFF (bare text)
                      const tBorder = ts.border === true; // text default OFF
                      const tBorderColor = ts.borderColor || '#e5e7eb';
                      const tBorderWidth = ts.borderWidth ?? 1;
                      const tBg = ts.bgColor && ts.bgColor !== 'transparent' ? ts.bgColor : undefined;
                      // A linked text block is only navigable in view mode. In edit
                      // mode it stays a plain field — the author is writing in it, so
                      // the click belongs to the caret and the right-click menu is
                      // the field's own — and the destination is reached through the
                      // toolbar's link editor instead.
                      const textLink = (item.content?.link as TextLink | null) || null;
                      const linkIsLive = !isEditing && !!textLink;
                      return (
                        <textarea
                          value={item.content?.text || ''}
                          readOnly={!isEditing}
                          onChange={(e) => handleUpdateTextContent(item.id, { text: e.target.value })}
                          onFocus={() => setEditingTextId(item.id)}
                          onClick={(e) => {
                            if (!linkIsLive) return;
                            // A click that ends a selection is a reader copying the
                            // text, not following it.
                            const field = e.currentTarget;
                            if (field.selectionStart !== field.selectionEnd) return;
                            openLinkDestination(textLink!);
                          }}
                          onKeyDown={(e) => {
                            if (!linkIsLive || e.key !== 'Enter') return;
                            e.preventDefault();
                            openLinkDestination(textLink!);
                          }}
                          title={
                            linkIsLive
                              ? textLink!.linkType === 'hyperlink'
                                ? linkHref(textLink!.url) || 'URL'
                                : [textLink!.assetName, textLink!.tabName].filter(Boolean).join(' · ') ||
                                  'Asset link'
                              : undefined
                          }
                          placeholder="Add text"
                          autoFocus={isTextEditing}
                          rows={1}
                          className={`w-full resize-none rounded-[16px] px-3 py-2 leading-snug text-foreground placeholder:text-[#a3a3a3] focus:outline-none transition-colors ${ts.resized ? 'h-full' : ''} ${
                            linkIsLive ? 'cursor-pointer' : ''
                          } ${
                            isTextEditing ? 'ring-1 ring-[#1f73b7] shadow-[0_0_0_2px_rgba(31,115,183,0.15)]' : ''
                          } ${item.content?.fontWeight ? '' : item.content?.bold ? 'font-semibold' : 'font-normal'}`}
                          style={{
                            textAlign: (item.content?.align || 'left') as any,
                            textDecoration: (item.content?.underline || item.content?.link) ? 'underline' : 'none',
                            fontSize: `${item.content?.fontSize || 16}px`,
                            // An explicit weight wins over the bold toggle, so a
                            // heading can sit at medium instead of semibold.
                            fontWeight: item.content?.fontWeight,
                            color: item.content?.color || (item.content?.link ? '#1f73b7' : undefined),
                            backgroundColor: tBg,
                            border: tBorder ? `${tBorderWidth}px solid ${tBorderColor}` : (isTextEditing ? undefined : '1px solid transparent'),
                            boxShadow: tShadow && !isTextEditing ? '0 4px 16px rgba(0,0,0,0.08)' : undefined,
                          }}
                        />
                      );
                    })()}
                    {isEditing && isTextSelected && (
                      <ResizeHandles onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                    )}
                  </div>
                );
              }
              // A parameter is live in both modes: a reader picks a value, an
              // author additionally gets the style toolbar and a rename field.
              if (item.type === 'parameter') {
                const pStyle = item.content?.style || {};
                const pBorder = pStyle.border !== false;
                const isPSelected = isEditing && selectedItemId === item.id;
                const controlType = item.content?.controlType || 'select';
                const options: string[] = item.content?.options || [];
                const patch = (p: Record<string, any>) => handleUpdateTextContent(item.id, p);
                return (
                  <div
                    key={item.id}
                    className={`absolute flex flex-col justify-center gap-1.5 rounded-[12px] p-4 ${pStyle.shadow === true ? 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]' : ''} ${isPSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.size.height,
                      backgroundColor: pStyle.bgColor || '#ffffff',
                      border: pBorder ? `${pStyle.borderWidth ?? 1}px solid ${pStyle.borderColor || '#d8dcde'}` : 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
                  >
                    {controlType === 'buttons' ? (
                      <div className="flex min-w-0 flex-wrap items-center gap-1">
                        {options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); patch({ value: opt }); }}
                            className={`h-7 shrink-0 rounded-full px-2.5 text-[12px] leading-4 transition-colors ${
                              item.content?.value === opt
                                ? 'bg-[#1f73b7] text-white'
                                : 'border border-[#dcdcda] bg-white text-[#2f3130] hover:bg-[#f8f9f9]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : controlType === 'number' ? (
                      <input
                        type="number"
                        value={item.content?.numberValue ?? 0}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const n = parseInt(e.target.value, 10);
                          if (!Number.isNaN(n)) patch({ numberValue: n });
                        }}
                        aria-label={item.content?.name || 'Parameter'}
                        className="h-8 w-full rounded-[6px] border border-[#dcdcda] bg-white px-2 text-sm text-[#2f3130] [appearance:textfield] focus:border-[#1f73b7] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={item.content?.name || 'Parameter'}
                            className="flex h-8 w-full items-center justify-between gap-2 rounded-[6px] border border-[#dcdcda] bg-white px-2 text-sm text-[#2f3130] transition-colors hover:bg-[#f8f9f9]"
                          >
                            <span className="truncate">{item.content?.value || 'Select…'}</span>
                            <ChevronDown className="!size-[12px] shrink-0 !text-[#646864]" aria-hidden />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48" onClick={(e) => e.stopPropagation()}>
                          {options.map((opt) => (
                            <DropdownMenuItem key={opt} className="gap-2" onClick={() => patch({ value: opt })}>
                              <span className="flex w-4 shrink-0 items-center justify-center">
                                {item.content?.value === opt && (
                                  <Check className={FLORA_MENU_ICON} style={{ width: 14, height: 14 }} />
                                )}
                              </span>
                              <MD tag="span" className="!text-foreground">{opt}</MD>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {isEditing && isPSelected && (
                      <ResizeHandles onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                    )}
                    {isEditing && isPSelected && (
                      <div
                        className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${item.position.y < 60 ? 'top-full mt-2' : '-top-12'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          value={item.content?.name || ''}
                          onChange={(e) => patch({ name: e.target.value })}
                          placeholder="Name"
                          aria-label="Parameter name"
                          className="h-8 w-28 rounded-[8px] border border-[#dcdcda] px-2 text-sm text-foreground focus:border-[#1f73b7] focus:outline-none"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label="Control type"
                              className="flex h-8 items-center gap-1 rounded-[8px] px-2 text-sm text-foreground transition-colors hover:bg-muted"
                            >
                              <span className="text-xs text-muted-foreground">
                                {PARAMETER_CONTROL_TYPES.find((c) => c.id === controlType)?.label}
                              </span>
                              <ChevronDown className="!size-[12px] shrink-0 !text-[#646864]" aria-hidden />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-44" onClick={(e) => e.stopPropagation()}>
                            {PARAMETER_CONTROL_TYPES.map((c) => (
                              <DropdownMenuItem key={c.id} className="gap-2" onClick={() => patch({ controlType: c.id })}>
                                <span className="flex w-4 shrink-0 items-center justify-center">
                                  {controlType === c.id && (
                                    <Check className={FLORA_MENU_ICON} style={{ width: 14, height: 14 }} />
                                  )}
                                </span>
                                <MD tag="span" className="!text-foreground">{c.label}</MD>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="mx-0.5 h-5 w-px shrink-0 bg-[#dcdcda]" aria-hidden />
                        <WidgetStyleControls
                          style={item.content?.style}
                          defaultBorderOn
                          onChange={(sp) => patch({ style: { ...(item.content?.style || {}), ...sp } })}
                          onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                        />
                      </div>
                    )}
                  </div>
                );
              }
              // A fetch block names its source and reports the last pull. The
              // refresh is live in both modes — a reader can re-pull the data.
              if (item.type === 'fetch') {
                const fStyle = item.content?.style || {};
                const fBorder = fStyle.border !== false;
                const isFSelected = isEditing && selectedItemId === item.id;
                const isLoading = item.content?.status === 'loading';
                const source = FETCH_SOURCES.find((s) => s.id === item.content?.sourceId);
                const patch = (p: Record<string, any>) => handleUpdateTextContent(item.id, p);
                return (
                  <div
                    key={item.id}
                    className={`absolute flex flex-col gap-2 rounded-[12px] px-3 py-2.5 ${fStyle.shadow === true ? 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]' : ''} ${isFSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.size.height,
                      backgroundColor: fStyle.bgColor || '#ffffff',
                      border: fBorder ? `${fStyle.borderWidth ?? 1}px solid ${fStyle.borderColor || '#d8dcde'}` : 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="ml-auto shrink-0 rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[11px] leading-4 text-[#68737d]">
                        {isLoading ? 'Fetching…' : `${(item.content?.rows ?? 0).toLocaleString()} rows`}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Data source"
                          className="flex h-8 w-full items-center justify-between gap-2 rounded-[6px] border border-[#dcdcda] bg-white px-2 text-sm text-[#2f3130] transition-colors hover:bg-[#f8f9f9]"
                        >
                          <span className="truncate">{source?.label || 'Choose a source…'}</span>
                          <ChevronDown className="!size-[12px] shrink-0 !text-[#646864]" aria-hidden />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-60" onClick={(e) => e.stopPropagation()}>
                        {FETCH_SOURCES.map((s) => (
                          <DropdownMenuItem key={s.id} className="gap-2" onClick={() => patch({ sourceId: s.id })}>
                            <span className="flex w-4 shrink-0 items-center justify-center">
                              {item.content?.sourceId === s.id && (
                                <Check className={FLORA_MENU_ICON} style={{ width: 14, height: 14 }} />
                              )}
                            </span>
                            <MD tag="span" className="!text-foreground">{s.label}</MD>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex min-w-0 items-center gap-1.5">
                      <MD tag="span" className="!text-[12px] !text-muted-foreground truncate">
                        Last fetched {item.content?.lastFetched}
                      </MD>
                      <FloraTooltip content="Fetch now" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                        <button
                          type="button"
                          aria-label="Fetch now"
                          disabled={isLoading}
                          onClick={(e) => {
                            e.stopPropagation();
                            patch({ status: 'loading' });
                            // The prototype has no backend, so the pull is staged
                            // — long enough to read as work, short enough to wait.
                            window.setTimeout(() => {
                              handleUpdateTextContent(item.id, { status: 'idle', lastFetched: 'Just now' });
                            }, 1200);
                          }}
                          className="ml-auto flex h-7 shrink-0 items-center gap-1 rounded-[6px] px-2 text-[12px] text-[#2f3130] transition-colors hover:bg-[#f8f9f9] disabled:opacity-40"
                        >
                          <ArrowRotateRight
                            className={`${FLORA_ICON} ${isLoading ? 'animate-spin' : ''}`}
                            style={{ width: 14, height: 14 }}
                          />
                        </button>
                      </FloraTooltip>
                    </div>

                    {isEditing && isFSelected && (
                      <ResizeHandles onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                    )}
                    {isEditing && isFSelected && (
                      <div
                        className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${item.position.y < 60 ? 'top-full mt-2' : '-top-12'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WidgetStyleControls
                          style={item.content?.style}
                          defaultBorderOn
                          onChange={(sp) => patch({ style: { ...(item.content?.style || {}), ...sp } })}
                          onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                        />
                      </div>
                    )}
                  </div>
                );
              }
              if (item.type === 'section') {
                const secStyle = item.content?.style || {};
                const secShadow = secStyle.shadow === true;
                const secBorder = secStyle.border !== false;
                const secBorderColor = secStyle.borderColor || '#D8DCDE';
                const secBorderWidth = secStyle.borderWidth ?? 1;
                const secBg = secStyle.bgColor || '#FFFFFF';
                const isSecSelected = isEditing && selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`absolute group/section rounded-[16px] ${secShadow ? 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]' : ''} ${isSecSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.size.height,
                      backgroundColor: secBg,
                      border: secBorder ? `${secBorderWidth}px solid ${secBorderColor}` : 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
                  >
                    {isEditing && isSecSelected && (
                      <ResizeHandles onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                    )}
                    {isEditing && isSecSelected && (
                      <div
                        className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${item.position.y < 60 ? 'top-full mt-2' : '-top-12'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WidgetStyleControls
                          style={item.content?.style}
                          defaultBorderOn
                          onChange={(patch) => handleUpdateTextContent(item.id, { style: { ...(item.content?.style || {}), ...patch } })}
                          onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                        />
                      </div>
                    )}
                  </div>
                );
              }
              if (item.type === 'separator') {
                const sepStyle = item.content?.style || {};
                const sepWeight = sepStyle.borderWidth ?? 2;
                const sepColor = sepStyle.borderColor || '#5C6970';
                const isSepSelected = isEditing && selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`absolute group/sep flex items-center rounded-[4px] ${isSepSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.size.height,
                    }}
                    onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
                  >
                    <div
                      className="w-full rounded-full"
                      style={{ height: sepWeight, backgroundColor: sepColor }}
                    />
                    {isEditing && isSepSelected && (
                      <ResizeHandles horizontalOnly onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                    )}
                    {isEditing && isSepSelected && (
                      <div
                        className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${item.position.y < 60 ? 'top-full mt-2' : '-top-12'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Weight */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 items-center gap-1 rounded-[8px] px-2 text-sm text-foreground transition-colors hover:bg-muted"
                              aria-label="Line weight"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="inline-block w-5 rounded-full" style={{ height: Math.min(sepWeight, 6), backgroundColor: '#1C2227' }} />
                              <span className="text-xs text-muted-foreground">{sepWeight}px</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56 p-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs text-muted-foreground">Weight</span>
                              <div className="flex items-center rounded-[8px] border border-[#dcdcda]" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="number"
                                  min={1}
                                  max={20}
                                  value={sepWeight}
                                  onChange={(e) => {
                                    const n = parseInt(e.target.value, 10);
                                    if (!Number.isNaN(n)) handleUpdateTextContent(item.id, { style: { ...sepStyle, borderWidth: Math.max(1, Math.min(20, n)) } });
                                  }}
                                  className="h-7 w-12 rounded-[8px] bg-transparent px-2 text-sm text-foreground [appearance:textfield] focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  aria-label="Line weight in pixels"
                                />
                                <span className="pr-2 text-xs text-muted-foreground">px</span>
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Color */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-muted"
                              aria-label="Line color"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#dcdcda]" style={{ backgroundColor: sepColor }} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56 p-3" onClick={(e) => e.stopPropagation()}>
                            <span className="mb-2 block text-xs text-muted-foreground">Color</span>
                            <div onClick={(e) => e.stopPropagation()}>
                              <FloraColorPicker value={sepColor} onChange={(c) => handleUpdateTextContent(item.id, { style: { ...sepStyle, borderColor: c } })} palette={TEXT_STYLE_PALETTE} />
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Delete */}
                        <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-[#c72a1c]/10"
                          onClick={(e) => { e.stopPropagation(); setContentItems(items => items.filter(i => i.id !== item.id)); }}
                          aria-label="Delete line"
                        >
                          <Trash2 className="size-[16px] shrink-0" style={{ width: 16, height: 16, color: '#c72a1c' }} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              if (item.type === 'link') {
                const lc: LinkContent = { ...createDefaultLinkContent(), ...(item.content || {}) };
                const fmt = { ...createDefaultLinkContent().format, ...(lc.format || {}) };
                const linkStyle: React.CSSProperties = {
                  fontFamily: fmt.fontStyle === 'Default' ? undefined : fmt.fontStyle,
                  fontSize: `${fmt.fontSize}px`,
                  color: fmt.color,
                  backgroundColor:
                    fmt.highlight && fmt.highlight !== 'transparent' ? fmt.highlight : undefined,
                  fontWeight: fmt.bold ? 700 : 400,
                  fontStyle: fmt.italic ? 'italic' : 'normal',
                  textDecoration: fmt.underline ? 'underline' : 'none',
                };
                const labelText = lc.label?.trim() || 'Link';
                // What sits inside the link, identical in both modes: the glyph a
                // URL carries, then the label. Shared so the two renderings below
                // are the same text differing only in whether it is navigable.
                const linkLabel = (
                  <>
                    {lc.linkType === 'hyperlink' && (
                      <ExternalLink style={{ width: fmt.fontSize * 0.8, height: fmt.fontSize * 0.8 }} />
                    )}
                    {labelText}
                  </>
                );
                const linkTitle =
                  lc.linkType === 'asset' ? lc.assetName || 'Asset link' : lc.url || 'URL';
                const linkClass =
                  'inline-flex items-center gap-1 rounded-[3px] px-0.5 transition-opacity';
                return (
                  <div
                    key={item.id}
                    className="absolute group/link"
                    style={{
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-1 py-1" style={{ textAlign: fmt.align }}>
                      {isEditing ? (
                        // Edit mode: a span, not an anchor. It keeps the link's
                        // styling — the author has to see what a reader will — but
                        // it is text as far as the browser is concerned, so
                        // right-clicking it gives the ordinary text menu instead of
                        // "Open link in new tab", and a click cannot navigate away
                        // from the dashboard being built.
                        <span className={linkClass} style={linkStyle} title={linkTitle}>
                          {linkLabel}
                        </span>
                      ) : (
                        <a
                          href={lc.linkType === 'hyperlink' ? linkHref(lc.url) || '#' : '#'}
                          target={lc.openInTab === 'new-tab' ? '_blank' : undefined}
                          rel={lc.openInTab === 'new-tab' ? 'noopener noreferrer' : undefined}
                          onClick={(e) => {
                            // A URL is left to the anchor, so modifier- and
                            // middle-clicks keep working. An asset has no route in
                            // the prototype, so it is handled rather than followed
                            // to the '#' the href falls back to.
                            if (lc.linkType === 'hyperlink' && linkHref(lc.url)) return;
                            e.preventDefault();
                            openLinkDestination(lc);
                          }}
                          className={`${linkClass} hover:opacity-80`}
                          style={linkStyle}
                          title={linkTitle}
                        >
                          {linkLabel}
                        </a>
                      )}
                    </div>
                    {isEditing && (
                      <div className="absolute -right-2 -top-2 flex items-center gap-1 opacity-0 group-hover/link:opacity-100 transition-opacity">
                        <button
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#dcdcda] shadow-sm hover:bg-muted"
                          onClick={(e) => { e.stopPropagation(); handleEditLink(item.id); }}
                          aria-label="Edit link"
                        >
                          <Edit2 className={FLORA_ICON} style={{ width: 12, height: 12 }} />
                        </button>
                        <button
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#dcdcda] shadow-sm hover:bg-[#c72a1c]/10"
                          onClick={(e) => { e.stopPropagation(); setContentItems(items => items.filter(i => i.id !== item.id)); }}
                          aria-label="Remove link"
                        >
                          <Trash2 className={FLORA_DANGER_ICON} style={{ width: 14, height: 14, color: '#c72a1c' }} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              const wstyle = item.content?.style || {};
              const wShadow = wstyle.shadow === true; // reports default OFF (no drop shadow)
              const wBorder = wstyle.border !== false; // reports default ON (stroke)
              const wBorderColor = wstyle.borderColor || '#e5e7eb';
              const wBorderWidth = wstyle.borderWidth ?? 1;
              const wBg = wstyle.bgColor || '#ffffff';
              // A widget sitting directly on a section tint has no surface and no
              // ring of its own, so it has to carry its own breathing room — there
              // is no card edge to do that work for it.
              const isSectionWidget = item.type !== 'image' && wBg === 'transparent' && !wBorder;
              const isWidgetSelected = isEditing && selectedItemId === item.id;
              // What reloads, and for how long. A report is done once its rows are
              // back; a summary is written from those rows, so it stays busy
              // through both stages and settles last. Text, images, separators and
              // parameters hold no data — nothing to refetch, so they don't flicker.
              const isAiSummaryWidget = isAiSummaryChart(item.content?.chartType);
              const widgetReloading =
                isReloading &&
                (isAiSummaryWidget ? true : item.type === 'chart' && reloadPhase === 'data');
              return (
              <div
                key={item.id}
                className={`absolute group/widget rounded-[16px] ${wShadow ? 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]' : ''} ${isEditing && isWidgetSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                style={{
                  left: item.position.x,
                  top: item.position.y,
                  width: item.size.width,
                  height: item.size.height,
                  backgroundColor: wBg,
                  border: wBorder ? `${wBorderWidth}px solid ${wBorderColor}` : 'none',
                }}
                onClick={(e) => { e.stopPropagation(); if (isEditing) setSelectedItemId(item.id); }}
              >
                {widgetReloading && (
                  <WidgetReloadOverlay
                    variant={isAiSummaryWidget ? 'summary' : 'data'}
                    label={isAiSummaryWidget ? 'Rewriting summary…' : 'Refreshing…'}
                  />
                )}
                {isEditing && isWidgetSelected && (
                  <ResizeHandles onResizeStart={(e, dir) => handleResizeStart(e, item, dir)} />
                )}
                {isEditing && isWidgetSelected && (
                  <div
                    className={`absolute left-0 z-[300] flex items-center gap-1 rounded-[12px] bg-white border border-[#dcdcda] px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${item.position.y < 60 ? 'top-full mt-2' : '-top-12'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WidgetStyleControls
                      style={item.content?.style}
                      defaultBorderOn={item.type !== 'image'}
                      // The AI summary is a chart by type but not a report: it has
                      // no source report to open and nothing to cross-filter, so it
                      // gets its own settings panel in place of both.
                      enableCrossFilter={item.type === 'chart' && !isAiSummaryChart(item.content?.chartType)}
                      onChange={(patch) => handleUpdateTextContent(item.id, { style: { ...(item.content?.style || {}), ...patch } })}
                      onOpenReport={item.type === 'chart' && !isAiSummaryChart(item.content?.chartType) ? () => console.log('Open report in builder', item.id) : undefined}
                      onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                      // Offered on reports only: the dashboard-level AI summary
                      // widget is already a summary, and section, image, text and
                      // link widgets have no data to summarise.
                      aiSummaryOn={hasReportSummary(item.content)}
                      onToggleAiSummary={
                        item.type === 'chart' && !isAiSummaryChart(item.content?.chartType)
                          ? () => handleToggleReportSummary(item)
                          : undefined
                      }
                      settingsLabel={isAiSummaryChart(item.content?.chartType) ? 'AI summary settings' : undefined}
                      settingsActive={openPanel === 'aiSummary' && aiSummarySettingsItemId === item.id}
                      onOpenSettings={
                        isAiSummaryChart(item.content?.chartType)
                          ? () => {
                              // Clicking Settings on the summary whose panel is
                              // already open closes it; on any other summary it
                              // switches the panel to that one.
                              const isOpen = openPanel === 'aiSummary' && aiSummarySettingsItemId === item.id;
                              setAiSummarySettingsItemId(isOpen ? null : item.id);
                              setOpenPanel(isOpen ? null : 'aiSummary');
                            }
                          : undefined
                      }
                    />
                  </div>
                )}
                <div
                  className={`h-full flex flex-col rounded-[16px] overflow-hidden ${
                    item.type === 'image'
                      ? (wBorder || wBg !== 'transparent' ? 'p-2' : 'p-0')
                      : isAiSummaryChart(item.content?.chartType)
                        // The AI summary holds cards inside a card, so it needs the
                        // outer inset a report's single chart does not — and it
                        // needs it whether or not it has a surface, so this is
                        // checked before the section-widget case. Transparent, on
                        // the lead panel, 20px here plus the summary's own 4px puts
                        // its takeaway on the same column as the title above it.
                        ? 'p-5'
                        : isSectionWidget
                          // Section widgets sit on a tint with no card edge of
                          // their own, so they carry the breathing room themselves
                          // — most of it below the body, which is where bands ran
                          // tight.
                          ? 'px-3 pt-3 pb-7'
                          : 'p-3'
                  }`}
                  style={{ backgroundColor: wBg }}
                >
                  {/* Narrative, callout and action widgets draw their own heading,
                      so the standard widget title row is suppressed for them. */}
                  <div
                    className={`flex items-start justify-between gap-2 ${
                      item.type === 'image' ||
                      isServiceOpsChromeless(item.content?.chartType) ||
                      isMonitoringChromeless(item.content?.chartType) ||
                      isAiSummaryChart(item.content?.chartType)
                        ? 'hidden'
                        : isSectionWidget
                          ? 'mb-5'
                          : 'mb-2'
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-2 pl-3 pt-3">
                      {/* Live data indicator. The dot is a mark, not a control, so
                          the words it stands for live in a tooltip — and it needs
                          them: a green dot beside a report title could as easily be
                          read as a health state. `-mx-1 p-1` gives the 8px dot a
                          16px hover target without moving it: the padding pushes it
                          in, the negative margin pulls the box back out, so the
                          title's own gap is unchanged.

                          The mark tracks the dashboard's refresh state, because a
                          live report is only as live as the schedule feeding it:
                          with refresh paused the figure is a frozen sample, and a
                          green dot over it would be a lie. So the dot gives way to
                          a pause glyph in the same slot — the report is still the
                          real-time one, which is exactly why the stall is worth
                          marking. The dot itself is deliberately still: it marks a
                          standing property of the report, not an event, and a
                          pulse on every live title would pull the eye off the
                          numbers it sits beside. */}
                      {item.content?.liveData && (
                        <FloraTooltip
                          content={isAutoRefreshing ? 'Real-time data' : 'Real-time data — refresh paused'}
                          placement="bottom-start"
                          size="small"
                          appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                          zIndex={99999}
                        >
                          <span
                            className="-mx-1 flex shrink-0 cursor-help p-1"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={isAutoRefreshing ? 'Real-time data' : 'Real-time data, refresh paused'}
                          >
                            {isAutoRefreshing ? (
                              <span className="size-2 shrink-0 rounded-full bg-green-500" aria-hidden />
                            ) : (
                              // The filled cut at this size, for the reason the
                              // import notes: the stroke cut's two bars close into a
                              // smudge below ~16px. Grey, not green — paused is the
                              // absence of the live state, so it drops out of the
                              // live colour rather than restating it in another.
                              <PauseFill
                                className="shrink-0 text-[#6b7280]"
                                style={{ width: 12, height: 12 }}
                                aria-hidden
                              />
                            )}
                          </span>
                        </FloraTooltip>
                      )}
                      {item.type !== 'image' && (
                        <FloraTooltip
                          content={item.title}
                          placement="bottom"
                          size="small"
                          appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                          zIndex={99999}
                        >
                          {/* Report titles run at 14px regular — the same step as
                              the dashboard's tab strip, so the two labels a
                              viewer scans by read at one scale. Regular weight
                              keeps the title from competing with the figure it
                              frames; section panels carry their own heading text
                              items, so nothing here needs to lead.
                              Long names wrap onto a second line rather than
                              being cut off — the name identifies the figure, so
                              reading it matters more than a fixed row height. */}
                          <span className="min-w-0 line-clamp-2 break-words text-foreground text-[14px] leading-[20px] font-normal">
                            {item.title}
                          </span>
                        </FloraTooltip>
                      )}
                      {/* The note belongs to the name, so it sits against it
                          rather than at the far edge with the actions — at the
                          right edge a reader had to guess which of the two
                          controls explained the figure. 14px against the title's
                          20px line, nudged down 3px to sit on that first line
                          even when a long name wraps under it. */}
                      {item.type !== 'image' && widgetInfoNote(item) && (
                        <FloraTooltip
                          content={widgetInfoNote(item)}
                          placement="bottom-start"
                          size="large"
                          appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                          zIndex={99999}
                        >
                          <span
                            className="mt-[3px] flex shrink-0 items-center justify-center text-[#68737d] hover:text-foreground cursor-help"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`About ${item.title || 'this report'}`}
                          >
                            <InfoStroke className="shrink-0" style={{ width: 14, height: 14 }} />
                          </span>
                        </FloraTooltip>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1 pr-1 pt-3">
                      {item.content?.chartType === 'line-chart' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`h-7 gap-1 bg-white ${FLORA_OUTLINE_BTN}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              2023
                              <ChevronDown className={FLORA_ICON} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">2023</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">2022</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">2021</MD></DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      {item.content?.chartType === 'bar-chart' && (
                        null
                      )}
                      {item.content?.chartType === 'pie-chart' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>

                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">Last 6 months</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">Last 3 months</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">Last year</MD></DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      {item.type === 'chart' && (
                        <DropdownMenu>
                          <FloraTooltip content="More actions" placement="bottom" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                // View mode keeps the canvas clean: the overflow menu only
                                // appears on hover (or while focused / open).
                                className={`h-7 w-7 p-0 ${FLORA_ICON_BTN} ${
                                  isEditing
                                    ? ''
                                    : 'opacity-0 transition-opacity group-hover/widget:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100'
                                }`}
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Report actions"
                              >
                                <MoreVertical className={FLORA_ICON} style={{ width: 16, height: 16 }} />
                              </Button>
                            </DropdownMenuTrigger>
                          </FloraTooltip>
                          {/* Wider than the app's other menus (w-52): the data
                              notes at its foot read as sentences, and at 208px
                              the dataset name was truncated to fit the cadence
                              beside it. */}
                          <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-64">
                            {isEditing ? (
                              <>
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Open report in builder', item.id)}>
                                  <ExternalLink className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Open report</MD>
                                </DropdownMenuItem>
                                {/* Editing this one report by describing the change,
                                    rather than by finding the control for it. The
                                    violet glyph marks it as the AI affordance in a
                                    menu of direct ones — same distinction the centre
                                    toolbar draws for its copilot button. */}
                                <DropdownMenuItem className="gap-3" onClick={() => handleCreateWithCopilot(item)}>
                                  <Sparkles className="size-[16px] shrink-0 !text-[#8d59b1]" />
                                  <MD tag="span" className="!text-foreground">Ask copilot</MD>
                                </DropdownMenuItem>
                                <div className="border-t border-border my-1" />
                                <DropdownMenuItem
                                  className="gap-3 focus:bg-[#c72a1c]/10 data-[highlighted]:bg-[#c72a1c]/10"
                                  onClick={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                                >
                                  <Trash2 className={FLORA_DANGER_ICON} style={{ color: '#c72a1c' }} />
                                  <MD tag="span" className="!text-[#c72a1c]">Delete</MD>
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <>
                                {/* A viewer's two ways of following up on what a
                                    report shows lead: watch it from now on, or
                                    ask about it. Copilot opens pointed at this
                                    widget — the same handoff an author's edit
                                    request makes. */}
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Create alert', item.id)}>
                                  <BellStroke className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Create alert</MD>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3" onClick={() => handleCreateWithCopilot(item)}>
                                  <Sparkles className="size-[16px] shrink-0 !text-[#8d59b1]" />
                                  <MD tag="span" className="!text-foreground">Ask copilot</MD>
                                </DropdownMenuItem>
                                <div className="border-t border-border my-1" />
                                {/* Both of these take the report elsewhere — to
                                    someone else, or to its own page — so they
                                    group below the rule. */}
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Share report', item.id)}>
                                  <ShareStroke className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Share</MD>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Open report in builder', item.id)}>
                                  <ExternalLink className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Open report</MD>
                                </DropdownMenuItem>
                              </>
                            )}
                            <ReportProvenanceMenuFooter content={item.content} />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                  
                  {/* Service-operations widgets (KPI tiles, narratives, charts,
                      ranked tables, callouts) render from their own module. */}
                  {isServiceOpsChart(item.content?.chartType) && (
                    <ServiceOpsChart content={item.content} />
                  )}

                  {/* Support operations monitoring widgets. */}
                  {isMonitoringChart(item.content?.chartType) && (
                    <MonitoringChart content={item.content} />
                  )}

                  {/* AI summary: takeaway, then ranked findings, always revealed.
                      No onAskCopilot — the widget reads the dashboard and makes
                      no offers, so the only thing it hands off is a sourced claim
                      to the report behind it. */}
                  {isAiSummaryChart(item.content?.chartType) && (
                    <AiSummaryCard
                      content={item.content}
                      // A sourced claim opens its report for a reader only. In edit
                      // mode the claim is copy the author is working on, so it
                      // renders as the styled text it is and the click stays with
                      // the widget being selected.
                      onOpenSource={isEditing ? undefined : handleOpenAiSummarySource}
                      // In edit mode only: the menu's actions are the author's,
                      // and a viewer's copy of the dashboard shouldn't offer to
                      // delete a widget from it.
                      headerAction={
                        isEditing ? (
                          <AiSummaryOverflowMenu
                            onCopyText={() => handleCopyAiSummaryText(item.content)}
                            onShare={() => console.log('Share AI summary', item.id)}
                            onCreateWithCopilot={() => handleCreateWithCopilot(item)}
                            onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                          />
                        ) : undefined
                      }
                    />
                  )}

                  {/* Chart content */}
                  {item.content?.chartType === 'line-chart' && (
                    <div className="flex-1 pt-4 pb-2 px-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={[
                            { month: 'Jan', value: 1.2 },
                            { month: 'Feb', value: 1.5 },
                            { month: 'Mar', value: 1.4 },
                            { month: 'Apr', value: 1.8 },
                            { month: 'May', value: 2.1 },
                            { month: 'Jun', value: 1.7 },
                            { month: 'Jul', value: 2.8 },
                            { month: 'Aug', value: 2.6 },
                            { month: 'Sep', value: 1.1 },
                            { month: 'Oct', value: 1.6 },
                            { month: 'Nov', value: 1.5 },
                            { month: 'Dec', value: 2.0 }
                          ]}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="0" stroke={GRID} vertical={false} />
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: MUTED, fontSize: 11 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: MUTED, fontSize: 11 }}
                            label={{ value: 'Net worth in ($M)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: MUTED } }}
                            domain={[0, 3]}
                            ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}
                          />
                          <Tooltip contentStyle={TOOLTIP_STYLE} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={SERIES.blue}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: SERIES.blue }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {item.content?.chartType === 'bar-chart' && (
                    <div className="flex-1 flex flex-col px-5 pt-2 pb-4">
                      <div className="mb-2">
                        
                      </div>
                      <div className="mb-3">
                        
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className={FLORA_ICON} />
                          <span className="text-xs text-muted-foreground">2.1% vs last week</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={[
                              { quarter: 'Q1', income: 120, expense: 85 },
                              { quarter: 'Q2', income: 98, expense: 110 },
                              { quarter: 'Q3', income: 86, expense: 105 },
                              { quarter: 'Q4', income: 99, expense: 130 },
                              { quarter: 'Q5', income: 85, expense: 90 },
                              { quarter: 'Q6', income: 105, expense: 160 },
                              { quarter: 'Q7', income: 115, expense: 140 }
                            ]}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                          >
                            <XAxis
                              dataKey="quarter"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: MUTED, fontSize: 11 }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={false}
                            />
                            <Tooltip contentStyle={TOOLTIP_STYLE} />
                            {/* Two series, so the first two slots of the fixed
                                order — never a hue picked to suit the labels. */}
                            <Bar dataKey="income" fill={SERIES.blue} radius={[4, 4, 0, 0]} barSize={12} />
                            <Bar dataKey="expense" fill={SERIES.orange} radius={[4, 4, 0, 0]} barSize={12} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.blue }}></div>
                          <span className="text-xs text-muted-foreground">Income</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.orange }}></div>
                          <span className="text-xs text-muted-foreground">Expense</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CSAT comparison gets its own block rather than reusing
                      'bar-chart', whose series are hardcoded to income/expense. */}
                  {item.content?.chartType === 'csat-comparison' && (
                    <div className="flex-1 flex flex-col px-5 pt-2 pb-4">
                      <div className="mb-3 flex items-center gap-1">
                        <TrendingUp className={FLORA_ICON} />
                        <span className="text-xs text-muted-foreground">+1.5 pts vs previous period</span>
                      </div>
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={[
                              { channel: 'Email', current: 91, previous: 88 },
                              { channel: 'Chat', current: 94, previous: 93 },
                              { channel: 'Phone', current: 88, previous: 89 },
                              { channel: 'Messaging', current: 92, previous: 87 },
                              { channel: 'Web', current: 86, previous: 84 },
                            ]}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                          >
                            <XAxis
                              dataKey="channel"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: MUTED, fontSize: 11 }}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={false} domain={[70, 100]} />
                            <Tooltip formatter={(value: number) => `${value}%`} contentStyle={TOOLTIP_STYLE} />
                            <Bar dataKey="current" name="This period" fill={SERIES.blue} radius={[4, 4, 0, 0]} barSize={12} />
                            <Bar dataKey="previous" name="Previous" fill={SERIES.orange} radius={[4, 4, 0, 0]} barSize={12} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.blue }}></div>
                          <span className="text-xs text-muted-foreground">This period</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.orange }}></div>
                          <span className="text-xs text-muted-foreground">Previous</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ticket volume gets its own block rather than reusing
                      'active-users', whose footer is a desktop/mobile device
                      split — meaningless for tickets. */}
                  {item.content?.chartType === 'ticket-volume' && (
                    <div className="flex-1 flex flex-col px-5 pt-2 pb-4">
                      <div className="flex items-baseline gap-2 mb-3">
                        <h2 className="text-2xl font-semibold text-foreground">12 480</h2>
                        <span className="text-xs text-muted-foreground">tickets created</span>
                      </div>
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={Array.from({ length: 30 }, (_, i) => ({
                              day: `${i + 1}`,
                              // A weekday rhythm — volume dips at weekends, so a
                              // flat random spread would read as fake.
                              tickets: [520, 486, 470, 442, 398, 214, 188][i % 7] + ((i * 13) % 40),
                            }))}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                          >
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 10 }} interval={6} />
                            <YAxis axisLine={false} tickLine={false} tick={false} />
                            <Tooltip
                              formatter={(value: number) => [`${value} tickets`, '']}
                              labelFormatter={(label) => `Day ${label}`}
                              contentStyle={TOOLTIP_STYLE}
                              cursor={false}
                            />
                            <Bar dataKey="tickets" fill={SERIES.blue} radius={[2, 2, 0, 0]} barSize={8} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {item.content?.chartType === 'active-users' && (
                    <div className="flex-1 flex flex-col px-5 pt-2 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-foreground">10 256</h2>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs gap-1 hover:bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              last 7 days
                              <ChevronDown className={FLORA_ICON} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">last 7 days</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">last 30 days</MD></DropdownMenuItem>
                            <DropdownMenuItem><MD tag="span" className="!text-foreground">last 90 days</MD></DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex-1 mb-3">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={[
                              { day: '1', users: 45 },
                              { day: '2', users: 52 },
                              { day: '3', users: 38 },
                              { day: '4', users: 65 },
                              { day: '5', users: 72 },
                              { day: '6', users: 55 },
                              { day: '7', users: 48 },
                              { day: '8', users: 70 },
                              { day: '9', users: 62 },
                              { day: '10', users: 45 },
                              { day: '11', users: 58 },
                              { day: '12', users: 67 },
                              { day: '13', users: 52 },
                              { day: '14', users: 75 },
                              { day: '15', users: 68 },
                              { day: '16', users: 54 },
                              { day: '17', users: 62 },
                              { day: '18', users: 48 },
                              { day: '19', users: 70 },
                              { day: '20', users: 65 },
                              { day: '21', users: 58 },
                              { day: '22', users: 72 },
                              { day: '23', users: 80 },
                              { day: '24', users: 68 },
                              { day: '25', users: 55 },
                              { day: '26', users: 62 },
                              { day: '27', users: 70 },
                              { day: '28', users: 65 },
                              { day: '29', users: 58 },
                              { day: '30', users: 75 },
                              { day: '31', users: 82 }
                            ]}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <XAxis 
                              dataKey="day" 
                              axisLine={false}
                              tickLine={false}
                              tick={false}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={false}
                            />
                            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={false} />
                            <Bar dataKey="users" fill={SERIES.blue} radius={[2, 2, 0, 0]} barSize={6} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.blue }}></div>
                            <span className="text-foreground">Desktop - 77.3%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SERIES.orange }}></div>
                            <span className="text-foreground">Mobile - 22.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.content?.chartType === 'pie-chart' && (
                    <div className="flex-1 flex flex-col px-5 pt-2 pb-4">
                      <div className="flex-1 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={GENERIC_PIE_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {GENERIC_PIE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Total</div>
                            <div className="text-2xl font-semibold text-foreground">$5,301</div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  )}

                  {item.content?.chartType === 'area-chart' && (
                    <div className="flex-1 pt-4 pb-2 px-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart
                          data={[
                            { time: '00:00', value: 120 },
                            { time: '04:00', value: 180 },
                            { time: '08:00', value: 320 },
                            { time: '12:00', value: 280 },
                            { time: '16:00', value: 240 },
                            { time: '20:00', value: 150 },
                            { time: '24:00', value: 100 }
                          ]}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={SERIES.blue} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={SERIES.blue} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="0" stroke={GRID} vertical={false} />
                          <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: MUTED, fontSize: 11 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: MUTED, fontSize: 11 }}
                          />
                          <Tooltip contentStyle={TOOLTIP_STYLE} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={SERIES.blue}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={2}
                          />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {item.content?.chartType === 'metric-card' && (
                    <div className="flex-1 flex flex-col justify-center px-6 py-4">
                      <div className="text-center">
                        <div className="text-4xl font-medium text-foreground mb-2">
                          {item.content.kpiData?.value || '94.2%'}
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          {item.content.kpiData?.trend === 'up' ? (
                            <TrendingUp className={FLORA_ICON} />
                          ) : (
                            <TrendingUp className={`${FLORA_ICON} rotate-180`} />
                          )}
                          <span className={`text-sm ${item.content.kpiData?.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.content.kpiData?.change || '+3.2%'}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          vs previous period
                        </div>
                      </div>
                    </div>
                  )}

                  {item.content?.chartType === 'kpi-resolution-time' && (
                    <div className="flex-1 flex flex-col justify-center px-6 py-4">
                      <div className="text-center mb-4">
                        
                        <div className="text-4xl font-medium text-foreground">
                          {item.content.kpiData?.averageResolutionTime || '2.3 hours'}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        {item.content.kpiData?.trend === 'down' ? (
                          <>
                            <TrendingUp className={`${FLORA_ICON} rotate-180`} />
                            <span className="text-sm text-green-600">
                              {item.content.kpiData?.change || '-18%'} faster
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className={FLORA_ICON} />
                            <span className="text-sm text-red-600">
                              {item.content.kpiData?.change || '+18%'} slower
                            </span>
                          </>
                        )}
                      </div>
                      
                    </div>
                  )}

                  {item.content?.chartType === 'table' && (
                    <div className="flex-1 overflow-auto px-3 pb-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-2 text-foreground font-semibold">Ticket ID</th>
                            <th className="text-left py-2 px-2 text-foreground font-semibold">Status</th>
                            <th className="text-left py-2 px-2 text-foreground font-semibold">Priority</th>
                            <th className="text-left py-2 px-2 text-foreground font-semibold">Agent</th>
                            <th className="text-left py-2 px-2 text-foreground font-semibold">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id: '#2847', status: 'Open', priority: 'High', agent: 'Sarah J.', time: '2min' },
                            { id: '#2846', status: 'In Progress', priority: 'Medium', agent: 'Mike W.', time: '15min' },
                            { id: '#2845', status: 'Resolved', priority: 'Low', agent: 'Emily D.', time: '1h' },
                            { id: '#2844', status: 'Open', priority: 'Urgent', agent: 'John S.', time: '5min' },
                            { id: '#2843', status: 'Pending', priority: 'Medium', agent: 'Sarah J.', time: '2h' },
                            { id: '#2842', status: 'Resolved', priority: 'Low', agent: 'Mike W.', time: '3h' }
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                              <td className="py-2 px-2 text-foreground">{row.id}</td>
                              <td className="py-2 px-2">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
                                  row.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                                  row.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                                  row.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-2 px-2 text-foreground">{row.priority}</td>
                              <td className="py-2 px-2 text-muted-foreground">{row.agent}</td>
                              <td className="py-2 px-2 text-muted-foreground">{row.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Image content */}
                  {item.type === 'image' && (
                    <div className={`flex-1 min-h-0 ${item.content?.imageUrl ? '' : 'p-4'}`}>
                      {item.content?.imageUrl ? (
                        <div className="relative h-full w-full group/image">
                          <img
                            src={item.content.imageUrl}
                            alt={item.content?.fileName || 'Image'}
                            className="h-full w-full object-contain rounded-[12px]"
                          />
                          {isEditing && (
                            <label
                              className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-[8px] border border-[#dcdcda] bg-white/95 px-2.5 py-1.5 text-xs text-foreground shadow-sm cursor-pointer opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-muted"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ImageStroke className={FLORA_MENU_ICON} />
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleSetItemImage(item.id, e.target.files?.[0])}
                              />
                            </label>
                          )}
                        </div>
                      ) : (
                        <label
                          onClick={(e) => e.stopPropagation()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverImageId(item.id);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverImageId(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverImageId(null);
                            handleSetItemImage(item.id, e.dataTransfer.files?.[0]);
                          }}
                          className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed p-4 text-center cursor-pointer transition-colors bg-white ${
                            dragOverImageId === item.id
                              ? 'border-[#1f73b7]'
                              : 'border-[#8b8e89] hover:border-[#1f73b7]'
                          }`}
                        >
                          <MD tag="span" style={{ color: '#406cc4' }}>
                            Choose a file or drag and drop here
                          </MD>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleSetItemImage(item.id, e.target.files?.[0])}
                          />
                        </label>
                      )}
                    </div>
                  )}

                  {/* The report's own AI summary, under the chart it describes.
                      Last in the card so it reads as a note on everything above
                      it, and shrink-0 so the chart absorbs the resizing rather
                      than the summary being squeezed to one clipped line. */}
                  {hasReportSummary(item.content) && (
                    <ReportSummaryBand
                      summary={item.content.reportSummary}
                      onAskCopilot={handleAskCopilot}
                      onOpenSource={isEditing ? undefined : handleOpenAiSummarySource}
                      onRemove={isEditing ? () => handleToggleReportSummary(item) : undefined}
                    />
                  )}
                </div>
              </div>
              );
            })}

            {/* Selection indicator */}
            {selectedTool && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-base pointer-events-none">
                Click to add {selectedTool}
              </div>
            )}
          </div>
          </div>

          {/* Editing toolbar — floats over the canvas instead of sitting in the
              header: these tools act on the canvas, so they belong to it, and a
              bar on its bottom edge is the same distance from wherever the author
              is working. It hangs off the static wrapper rather than the scroll
              container, so it stays put as the canvas scrolls. */}
          <div
            ref={canvasToolbarSlotRef}
            // Only the bar itself takes clicks: the strip it is centred in spans
            // the canvas, and would otherwise swallow every click along that band.
            className="pointer-events-none absolute inset-x-0 z-[130] flex justify-center"
            style={{
              bottom: FLOATING_TOOLBAR_BOTTOM,
              paddingLeft: FLOATING_TOOLBAR_SIDE_GAP,
              paddingRight: FLOATING_TOOLBAR_SIDE_GAP,
            }}
          >
            {isEditing && (
              // Rises into the band the way the suggestion chip does — the bar is
              // mounted on entering edit mode and unmounted on leaving, so the
              // entrance replays each time rather than only on first paint. The
              // motion only translates and fades, so the width the row is
              // measured on the way in is still its settled width.
              <div className={`flex min-w-0 items-center ${CANVAS_BAND_ENTRANCE}`}>
              <div
                ref={headerToolbarRef}
                // Explicit px, not a spacing utility: the 14px root under-resolves
                // rem, and this padding is what keeps the row off its own frame.
                className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full border border-border bg-white p-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              >
                {toolbarItems.slice(0, visibleToolCount).map((tool) => (
                  <FloraTooltip
                    key={tool.id}
                    content={toolTooltip(tool.label, tool.shortcut)}
                    placement="top"
                    size="small"
                    appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                    zIndex={99999}
                  >
                    <Button
                      variant={selectedTool === tool.id ? "secondary" : "ghost"}
                      size="sm"
                      aria-label={tool.label}
                      data-toolbar-button=""
                      disabled={tool.disabled}
                      onClick={() => handleToolSelect(tool.id)}
                      /* Placeholder tools stay in the row but read as unavailable —
                         the default disabled fill would look like a selected tool. */
                      className={`h-8 w-8 shrink-0 p-0 hover:!bg-[#f7f7f7] ${FLORA_BTN} disabled:!bg-transparent disabled:opacity-40`}
                    >
                      {tool.icon}
                    </Button>
                  </FloraTooltip>
                ))}

                {/* Whatever didn't fit, in order, behind a chevron in the tool
                    row's own position — so an author looks in the same place. */}
                {(overflowTools.length > 0 || overflowTrailingTools.length > 0) && (
                  <DropdownMenu open={isToolOverflowMenuOpen} onOpenChange={setIsToolOverflowMenuOpen}>
                    <FloraTooltip content="More tools" placement="top" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="More tools"
                          data-toolbar-button=""
                          className={`h-8 w-8 shrink-0 p-0 hover:!bg-[#f7f7f7] ${FLORA_BTN}`}
                        >
                          <ChevronDown className={FLORA_TOOLBAR_ICON} />
                        </Button>
                      </DropdownMenuTrigger>
                    </FloraTooltip>
                    <DropdownMenuContent side="top" align="center" className="w-52">
                      {overflowTools.map((tool) => (
                        <DropdownMenuItem
                          key={tool.id}
                          className="gap-2"
                          disabled={tool.disabled}
                          onClick={() => handleToolSelect(tool.id)}
                        >
                          {/* The row's own icon is toolbar-sized; in the menu it
                              sits beside 16px menu icons, so it's re-sized to
                              match rather than reused as-is. */}
                          {React.cloneElement(tool.icon, { className: FLORA_MENU_ICON })}
                          <MD tag="span" className="!text-foreground">{tool.label}</MD>
                          {tool.shortcut && (
                            <span className="ml-auto text-[12px] leading-[20px] text-muted-foreground">
                              {tool.shortcut}
                            </span>
                          )}
                        </DropdownMenuItem>
                      ))}
                      {overflowTrailingTools.length > 0 && (
                        <>
                          {/* Only worth a rule when there are insert tools above
                              it to separate these from. */}
                          {overflowTools.length > 0 && <DropdownMenuSeparator />}
                          {overflowTrailingTools.map((tool) => (
                            <DropdownMenuItem key={tool.id} className="gap-2" onClick={tool.onSelect}>
                              <tool.Icon className={FLORA_MENU_ICON} />
                              <MD tag="span" className="!text-foreground">{tool.menuLabel}</MD>
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {visibleTrailingTools.length > 0 && (
                  <>
                  <div
                    className="mx-0.5 h-5 w-px shrink-0 bg-[#dcdcda]"
                    data-toolbar-divider=""
                    aria-hidden="true"
                  />

                  {visibleTrailingTools.map((tool) => (
                    <FloraTooltip key={tool.id} content={tool.label} placement="top" size="small" appendToNode={typeof document !== 'undefined' ? document.body : undefined} zIndex={99999}>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={tool.label}
                        data-toolbar-button=""
                        aria-expanded={tool.expanded}
                        onClick={tool.onSelect}
                        className={`h-8 w-8 shrink-0 p-0 hover:!bg-[#f7f7f7] ${FLORA_BTN}`}
                      >
                        <tool.Icon className={FLORA_TOOLBAR_ICON} />
                      </Button>
                    </FloraTooltip>
                  ))}
                  </>
                )}
              </div>

              </div>
            )}

            {/* The onboarding coachmark for a dashboard the author just created,
                above the bar and centred on it: it is about the row itself, so it
                points at the row rather than sitting in a corner. Absolute against
                the strip like the suggestion chip, so it can't shunt the toolbar
                off centre. z-[140] clears the strip's own z-[130] and the widgets'
                resize handles, which the non-stacking scroll container leaves to
                compete with it directly. */}
            {isEditing && !toolsOnboardingDismissed && (
              <div className="absolute bottom-full left-1/2 z-[140] -translate-x-1/2 pb-3">
                <ToolsOnboardingTooltip onDismiss={() => setToolsOnboardingDismissed(true)} />
              </div>
            )}

            {/* One suggestion at a time, in the canvas's bottom-left corner: it
                keeps the offer out of the tools an author is reaching for, and
                out of the middle of the work, while staying on the same band as
                the bar so it is still part of the editing chrome. Absolute
                against the strip rather than the bar, so an offer arriving or
                being taken can't shunt the toolbar off centre.
                Unmounted in view mode rather than hidden, so the entrance
                replays the next time an author enters edit mode: the offer is
                being made again, and a chip that silently reappears is easy to
                miss.
                Held back while the coachmark is up: on a narrow canvas the chip
                goes above the bar too, into the coachmark's own spot, and two
                pieces of chrome arriving at once is what the onboarding is trying
                to cut through. */}
            {isEditing && !tipDismissed && toolsOnboardingDismissed && (
              <div
                className={`pointer-events-none absolute flex items-center ${
                  isSuggestionBeside
                    ? // Spans the bar's own height, so the shorter chip sits on the
                      // bar's centre line rather than on its bottom edge.
                      'inset-y-0'
                    : // Not enough corner left of the bar: above it, centred on
                      // it, rather than running under the tools.
                      'bottom-full left-1/2 -translate-x-1/2 pb-2'
                }`}
                style={
                  isSuggestionBeside
                    ? {
                        left: FLOATING_TOOLBAR_SIDE_GAP,
                        // Never past the 8px of clearance the bar keeps: the chip
                        // truncates its label instead of sliding under the tools.
                        maxWidth: Math.min(SUGGESTION_MAX_WIDTH, suggestionRoom - 8),
                      }
                    : { maxWidth: SUGGESTION_MAX_WIDTH }
                }
              >
                <DashboardSuggestions
                  onDismiss={() => setTipDismissed(true)}
                  onAction={handleSuggestionAction}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reports Selection Modal */}
      {showReportsModal && (
        <SelectReportModal
          onClose={() => {
            setShowReportsModal(false);
            // Backing out drops the click point with it, so the next report
            // added from the toolbar flows on normally.
            pendingInsertAtRef.current = null;
          }}
          onSelect={handleReportSelect}
        />
      )}

      {/* Link Configuration Modal */}
      {showLinkModal && linkModalItemId && (
        <LinkConfigModal
          initialContent={{
            ...createDefaultLinkContent(),
            ...(contentItems.find(i => i.id === linkModalItemId)?.content || {}),
          }}
          tabs={tabs.map(t => ({ id: t.id, name: t.name }))}
          onClose={handleCloseLinkModal}
          onSave={handleSaveLink}
        />
      )}

      {/* Chart Selection Modal */}
      <Dialog open={showChartModal} onOpenChange={setShowChartModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Chart Type</DialogTitle>
            <DialogDescription>
              Choose a chart type to add to your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {chartTypes.map((chart) => (
              <Card 
                key={chart.id}
                className="cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/20"
                onClick={() => handleChartSelect(chart.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3">
                    {chart.icon}
                  </div>
                  <h4 className="text-foreground mb-1">{chart.name}</h4>
                  <p className="text-base text-muted-foreground line-clamp-2">
                    {chart.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Save View Modal */}
      {showSaveDashboardModal && (
        <Modal onClose={() => setShowSaveDashboardModal(false)} restoreFocus>
          <Modal.Header tag="h2">Save dashboard</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-6 py-1">
              {/* Project */}
              <Field>
                <Field.Label className="!mb-2">Project</Field.Label>
                {isCreatingProject ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <FloraInput
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="New project name"
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter') handleCreateProject();
                          if (e.key === 'Escape') { setIsCreatingProject(false); setNewProjectName(''); }
                        }}
                        autoFocus
                      />
                    </div>
                    <FloraButton isPrimary disabled={!newProjectName.trim()} onClick={handleCreateProject}>
                      Add
                    </FloraButton>
                    <FloraButton isBasic onClick={() => { setIsCreatingProject(false); setNewProjectName(''); }}>
                      Cancel
                    </FloraButton>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <FloraSelectField
                        ariaLabel="Project"
                        value={saveForm.projectId}
                        options={projectList.map(p => ({ value: p.id, label: p.name }))}
                        onChange={(v) => setSaveForm({ ...saveForm, projectId: v })}
                      />
                    </div>
                    <Anchor
                      href="#"
                      onClick={(e) => { e.preventDefault(); setIsCreatingProject(true); }}
                      className="shrink-0 whitespace-nowrap !text-[14px] !leading-5"
                    >
                      Create project
                    </Anchor>
                  </div>
                )}
              </Field>

              {/* Name */}
              <Field>
                <Field.Label>Dashboard name</Field.Label>
                <FloraInput
                  value={saveForm.name}
                  onChange={(e) => setSaveForm({ ...saveForm, name: e.target.value })}
                  placeholder="e.g., Q4 Performance overview"
                  onKeyDown={(e) => e.stopPropagation()}
                  autoFocus
                />
              </Field>

              {/* Description */}
              <Field>
                <Field.Label>
                  Description <span className="font-normal text-muted-foreground">(Optional)</span>
                </Field.Label>
                <FloraTextarea
                  value={saveForm.description}
                  onChange={(e) => setSaveForm({ ...saveForm, description: e.target.value })}
                  placeholder="What does this dashboard show?"
                  onKeyDown={(e) => e.stopPropagation()}
                  rows={3}
                />
              </Field>

              {/* URL */}
              <Field>
                <Field.Label>URL</Field.Label>
                <FloraInput
                  value={saveForm.url}
                  onChange={(e) => setSaveForm({ ...saveForm, url: e.target.value })}
                  placeholder="custom-slug"
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </Field>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterItem>
              <FloraButton onClick={() => setShowSaveDashboardModal(false)}>
                Cancel
              </FloraButton>
            </Modal.FooterItem>
            <Modal.FooterItem>
              <FloraButton isPrimary disabled={!saveForm.name.trim()} onClick={handleConfirmSaveDashboard}>
                Save dashboard
              </FloraButton>
            </Modal.FooterItem>
          </Modal.Footer>
          <Modal.Close aria-label="Close" />
        </Modal>
      )}

      {showRefreshRateModal && (
        <Modal onClose={() => setShowRefreshRateModal(false)} restoreFocus>
          <Modal.Header tag="h2">Real-time data refresh rate</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 py-1">
              {/* The link belongs to the explanation, not to the footnote: it
                  answers "how does any of this work" for someone still reading
                  the intro, before they touch the control. Sat at the foot it
                  read as an afterthought to the timestamp. */}
              <div className="flex flex-col gap-1">
                <MD tag="p" className="!text-muted-foreground">
                  Set how often this dashboard checks for new real-time data. The
                  selected rate applies to all viewers.
                </MD>
                <Anchor
                  href="#"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    console.log('Open data refresh documentation');
                  }}
                >
                  Learn more about data refreshes
                </Anchor>
              </div>
              <Field>
                <Field.Label className="!mb-2">Refresh every</Field.Label>
                <FloraSelectField
                  ariaLabel="Real-time data refreshment rate"
                  // The rate sits low in a scrolling modal body, so its seven
                  // options have to escape that clip to open below the field.
                  escapeOverflow
                  value={refreshRateDraft}
                  options={REFRESH_RATE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  onChange={setRefreshRateDraft}
                />
              </Field>
              {/* Pausing has a consequence a rate does not, so it is called out
                  rather than left to the reader to infer from "Paused". */}
              {refreshRateDraft === 'manual' && (
                <div className="flex items-start gap-2 rounded-[8px] bg-[#fff7ed] px-3 py-2.5">
                  <span className="flex h-5 shrink-0 items-center text-[#703b15]" aria-hidden="true">
                    <Pause style={{ width: 14, height: 14 }} />
                  </span>
                  <MD tag="span" className="!text-[12px] !text-[#703b15]">
                    Real-time data will only update when someone refreshes the dashboard manually.
                  </MD>
                </div>
              )}
              <div className="flex items-start gap-2 border-t border-border pt-3">
                <span className="flex h-5 shrink-0 items-center text-[#68737d]" aria-hidden="true">
                  <InfoStroke className="size-4 shrink-0" style={{ width: 14, height: 14 }} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <MD tag="span" className="!text-[12px] !text-muted-foreground">
                    {HISTORICAL_REFRESH_CADENCE}.
                  </MD>
                  <span className="flex items-center gap-1.5">
                    <MD tag="span" className="!text-[12px] !text-muted-foreground">
                      Last historical refresh
                    </MD>
                    <span className="rounded-full bg-[#1f73b7]/10 px-2 py-0.5 text-[11px] font-medium leading-4 text-[#1f73b7]">
                      {HISTORICAL_REFRESH_LAST_RUN}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterItem>
              <FloraButton onClick={() => setShowRefreshRateModal(false)}>
                Cancel
              </FloraButton>
            </Modal.FooterItem>
            <Modal.FooterItem>
              <FloraButton isPrimary onClick={handleConfirmRefreshRate}>
                Save
              </FloraButton>
            </Modal.FooterItem>
          </Modal.Footer>
          <Modal.Close aria-label="Close" />
        </Modal>
      )}

      {showDiscardModal && (
        <Modal onClose={() => setShowDiscardModal(false)} restoreFocus>
          <Modal.Header tag="h2" isDanger>Discard all edits?</Modal.Header>
          <Modal.Body>
            <MD tag="p" className="!text-foreground">
              Discard all edits made since the last save. You cannot undo this.
            </MD>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterItem>
              <FloraButton onClick={() => setShowDiscardModal(false)}>
                Cancel
              </FloraButton>
            </Modal.FooterItem>
            <Modal.FooterItem>
              <FloraButton
                isPrimary
                isDanger
                onClick={() => {
                  console.log('Discard all edits');
                  setShowDiscardModal(false);
                }}
              >
                Discard all edits
              </FloraButton>
            </Modal.FooterItem>
          </Modal.Footer>
          <Modal.Close aria-label="Close" />
        </Modal>
      )}

      <Dialog open={showSaveBookmarkModal} onOpenChange={setShowSaveBookmarkModal}>
        <DialogContent className="sm:max-w-md">
          {/* Same dialog for both, but it says which one it is: saving as new
              from an open view leaves that view alone, and a header that read
              "Save view" there would look like it was about to overwrite it. */}
          <DialogHeader>
            <DialogTitle>{isSavingAsNew ? 'Save as new view' : 'Save view'}</DialogTitle>
            <DialogDescription>
              {isSavingAsNew
                ? 'Give the new view a name. Your current filters are saved to it, and the view you have open is left unchanged.'
                : 'Give your saved view a name to save your current filter configuration.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="bookmark-name" className="text-base font-medium">
                View name
              </label>
              <Input
                id="bookmark-name"
                value={bookmarkName}
                onChange={(e) => setBookmarkName(e.target.value)}
                placeholder="e.g., Q4 2024 Performance"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConfirmSaveBookmark();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSaveBookmarkModal(false)}
              className={FLORA_OUTLINE_BTN}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSaveBookmark}
              disabled={!bookmarkName.trim()}
              className={FLORA_BTN}
            >
              Save view
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit layout and appearance — opens from the centre toolbar's palette
          button. Every setting in it changes what the canvas looks like, so it is
          a sibling of the canvas rather than an overlay over it. */}
      {showLayoutSettings && (
        <LayoutSettingsDrawer
          settings={layoutSettings}
          onSave={setLayoutSettings}
          onClose={() => setOpenPanel(null)}
        />
      )}

      {/* Context graph — opens from the viewing controls in the header. It answers
          a reader's question about the dashboard in front of them rather than an
          author's about the one they are building, so it is the one panel that
          belongs to view mode. Same shell as the others; the body is
          intentionally empty for now. */}
      {showContextGraph && (
        <BuilderDrawer
          icon={<FlowStroke className="size-[16px] shrink-0 text-foreground" />}
          title="Context graph"
          description="How this dashboard relates to the data it draws on"
          closeLabel="Close context graph"
          onClose={() => setOpenPanel(null)}
        />
      )}

      {/* AI summary settings — opens from the selected summary's toolbar. A
          sibling of the canvas like copilot, so configuring the summary narrows
          the canvas rather than covering the widget being configured. */}
      {aiSummarySettingsItem && (
        <AiSummarySettingsDrawer
          // Keyed by widget: the drawer holds unsaved edits as a draft, and
          // opening a different summary's settings has to start from that
          // summary's own saved state rather than inherit the last one's draft.
          key={aiSummarySettingsItem.id}
          settings={aiSummarySettingsItem.content?.settings || createAiSummarySettings()}
          onSave={(next) =>
            handleUpdateTextContent(aiSummarySettingsItem.id, { settings: next })
          }
          onClose={() => {
            setAiSummarySettingsItemId(null);
            setOpenPanel(null);
          }}
        />
      )}

      {/* Ask copilot — opens from the centre toolbar's sparkle button for
          the dashboard, or from a widget's overflow menu for that widget. The
          composer is a footer rather than part of the scroll, so it stays
          reachable however far the conversation above it has run. */}
      {showCopilot && (
        <BuilderDrawer
          icon={<Sparkles className="size-[16px] shrink-0 !text-[#8d59b1]" />}
          title="Ask copilot"
          // The description names what copilot is pointed at, because that is the
          // one thing an author has to be sure of before typing: the same sentence
          // means two different edits depending on the scope.
          description={
            copilotSubject
              ? `Describe a change to ${copilotSubject.title}`
              : 'Describe what you want and copilot will build it on this dashboard'
          }
          closeLabel="Close copilot"
          onClose={() => setOpenPanel(null)}
          bodyClassName="px-6 py-4"
          footer={
            <div className="w-full">
              <FloraTextarea
                rows={3}
                placeholder={copilotPlaceholder}
                aria-label={copilotPlaceholder}
                isResizable={false}
                value={copilotPrompt}
                onChange={(event) => setCopilotPrompt(event.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <FloraButton
                  isPrimary
                  isPill
                  size="small"
                  disabled={!copilotPrompt.trim()}
                  onClick={() => {
                    console.log('Send to copilot:', copilotSubjectId ?? 'dashboard', copilotPrompt);
                    setCopilotPrompt('');
                  }}
                >
                  Send
                </FloraButton>
              </div>
            </div>
          }
        >
          {/* A chip naming the widget copilot is pointed at, with a way back out
              to the whole dashboard. Scope is the one thing about this panel that
              is not visible from its contents, so it is stated rather than
              implied — and reversible in place, because an author who opened the
              wrong widget's menu shouldn't have to close and start again. */}
          {copilotSubject && (
            <div className="mb-4 flex items-center gap-2 rounded-[8px] border border-[#dcdcda] bg-muted/40 px-3 py-2">
              <BarChartIcon className={`${FLORA_MENU_ICON} shrink-0`} />
              <MD tag="span" className="min-w-0 flex-1 truncate !text-foreground">
                {copilotSubject.title}
              </MD>
              <button
                type="button"
                aria-label="Edit the whole dashboard instead"
                onClick={() => setCopilotSubjectId(null)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#68737d] transition-colors hover:bg-black/5 hover:text-foreground"
              >
                <X className="shrink-0" style={{ width: 12, height: 12 }} />
              </button>
            </div>
          )}

          {/* The same pills an AI summary offers on the canvas: both are a prompt
              you can take rather than type, and rendering them two different ways
              would say they were two different kinds of thing. Clicking one fills
              the composer rather than sending, so it stays editable.
              Scoped to the subject — suggestions about the other widgets on the
              canvas are noise when copilot is pointed at one of them. */}
          <AiSuggestionList
            heading="Try asking"
            suggestions={
              copilotSubject
                ? [
                    'Change this to a bar chart',
                    'Add a comparison to the previous period',
                    'Break this down by channel',
                  ]
                : [
                    'Add a CSAT trend chart for the last quarter',
                    'Group these reports into a section',
                    'Switch the ticket volume chart to a bar chart',
                  ]
            }
            onSelect={setCopilotPrompt}
          />
        </BuilderDrawer>
      )}

      {/* Version history — opens from the overflow menu. Same shell as the other
          right-side panels. */}
      {showVersionHistory && (
        <BuilderDrawer
          icon={<History className="size-[16px] shrink-0 text-foreground" style={{ width: 16, height: 16 }} />}
          title="Version history"
          description="Recent changes to this dashboard"
          closeLabel="Close version history"
          onClose={() => setOpenPanel(null)}
          bodyClassName="px-6 py-4"
        >
            <div className="space-y-4">
              {versionHistory.map((version, index) => {
                const date = new Date(version.timestamp);
                const timeAgo = index === 0 ? 'Just now' : 
                  index === 1 ? '45 minutes ago' :
                  index === 2 ? '3 hours ago' :
                  index === 3 ? 'Yesterday' : '2 days ago';
                
                return (
                  <div key={version.id} className="relative pb-4">
                    {/* Timeline line */}
                    {index !== versionHistory.length - 1 && (
                      <div className="absolute left-[7px] top-[24px] bottom-0 w-[1px] bg-border" />
                    )}
                    
                    <div className="flex gap-3">
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-primary mt-1" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-base font-normal text-foreground">
                            {version.action}
                          </p>
                          <span className="text-base text-muted-foreground whitespace-nowrap">
                            {timeAgo}
                          </span>
                        </div>
                        <p className="text-base text-muted-foreground mb-1">
                          {version.description}
                        </p>
                        <p className="text-base text-muted-foreground">
                          by {version.user}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </BuilderDrawer>
      )}
    </div>
  );
}