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
  RefreshCw,
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
  Connector,
  Palette,
  StopStroke,
  ShapesStroke,
  SparklesStroke,
  PencilSparkleStroke,
  CheckSquareStroke,
  Copy,
} from '@/components/icons/flora';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const FLORA_ICON = 'size-[16px] shrink-0 text-muted-foreground';
const FLORA_TOOLBAR_ICON = 'size-[16px] shrink-0 text-muted-foreground';
const FLORA_LIBRARY_ICON = 'size-[16px] shrink-0 fill-current !text-muted-foreground';
const FLORA_TABLE_PRIMARY = 'm-0';
const FLORA_TAB_ADD_ICON = '!size-[16px] shrink-0';
const FLORA_MENU_ICON = FLORA_ICON;
const FLORA_HEADER_ICON = '!size-[16px] shrink-0 text-muted-foreground';
const FLORA_DANGER_ICON = 'size-[16px] shrink-0';
const FLORA_BTN = '!rounded-[4px] text-base h-8 font-normal';
const FLORA_OUTLINE_BTN = `${FLORA_BTN} border border-[#d8dcde] bg-white hover:bg-[#f8f9f9]`;
const FLORA_ICON_BTN = `${FLORA_BTN} h-8 w-8 p-0 border-0 bg-transparent shadow-none hover:bg-muted/50`;
const FILTER_MENU_CONTENT_CLASS =
  'z-[200] w-56 overflow-hidden border border-[#e5e5e5] bg-white p-0 shadow-lg max-h-none';
const FILTER_MENU_SEARCH_CLASS = 'box-border w-full min-w-0 overflow-hidden border-b border-border px-2 pb-2 pt-4';
const FILTER_MENU_LIST_CLASS =
  'max-h-60 overflow-x-hidden overflow-y-auto py-1 [scrollbar-gutter:stable]';
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
}: {
  style: any;
  onChange: (patch: Record<string, any>) => void;
  defaultBorderOn?: boolean;
  onDelete?: () => void;
}) {
  const sShadow = style?.shadow === true;
  const sBorder = defaultBorderOn ? style?.border !== false : style?.border === true;
  const sBorderColor = style?.borderColor || '#e5e7eb';
  const sBorderWidth = style?.borderWidth ?? 1;
  const sBg = style?.bgColor || 'transparent';
  return (
    <>
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

      {/* Delete component */}
      {onDelete && (
        <>
          <div className="mx-0.5 h-5 w-px bg-[#dcdcda]" />
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-[#c72a1c]/10"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            aria-label="Delete component"
          >
            <Trash2 className="size-[16px] shrink-0" style={{ width: 16, height: 16, color: '#c72a1c' }} />
          </button>
        </>
      )}
    </>
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
const FILTER_ACTIVE_SHELL =
  'inline-flex h-8 w-fit max-w-[360px] items-center gap-1 rounded-[8px] border border-[#dcdcda] bg-white pl-3 pr-2';
const FILTER_ACTIVE_LABEL =
  'shrink-0 whitespace-nowrap !text-[12px] !font-semibold !leading-4 !text-[#2f3130]';
const FILTER_ACTIVE_VALUES =
  'min-w-0 truncate whitespace-nowrap !text-[12px] !font-normal !leading-4 !text-[#2f3130]';
const FILTER_ACTIVE_OVERFLOW =
  'shrink-0 whitespace-nowrap !text-[12px] !font-normal !leading-4 !tracking-[-0.0004px] !text-[#406cc4]';
const FILTER_VALUE_PANEL_CLASS =
  'dashboard-filter-panel z-[200] w-[377px] overflow-hidden rounded-[8px] border border-[#d8dcde] bg-white p-0 shadow-[0_20px_14px_rgba(4,68,77,0.15)]';
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
}

const toolbarItems = [
  {
    id: 'chart',
    type: 'chart' as const,
    label: 'Report',
    icon: <BarChartIcon className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a report'
  },
  {
    id: 'text',
    type: 'text' as const,
    label: 'Text',
    icon: <TextStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add text content'
  },
  {
    id: 'image',
    type: 'image' as const,
    label: 'Image',
    icon: <ImageStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add images'
  },
  {
    id: 'elements',
    type: 'elements' as const,
    label: 'Elements',
    icon: <StopStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Add a section or separator',
    isDropdown: true,
    children: [
      {
        id: 'section',
        type: 'section' as const,
        label: 'Section',
        icon: <StopStroke className={FLORA_ICON} />,
        description: 'Add a section'
      },
      {
        id: 'separator',
        type: 'separator' as const,
        label: 'Separator',
        icon: (
          <svg className={FLORA_ICON} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        description: 'Add a divider line'
      },
    ],
  },
  {
    id: 'parameter',
    type: 'parameter' as const,
    label: 'Parameter',
    icon: <ShapesStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Coming soon',
    disabled: true
  },
  {
    id: 'narrative',
    type: 'narrative' as const,
    label: 'AI summary',
    icon: <PencilSparkleStroke className={FLORA_TOOLBAR_ICON} />,
    description: 'Coming soon',
    disabled: true
  }
];

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
            className={`h-8 w-8 shrink-0 p-0 hover:bg-muted ${FLORA_BTN}`}
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
}: {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel?: string;
}) {
  return (
    <ComboboxField>
      {label ? (
        <ComboboxField.Label className="text-sm font-medium text-foreground">{label}</ComboboxField.Label>
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

export function DashboardBuilder({ dashboardTitle, projectName, onSave, onCancel, onClose, onUpdateTitle, isFromCard, initialData, onOpenAnalyticsAssistant }: DashboardBuilderProps) {
  // Determine if this is an existing dashboard from the library
  const isExistingDashboard = initialData?.isNew === false && initialData?.fromCard === true;
  const shouldPrepopulate = isFromCard || isExistingDashboard;
  
  const [tabs, setTabs] = useState<DashboardTab[]>([
    { 
      id: 'tab-1', 
      name: 'Tab 1', 
      contentItems: shouldPrepopulate ? [
        {
          id: 'chart-1',
          type: 'chart',
          title: 'Ticket Volume Trends',
          position: { x: 24, y: 24 },
          size: { width: 420, height: 300 },
          content: {
            chartType: 'line-chart',
            reportSource: 'Ticket Volume Trends',
            reportType: 'Analytics',
            liveData: true
          }
        },
        {
          id: 'chart-2',
          type: 'chart',
          title: 'Agent Performance',
          position: { x: 460, y: 24 },
          size: { width: 420, height: 300 },
          content: {
            chartType: 'bar-chart',
            reportSource: 'Agent Performance Dashboard',
            reportType: 'Performance',
            liveData: true
          }
        },
        {
          id: 'chart-3',
          type: 'chart',
          title: 'Response Time Distribution',
          position: { x: 896, y: 24 },
          size: { width: 420, height: 300 },
          content: {
            chartType: 'area-chart',
            reportSource: 'Response Time Monitoring',
            reportType: 'KPI',
            liveData: true
          }
        },
        {
          id: 'chart-4',
          type: 'chart',
          title: 'Resolution Time KPI',
          position: { x: 24, y: 340 },
          size: { width: 315, height: 250 },
          content: {
            chartType: 'kpi-resolution-time',
            reportSource: 'Resolution Time Analysis',
            reportType: 'KPI',
            kpiData: {
              averageResolutionTime: '2.3 hours',
              change: '-18%',
              trend: 'down',
              previousPeriod: '2.8 hours'
            }
          }
        },
        {
          id: 'chart-5',
          type: 'chart',
          title: 'Customer Satisfaction',
          position: { x: 355, y: 340 },
          size: { width: 315, height: 250 },
          content: {
            chartType: 'metric-card',
            reportSource: 'Customer Satisfaction Analysis',
            reportType: 'Analytics',
            kpiData: {
              value: '94.2%',
              change: '+3.2%',
              trend: 'up',
              previousPeriod: '91.3%'
            }
          }
        },
        {
          id: 'chart-6',
          type: 'chart',
          title: 'SLA Compliance',
          position: { x: 686, y: 340 },
          size: { width: 315, height: 250 },
          content: {
            chartType: 'pie-chart',
            reportSource: 'SLA Compliance Report',
            reportType: 'Compliance'
          }
        },
        {
          id: 'chart-7',
          type: 'chart',
          title: 'First Contact Resolution',
          position: { x: 1017, y: 340 },
          size: { width: 315, height: 250 },
          content: {
            chartType: 'metric-card',
            reportSource: 'First Contact Resolution',
            reportType: 'KPI',
            kpiData: {
              value: '78.5%',
              change: '+5.3%',
              trend: 'up',
              previousPeriod: '74.6%'
            }
          }
        },
        {
          id: 'chart-8',
          type: 'chart',
          title: 'Top Support Categories',
          position: { x: 24, y: 606 },
          size: { width: 530, height: 300 },
          content: {
            chartType: 'bar-chart',
            reportSource: 'Customer Support Analytics',
            reportType: 'Support'
          }
        },
        {
          id: 'chart-9',
          type: 'chart',
          title: 'Recent Tickets',
          position: { x: 570, y: 606 },
          size: { width: 762, height: 300 },
          content: {
            chartType: 'table',
            reportSource: 'Customer Support Analytics',
            reportType: 'Support',
            liveData: true
          }
        }
      ] : [] // Empty array for new dashboards
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
  const [isEditing, setIsEditing] = useState(true);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(true);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(dashboardTitle || initialData?.dashboardName || 'Untitled dashboard');
  const displayProjectName = projectName || initialData?.projectName || 'My project';
  const displaySubprojectName = initialData?.subprojectName || 'Subproject';
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
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center group">
              {isEditingTitle ? (
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
                <div className="flex items-center text-base font-normal">
                  <FloraTooltip
                    content={`${displayProjectName} / ${displaySubprojectName}`}
                    placement="bottom"
                    size="small"
                  >
                    <span
                      className="group/name flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-1.5 py-0.5 rounded transition-colors"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      <span className="text-foreground">{editedTitle}</span>
                      <Edit2 className={`${FLORA_ICON} opacity-0 group-hover/name:opacity-100 transition-opacity`} />
                    </span>
                  </FloraTooltip>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
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
                  <FloraTooltip content="Revert changes" placement="bottom" size="small">
                    <IconButton
                      isPill
                      size="small"
                      onClick={() => console.log('Revert changes')}
                      aria-label="Revert"
                    >
                      <RefreshCw className={FLORA_HEADER_ICON} />
                    </IconButton>
                  </FloraTooltip>
                </div>
              )}
              {!isEditing && (
                <FloraTooltip content="Refresh data" placement="bottom" size="small">
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => console.log('Reload dashboard')}
                    aria-label="Reload"
                  >
                    <Redo2 className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  </IconButton>
                </FloraTooltip>
              )}
              {!isEditing && (
                <FloraTooltip
                  content={isAutoRefreshing ? 'Pause auto-refresh' : 'Resume auto-refresh'}
                  placement="bottom"
                  size="small"
                >
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => setIsAutoRefreshing((prev) => !prev)}
                    aria-label={isAutoRefreshing ? 'Pause auto-refresh' : 'Resume auto-refresh'}
                    aria-pressed={!isAutoRefreshing}
                  >
                    {isAutoRefreshing ? (
                      <Pause className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                    ) : (
                      <Play className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                    )}
                  </IconButton>
                </FloraTooltip>
              )}
              <FloraButton
                isPill={false}
                size="small"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FloraButton.StartIcon>
                  {isEditing ? (
                    <Edit2 className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  ) : (
                    <Eye className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                  )}
                </FloraButton.StartIcon>
                {isEditing ? 'Editing' : 'Viewing'}
              </FloraButton>
              {isEditing ? (
              <SplitButton className="flora-split-button">
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
                  onChange={(changes) => {
                    if (changes.type !== 'menuItem:click' || !changes.value) return;
                    if (changes.value === 'save-as') {
                      console.log('Save as');
                    }
                    if (changes.value === 'archive') {
                      console.log('Archive');
                    }
                  }}
                  button={(props) => (
                    <ChevronButton {...props} isPrimary isPill={false} size="small" />
                  )}
                >
                  <Item value="save-as">
                    <MD tag="span" className="!text-foreground">Save dashboard as a new</MD>
                  </Item>
                  <Item value="archive">
                    <MD tag="span" className="!text-foreground">Archive</MD>
                  </Item>
                </Menu>
              </SplitButton>
              ) : (
              <SplitButton className="flora-split-button">
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
              <DropdownMenu>
                <FloraTooltip content="More actions" placement="bottom" size="small">
                  <DropdownMenuTrigger asChild>
                    <IconButton
                      isPill
                      size="small"
                      aria-label="More actions"
                    >
                      <MoreVertical className={FLORA_HEADER_ICON} style={{ width: 16, height: 16 }} />
                    </IconButton>
                  </DropdownMenuTrigger>
                </FloraTooltip>
                <DropdownMenuContent align="end" className="w-48">
                  {isEditing ? (
                    <>
                      <DropdownMenuItem onClick={() => console.log('View dev mode')}>
                        <MD tag="span" className="!text-foreground">View dev mode</MD>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="gap-3"
                        onClick={() => setShowVersionHistory(true)}
                      >
                        <History className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground">Version history</MD>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        {isEditing && (
          <div className="border-b border-border bg-white px-6 py-1.5">
            <div className="flex items-center gap-3">
              {toolbarItems.map((tool) => (
                'isDropdown' in tool && tool.isDropdown ? (
                  <DropdownMenu key={tool.id}>
                    <FloraTooltip content={tool.label} placement="bottom" size="small">
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={tool.label}
                          className={`gap-0.5 px-1.5 shrink-0 ${FLORA_BTN}`}
                        >
                          {tool.icon}
                          <ChevronDown className={FLORA_ICON} />
                        </Button>
                      </DropdownMenuTrigger>
                    </FloraTooltip>
                    <DropdownMenuContent align="start" className="w-44">
                      {tool.children?.map((child) => (
                        <DropdownMenuItem
                          key={child.id}
                          className="gap-3"
                          onClick={() => handleToolSelect(child.id)}
                        >
                          {child.icon}
                          <MD tag="span" className="!text-foreground">{child.label}</MD>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <FloraTooltip
                    key={tool.id}
                    content={'disabled' in tool && tool.disabled ? `${tool.label} - Coming soon` : tool.label}
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
                      className={`h-8 w-8 shrink-0 p-0 ${FLORA_BTN} ${'disabled' in tool && tool.disabled ? 'opacity-50 hover:!bg-transparent' : ''}`}
                    >
                      {tool.icon}
                    </Button>
                  </FloraTooltip>
                )
              ))}

              {/* Layout controls — pushed to the right */}
              <div className="flex-grow" aria-hidden="true" />

              <FloraTooltip content="Edit layout" placement="bottom" size="small">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Edit layout"
                  onClick={() => console.log('Edit layout')}
                  className={`h-8 w-8 shrink-0 p-0 ${FLORA_BTN}`}
                >
                  <Palette className={FLORA_TOOLBAR_ICON} />
                </Button>
              </FloraTooltip>
            </div>
          </div>
        )}

        {/* Filter Bar - Always visible */}
        <div className="border-b border-border bg-white px-6 py-1.5">
          <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${FLORA_BTN} !rounded-[8px] ${activeBookmarkId ? 'bg-[#1f73b7]/10 !text-[#1f73b7] hover:bg-[#1f73b7]/15' : 'hover:bg-muted'}`}
                >
                  <Bookmark className={`${FLORA_ICON} ${activeBookmarkId ? '!text-[#1f73b7]' : ''}`} />
                  <span className="!text-[12px] !leading-4 !font-semibold">{savedFilteredViews.find(v => v.id === activeBookmarkId)?.name || 'Saved views'}</span>
                  <ChevronDown className={`${FLORA_ICON} ${activeBookmarkId ? '!text-[#1f73b7]' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
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
                {savedFilteredViews.length > 0 && (
                  <div className="border-t border-border my-1"></div>
                )}
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

            {(activeFilters.length > 0 || isEditing) && (
              <>
                <div className="h-4 w-px bg-border" />
                {isEditing ? (
                  <AddFilterMenu
                    onAdd={handleAddFilter}
                    excludeTypeIds={activeFilters.map((f) => f.typeId)}
                  />
                ) : (
                  <Filter className={`${FLORA_HEADER_ICON} !text-[#646864]`} aria-hidden />
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
              <div className="inline-flex h-8 w-fit shrink-0 items-center gap-2 rounded-[8px] border border-[#dcdcda] bg-white px-2">
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
                  <DropdownMenuItem className="gap-2" onClick={() => console.log('Merge columns')}>
                    <Connector className={FLORA_MENU_ICON} />
                    <MD tag="span" className="!text-foreground">Merge columns</MD>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="gap-2"
                  disabled={activeFilters.length === 0}
                  onClick={handleResetFilters}
                >
                  <RefreshCw className={FLORA_MENU_ICON} />
                  <MD tag="span" className="!text-foreground">Revert filters</MD>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => console.log('Create filter set')}>
                  <Filter className={FLORA_MENU_ICON} />
                  <MD tag="span" className="!text-foreground">Create filter set</MD>
                </DropdownMenuItem>
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
                const isTextSelected = selectedItemId === item.id;
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
                    onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
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
                          } ${item.content?.bold ? 'font-semibold' : 'font-normal'}`}
                          style={{
                            textAlign: (item.content?.align || 'left') as any,
                            textDecoration: (item.content?.underline || item.content?.link) ? 'underline' : 'none',
                            fontSize: `${item.content?.fontSize || 16}px`,
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
                const isSecSelected = selectedItemId === item.id;
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
                    onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
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
                const isSepSelected = selectedItemId === item.id;
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
                    onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
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
                              aria-label="Separator weight"
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
                                  aria-label="Separator weight in pixels"
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
                              aria-label="Separator color"
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
                          aria-label="Delete separator"
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
              const isWidgetSelected = selectedItemId === item.id;
              return (
              <div
                key={item.id}
                className={`absolute group/widget rounded-[16px] ${wShadow ? 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]' : ''} ${isWidgetSelected ? 'outline outline-2 outline-[#1f73b7] outline-offset-2' : ''}`}
                style={{
                  left: item.position.x,
                  top: item.position.y,
                  width: item.size.width,
                  height: item.size.height,
                  backgroundColor: wBg,
                  border: wBorder ? `${wBorderWidth}px solid ${wBorderColor}` : 'none',
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
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
                      onChange={(patch) => handleUpdateTextContent(item.id, { style: { ...(item.content?.style || {}), ...patch } })}
                      onDelete={() => setContentItems(items => items.filter(i => i.id !== item.id))}
                    />
                  </div>
                )}
                <div
                  className={`h-full flex flex-col rounded-[16px] overflow-hidden ${item.type === 'image' ? (wBorder || wBg !== 'transparent' ? 'p-2' : 'p-0') : 'p-3'}`}
                  style={{ backgroundColor: wBg }}
                >
                  <div className={`flex items-center justify-between gap-2 ${item.type === 'image' ? 'hidden' : 'mb-2'}`}>
                    <div className="flex items-center gap-2 pl-3 pt-3">
                      {/* Live data indicator */}
                      {item.content?.liveData && (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      )}
                      {item.type !== 'image' && (
                        <span className="text-foreground text-base">
                          {item.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pr-3 pt-3">
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
                    </div>
                  </div>
                  
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