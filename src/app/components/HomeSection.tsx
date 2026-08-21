// v1.0.2 - Reorganized sections
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { TrendingUp, TrendingDown, ArrowRight, Plus, X, Folder, Database, Lightbulb, Clock, Users, UserCircle, Target, CheckSquare, ExternalLink, Sparkles, CheckCircle, AlertTriangle, AlertCircle, MoreVertical, ChevronDown, ChevronUp, ChevronRight, Settings, SlidersHorizontal, Mic, Eye, EyeOff, MessageSquare, CalendarDays, Tag, Building2, ChevronLeft, GripVertical, Bot, Filter, Home, Check, Search, Send, Share2, Info, ArrowDownRight, FileText, Copy, Edit2, Save, Share, Trash2, Archive, Layout as LayoutIcon, BarChart3 as BarChartIcon, Database as DatasetIcon, Folder as ProjectIcon, ProductAnalytics as Zendesk12PxIcon } from '@/components/icons/flora';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MultiSelect } from './MultiSelect';
import Group1000004455 from '../imports/Group1000004455';
import Group1000004457 from '../imports/Group1000004457';
import InPagePrompt from '../imports/InPagePrompt';
import svgPaths from '../imports/svg-a9u3pj423l';
import svgPathsCritical from '../imports/svg-oxf3zlxhj3';
import RefreshAlert from '../imports/RefreshAlert-8637-726';
import svgPathsTicketVolume from '../imports/svg-wskba6yyiw';
import svgPathsFirstReply from '../imports/svg-x6oz4uuc7b';
import svgPathsResolution from '../imports/svg-wkizd9u0ni';
import svgPathsSparkle from '../imports/svg-g3i8z0n4ht';
import svgPathsRecommendation from '../imports/svg-5g1b3xbf3g';
import dashboardPreview from '../../imports/image-5.png';
import reportPreview from '../../imports/image-4.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface HomeSectionProps {
  onNavigateToSection?: (section: string) => void;
  onOpenAnalyticsAssistant?: (query: string, showResponse?: boolean, responseType?: 'default' | 'narrate', recommendationData?: any) => void;
  onOpenDashboard?: (dashboardData: { id: string; title: string; type: string; data?: any }) => void;
}

// Mock data for insights
const insights = [
  {
    id: 1,
    label: 'Ticket volume',
    value: '6,221',
    change: '11%',
    changeValue: '(684)',
    trend: 'up',
    trendColor: '#D93F4C',
    description: 'Your team is handling <strong>11% more tickets</strong>, reflecting increased activity.',
    action: 'What created this spike',
    svgPaths: svgPathsTicketVolume
  },
  {
    id: 2,
    label: 'First reply time',
    value: '2m 30s',
    change: '7%',
    changeValue: '(36s)',
    trend: 'down',
    trendColor: '#058541',
    description: 'Average first reply time <strong>improved by 36s</strong>, enhancing customer satisfaction.',
    action: 'What works well',
    svgPaths: svgPathsFirstReply
  },
  {
    id: 3,
    label: 'Full resolution time',
    value: '16m 51s',
    change: '1%',
    changeValue: '(8s)',
    trend: 'down',
    trendColor: '#058541',
    description: 'Average full resolution time remains <strong>steady at 16m 51s</strong>.',
    action: 'How to improve it',
    svgPaths: svgPathsResolution
  }
];

// All available KPI metrics in the library
// Mock data for ticket volume trend chart
const ticketVolumeTrendData = [
  { date: 'Mon', tickets: 420 },
  { date: 'Tue', tickets: 485 },
  { date: 'Wed', tickets: 510 },
  { date: 'Thu', tickets: 545 },
  { date: 'Fri', tickets: 590 },
  { date: 'Sat', tickets: 380 },
  { date: 'Sun', tickets: 340 },
];

// Mock data for pie charts
const pieChartData = [
  { name: 'Open', value: 35, color: '#5F4FD1' },
  { name: 'Pending', value: 25, color: '#AC5918' },
  { name: 'Resolved', value: 40, color: '#038153' },
];

// Mock recommendations
const recommendations = [
  {
    id: 1,
    title: 'Route specific tickets to assignee: EMEA Group',
    description: 'Resolution time could improve by 2h 25min',
    tags: [{ label: 'Triggers', color: '#1F73B7' }, { label: 'Workflow automation', color: '#68737D' }]
  },
  {
    id: 2,
    title: 'Change ticket status for intent: Unsolicited marketing',
    description: 'Resolution time could improve by 1h 05min',
    tags: [{ label: 'Auto assist', color: '#038153' }, { label: 'Optimization', color: '#68737D' }, { label: 'Previously declined', color: '#68737D' }]
  },
  {
    id: 3,
    title: 'Turn on suggested macros',
    description: 'Resolution time could improve by 50min',
    tags: [{ label: 'Macros', color: '#5F4FD1' }, { label: 'Agent productivity', color: '#68737D' }]
  }
];

// Mock recent assets
const starredAssets = [
  { id: 101, title: 'Revenue Analytics Dashboard', type: 'dashboard', lastAccessed: '1 week ago', author: 'Zendesk', projectName: 'Finance' },
  { id: 102, title: 'Monthly Sales Report', type: 'report', lastAccessed: '2 weeks ago', author: 'Sarah Chen', projectName: 'Sales Analytics' },
  { id: 103, title: 'Product Analytics', type: 'dashboard', lastAccessed: '2 weeks ago', author: 'Mike Rodriguez', projectName: 'Product Insights' },
  { id: 104, title: 'Marketing Campaign Analysis', type: 'report', lastAccessed: '3 weeks ago', author: 'Emma Wilson', projectName: 'Marketing' },
  { id: 105, title: 'Operations Project', type: 'project', lastAccessed: '1 month ago', author: 'Noah Parker' },
  { id: 106, title: 'Agent Productivity Report', type: 'report', lastAccessed: '1 month ago', author: 'Mike Rodriguez', projectName: 'Team Performance' },
  { id: 107, title: 'CSAT Trends Dashboard', type: 'dashboard', lastAccessed: '2 months ago', author: 'Emma Wilson', projectName: 'Customer Success' },
  { id: 108, title: 'Response Time Analysis', type: 'report', lastAccessed: '2 months ago', author: 'Sarah Chen', projectName: 'Support Analytics' },
  { id: 109, title: 'Quality Metrics Dashboard', type: 'dashboard', lastAccessed: '3 months ago', author: 'Zendesk', projectName: 'Quality Assurance' },
  { id: 110, title: 'Ticket Volume Report', type: 'report', lastAccessed: '3 months ago', author: 'Noah Parker', projectName: 'Support Analytics' },
  { id: 111, title: 'Customer Retention Dashboard', type: 'dashboard', lastAccessed: '3 months ago', author: 'Emma Wilson', projectName: 'Customer Success' },
  { id: 112, title: 'SLA Compliance Report', type: 'report', lastAccessed: '4 months ago', author: 'Zendesk', projectName: 'Quality Assurance' },
  { id: 113, title: 'Agent Performance Dashboard', type: 'dashboard', lastAccessed: '4 months ago', author: 'Mike Rodriguez', projectName: 'Team Performance' },
  { id: 114, title: 'Customer Feedback Analysis', type: 'report', lastAccessed: '4 months ago', author: 'Sarah Chen', projectName: 'Customer Insights' },
  { id: 115, title: 'First Response Time Dashboard', type: 'dashboard', lastAccessed: '4 months ago', author: 'Zendesk', projectName: 'Support Analytics' },
  { id: 116, title: 'Escalation Trends Report', type: 'report', lastAccessed: '5 months ago', author: 'Noah Parker', projectName: 'Quality Assurance' },
  { id: 117, title: 'Channel Performance Dashboard', type: 'dashboard', lastAccessed: '5 months ago', author: 'Emma Wilson', projectName: 'Support Analytics' },
  { id: 118, title: 'Resolution Time Report', type: 'report', lastAccessed: '5 months ago', author: 'Mike Rodriguez', projectName: 'Team Performance' },
  { id: 119, title: 'NPS Score Dashboard', type: 'dashboard', lastAccessed: '5 months ago', author: 'Sarah Chen', projectName: 'Customer Success' },
  { id: 120, title: 'Automation Impact Report', type: 'report', lastAccessed: '6 months ago', author: 'Zendesk', projectName: 'Operations' },
  { id: 121, title: 'Self-Service Analytics Dashboard', type: 'dashboard', lastAccessed: '6 months ago', author: 'Noah Parker', projectName: 'Customer Success' },
  { id: 122, title: 'Agent Training Report', type: 'report', lastAccessed: '6 months ago', author: 'Emma Wilson', projectName: 'Team Performance' },
  { id: 123, title: 'Customer Journey Dashboard', type: 'dashboard', lastAccessed: '6 months ago', author: 'Sarah Chen', projectName: 'Customer Insights' },
  { id: 124, title: 'Category Performance Report', type: 'report', lastAccessed: '7 months ago', author: 'Mike Rodriguez', projectName: 'Support Analytics' }
];

const recentAssets = [
  { id: 1, title: 'Support Performance Overview', type: 'dashboard', lastAccessed: '2 hours ago', author: 'Zendesk', projectName: 'Support Analytics' },
  { id: 2, title: 'Weekly Performance Summary', type: 'report', lastAccessed: '1 day ago', author: 'Mike Rodriguez', projectName: 'Support Analytics' },
  { id: 3, title: 'Customer Success Dashboard', type: 'dashboard', lastAccessed: '2 days ago', author: 'Zendesk', projectName: 'Customer Success' },
  { id: 4, title: 'Escalation Analysis', type: 'report', lastAccessed: '3 days ago', author: 'Emma Wilson', projectName: 'Quality Assurance' },
  { id: 5, title: 'Team Metrics Dashboard', type: 'dashboard', lastAccessed: '1 week ago', author: 'Noah Parker', projectName: 'Team Performance' },
  { id: 6, title: 'Customer Experience Analytics', type: 'dashboard', lastAccessed: '1 week ago', author: 'Sarah Chen', projectName: 'Customer Insights' }
];

// Project contents - mock data for what's inside each project
const projectContents: { [key: number]: Array<{id: number, title: string, type: 'dashboard' | 'report' | 'dataset', lastAccessed: string, author: string}> } = {
  105: [ // Customer Success Project
    { id: 1051, title: 'Customer Health Dashboard', type: 'dashboard', lastAccessed: '1 day ago', author: 'Zendesk' },
    { id: 1052, title: 'Retention Analysis Report', type: 'report', lastAccessed: '2 days ago', author: 'Emma Wilson' },
    { id: 1053, title: 'Customer Feedback Dataset', type: 'dataset', lastAccessed: '3 days ago', author: 'Zendesk' },
    { id: 1054, title: 'NPS Trends Dashboard', type: 'dashboard', lastAccessed: '1 week ago', author: 'Sarah Chen' },
    { id: 1055, title: 'Churn Prediction Report', type: 'report', lastAccessed: '1 week ago', author: 'Mike Rodriguez' },
  ],
  110: [ // Operations Project
    { id: 1101, title: 'Operations Overview Dashboard', type: 'dashboard', lastAccessed: '2 days ago', author: 'Zendesk' },
    { id: 1102, title: 'Efficiency Metrics Report', type: 'report', lastAccessed: '4 days ago', author: 'Noah Parker' },
    { id: 1103, title: 'Workflow Dataset', type: 'dataset', lastAccessed: '5 days ago', author: 'Alex Kim' },
    { id: 1104, title: 'Resource Allocation Dashboard', type: 'dashboard', lastAccessed: '1 week ago', author: 'Noah Parker' },
  ]
};

// Workflow templates
const workflowTemplates = [
  {
    id: 'manager',
    name: 'Support Manager',
    description: 'Focus on team performance, efficiency metrics, and strategic insights',
    icon: Target,
    iconColor: '#1F73B7',
    iconBg: '#edf7ff',
    sections: ['Latest insights', 'Recommendations', 'Recent'],
    kpis: [
      { id: 1, name: 'Ticket Volume', value: '2,847', change: '+12%', trend: 'up' },
      { id: 2, name: 'Avg Resolution Time', value: '4.2h', change: '-8%', trend: 'down' },
      { id: 5, name: 'CSAT Score', value: '94.2%', change: '+2.1%', trend: 'up' },
      { id: 6, name: 'First Response Time', value: '23min', change: '-15%', trend: 'down' },
      { id: 9, name: 'Agent Utilization', value: '87%', change: '+3%', trend: 'up' },
      { id: 11, name: 'SLA Compliance', value: '96.5%', change: '+1.2%', trend: 'up' },
      { id: 13, name: 'Escalation Rate', value: '8.3%', change: '-1.5%', trend: 'down' },
      { id: 17, name: 'Team Productivity', value: '142', change: '+7%', trend: 'up' }
    ]
  },
  {
    id: 'agent',
    name: 'Support Agent',
    description: 'Daily tasks, personal metrics, and quick actions for efficient ticket handling',
    icon: Users,
    iconColor: '#038153',
    iconBg: '#e6f7f0',
    sections: ['My Tasks', 'Personal Metrics', 'Quick Actions', 'Recent'],
    kpis: [
      { id: 21, name: 'My Open Tickets', value: '12', change: '-3', trend: 'down' },
      { id: 22, name: 'My Avg Response', value: '18min', change: '-5min', trend: 'down' },
      { id: 23, name: 'My CSAT', value: '96%', change: '+1%', trend: 'up' },
      { id: 24, name: 'Tickets Solved Today', value: '23', change: '+5', trend: 'up' },
      { id: 25, name: 'My Resolution Time', value: '3.8h', change: '-12min', trend: 'down' },
      { id: 26, name: 'Pending Reviews', value: '4', change: '+1', trend: 'up' }
    ]
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'High-level overview, strategic KPIs, and business impact insights',
    icon: TrendingUp,
    iconColor: '#6743E1',
    iconBg: '#f3e8ff',
    sections: ['Business Overview', 'Strategic KPIs', 'Insights', 'Analytics updates'],
    kpis: [
      { id: 5, name: 'CSAT Score', value: '94.2%', change: '+2.1%', trend: 'up' },
      { id: 11, name: 'SLA Compliance', value: '96.5%', change: '+1.2%', trend: 'up' },
      { id: 31, name: 'Revenue Impact', value: '$842K', change: '+18%', trend: 'up' },
      { id: 32, name: 'Customer Retention', value: '94.8%', change: '+0.3%', trend: 'up' },
      { id: 33, name: 'Support Cost/Ticket', value: '$8.40', change: '-12%', trend: 'down' },
      { id: 34, name: 'NPS Score', value: '68', change: '+4', trend: 'up' },
      { id: 35, name: 'Monthly Active Users', value: '24.5K', change: '+8%', trend: 'up' },
      { id: 13, name: 'Escalation Rate', value: '8.3%', change: '-1.5%', trend: 'down' }
    ]
  },
  {
    id: 'analyst',
    name: 'Data Analyst',
    description: 'Deep dive into data, custom reports, and advanced analytics',
    icon: BarChartIcon,
    iconColor: '#AC5918',
    iconBg: '#fff3e4',
    sections: ['Data Overview', 'Custom Reports', 'Analytics Tools', 'Recent'],
    kpis: [
      { id: 1, name: 'Ticket Volume', value: '2,847', change: '+12%', trend: 'up' },
      { id: 2, name: 'Avg Resolution Time', value: '4.2h', change: '-8%', trend: 'down' },
      { id: 41, name: 'Ticket Backlog', value: '342', change: '-18', trend: 'down' },
      { id: 42, name: 'Channel Distribution', value: '8', change: '0', trend: 'neutral' },
      { id: 43, name: 'Peak Hour Volume', value: '142/h', change: '+8%', trend: 'up' },
      { id: 44, name: 'Category Coverage', value: '23', change: '+2', trend: 'up' },
      { id: 45, name: 'Data Quality Score', value: '97.2%', change: '+0.5%', trend: 'up' },
      { id: 9, name: 'Agent Utilization', value: '87%', change: '+3%', trend: 'up' }
    ]
  },
  {
    id: 'quality',
    name: 'Quality Assurance',
    description: 'Monitor quality metrics, review cases, and track improvement trends',
    icon: CheckSquare,
    iconColor: '#059669',
    iconBg: '#d1fae5',
    sections: ['Quality Metrics', 'Review Queue', 'Trends', 'Recent'],
    kpis: [
      { id: 5, name: 'CSAT Score', value: '94.2%', change: '+2.1%', trend: 'up' },
      { id: 51, name: 'QA Review Score', value: '91.5%', change: '+1.8%', trend: 'up' },
      { id: 52, name: 'Cases to Review', value: '67', change: '-12', trend: 'down' },
      { id: 53, name: 'Compliance Rate', value: '98.3%', change: '+0.7%', trend: 'up' },
      { id: 54, name: 'Auto-QA Flagged', value: '23', change: '+5', trend: 'up' },
      { id: 55, name: 'Training Needed', value: '8', change: '-2', trend: 'down' },
      { id: 13, name: 'Escalation Rate', value: '8.3%', change: '-1.5%', trend: 'down' },
      { id: 56, name: 'Avg Review Time', value: '12min', change: '-3min', trend: 'down' }
    ]
  },
  {
    id: 'team-lead',
    name: 'Supervisor monitoring',
    description: 'Monitor operations with live data and real-time team performance tracking',
    icon: Users,
    iconColor: '#038153',
    iconBg: '#e6f7f0',
    isRealtime: true,
    sections: ['Team Performance', 'My Queue', 'Coaching Insights', 'Recent'],
    kpis: [
      { id: 9, name: 'Agent Utilization', value: '87%', change: '+3%', trend: 'up' },
      { id: 61, name: 'Active Agents', value: '24/28', change: '+2', trend: 'up' },
      { id: 62, name: 'Team Response Time', value: '21min', change: '-6min', trend: 'down' },
      { id: 63, name: 'Queue Wait Time', value: '8min', change: '-2min', trend: 'down' },
      { id: 64, name: 'Team CSAT', value: '93.8%', change: '+1.2%', trend: 'up' },
      { id: 65, name: 'Coaching Sessions', value: '12', change: '+4', trend: 'up' },
      { id: 17, name: 'Team Productivity', value: '142', change: '+7%', trend: 'up' },
      { id: 66, name: 'Staffing Level', value: '86%', change: '-4%', trend: 'down' }
    ]
  },
  {
    id: 'ai-admin',
    name: 'AI Admin',
    description: 'Oversee automated resolution and unlock the potential of AI agents',
    icon: Bot,
    iconColor: '#6743E1',
    iconBg: '#f3e8ff',
    sections: ['AI Performance', 'Automation Insights', 'Agent Optimization', 'Recent'],
    kpis: [
      { id: 71, name: 'AI Resolution Rate', value: '68%', change: '+12%', trend: 'up' },
      { id: 72, name: 'Auto-Resolved', value: '1,847', change: '+24%', trend: 'up' },
      { id: 73, name: 'AI Accuracy', value: '94.5%', change: '+3.2%', trend: 'up' },
      { id: 74, name: 'Deflection Rate', value: '42%', change: '+8%', trend: 'up' },
      { id: 75, name: 'AI Response Time', value: '1.2s', change: '-0.3s', trend: 'down' },
      { id: 76, name: 'Agent Assist Uses', value: '3,421', change: '+18%', trend: 'up' },
      { id: 77, name: 'Model Confidence', value: '91.2%', change: '+2.1%', trend: 'up' },
      { id: 78, name: 'Training Queue', value: '23', change: '-8', trend: 'down' }
    ]
  }
];

export function HomeSection({ onNavigateToSection, onOpenAnalyticsAssistant, onOpenDashboard }: HomeSectionProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedPersona, setSelectedPersona] = useState('manager');
  const [selectedTemplate, setSelectedTemplate] = useState('manager');
  const [updateTimeframe, setUpdateTimeframe] = useState('weekly');

  // Section visibility and settings
  const [sectionSettings, setSectionSettings] = useState({
    insights: { enabled: true, count: 3 },
    recommendations: { enabled: true },
    starred: { enabled: false },
    recent: { enabled: true },
    announcements: { enabled: true }
  });
  
  // Default page preference — only "Copilot" is available
  const [defaultPage, setDefaultPage] = useState<'copilot'>('copilot');
  
  // Time range preference
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '3months'>('7days');

  // Alert banner visibility
  const [showAlertBanner, setShowAlertBanner] = useState(true);
  const [showAlertsDrawer, setShowAlertsDrawer] = useState(false);

  // AI answer state
  const [showAiAnswer, setShowAiAnswer] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingTextIndex, setAnalyzingTextIndex] = useState(0);
  const [showExpandedAnswer, setShowExpandedAnswer] = useState(false);

  // Search results state
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResultsQuery, setSearchResultsQuery] = useState('');

  // Section ordering state
  const [sectionOrder, setSectionOrder] = useState([
    'recent'
  ]);

  // Preview hover state
  const [hoveredAssetPreview, setHoveredAssetPreview] = useState<number | null>(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Collapse states for all sections
  const [collapsedSections, setCollapsedSections] = useState({
    insights: false,
    recommendations: false,
    recent: false,
    updates: false
  });
  
  // Manage Access Modal state
  const [showManageAccessModal, setShowManageAccessModal] = useState(false);
  
  const [accessList, setAccessList] = useState<Array<{
    id: string;
    name: string;
    type: 'group' | 'person';
    permission: 'view' | 'edit' | 'manage';
    avatar: null;
  }>>([
    { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
    { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
    { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
  ]);
  const [newAccessEmail, setNewAccessEmail] = useState('');
  const [newAccessPermission, setNewAccessPermission] = useState<'view' | 'edit' | 'manage'>('view');

  // Project selector state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{id: string, name: string}>({id: 'all', name: 'All projects'});
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotMode, setCopilotMode] = useState<'ask' | 'search'>('ask');
  const [analysisMode, setAnalysisMode] = useState<'analyze' | 'explore'>('analyze');
  const [assetFilter, setAssetFilter] = useState<string[]>([]);
  const [ownershipFilter, setOwnershipFilter] = useState<'all' | 'created-by-me' | 'created-by-zendesk' | 'shared-with-me'>('all');
  const [assetsSearchQuery, setAssetsSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [viewingProject, setViewingProject] = useState<{id: number, title: string} | null>(null);
  const [showDatasetInfoBanner, setShowDatasetInfoBanner] = useState(true);

  // Available projects
  const availableProjects = [
    { id: 'all', name: 'All projects' },
    { id: 'support', name: 'Support Analytics' },
    { id: 'performance', name: 'Performance Metrics' },
    { id: 'customer', name: 'Customer Insights' },
    { id: 'ai', name: 'AI Performance' },
    { id: 'quality', name: 'Quality Assurance' },
    { id: 'operations', name: 'Operations Dashboard' },
  ];

  // Analyzing animation messages
  const analyzingMessages = [
    'Analyzing your data…',
    'Looking for the most relevant insights…',
    'Almost there…'
  ];

  // Cycle through analyzing messages
  React.useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalyzingTextIndex((prev) => (prev + 1) % analyzingMessages.length);
      }, 2000);

      // Show answer after cycling through all messages
      const timeout = setTimeout(() => {
        setIsAnalyzing(false);
        setShowAiAnswer(true);
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setAnalyzingTextIndex(0);
    }
  }, [isAnalyzing]);

  const handleDragEndCallback = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  // Memoize the selected template to prevent IIFE recreation issues
  const currentTemplate = useMemo(
    () => workflowTemplates.find(t => t.id === selectedTemplate),
    [selectedTemplate]
  );

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dashboard':
        return <LayoutIcon className="w-4 h-4" style={{ color: '#5C6970' }} />;
      case 'report':
        return <BarChartIcon className="w-4 h-4" style={{ color: '#5C6970' }} />;
      case 'project':
        return <ProjectIcon className="w-4 h-4" style={{ color: '#5C6970' }} />;
      case 'dataset':
        return <DatasetIcon className="w-4 h-4" style={{ color: '#5C6970' }} />;
      default:
        return <BarChartIcon className="w-4 h-4" style={{ color: '#5C6970' }} />;
    }
  };

  // Sortable section component
  function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id, disabled: true });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-white rounded-[24px] m-1">
      {/* Header */}
      <div className="mb-[8px] pt-8 px-8">
        <h1 className="font-light pl-[34px] mb-6">Home</h1>

        {/* Flora Info Alert */}
        <div className="flex gap-3 p-4 border border-[#e9ebed] rounded-[8px] bg-[#f8f9f9] ml-[34px]" role="alert">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="#68737d" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <div className="text-base font-[600] text-foreground mb-1">Not covered in prototype</div>
            <div className="text-base leading-[20px] text-foreground">This page is not included in the current prototype scope.</div>
          </div>
        </div>
      </div>

      {/* Manage Access Modal */}
      <Dialog open={showManageAccessModal} onOpenChange={setShowManageAccessModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage access</DialogTitle>
            <DialogDescription>
              Share this project with people or groups and manage their permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Add new person/group */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">Add people or groups</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email or group name"
                  value={newAccessEmail}
                  onChange={(e) => setNewAccessEmail(e.target.value)}
                  className="flex-1"
                />
                <Select value={newAccessPermission} onValueChange={setNewAccessPermission}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="manage">Manage</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    if (newAccessEmail.trim()) {
                      setAccessList([
                        ...accessList,
                        {
                          id: Date.now().toString(),
                          name: newAccessEmail,
                          type: newAccessEmail.includes('@') ? 'person' : 'group',
                          permission: newAccessPermission as 'view' | 'edit' | 'manage',
                          avatar: null
                        }
                      ]);
                      setNewAccessEmail('');
                    }
                  }}
                  disabled={!newAccessEmail.trim()}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Current access list */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">People with access</label>
              <div className="border border-border rounded-lg divide-y divide-border">
                {accessList.map((access) => (
                  <div key={access.id} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {access.type === 'group' ? (
                          <Users className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <UserCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-foreground">{access.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {access.type === 'group' ? 'Group' : 'Person'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={access.permission}
                        onValueChange={(value) => {
                          setAccessList(accessList.map(a =>
                            a.id === access.id ? { ...a, permission: value as 'view' | 'edit' | 'manage' } : a
                          ));
                        }}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="manage">Manage</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setAccessList(accessList.filter(a => a.id !== access.id));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link sharing section */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">Link sharing</label>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-foreground">Anyone with the link</div>
                    <div className="text-xs text-muted-foreground">Can view this project</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Copy link
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowManageAccessModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowManageAccessModal(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Selection Modal */}
      <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select project</DialogTitle>
            <DialogDescription>
              Choose a project to filter your analytics
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-4">
            {availableProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setShowProjectModal(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                  selectedProject.id === project.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-muted-foreground" />
                  <span className="text-base text-foreground">{project.name}</span>
                </div>
                {selectedProject.id === project.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Alerts Drawer */}
      <Dialog open={showAlertsDrawer} onOpenChange={setShowAlertsDrawer}>
        <DialogContent className="fixed right-0 top-0 h-full max-w-md translate-x-0 translate-y-0 rounded-l-lg data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>Alerts</DialogTitle>
            <DialogDescription>
              Recent alerts triggered in the last 24 hours
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {/* Alert 1 */}
            <div className="p-4 border border-[#e9ebed] rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#D73E1E]" />
                  <h3 className="font-medium text-base text-foreground">High ticket volume detected</h3>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <p className="text-base text-muted-foreground mb-3">
                Ticket volume increased by 45% in the last hour. Current volume: 287 tickets (normal range: 150-200)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-sm"
                  onClick={() => onNavigateToSection?.('operational')}
                >
                  View details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="p-4 border border-[#e9ebed] rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#F59638]" />
                  <h3 className="font-medium text-base text-foreground">Response time threshold exceeded</h3>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
              <p className="text-base text-muted-foreground mb-3">
                Average first response time is 8m 32s, exceeding the target of 5 minutes by 70%
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-sm"
                  onClick={() => onNavigateToSection?.('operational')}
                >
                  View details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="p-4 border border-[#e9ebed] rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#D73E1E]" />
                  <h3 className="font-medium text-base text-foreground">CSAT score dropped significantly</h3>
                </div>
                <span className="text-sm text-muted-foreground">18 hours ago</span>
              </div>
              <p className="text-base text-muted-foreground mb-3">
                Customer satisfaction score decreased from 4.2 to 3.1 in the past 24 hours (-26%)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-sm"
                  onClick={() => onNavigateToSection?.('operational')}
                >
                  View details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sortable section item component
interface SortableItemProps {
  id: string;
  section: any;
  sectionSettings: any;
  setSectionSettings: (value: any) => void;
  template?: any;
}

function SortableItem({ id, section, sectionSettings, setSectionSettings, template }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-[20px] p-4"
    >
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <Checkbox
          checked={section.enabled}
          onCheckedChange={(checked) =>
            setSectionSettings((prev: any) => ({
              ...prev,
              [id]: { ...prev[id], enabled: checked as boolean }
            }))
          }
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-foreground text-base font-[500]">
              {section.title}
            </h3>
          </div>
          <p className="text-base text-muted-foreground mb-3">
            {section.description}
          </p>
        </div>
      </div>
    </div>
  );
}