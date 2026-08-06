import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Anchor, Button as FloraButton, Checkbox, ChevronButton, Combobox, ComboboxField, Field, IconButton, Input as FloraInput, Item, Menu, Modal, Option, SplitButton, MD, Table, Tag, Tabs, Textarea as FloraTextarea, Tooltip as FloraTooltip } from '@zendesk-ui/react-components';
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from './ui/drawer';
import {
  BarChart3Stroke as BarChartIcon,
  TextStroke,
  // recharts exports its own `Line`, so the Flora rule glyph gets a distinct name.
  Line as LineRule,
  Link,
  LayoutStroke,
  ImageStroke,
  LineChartStroke,
  PieChartStroke,
  ActivityStroke,
  TargetStroke,
  TableStroke,
  Edit2Stroke as Edit2,
  UndoReturn,
  RedoReturn,
  Redo2,
  PlayStroke as Play,
  PauseStroke as Pause,
  ChevronDown,
  MoreVertical,
  DownloadStroke as Download,
  ClockStroke as Clock,
  HistoryStroke as History,
  BookmarkStroke as Bookmark,
  Check,
  Trash2Stroke as Trash2,
  SaveStroke as Save,
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
  Connector,
  Palette,
  StopStroke,
  ShapesStroke,
  SparklesStroke,
  PencilSparkleStroke,
  CheckSquareStroke,
  Copy,
  ShareStroke,
  BellStroke,
  InfoStroke,
  Star,
  StarStroke,
  ArrowRotateRight,
  TerminalStroke,
} from '@/components/icons/flora';
import {
  DropdownMenu,
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
import { ServiceOpsChart, isServiceOpsChart, isServiceOpsChromeless } from './dashboard/service-ops';
import { MonitoringChart, isMonitoringChart, isMonitoringChromeless } from './dashboard/monitoring-ops';

const FLORA_ICON = 'size-[16px] shrink-0 text-muted-foreground';
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
const FLORA_DANGER_ICON = 'size-[16px] shrink-0';
const FLORA_BTN = '!rounded-[4px] text-base h-8 font-normal';
const FLORA_OUTLINE_BTN = `${FLORA_BTN} border border-[#d8dcde] bg-white hover:bg-[#f8f9f9]`;
const FLORA_ICON_BTN = `${FLORA_BTN} h-8 w-8 p-0 border-0 bg-transparent shadow-none hover:bg-muted/50`;
const FILTER_MENU_CONTENT_CLASS =
  'z-[200] w-72 overflow-hidden border border-[#e5e5e5] bg-white p-0 shadow-lg max-h-none';
const FILTER_MENU_SEARCH_CLASS = 'box-border w-full min-w-0 overflow-hidden border-b border-border px-2 pb-2 pt-4';
const FILTER_MENU_LIST_CLASS =
  'max-h-60 overflow-x-hidden overflow-y-auto py-1 [scrollbar-gutter:stable]';

const REFRESH_RATE_DEFAULT = 'default';
const REFRESH_RATE_OPTIONS: { value: string; label: string; short: string; hint?: string; isDefault?: boolean }[] = [
  { value: 'default', label: 'Default', short: '60 sec', hint: '60 sec', isDefault: true },
  { value: 'manual', label: 'Paused', short: 'Paused', hint: 'Auto-refresh is paused. Refresh only when you click the refresh icon.' },
  { value: '10s', label: 'Every 10 seconds', short: '10 sec' },
  { value: '30s', label: 'Every 30 seconds', short: '30 sec' },
  { value: '60s', label: 'Every 60 seconds', short: '60 sec' },
  { value: '5m', label: 'Every 5 minutes', short: '5 min' },
  { value: '10m', label: 'Every 10 minutes', short: '10 min' },
  { value: '30m', label: 'Every 30 minutes', short: '30 min' },
];

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

// Flora color palette shared by the widget style menu color pickers
const FLORA_PALETTE = ['#2f3941', '#1f73b7', '#038153', '#00a2a2', '#5f5cd6', '#6b46c1', '#c72a1c', '#ad5e18', '#68737d', '#d8dcde', '#ffffff', 'transparent'];

// Palette used for text component color, border + background pickers.
// Laid out on a 6-column grid as three grouped rows:
//   row 1 — neutrals: white, greys, black  (none/transparent appended when allowed)
//   row 2 — dark saturated colors together
//   row 3 — light pastel colors together
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
}: {
  style: any;
  onChange: (patch: Record<string, any>) => void;
  defaultBorderOn?: boolean;
  onDelete?: () => void;
  onShare?: () => void;
  onOpenReport?: () => void;
  enableCrossFilter?: boolean;
}) {
  const sShadow = style?.shadow === true;
  const sBorder = defaultBorderOn ? style?.border !== false : style?.border === true;
  const sBorderColor = style?.borderColor || '#e5e7eb';
  const sBorderWidth = style?.borderWidth ?? 1;
  const sBg = style?.bgColor || 'transparent';
  return (
    <div className={`flex flex-col gap-2 ${enableCrossFilter ? 'w-[420px]' : ''}`}>
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
        <DropdownMenuContent align="start" className="w-56 p-3" onClick={(e) => e.stopPropagation()}>
          <span className="mb-2 block text-xs text-muted-foreground">Background</span>
          <div onClick={(e) => e.stopPropagation()}>
            <FloraColorPicker value={sBg} onChange={(c) => onChange({ bgColor: c })} allowTransparent />
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
        <DropdownMenuContent align="start" className="w-56 p-3 space-y-3" onClick={(e) => e.stopPropagation()}>
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
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#dcdcda] pb-1 pt-4" onClick={(e) => e.stopPropagation()}>
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
  type: 'chart' | 'text' | 'link' | 'image' | 'filter' | 'separator' | 'section';
  title?: string;
  content?: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
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
    description: 'Coming soon',
    disabled: true
  }
];

// The less-used insert tools live behind the toolbar's overflow menu so the
// row keeps to the widgets people reach for on every dashboard.
const toolbarOverflowItems = [
  {
    id: 'section',
    label: 'Section',
    shortcut: 'S',
    icon: <StopStroke className={FLORA_ICON} />,
  },
  {
    id: 'separator',
    label: 'Line',
    shortcut: 'L',
    icon: <LineRule className={FLORA_ICON} />,
  },
  {
    id: 'parameter',
    label: 'Parameter',
    shortcut: 'P',
    icon: <ShapesStroke className={FLORA_ICON} />,
    disabled: true,
  },
  {
    id: 'fetch',
    label: 'Fetch',
    shortcut: 'F',
    icon: <Download className={FLORA_ICON} />,
    disabled: true,
  },
];

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
  { id: 'report-12', name: 'Team Productivity Metrics', type: 'Performance', lastUpdated: '2024-01-04', owner: 'Emily Rodriguez', projectName: 'Real-time Monitoring', tags: [{ label: 'Performance' }] },
  { id: 'report-13', name: 'Customer Effort Score', type: 'KPI', lastUpdated: '2024-01-03', owner: 'John Smith', projectName: 'Customer Experience Hub', tags: [{ label: 'KPI' }, { label: 'CES' }] },
  { id: 'report-14', name: 'Ticket Reopen Rate', type: 'Analytics', lastUpdated: '2024-01-02', owner: 'Sarah Chen', projectName: 'Support Operations', tags: [{ label: 'Analytics' }] },
  { id: 'report-15', name: 'Queue Wait Time Report', type: 'KPI', lastUpdated: '2024-01-01', owner: 'Michael Park', projectName: 'Real-time Monitoring', tags: [{ label: 'KPI' }, { label: 'Queues' }] },
  { id: 'report-16', name: 'Regional Support Breakdown', type: 'Support', lastUpdated: '2023-12-31', owner: 'Emily Rodriguez', projectName: 'Customer Experience Hub', tags: [{ label: 'Support' }, { label: 'Regional' }] },
  { id: 'report-17', name: 'Automation Impact Summary', type: 'Analytics', lastUpdated: '2023-12-30', owner: 'John Smith', projectName: 'Support Operations', tags: [{ label: 'Analytics' }, { label: 'Automation' }] },
  { id: 'report-18', name: 'Agent Utilization Report', type: 'Performance', lastUpdated: '2023-12-29', owner: 'Sarah Chen', projectName: 'Real-time Monitoring', tags: [{ label: 'Performance' }, { label: 'Utilization' }] },
];

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

// Each section gets a light tint plus a saturated accent used for its heading
// strip. The tints stay near-white so the white cards on top still separate from
// them, and every accent is only ever a reinforcement — headings, labels, icons
// and trend arrows carry the meaning on their own.
const SO_SECTIONS = {
  summary: { bg: '#f4f7fb', border: '#dbe6f3', accent: '#1f4f8f' },
  demand: { bg: '#f7f5fc', border: '#e4dcf3', accent: '#5b4bc4' },
  service: { bg: '#fdf8f1', border: '#f2e5cf', accent: '#a8641b' },
  experience: { bg: '#f3faf7', border: '#d6ebe3', accent: '#12775b' },
  teams: { bg: '#f5f6fa', border: '#e0e3ee', accent: '#3f4a7e' },
};

// Vertical rhythm — generous, so the bands read as separate areas.
const SO_SECTION_GAP = 40;
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

function createLibraryDashboardItems(): ContentItem[] {
  const items: ContentItem[] = [];
  let y = LIB_M;

  // ---- Hero ---------------------------------------------------------------
  // Full-width dark band: headline, reporting period, and a short intro, all in
  // white. The global filter bar lives in the toolbar above the canvas, so it
  // isn't duplicated here — one filter row scopes everything below it.
  const heroH = 182;
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
      y: y + SO_PAD + 4,
      w: libSpan(6),
      fontSize: 14,
      fontWeight: 500,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  items.push(
    libHeading('so-hero-title', 'Support is getting faster while demand shifts to chat', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_PAD + 28,
      w: libSpan(8),
      fontSize: 32,
      fontWeight: 500,
      color: SO_HERO_TEXT,
    })
  );
  items.push(
    libHeading(
      'so-hero-intro',
      'Weeks 27–32 (6 Jul – 16 Aug 2026) across all channels, brands and regions. Resolution time and satisfaction both improved; urgent-priority SLA and the Escalations queue are the two areas that need a decision this quarter.',
      {
        x: libX(0) + SO_PAD + 8,
        y: y + SO_PAD + 80,
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
      y: y + SO_PAD + 20,
      w: libSpan(3) - SO_PAD - 8,
      h: 118, // five lines of period metadata
      fontSize: 14,
      bold: false,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  y += heroH + SO_SECTION_GAP;

  // ---- Executive summary: KPI band + AI narrative -------------------------
  // Three KPIs rather than a wall of them, so the band stays readable, plus the
  // period's written summary as the one tinted card in the row.
  const kpiH = 226;
  const summary = soSection('summary', {
    y,
    title: 'Executive summary',
    blurb: 'The three measures leadership commits to externally, and what changed behind them.',
    bg: SO_SECTIONS.summary.bg,
    border: SO_SECTIONS.summary.border,
    bodyH: kpiH,
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
  kpis.forEach(([id, title, content], i) => {
    items.push(
      libChart(id, title, { x: soInX(i * 3), y: summaryY, w: soIn(3), h: kpiH }, content)
    );
  });
  items.push(
    libChart(
      'so-summary-narrative',
      'Period summary',
      { x: soInX(9), y: summaryY, w: soIn(3), h: kpiH },
      {
        chartType: 'so-narrative',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        heading: 'What changed this period',
        summary:
          'Faster routing cut resolution time by a third without hurting quality — but the gains are unevenly spread.',
        points: [
          'Chat overtook email as the busiest channel in week 31.',
          'Urgent-priority SLA slipped to 82%, below the 90% commitment.',
          'Escalations is running at 96% occupancy with a growing backlog.',
        ],
      },
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
  // Two comparison charts side by side, then the risk callout underneath, all on
  // the one section panel.
  const serviceChartH = 330;
  const serviceCalloutH = 166;
  const service = soSection('service', {
    y,
    title: 'Service efficiency and SLA',
    blurb: 'How quickly we respond and resolve, and whether we are keeping the commitments we sold.',
    bg: SO_SECTIONS.service.bg,
    border: SO_SECTIONS.service.border,
    bodyH: serviceChartH + LIB_GAP + serviceCalloutH,
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
  const serviceCalloutY = service.bodyY + serviceChartH + LIB_GAP;

  items.push(
    libChart(
      'so-service-callout',
      'Threshold breach',
      { x: soInX(0), y: serviceCalloutY, w: soIn(6), h: serviceCalloutH },
      {
        chartType: 'so-callout',
        tone: 'risk',
        reportSource: 'SLA Compliance Report',
        reportType: 'Compliance',
        heading: 'Urgent-priority SLA has breached its 90% commitment',
        body:
          'Urgent tickets finished inside SLA 82% of the time this period, down 6 points. Two enterprise contracts carry service credits at 90%.',
        metric: '82%',
        metricLabel: 'attainment vs 90% target',
      },
      SO_CARD_CHROME
    )
  );
  items.push(
    libChart(
      'so-service-win',
      'Material improvement',
      { x: soInX(6), y: serviceCalloutY, w: soIn(6), h: serviceCalloutH },
      {
        chartType: 'so-callout',
        tone: 'win',
        reportSource: 'Resolution Time Analysis',
        reportType: 'KPI',
        heading: 'Routing changes cut resolution time by a third',
        body:
          'The skills-based routing rollout in week 28 is the single largest driver, and it held through a 12% rise in volume.',
        metric: '−3.3 h',
        metricLabel: 'median resolution vs week 27',
      },
      SO_CARD_CHROME
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
const MON_SECTIONS = {
  exec: { bg: '#f4f8fc', border: '#c8dcec', accent: '#144a75' },
  demand: { bg: '#f7f5fd', border: '#dcd6f5', accent: '#5f4fd1' },
  sla: { bg: '#fdf8f1', border: '#f0dcc4', accent: '#ad5918' },
  cx: { bg: '#f2faf8', border: '#c9e8e2', accent: '#0b7d6e' },
  team: { bg: '#f5f6fb', border: '#d5daee', accent: '#3d4fa1' },
  risk: { bg: '#fdf6f6', border: '#f0d4d5', accent: '#a3232b' },
};

function createMonitoringDashboardItems(): ContentItem[] {
  const items: ContentItem[] = [];
  let y = LIB_M;

  // ---- Hero ---------------------------------------------------------------
  // The lede: what the period says in one sentence, so the rest of the
  // dashboard is read as evidence for it rather than as a pile of charts.
  const heroH = 184;
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
      y: y + SO_PAD + 4,
      w: libSpan(6),
      fontSize: 14,
      fontWeight: 500,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  items.push(
    libHeading('mon-hero-title', 'Support operations, at a glance', {
      x: libX(0) + SO_PAD + 8,
      y: y + SO_PAD + 28,
      w: libSpan(8),
      fontSize: 32,
      fontWeight: 500,
      color: SO_HERO_TEXT,
    })
  );
  items.push(
    libHeading(
      'mon-hero-intro',
      'Demand is running 18% above forecast, driven almost entirely by billing contacts. Response SLA is holding, but resolution SLA has slipped for five consecutive weeks and needs a capacity decision this week. CSAT and AI containment both continue to improve.',
      {
        x: libX(0) + SO_PAD + 8,
        y: y + SO_PAD + 80,
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
      y: y + SO_PAD + 20,
      w: libSpan(3) - SO_PAD - 8,
      h: 118,
      fontSize: 14,
      bold: false,
      color: SO_HERO_TEXT_MUTED,
    })
  );
  y += heroH + SO_SECTION_GAP;

  // ---- Executive summary --------------------------------------------------
  // Four headline numbers, then the demand-vs-plan chart that explains them and
  // the written read of the period beside it.
  const kpiH = 200;
  const execRowH = 318;
  const exec = soSection('mon-exec', {
    y,
    title: 'Executive summary',
    blurb: 'The four numbers leaders are asking about. Resolution SLA is the one exception this month — everything else is on or ahead of target.',
    bg: MON_SECTIONS.exec.bg,
    border: MON_SECTIONS.exec.border,
    bodyH: kpiH + LIB_GAP + execRowH,
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
      { x: soInX(0), y: execRowY, w: soIn(8), h: execRowH },
      {
        chartType: 'mon-volume-forecast',
        reportSource: 'Real-time Monitoring',
        reportType: 'Monitoring',
        description: 'Contacts received per hour against the staffing forecast for the same hour.',
      }
    )
  );
  items.push(
    libChart(
      'mon-exec-narrative',
      'AI summary',
      { x: soInX(8), y: execRowY, w: soIn(4), h: execRowH },
      {
        chartType: 'mon-narrative',
        reportSource: 'Customer Support Analytics',
        reportType: 'Analytics',
        heading: 'Billing is the whole story',
        summary:
          'Billing and refund contacts are up 18% and account for 78% of the total volume increase. Every other driver is flat or down.',
        points: [
          'Resolution SLA fell in the Billing team only — the other three are inside target.',
          'That makes this a capacity problem rather than a process one.',
          'Reallocating agents is the fastest lever available this week.',
        ],
      },
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
    values: ['All Regions', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
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

function AddFilterMenu({
  onAdd,
  excludeTypeIds = [],
}: {
  onAdd: (typeId: string) => void;
  excludeTypeIds?: string[];
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const available = filterOptions.filter((f) => !excludeTypeIds.includes(f.id));
  const filtered = available.filter((f) =>
    f.label.toLowerCase().includes(search.toLowerCase()),
  );

  const filterIcon = (
    <Filter className={`${FLORA_HEADER_ICON} !text-[#646864]`} aria-hidden />
  );

  if (available.length === 0) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        className={`h-8 w-8 shrink-0 p-0 ${FLORA_BTN}`}
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
      <FloraTooltip content="Add filter" placement="bottom" size="small">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`w-[32px] shrink-0 p-0 hover:bg-muted ${FLORA_BTN} !h-[32px]`}
            aria-label="Add filter"
          >
            {filterIcon}
          </Button>
        </DropdownMenuTrigger>
      </FloraTooltip>
      <DropdownMenuContent align="start" className={FILTER_MENU_CONTENT_CLASS}>
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
        <div className={FILTER_MENU_LIST_CLASS}>
          {filtered.length === 0 ? (
            <div className="px-3 py-2">
              <MD tag="span" className="!text-muted-foreground">No filters found</MD>
            </div>
          ) : (
            filtered.map((filterType) => (
              <DropdownMenuItem
                key={filterType.id}
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
              <Table.Head>
                <Table.HeaderRow>
                  <Table.HeaderCell>{floraTableHeader('Name')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Project Name')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Owner')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Last Updated')}</Table.HeaderCell>
                </Table.HeaderRow>
              </Table.Head>
              <Table.Body>
                {filteredReports.map((report) => (
                  <Table.Row
                    key={report.id}
                    onClick={() => onSelect(report.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Table.Cell isTruncated>
                      <div className="flex min-w-0 items-center gap-[8px]">
                        <BarChartIcon className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} block min-w-0 truncate`}>{report.name}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <div className="flex min-w-0 items-center gap-[6px]">
                        <Folder className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={`${FLORA_TABLE_PRIMARY} block min-w-0 truncate`}>{report.projectName}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-[6px] whitespace-nowrap">
                        <UserCircle className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={FLORA_TABLE_PRIMARY}>{report.owner}</MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-[6px] whitespace-nowrap">
                        <Clock className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={FLORA_TABLE_PRIMARY}>{report.lastUpdated}</MD>
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
}: {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  dense?: boolean;
}) {
  return (
    <ComboboxField className={dense ? '[&_[data-garden-id="dropdowns.combobox"]_*]:!text-[12px] [&_[data-garden-id="dropdowns.combobox"]_*]:!leading-4' : undefined}>
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
  trigger,
}: {
  filterLabel: string;
  values: string[];
  selectedValues: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (values: string[]) => void;
  onRemove: () => void;
  trigger: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('filter');
  const [search, setSearch] = useState('');
  const [scopedSearch, setScopedSearch] = useState(false);
  const [draft, setDraft] = useState<string[]>(selectedValues);

  useEffect(() => {
    if (open) {
      setDraft([...selectedValues]);
      setSearch('');
      setScopedSearch(false);
      setActiveTab('filter');
    }
  }, [open, selectedValues]);

  const searchPool = scopedSearch ? values.filter((value) => draft.includes(value)) : values;
  const normalizedSearch = search.trim().toLowerCase();
  const filteredValues = searchPool.filter((value) =>
    !normalizedSearch ? true : value.toLowerCase().includes(normalizedSearch),
  );

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

  const handleApply = () => {
    if (draft.length === 0) {
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

              <div className="dashboard-filter-panel-scoped">
                <Field>
                  <Checkbox
                    checked={scopedSearch}
                    onChange={(event) => setScopedSearch(event.target.checked)}
                  >
                    <Field.Label>Scoped search</Field.Label>
                  </Checkbox>
                </Field>
              </div>

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

        <div className="dashboard-filter-panel-footer">
          <IconButton
            aria-label={`Remove ${filterLabel} filter`}
            size="small"
            isDanger
            className="dashboard-filter-panel-remove-btn"
            onClick={handleRemove}
          >
            <Trash2 className={FLORA_DANGER_ICON} aria-hidden />
          </IconButton>
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
        <FloraTooltip content={overflowValues.join(', ')} placement="bottom" size="small">
          <span className="inline-flex shrink-0">
            <MD tag="span" className={FILTER_ACTIVE_OVERFLOW}>
              + {overflowCount} more
            </MD>
          </span>
        </FloraTooltip>
      )}
    </>
  );

  if (!isEditing) {
    return (
      <div className={`dashboard-active-filter shrink-0 ${FILTER_ACTIVE_SHELL}`}>
        {filterContent}
      </div>
    );
  }

  return (
    <DashboardFilterValuePanel
      filterLabel={filter.label}
      values={filterType?.values ?? []}
      selectedValues={selectedValues}
      open={panelOpen}
      onOpenChange={setPanelOpen}
      onApply={(values) => onUpdate(filter.id, values.join(', '))}
      onRemove={() => onRemove(filter.id)}
      trigger={
        <button
          type="button"
          className={`dashboard-active-filter shrink-0 ${FILTER_ACTIVE_SHELL} m-0 cursor-pointer text-left font-inherit`}
          aria-label={`Edit ${filter.label} filter`}
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
  // A dashboard opened from the library arrives with content, so it starts in
  // view mode. A dashboard the user just created is blank, so it starts in edit
  // mode. (initialData.isNew can't be used here: the library open paths set it
  // to true as well, and it also drives the pre-created dashboard routing.)
  const startsInEditMode = !shouldPrepopulate;
  // A brand-new dashboard has no project or subproject until it is saved, so
  // there is no location to point at yet.
  const [hasLocation, setHasLocation] = useState(shouldPrepopulate);

  // Which prebuilt content an opened dashboard arrives with. The monitoring
  // dashboard has its own layout; anything else opened from the library gets the
  // service-review one.
  const openedDashboardName = dashboardTitle || initialData?.dashboardName;
  const [tabs, setTabs] = useState<DashboardTab[]>([
    {
      id: 'tab-1',
      name: 'Tab 1',
      contentItems: !shouldPrepopulate
        ? [] // a dashboard the user just created starts blank
        : openedDashboardName === MONITORING_DASHBOARD_TITLE
          ? createMonitoringDashboardItems()
          : createLibraryDashboardItems(),
    }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [dragOverImageId, setDragOverImageId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  // Id of the text item whose link picker (TextLinkModal) is open, if any
  const [textLinkModalItemId, setTextLinkModalItemId] = useState<string | null>(null);
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);
  // Id of the currently selected/active widget. Its contextual toolbar and
  // resize handles are only shown once it is clicked.
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(startsInEditMode);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(true);
  const [refreshRate, setRefreshRate] = useState('default');
  // Remembers the rate active before switching to "Paused" so removing the pause tag can restore it.
  const [prePauseRate, setPrePauseRate] = useState('default');
  const handleSelectRefreshRate = (value: string) => {
    if (value === 'manual' && refreshRate !== 'manual') setPrePauseRate(refreshRate);
    setRefreshRate(value);
  };
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const handleClearPause = () => {
    setRefreshRate(prePauseRate === 'manual' ? REFRESH_RATE_DEFAULT : prePauseRate);
    setIsRateMenuOpen(false);
  };
  const [showChartModal, setShowChartModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(dashboardTitle || initialData?.dashboardName || 'Untitled dashboard');
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
  // Every dashboard (new or opened) starts with a Last 30 days date filter
  const [activeFilters, setActiveFilters] = useState<Array<{ id: string; label: string; value: string; typeId: string }>>([
    { id: 'filter-default-date-range', label: 'Date Range', value: 'Last 30 days', typeId: 'date-range' },
  ]);
  const [showEventFilter, setShowEventFilter] = useState(true);
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);
  const [isBookmarkModified, setIsBookmarkModified] = useState(false);
  const [showSaveBookmarkModal, setShowSaveBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');
  const [isSavingAsNew, setIsSavingAsNew] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  // Reverting throws away unsaved edits, so it asks first.
  const [showRevertModal, setShowRevertModal] = useState(false);

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

  // Mock saved filtered views
  const savedFilteredViews = [
    { id: 'view-1', name: 'Q4 2024 Performance', filters: [{ id: 'f1', label: 'Time Period', value: 'Q4 2024', typeId: 'timeframe' }] },
    { id: 'view-2', name: 'North America Region', filters: [{ id: 'f2', label: 'Region', value: 'North America', typeId: 'region' }] },
    { id: 'view-3', name: 'Enterprise Customers', filters: [{ id: 'f3', label: 'Customer Segment', value: 'Enterprise', typeId: 'segment' }] },
  ];

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
  const getNextPosition = (size: { width: number; height: number }) => {
    if (contentItems.length === 0) {
      return { x: CANVAS_WIDGET_PADDING, y: CANVAS_WIDGET_PADDING };
    }
    // Place to the right of the item with the largest right edge on the current top row
    const last = contentItems[contentItems.length - 1];
    const candidateX = last.position.x + last.size.width + CANVAS_WIDGET_PADDING;

    if (candidateX + size.width <= CANVAS_MAX_WIDTH) {
      return { x: candidateX, y: last.position.y };
    }

    // Wrap to a new row below the tallest item so far
    const nextRowY = contentItems.reduce(
      (maxBottom, item) => Math.max(maxBottom, item.position.y + item.size.height),
      0
    ) + CANVAS_WIDGET_PADDING;
    return { x: CANVAS_WIDGET_PADDING, y: nextRowY };
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


  const handleToolSelect = (toolId: string) => {
    if (toolId === 'chart') {
      setShowReportsModal(true);
    } else if (toolId === 'image') {
      // Drop an empty image box onto the canvas with a drop/select placeholder
      const newItem: ContentItem = {
        id: `image-${Date.now()}`,
        type: 'image',
        position: getNextPosition({ width: 320, height: 220 }),
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
        position: getNextPosition({ width: 260, height: 64 }),
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
        position: getNextPosition({ width: 320, height: 24 }),
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
        position: getNextPosition({ width: 400, height: 240 }),
        size: { width: 400, height: 240 },
        content: { style: { shadow: false, border: true, borderColor: '#D8DCDE', borderWidth: 1, bgColor: '#FFFFFF' } }
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
    const MIN_H = item.type === 'separator' ? 24 : item.type === 'text' ? 40 : 100;

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

  const handleResetFilters = () => {
    setActiveFilters([]);
    if (activeBookmarkId) {
      setIsBookmarkModified(true);
    }
  };

  const handleApplySavedView = (viewId: string) => {
    const view = savedFilteredViews.find(v => v.id === viewId);
    if (view) {
      setActiveFilters(view.filters);
      setActiveBookmarkId(viewId);
      setIsBookmarkModified(false);
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
    // TODO: Implement delete bookmark logic
    console.log('Delete bookmark:', viewId);
    if (activeBookmarkId === viewId) {
      setActiveBookmarkId(null);
      setIsBookmarkModified(false);
    }
  };

  const handleSaveBookmark = () => {
    if (activeBookmarkId) {
      const activeBookmark = savedFilteredViews.find(v => v.id === activeBookmarkId);
      if (activeBookmark) {
        // Update existing bookmark with current filters
        console.log('Update bookmark:', activeBookmarkId, activeFilters);
        setIsBookmarkModified(false);
      }
    }
  };

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

  const handleConfirmSaveBookmark = () => {
    if (!bookmarkName.trim()) return;

    if (isSavingAsNew) {
      // Create new bookmark
      console.log('Create new bookmark:', bookmarkName, activeFilters);
      setIsBookmarkModified(false);
    } else {
      // Save as new bookmark from dropdown
      console.log('Save as bookmark:', bookmarkName, activeFilters);
    }

    setShowSaveBookmarkModal(false);
    setBookmarkName('');
  };

  const handleReportSelect = (reportId: string) => {
    setShowReportsModal(false);
    const selectedReport = mockReports.find(r => r.id === reportId);
    
    // Create KPI automated resolution time chart based on selected report
    const newItem: ContentItem = {
      id: `kpi-resolution-${Date.now()}`,
      type: 'chart',
      position: getNextPosition({ width: 350, height: 250 }),
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

    setContentItems([...contentItems, newItem]);
    setSelectedItemId(newItem.id);
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

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Clicking empty canvas deselects any active text editor / selected widget
    if (editingTextId) setEditingTextId(null);
    setSelectedItemId(null);
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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

  return (
    <div className="h-full w-full flex gap-2 min-w-0">
      <div className="flex-1 min-w-0 flex flex-col bg-white rounded-[24px] overflow-hidden transition-all duration-300">
        {/* Header with breadcrumb navigation */}
        <div className="border-b border-border bg-white px-6 py-2">
          <div className="relative flex items-center justify-between">
            {/* Centered editing toolbar */}
            {isEditing && (
              <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[#f3f4f4] px-1.5 py-1">
                {toolbarItems.map((tool) => (
                  <FloraTooltip
                    key={tool.id}
                    content={
                      'disabled' in tool && tool.disabled
                        ? `${tool.label} - Coming soon`
                        : toolTooltip(tool.label, 'shortcut' in tool ? tool.shortcut : undefined)
                    }
                    placement="bottom"
                    size="small"
                  >
                    <Button
                      variant={selectedTool === tool.id ? "secondary" : "ghost"}
                      size="sm"
                      aria-label={tool.label}
                      aria-disabled={'disabled' in tool && tool.disabled ? true : undefined}
                      onClick={() => {
                        if ('disabled' in tool && tool.disabled) return;
                        handleToolSelect(tool.id);
                      }}
                      className={`h-8 w-8 shrink-0 p-0 hover:!bg-white ${FLORA_BTN} ${'disabled' in tool && tool.disabled ? 'opacity-50 hover:!bg-transparent' : ''}`}
                    >
                      {tool.icon}
                    </Button>
                  </FloraTooltip>
                ))}

                {/* Overflow: the remaining insert tools */}
                <DropdownMenu>
                  <FloraTooltip content="More components" placement="bottom" size="small">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="More components"
                        className={`h-8 w-8 shrink-0 p-0 hover:!bg-white ${FLORA_BTN}`}
                      >
                        <ChevronDown className={FLORA_TOOLBAR_ICON} />
                      </Button>
                    </DropdownMenuTrigger>
                  </FloraTooltip>
                  <DropdownMenuContent align="center" className="w-48">
                    {toolbarOverflowItems.map((tool) => (
                      <DropdownMenuItem
                        key={tool.id}
                        className="gap-3"
                        disabled={tool.disabled}
                        onClick={() => {
                          if (tool.disabled) return;
                          handleToolSelect(tool.id);
                        }}
                      >
                        {tool.icon}
                        <MD tag="span" className="!text-foreground">{tool.label}</MD>
                        {!tool.disabled && (
                          <MD tag="span" className="ml-auto pl-3 !text-muted-foreground">
                            {tool.shortcut}
                          </MD>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="mx-0.5 h-5 w-px shrink-0 bg-[#dcdcda]" aria-hidden="true" />

                <FloraTooltip content="Edit layout and appearance" placement="bottom" size="small">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Edit layout and appearance"
                    onClick={() => console.log('Edit layout and appearance')}
                    className={`h-8 w-8 shrink-0 p-0 hover:!bg-white ${FLORA_BTN}`}
                  >
                    <Palette className={FLORA_TOOLBAR_ICON} />
                  </Button>
                </FloraTooltip>

                <FloraTooltip content="Edit in dev mode" placement="bottom" size="small">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Edit in dev mode"
                    onClick={() => console.log('Edit in dev mode')}
                    className={`h-8 w-8 shrink-0 p-0 hover:!bg-white ${FLORA_BTN}`}
                  >
                    <TerminalStroke className={FLORA_TOOLBAR_ICON} style={{ width: 16, height: 16 }} />
                  </Button>
                </FloraTooltip>
              </div>
            )}
            <div className="flex items-center gap-3 group">
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
                        setEditedTitle(dashboardTitle || initialData?.dashboardName || 'Untitled dashboard');
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
                    <Check className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  </IconButton>
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => {
                      setEditedTitle(dashboardTitle || initialData?.dashboardName || 'Untitled dashboard');
                      setIsEditingTitle(false);
                    }}
                    aria-label="Cancel name edit"
                  >
                    <X className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  </IconButton>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-base font-normal">
                  {hasLocation && (
                  <DropdownMenu open={isLocationMenuOpen} onOpenChange={setIsLocationMenuOpen}>
                    {/* The menu itself lists the breadcrumb trail, so the tooltip
                        only needs to name what the icon opens. */}
                    <FloraTooltip content="Location" placement="bottom" size="small">
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          // 32px matches the filter bar's icon box below, so the
                          // folder and filter glyphs share one left edge.
                          className="flex h-[32px] w-[32px] items-center justify-center rounded text-[#68737d] hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                          aria-label="Dashboard location"
                        >
                          <Folder className={FLORA_ICON} />
                        </button>
                      </DropdownMenuTrigger>
                    </FloraTooltip>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuLabel className={FLORA_MENU_TITLE}>
                        Location
                      </DropdownMenuLabel>
                      {/* Parent folder */}
                      <DropdownMenuItem
                        onClick={() => handleOpenLocation(displayProjectName)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Folder className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground truncate">{displayProjectName}</MD>
                      </DropdownMenuItem>
                      {/* Subfolder — the elbow marks it as nested inside the folder above */}
                      <DropdownMenuItem
                        onClick={() => handleOpenLocation(displaySubprojectName)}
                        className="flex items-center gap-2 cursor-pointer"
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
                      <Edit2 className={`${FLORA_ICON} opacity-0 group-hover/name:opacity-100 transition-opacity`} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-1.5 py-0.5">
                      <span className="text-foreground">{editedTitle}</span>
                      <FloraTooltip
                        content={isStarred ? 'Remove from starred' : 'Add to starred'}
                        placement="bottom"
                        size="small"
                      >
                        <button
                          type="button"
                          onClick={() => setIsStarred((prev) => !prev)}
                          aria-label={isStarred ? 'Remove from starred' : 'Add to starred'}
                          aria-pressed={isStarred}
                          className="ml-0.5 flex h-6 w-6 items-center justify-center rounded hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          {isStarred ? (
                            <Star className={FLORA_ICON} style={{ color: '#eba30b' }} />
                          ) : (
                            <StarStroke className={FLORA_ICON} />
                          )}
                        </button>
                      </FloraTooltip>
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Viewing controls */}
              {!isEditing && (
                <>
                <DropdownMenu open={isSavedViewsMenuOpen} onOpenChange={setIsSavedViewsMenuOpen}>
                  {activeBookmarkId ? (
                    <div className="flex h-[32px] shrink-0 items-center gap-1 rounded-[8px] border border-[#dcdcda] bg-white pl-2 pr-1.5">
                      <Bookmark className={FLORA_ICON} style={{ width: 16, height: 16 }} />
                      <span className="flex h-5 items-center gap-1 rounded bg-[#e4f2fb] pl-1.5 pr-1 text-[12px] font-normal leading-4 text-[#1f73b7]">
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Saved views"
                            className="flex items-center text-[12px] font-normal leading-4"
                          >
                            {savedFilteredViews.find(v => v.id === activeBookmarkId)?.name}
                          </button>
                        </DropdownMenuTrigger>
                        <button
                          type="button"
                          aria-label="Clear saved view"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); handleClearSavedView(); }}
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-[#1f73b7]/20 transition-colors"
                        >
                          <X style={{ width: 11, height: 11 }} />
                        </button>
                      </span>
                      <DropdownMenuTrigger asChild>
                        <button type="button" aria-label="Saved views" className="flex items-center">
                          <ChevronDown className={FLORA_ICON} />
                        </button>
                      </DropdownMenuTrigger>
                    </div>
                  ) : (
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 ${FLORA_BTN} !h-[32px] !rounded-[8px] border border-[#dcdcda] bg-white hover:bg-[#f8f9f9]`}
                      >
                        <Bookmark className={FLORA_ICON} />
                        <span className="!text-[12px] !leading-4 !font-normal">Saved views</span>
                        <ChevronDown className={FLORA_ICON} />
                      </Button>
                    </DropdownMenuTrigger>
                  )}
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel className={FLORA_MENU_TITLE}>
                      Saved views
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={handleClearSavedView}
                      className={`flex items-center gap-2 ${!activeBookmarkId ? 'bg-[#1f73b7]/10 focus:bg-[#1f73b7]/15 data-[highlighted]:bg-[#1f73b7]/15' : ''}`}
                    >
                      {!activeBookmarkId && <Check className={`${FLORA_MENU_ICON} !text-[#1f73b7]`} />}
                      <MD tag="span" className={`${!activeBookmarkId ? '!text-[#1f73b7]' : '!text-muted-foreground'} ${!activeBookmarkId ? '' : 'ml-6'}`}>None</MD>
                    </DropdownMenuItem>
                    {savedFilteredViews.length > 0 && (
                      <div className="border-t border-border my-1"></div>
                    )}
                    {savedFilteredViews.map((view) => (
                      <DropdownMenuItem
                        key={view.id}
                        onClick={() => handleApplySavedView(view.id)}
                        className={`flex items-center justify-between group ${activeBookmarkId === view.id ? 'bg-[#1f73b7]/10 focus:bg-[#1f73b7]/15 data-[highlighted]:bg-[#1f73b7]/15' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          {activeBookmarkId === view.id && (
                            <Check className={`${FLORA_MENU_ICON} !text-[#1f73b7]`} />
                          )}
                          <MD tag="span" className={`${activeBookmarkId === view.id ? '!text-[#1f73b7]' : '!text-foreground'} ${activeBookmarkId === view.id ? '' : 'ml-6'}`}>{view.name}</MD>
                        </div>
                        <button
                          onClick={(e) => handleDeleteBookmark(view.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className={FLORA_MENU_ICON} />
                        </button>
                      </DropdownMenuItem>
                    ))}
                    {isBookmarkModified && activeBookmarkId && (
                      <>
                        <div className="border-t border-border my-1"></div>
                        <DropdownMenuItem className="gap-2" onClick={handleSaveBookmark}>
                          <Save className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Save</MD>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={handleSaveAsNewBookmark}>
                          <Save className={FLORA_MENU_ICON} />
                          <MD tag="span" className="!text-foreground">Save as new</MD>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu open={isRateMenuOpen} onOpenChange={setIsRateMenuOpen}>
                  <div className="flex h-[32px] shrink-0 items-center rounded-[8px] border border-[#dcdcda] bg-white overflow-hidden">
                    <FloraTooltip content="Refresh data now" placement="bottom" size="small">
                      <button
                        type="button"
                        onClick={() => console.log('Reload dashboard')}
                        aria-label="Refresh data now"
                        className="flex h-full items-center px-2 hover:bg-[#f8f9f9] transition-colors"
                      >
                        <ArrowRotateRight className={FLORA_ICON} style={{ width: 16, height: 16 }} />
                      </button>
                    </FloraTooltip>
                    <div className="h-5 w-px shrink-0 bg-[#dcdcda]" aria-hidden="true" />
                    {refreshRate === 'manual' ? (
                      <div className="flex h-full items-center gap-1 px-2">
                        <span className="flex h-5 items-center gap-1 rounded bg-[#fbe4a0] pl-1.5 pr-1 text-[12px] font-normal leading-4 text-[#703b15]">
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label="Real-time data refreshment rate"
                              className="flex items-center text-[12px] leading-4"
                            >
                              Paused
                            </button>
                          </DropdownMenuTrigger>
                          <button
                            type="button"
                            aria-label="Clear pause — resume previous refresh rate"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); handleClearPause(); }}
                            className="flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-[#703b15]/20 transition-colors"
                          >
                            <X style={{ width: 11, height: 11 }} />
                          </button>
                        </span>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Real-time data refreshment rate"
                            className="flex items-center"
                          >
                            <ChevronDown className={FLORA_ICON} />
                          </button>
                        </DropdownMenuTrigger>
                      </div>
                    ) : (
                      <FloraTooltip content="Real-time data refreshment rate" placement="bottom" size="small">
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="Real-time data refreshment rate"
                            className="flex h-full items-center gap-1.5 px-2 hover:bg-[#f8f9f9] transition-colors"
                          >
                            <span className="text-[12px] leading-4 text-foreground">
                              {REFRESH_RATE_OPTIONS.find((o) => o.value === refreshRate)?.short ?? 'Manual'}
                            </span>
                            <ChevronDown className={FLORA_ICON} />
                          </button>
                        </DropdownMenuTrigger>
                      </FloraTooltip>
                    )}
                  </div>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="px-3 pt-2.5 pb-1.5">
                      <MD tag="p" className="!text-foreground !font-semibold">Real-time data refreshment rate</MD>
                    </div>
                    <div className="border-t border-border -mx-2 my-1" />
                    {REFRESH_RATE_OPTIONS.map((option) => (
                      <React.Fragment key={option.value}>
                        <DropdownMenuItem
                          className="gap-3 items-start"
                          onClick={() => handleSelectRefreshRate(option.value)}
                        >
                          <span className="flex w-4 shrink-0 items-center justify-center pt-0.5">
                            {refreshRate === option.value && (
                              <Check className={FLORA_MENU_ICON} style={{ width: 16, height: 16 }} />
                            )}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="flex items-center gap-1.5">
                              {option.value === 'manual' && (
                                <Pause className={FLORA_MENU_ICON} style={{ width: 14, height: 14 }} />
                              )}
                              <MD tag="span" className="!text-foreground">{option.label}</MD>
                              {option.isDefault && (
                                <span className="ml-auto rounded-full bg-[#1f73b7]/10 px-2 py-0.5 text-[11px] font-medium leading-4 text-[#1f73b7]">
                                  Every 60 sec
                                </span>
                              )}
                            </span>
                            {option.hint && !option.isDefault && (
                              <MD tag="span" className="!text-[12px] !text-muted-foreground">{option.hint}</MD>
                            )}
                          </span>
                        </DropdownMenuItem>
                        {option.value === 'manual' && <div className="border-t border-border -mx-2 my-1" />}
                      </React.Fragment>
                    ))}
                    <div className="border-t border-border -mx-2 mt-1" />
                    <div className="flex items-start gap-2 px-3 pt-2 pb-2.5">
                      <span className="flex h-4 shrink-0 items-center text-[#68737d]" aria-hidden="true">
                        <InfoStroke className="size-4 shrink-0" style={{ width: 14, height: 14 }} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <MD tag="span" className="!text-[12px] !text-muted-foreground">
                          Historical data refreshes daily.
                        </MD>
                        <span className="flex items-center gap-1.5">
                          <MD tag="span" className="!text-[12px] !text-muted-foreground">Last refresh</MD>
                          <span className="rounded-full bg-[#1f73b7]/10 px-2 py-0.5 text-[11px] font-medium leading-4 text-[#1f73b7]">
                            Today, 6:00 AM
                          </span>
                        </span>
                      </span>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="mx-1 h-5 w-px shrink-0 bg-border" aria-hidden="true" />
                </>
              )}
              {isEditing && (
                <div className="dashboard-history-actions flex items-center gap-0.5">
                  <FloraTooltip content="Undo" placement="bottom" size="small">
                    <IconButton
                      isPill
                      size="small"
                      onClick={() => console.log('Undo action')}
                      aria-label="Undo"
                    >
                      <UndoReturn className={FLORA_HEADER_ICON} />
                    </IconButton>
                  </FloraTooltip>
                  <FloraTooltip content="Redo" placement="bottom" size="small">
                    <IconButton
                      isPill
                      size="small"
                      onClick={() => console.log('Redo action')}
                      aria-label="Redo"
                    >
                      <RedoReturn className={FLORA_HEADER_ICON} />
                    </IconButton>
                  </FloraTooltip>
                </div>
              )}
              {/* The mode toggle keeps a fixed width so swapping the
                  Viewing/Editing label doesn't shift it. */}
              <FloraButton
                isPill
                size="small"
                onClick={() => setIsEditing(!isEditing)}
                className="dashboard-mode-toggle"
              >
                <FloraButton.StartIcon>
                  {isEditing ? (
                    <Edit2 className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  ) : (
                    <EyeStroke className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  )}
                </FloraButton.StartIcon>
                {isEditing ? 'Editing' : 'Viewing'}
              </FloraButton>
              {/* Save and Share are the same fixed width and share one slot, and
                  the overflow slot beside them is always reserved — so switching
                  mode only makes the overflow button itself appear/disappear. */}
              <div className="flex shrink-0 items-center gap-2">
              {isEditing ? (
              <SplitButton className="flora-split-button dashboard-primary-split-button">
                <FloraButton
                  isPrimary
                  isPill={false}
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
                    <ChevronButton {...props} isPrimary isPill={false} size="small" />
                  )}
                >
                  <Item value="save-as">
                    <MD tag="span" className="!text-foreground">Save as new</MD>
                  </Item>
                </Menu>
              </SplitButton>
              ) : (
              <SplitButton className="flora-split-button dashboard-primary-split-button">
                <FloraButton
                  isPrimary
                  isPill={false}
                  size="small"
                  onClick={() => console.log('Share dashboard')}
                >
                  Share
                </FloraButton>
                <Menu
                  className="flora-split-button-menu"
                  placement="bottom-end"
                  hasArrow={false}
                  appendToNode={typeof document !== 'undefined' ? document.body : undefined}
                  zIndex={9999}
                  onChange={(changes) => {
                    if (changes.type !== 'menuItem:click' || !changes.value) return;
                    if (changes.value === 'share-link') {
                      console.log('Share a link');
                    }
                    if (changes.value === 'export') {
                      console.log('Export');
                    }
                  }}
                  button={(props) => (
                    <ChevronButton {...props} isPrimary isPill={false} size="small" />
                  )}
                >
                  <Item value="share-link">
                    <MD tag="span" className="!text-foreground">Share a link</MD>
                  </Item>
                  <Item value="export">
                    <MD tag="span" className="!text-foreground">Export</MD>
                  </Item>
                </Menu>
              </SplitButton>
              )}
              {/* Reserved overflow slot: holds its 32px whether or not the
                  button is rendered, so nothing beside it moves. */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {isEditing && (
                  <DropdownMenu>
                    <FloraTooltip content="More options" placement="bottom" size="small">
                      <DropdownMenuTrigger asChild>
                        <IconButton isPill size="small" aria-label="More dashboard options" className="shrink-0">
                          <MoreVertical className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                        </IconButton>
                      </DropdownMenuTrigger>
                    </FloraTooltip>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem className="gap-2" onClick={() => setShowVersionHistory(true)}>
                        <History className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground">Version history</MD>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={() => setShowRevertModal(true)}>
                        <UndoReturn className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground">Revert all changes</MD>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive" onClick={() => console.log('Archive')}>
                        <MD tag="span" className="!text-destructive">Archive</MD>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - Always visible */}
        <div className="border-b border-border bg-white px-6 py-1.5">
          <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            {(activeFilters.length > 0 || isEditing) && (
              <>
                {isEditing ? (
                  <AddFilterMenu
                    onAdd={handleAddFilter}
                    excludeTypeIds={activeFilters.map((f) => f.typeId)}
                  />
                ) : (
                  <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center" aria-hidden>
                    <Filter className={`${FLORA_HEADER_ICON} !text-[#646864]`} />
                  </span>
                )}
              </>
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
                <FloraTooltip content="Cross filter" placement="bottom" size="small">
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
                  onClick={() => setShowEventFilter(false)}
                  className="ml-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#68737d] transition-colors hover:bg-[#f0f0f0] hover:text-[#2f3130]"
                >
                  <X style={{ width: 12, height: 12 }} aria-hidden />
                </button>
              </div>
            )}
           </div>

            {/* Overflow menu — right side of the filter bar */}
            <DropdownMenu>
              <FloraTooltip content="More options" placement="bottom" size="small">
                <DropdownMenuTrigger asChild>
                  <IconButton isPill size="small" aria-label="Filter options" className="shrink-0">
                    <MoreVertical className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  </IconButton>
                </DropdownMenuTrigger>
              </FloraTooltip>
              <DropdownMenuContent align="end" className="w-48">
                {isEditing && (
                  <DropdownMenuItem className="gap-2" onClick={() => console.log('Link filters')}>
                    <Connector className={FLORA_MENU_ICON} />
                    <MD tag="span" className="!text-foreground">Link filters</MD>
                  </DropdownMenuItem>
                )}
                {!isEditing && (
                  <DropdownMenuItem
                    className="gap-2"
                    disabled={activeFilters.length === 0}
                    onClick={handleResetFilters}
                  >
                    <UndoReturn className={FLORA_MENU_ICON} />
                    <MD tag="span" className="!text-foreground">Reset filters</MD>
                  </DropdownMenuItem>
                )}
                {isEditing && (
                  <DropdownMenuItem className="gap-2" onClick={() => console.log('Create filter set')}>
                    <Filter className={FLORA_MENU_ICON} />
                    <MD tag="span" className="!text-foreground">Create filter set</MD>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
                        className="h-6 w-32 text-base"
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

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: CANVAS_BG }}>
          <div
            className="relative w-full h-full min-h-[600px] cursor-crosshair"
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
                      return (
                        <textarea
                          value={item.content?.text || ''}
                          readOnly={!isEditing}
                          onChange={(e) => handleUpdateTextContent(item.id, { text: e.target.value })}
                          onFocus={() => setEditingTextId(item.id)}
                          placeholder="Add text"
                          autoFocus={isTextEditing}
                          rows={1}
                          className={`w-full resize-none rounded-[16px] px-3 py-2 leading-snug text-foreground placeholder:text-[#a3a3a3] focus:outline-none transition-colors ${ts.resized ? 'h-full' : ''} ${
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
                      <a
                        href={lc.linkType === 'hyperlink' ? lc.url || '#' : '#'}
                        target={lc.openInTab === 'new-tab' ? '_blank' : undefined}
                        rel={lc.openInTab === 'new-tab' ? 'noopener noreferrer' : undefined}
                        onClick={(e) => {
                          if (isEditing) e.preventDefault();
                        }}
                        className="inline-flex items-center gap-1 rounded-[3px] px-0.5 hover:opacity-80 transition-opacity"
                        style={linkStyle}
                        title={
                          lc.linkType === 'asset'
                            ? lc.assetName || 'Asset link'
                            : lc.url || 'URL'
                        }
                      >
                        {lc.linkType === 'hyperlink' && (
                          <ExternalLink style={{ width: fmt.fontSize * 0.8, height: fmt.fontSize * 0.8 }} />
                        )}
                        {labelText}
                      </a>
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
                      enableCrossFilter={item.type === 'chart'}
                      onChange={(patch) => handleUpdateTextContent(item.id, { style: { ...(item.content?.style || {}), ...patch } })}
                      onOpenReport={item.type === 'chart' ? () => console.log('Open report in builder', item.id) : undefined}
                      onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                    />
                  </div>
                )}
                <div
                  className={`h-full flex flex-col rounded-[16px] overflow-hidden ${
                    item.type === 'image'
                      ? (wBorder || wBg !== 'transparent' ? 'p-2' : 'p-0')
                      : isSectionWidget
                        // Section widgets sit on a tint with no card edge of their
                        // own, so they carry the breathing room themselves — most
                        // of it below the body, which is where bands ran tight.
                        ? 'px-3 pt-3 pb-7'
                        : 'p-3'
                  }`}
                  style={{ backgroundColor: wBg }}
                >
                  {/* Narrative, callout and action widgets draw their own heading,
                      so the standard widget title row is suppressed for them. */}
                  <div
                    className={`flex items-center justify-between gap-2 ${
                      item.type === 'image' ||
                      isServiceOpsChromeless(item.content?.chartType) ||
                      isMonitoringChromeless(item.content?.chartType)
                        ? 'hidden'
                        : isSectionWidget
                          ? 'mb-5'
                          : 'mb-2'
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2 pl-3 pt-3">
                      {/* Live data indicator */}
                      {item.content?.liveData && (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                      )}
                      {item.type !== 'image' && (
                        <FloraTooltip
                          content={item.title}
                          placement="bottom"
                          size="small"
                        >
                          {/* Widget titles rank by size, not weight: medium at
                              18px reads as a heading without shouting. */}
                          <span className="min-w-0 truncate text-foreground text-[18px] font-medium">
                            {item.title}
                          </span>
                        </FloraTooltip>
                      )}
                      {item.type !== 'image' && (
                        <FloraTooltip
                          content={item.content?.description || 'Showing data for the selected time range and filters.'}
                          placement="bottom"
                          size="small"
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#68737d] hover:text-foreground cursor-help"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Widget description"
                          >
                            <InfoStroke className="size-4 shrink-0" style={{ width: 16, height: 16 }} />
                          </span>
                        </FloraTooltip>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pr-1 pt-3">
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
                          <FloraTooltip content="More actions" placement="bottom" size="small">
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
                          <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-52">
                            {isEditing ? (
                              <>
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Open report in builder', item.id)}>
                                  <ExternalLink className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Open report</MD>
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
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Open report in builder', item.id)}>
                                  <ExternalLink className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Open report</MD>
                                </DropdownMenuItem>
                                <div className="border-t border-border my-1" />
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Create alert', item.id)}>
                                  <BellStroke className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Create alert</MD>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3" onClick={() => console.log('Share report', item.id)}>
                                  <ShareStroke className={FLORA_MENU_ICON} />
                                  <MD tag="span" className="!text-foreground">Share</MD>
                                </DropdownMenuItem>
                              </>
                            )}
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
                          <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 11 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 11 }}
                            label={{ value: 'Net worth in ($M)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#666' } }}
                            domain={[0, 3]}
                            ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#93c5fd" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#93c5fd' }}
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
                              tick={{ fill: '#999', fontSize: 11 }}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={false}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '12px'
                              }}
                            />
                            <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={12} />
                            <Bar dataKey="expense" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={12} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#4ade80]"></div>
                          <span className="text-xs text-muted-foreground">Income</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#a78bfa]"></div>
                          <span className="text-xs text-muted-foreground">Expense</span>
                        </div>
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
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '12px'
                              }}
                              cursor={false}
                            />
                            <Bar dataKey="users" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={6} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                            <span className="text-foreground">Desktop - 77.3%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
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
                              data={[
                                { name: 'Food & Groceries', value: 1800, color: '#3b82f6' },
                                { name: 'Housing', value: 1200, color: '#a5f3fc' },
                                { name: 'Utilities', value: 900, color: '#2563eb' },
                                { name: 'Transportation', value: 750, color: '#fbbf24' },
                                { name: 'Healthcare', value: 651, color: '#06b6d4' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {[
                                { name: 'Food & Groceries', value: 1800, color: '#3b82f6' },
                                { name: 'Housing', value: 1200, color: '#a5f3fc' },
                                { name: 'Utilities', value: 900, color: '#2563eb' },
                                { name: 'Transportation', value: 750, color: '#fbbf24' },
                                { name: 'Healthcare', value: 651, color: '#06b6d4' }
                              ].map((entry, index) => (
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
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                          <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 11 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 11 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3b82f6" 
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
      </div>

      {/* Reports Selection Modal */}
      {showReportsModal && (
        <SelectReportModal
          onClose={() => setShowReportsModal(false)}
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

      {showRevertModal && (
        <Modal onClose={() => setShowRevertModal(false)} restoreFocus>
          <Modal.Header tag="h2" isDanger>Revert all changes?</Modal.Header>
          <Modal.Body>
            <MD tag="p" className="!text-foreground">
              This discards every change you have made since the last save. You cannot undo this.
            </MD>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterItem>
              <FloraButton onClick={() => setShowRevertModal(false)}>
                Cancel
              </FloraButton>
            </Modal.FooterItem>
            <Modal.FooterItem>
              <FloraButton
                isPrimary
                isDanger
                onClick={() => {
                  console.log('Revert all changes');
                  setShowRevertModal(false);
                }}
              >
                Revert all changes
              </FloraButton>
            </Modal.FooterItem>
          </Modal.Footer>
          <Modal.Close aria-label="Close" />
        </Modal>
      )}

      <Dialog open={showSaveBookmarkModal} onOpenChange={setShowSaveBookmarkModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save view</DialogTitle>
            <DialogDescription>
              Give your saved view a name to save your current filter configuration.
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

      {/* Version History Side Panel */}
      {showVersionHistory && (
        <div className="w-96 shrink-0 h-full bg-white rounded-[24px] overflow-hidden flex flex-col">
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-normal">Version history</h3>
                <p className="text-base text-muted-foreground mt-1">
                  Recent changes to this dashboard
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={FLORA_ICON_BTN}
                onClick={() => setShowVersionHistory(false)}
              >
                <X className={FLORA_ICON} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-4">
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
          </div>
        </div>
      )}
    </div>
  );
}