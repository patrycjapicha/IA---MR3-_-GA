import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button as FloraButton, ChevronButton, IconButton, Item, Menu, SplitButton, MD, Combobox, ComboboxField, Option } from '@zendesk-ui/react-components';
import { FloraSearchInput } from './FloraSearchInput';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Toggle } from './ui/toggle';
import { Input } from './ui/input';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from './ui/drawer';
import {
  BarChart3Stroke,
  TextStroke,
  FileTextStroke,
  Link,
  ImageStroke,
  LineChartStroke,
  PieChartStroke,
  ActivityStroke,
  TargetStroke,
  TableStroke,
  Edit2Stroke as Edit2,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Redo2,
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
  Plus,
  X,
  TrendingUp,
} from '@/components/icons/flora';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
const FLORA_TAB_ADD_ICON = '!size-[12px] shrink-0';
const FLORA_MENU_ICON = FLORA_ICON;
const FLORA_HEADER_ICON = '!size-[16px] shrink-0 text-muted-foreground';
const FLORA_BTN = '!rounded-[4px] text-base h-8 font-normal';
const FLORA_OUTLINE_BTN = `${FLORA_BTN} border border-[#d8dcde] bg-white hover:bg-[#f8f9f9]`;
const FLORA_ICON_BTN = `${FLORA_BTN} h-8 w-8 p-0 border-0 bg-transparent shadow-none hover:bg-muted/50`;
const FILTER_MENU_CONTENT_CLASS =
  'z-[200] w-56 overflow-hidden border border-[#e5e5e5] bg-white p-0 shadow-lg max-h-none';
const FILTER_MENU_SEARCH_CLASS = 'box-border w-full min-w-0 overflow-hidden border-b border-border p-2';
const FILTER_MENU_LIST_CLASS =
  'max-h-60 overflow-x-hidden overflow-y-auto py-1 [scrollbar-gutter:stable]';
const FILTER_ACTIVE_SHELL =
  'inline-flex h-8 w-fit max-w-[360px] items-center gap-1 overflow-hidden rounded-[8px] border border-[#d8dcde] bg-white pl-3 pr-2';
const FILTER_ACTIVE_INPUT =
  "flex h-8 w-auto min-w-0 items-center [&_[data-garden-id='dropdowns.combobox.trigger']]:!border-0 [&_[data-garden-id='dropdowns.combobox.trigger']]:!shadow-none [&_[data-garden-id='dropdowns.combobox.trigger']]:!bg-transparent [&_[data-garden-id='dropdowns.combobox']]:!w-auto [&_[data-garden-id='dropdowns.combobox.field']]:!w-auto [&_[data-garden-id='dropdowns.combobox.trigger']]:!w-auto [&_[data-garden-id='dropdowns.combobox.trigger']]:!min-h-8 [&_[data-garden-id='dropdowns.combobox.trigger']]:!h-8 [&_[data-garden-id='dropdowns.combobox.trigger']]:!rounded-none [&_[data-garden-id='dropdowns.combobox.field']]:!mb-0";

interface ContentItem {
  id: string;
  type: 'chart' | 'text' | 'link' | 'image' | 'filter';
  title?: string;
  content?: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
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
    label: 'Chart',
    icon: <BarChart3Stroke className={FLORA_ICON} />,
    description: 'Add visualization charts'
  },
  {
    id: 'text',
    type: 'text' as const,
    label: 'Text',
    icon: <TextStroke className={FLORA_ICON} />,
    description: 'Add text content'
  },
  {
    id: 'link',
    type: 'link' as const,
    label: 'Link',
    icon: <Link className={FLORA_ICON} />,
    description: 'Add hyperlinks'
  },
  {
    id: 'image',
    type: 'image' as const,
    label: 'Image',
    icon: <ImageStroke className={FLORA_ICON} />,
    description: 'Add images'
  }
];

const chartTypes = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    icon: <BarChart3Stroke className={FLORA_ICON} />,
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
  { id: 'report-1', name: 'Customer Support Analytics', type: 'Support', lastUpdated: '2024-01-15' },
  { id: 'report-2', name: 'Resolution Time Analysis', type: 'KPI', lastUpdated: '2024-01-14' },
  { id: 'report-3', name: 'Agent Performance Dashboard', type: 'Performance', lastUpdated: '2024-01-13' },
  { id: 'report-4', name: 'Ticket Volume Trends', type: 'Analytics', lastUpdated: '2024-01-12' },
  { id: 'report-5', name: 'SLA Compliance Report', type: 'Compliance', lastUpdated: '2024-01-11' },
  { id: 'report-6', name: 'First Contact Resolution', type: 'KPI', lastUpdated: '2024-01-10' },
  { id: 'report-7', name: 'Customer Satisfaction Analysis', type: 'Analytics', lastUpdated: '2024-01-09' },
  { id: 'report-8', name: 'Response Time Monitoring', type: 'KPI', lastUpdated: '2024-01-08' }
];

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
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={`dashboard-active-filter shrink-0 ${FILTER_ACTIVE_SHELL}`}>
      <MD tag="span" className="shrink-0 whitespace-nowrap !text-foreground">
        {filter.label}
      </MD>
      <div className={FILTER_ACTIVE_INPUT}>
        <ComboboxField>
          <ComboboxField.Label hidden>{filter.label}</ComboboxField.Label>
          <Combobox
            isBare
            isCompact
            isAutocomplete
            isEditable={isEditing}
            isMultiselectable
            listboxAriaLabel={`Select ${filter.label}`}
            inputValue={inputValue}
            selectionValue={selectedValues}
            onChange={(changes) => {
              if (changes.type === 'input:change') {
                setInputValue(changes.inputValue ?? '');
                return;
              }
              if (changes.selectionValue === undefined) return;
              const { selectionValue } = changes;
              if (Array.isArray(selectionValue)) {
                if (selectionValue.length === 0) onRemove(filter.id);
                else onUpdate(filter.id, selectionValue.map(String).join(', '));
              } else if (selectionValue) {
                onUpdate(filter.id, String(selectionValue));
              } else {
                onRemove(filter.id);
              }
              setInputValue('');
            }}
          >
            {filterType?.values.map((value) => (
              <Option key={value} value={value} label={value} />
            ))}
          </Combobox>
        </ComboboxField>
      </div>
    </div>
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
  const [isEditing, setIsEditing] = useState(true);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(dashboardTitle || initialData?.dashboardName || 'Dashboard name');
  const displayProjectName = projectName || initialData?.projectName || 'My project';
  const displaySubprojectName = initialData?.subprojectName || 'Subproject';
  const [activeFilters, setActiveFilters] = useState<Array<{ id: string; label: string; value: string; typeId: string }>>([]);
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);
  const [isBookmarkModified, setIsBookmarkModified] = useState(false);
  const [showSaveBookmarkModal, setShowSaveBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');
  const [isSavingAsNew, setIsSavingAsNew] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

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
    } else {
      setSelectedTool(toolId === selectedTool ? null : toolId);
    }
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

  const handleApplySavedView = (viewId: string) => {
    const view = savedFilteredViews.find(v => v.id === viewId);
    if (view) {
      setActiveFilters(view.filters);
      setActiveBookmarkId(viewId);
      setIsBookmarkModified(false);
    }
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
      position: { x: 100, y: 100 },
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
        }
      }
    };

    setContentItems([...contentItems, newItem]);
  };

  const handleChartSelect = (chartType: string) => {
    setSelectedTool('chart');
    setShowChartModal(false);
    
    // Store the specific chart type for later use
    const newItem: ContentItem = {
      id: `${chartType}-${Date.now()}`,
      type: 'chart',
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      title: chartTypes.find(c => c.id === chartType)?.name || 'Chart',
      content: { chartType }
    };

    setContentItems([...contentItems, newItem]);
    setSelectedTool(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleSaveDashboard = () => {
    const dashboardConfig = {
      title: editedTitle,
      projectName: displayProjectName,
      contentItems,
      layout: 'canvas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave?.(dashboardConfig);
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
                  <span className="text-muted-foreground text-base font-normal">{displayProjectName}</span>
                  <span className="text-muted-foreground text-base font-normal">/</span>
                  <span className="text-muted-foreground text-base font-normal">{displaySubprojectName}</span>
                  <span className="text-muted-foreground text-base font-normal">/</span>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onUpdateTitle?.(editedTitle);
                        setIsEditingTitle(false);
                      } else if (e.key === 'Escape') {
                        setEditedTitle(dashboardTitle || initialData?.dashboardName || 'Dashboard name');
                        setIsEditingTitle(false);
                      }
                    }}
                    onBlur={() => {
                      onUpdateTitle?.(editedTitle);
                      setIsEditingTitle(false);
                    }}
                    className="h-8 text-base"
                    autoFocus
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <span className="text-base font-normal">
                    <span className="text-muted-foreground">{displayProjectName}</span>
                    <span className="text-muted-foreground"> / </span>
                    <span className="text-muted-foreground">{displaySubprojectName}</span>
                    <span className="text-muted-foreground"> / </span>
                    <span className="text-foreground">{editedTitle}</span>
                  </span>
                  <Edit2 className={`${FLORA_ICON} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isEditing && (
                <div className="flex items-center gap-0.5">
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => console.log('Undo action')}
                    aria-label="Undo"
                  >
                    <ArrowLeft className={FLORA_HEADER_ICON} />
                  </IconButton>
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => console.log('Redo action')}
                    aria-label="Redo"
                  >
                    <ArrowRight className={FLORA_HEADER_ICON} />
                  </IconButton>
                  <IconButton
                    isPill
                    size="small"
                    onClick={() => console.log('Revert changes')}
                    aria-label="Revert"
                  >
                    <RefreshCw className={FLORA_HEADER_ICON} />
                  </IconButton>
                </div>
              )}
              {!isEditing && (
                <IconButton
                  isPill
                  size="small"
                  onClick={() => console.log('Reload dashboard')}
                  aria-label="Reload"
                >
                  <Redo2 className={FLORA_HEADER_ICON} />
                </IconButton>
              )}
              <FloraButton
                isPill={false}
                size="small"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'View' : 'Edit'}
              </FloraButton>
              {isEditing ? (
              <SplitButton className="flora-split-button">
                <FloraButton
                  isPrimary
                  isPill={false}
                  size="small"
                  onClick={handleSaveDashboard}
                >
                  Save
                </FloraButton>
                <Menu
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
                    <MD tag="span" className="!text-foreground">Save as</MD>
                  </Item>
                  <Item value="archive">
                    <MD tag="span" className="!text-foreground">Archive</MD>
                  </Item>
                </Menu>
              </SplitButton>
              ) : (
                <FloraButton
                  isPrimary
                  isPill
                  size="small"
                  onClick={() => console.log('Share dashboard')}
                >
                  Share
                </FloraButton>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    isPill
                    size="small"
                    aria-label="More actions"
                  >
                    <MoreVertical className={FLORA_HEADER_ICON} />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isEditing ? (
                    <>
                      <DropdownMenuItem onClick={() => console.log('Interactions')}>
                        <MD tag="span" className="!text-foreground">Interactions</MD>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Config')}>
                        <MD tag="span" className="!text-foreground">Config</MD>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Dev mode')}>
                        <MD tag="span" className="!text-foreground">Dev mode</MD>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="gap-3"
                        onClick={() => console.log('Export dashboard')}
                      >
                        <Download className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground">Export</MD>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-3"
                        onClick={() => console.log('Schedule dashboard')}
                      >
                        <Clock className={FLORA_MENU_ICON} />
                        <MD tag="span" className="!text-foreground">Schedule</MD>
                      </DropdownMenuItem>
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
          <div className="border-b border-border bg-white px-6 py-3">
            <div className="flex items-center gap-1">
              {toolbarItems.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleToolSelect(tool.id)}
                  className={`gap-2 ${FLORA_BTN}`}
                >
                  {tool.icon}
                  {tool.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Bar - Always visible */}
        <div className="border-b border-border bg-white px-6 py-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${FLORA_BTN} hover:bg-muted`}
                >
                  <Bookmark className={FLORA_ICON} />
                  <span>Saved views</span>
                  <ChevronDown className={FLORA_ICON} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {savedFilteredViews.map((view) => (
                  <DropdownMenuItem
                    key={view.id}
                    onClick={() => handleApplySavedView(view.id)}
                    className="flex items-center justify-between group"
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
                {savedFilteredViews.length > 0 && (
                  <div className="border-t border-border my-1"></div>
                )}
                {isBookmarkModified && activeBookmarkId && (
                  <>
                    <DropdownMenuItem className="gap-2" onClick={handleSaveBookmark}>
                      <Save className={FLORA_MENU_ICON} />
                      <MD tag="span" className="!text-foreground">Save</MD>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={handleSaveAsNewBookmark}>
                      <Save className={FLORA_MENU_ICON} />
                      <MD tag="span" className="!text-foreground">Save as new</MD>
                    </DropdownMenuItem>
                    <div className="border-t border-border my-1"></div>
                  </>
                )}
                <DropdownMenuItem className="gap-2" onClick={handleOpenSaveBookmarkModal}>
                  <Save className={FLORA_MENU_ICON} />
                  <MD tag="span" className="!text-foreground">Save as view</MD>
                </DropdownMenuItem>
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
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="border-b border-border bg-white px-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`group relative flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors ${ activeTabId === tab.id ? 'text-[#4F6BBF] border-b-2 border-[#4F6BBF]' : 'text-muted-foreground hover:text-foreground' } ml-[0px] mr-[2px] my-[0px]`}
                onClick={() => !editingTabId && setActiveTabId(tab.id)}
              >
                {editingTabId === tab.id ? (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
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
                  </div>
                ) : (
                  <span className="text-base">{tab.name}</span>
                )}
              </div>
            ))}
            {isEditing && (
              <IconButton
                size="small"
                onClick={handleAddTab}
                aria-label="Add tab"
                className="border border-border"
              >
                <Plus className={FLORA_TAB_ADD_ICON} />
              </IconButton>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-white">
          <div
            className="relative w-full h-full min-h-[600px] cursor-crosshair"
            onClick={handleCanvasClick}
          >
            {contentItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              </div>
            )}

            {/* Render content items */}
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="absolute bg-white border border-gray-200 rounded-[20px]"
                style={{
                  left: item.position.x,
                  top: item.position.y,
                  width: item.size.width,
                  height: item.size.height
                }}
              >
                <div className="h-full p-3 flex flex-col rounded-[20px] bg-white">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 pl-3 pt-3">
                      {/* Live data indicator */}
                      {item.content?.liveData && (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      )}
                      <span className="text-foreground text-base">
                        {item.title}
                      </span>
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
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setContentItems(items => items.filter(i => i.id !== item.id));
                          }}
                        >
                          <Plus className={`${FLORA_ICON} rotate-45`} />
                        </Button>
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
                </div>
              </div>
            ))}

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
      <Dialog open={showReportsModal} onOpenChange={setShowReportsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select report</DialogTitle>
            <DialogDescription>
              Choose a report to add as a KPI Resolution Time chart to your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4 max-h-96 overflow-y-auto">
            {mockReports.map((report) => (
              <Card 
                key={report.id}
                className="cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/20"
                onClick={() => handleReportSelect(report.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
                          <FileTextStroke className={FLORA_ICON} />
                        </div>
                        <div>
                          <h4 className="text-foreground">{report.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="secondary" className="text-base">
                              {report.type}
                            </Badge>
                            <span className="text-base text-muted-foreground">
                              Updated {report.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Will add KPI Resolution Time
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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