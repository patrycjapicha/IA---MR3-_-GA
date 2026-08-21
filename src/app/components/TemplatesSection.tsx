import React, { useState, useEffect } from 'react';
import { Button as FloraButton, IconButton, MD, Table, Tag, ToggleButton, ToggleIconButton } from '@zendesk-ui/react-components';
import { LibraryAssetCard, LIBRARY_CARD_MENU_BTN, type LibraryAssetCardItem } from './LibraryAssetCard';
import { FloraSearchInput } from './FloraSearchInput';
import { LIBRARY_ASSET_FILTER_OPTIONS, LIBRARY_FILTER_BTN_CLASS, LIBRARY_FILTER_BTN_ICON_CLASS, LIBRARY_FILTER_BTN_LABEL_CLASS } from './LibraryFilterSelect';
import { LibrarySubnavBadge } from './LibrarySubnavBadge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { FileBarChart, TrendingUp, PeopleStroke as Users, ClockStroke as Clock, Brain, Target, AlertTriangle, ChevronDown, FolderStroke as Folder, ChevronLeft, ChevronRight, Sparkles, Grid3X3Stroke as Grid, List, StarStroke, PersonStroke as UserCircle, Share2, X, DatabaseStroke as Database, MoreVertical, FolderStroke as Archive, GearStroke as Settings, Trash2, Plus, Calendar, Download, Eye, Pin, LayoutStroke as LayoutIcon, BarChart3Stroke as BarChartIcon, DatabaseStroke as DatasetIcon, Zendesk } from '@/components/icons/flora';
import svgPaths from '../imports/svg-zgz8vmk6it';
import { DatasetsSection } from './DatasetsSection';
import { Switch } from './ui/switch';

const FLORA_LIBRARY_ICON = 'size-[16px] shrink-0 fill-current !text-muted-foreground';
const FLORA_TOOLBAR_BTN_ICON = '!size-[18px] shrink-0';
const FLORA_TABLE_PRIMARY = 'm-0';

function floraTableHeader(label: string) {
  return <MD tag="span" isBold className={FLORA_TABLE_PRIMARY}>{label}</MD>;
}

function toLibraryAssetCardItem(
  item: {
    title?: string;
    name?: string;
    description?: string;
    type: string;
    owner?: string;
    lastUpdated?: string;
    projectName?: string;
  },
  fallbackProjectName?: string,
): LibraryAssetCardItem | null {
  if (item.type !== 'dashboard' && item.type !== 'report') return null;

  const title = item.title || item.name || 'Untitled';
  const matchedTemplate = zendeskTemplates.find(
    (template) => template.title === title && (template.type === 'dashboard' || template.type === 'report'),
  );

  return {
    title,
    description:
      item.description ||
      matchedTemplate?.description ||
      (item.type === 'dashboard'
        ? 'Dashboard for monitoring key metrics and operational performance.'
        : 'Report for analyzing trends, performance, and actionable insights.'),
    type: item.type,
    owner: item.owner || matchedTemplate?.owner,
    lastUpdated: item.lastUpdated || matchedTemplate?.lastUpdated,
    projectName: item.projectName || fallbackProjectName || matchedTemplate?.projectName,
  };
}

function librarySubnavIcon(isActive: boolean) {
  return `size-[16px] shrink-0 fill-current ${isActive ? '!text-white' : '!text-muted-foreground'}`;
}

const LIBRARY_SUBNAV_COUNT_SLOT = 'inline-flex shrink-0 items-center justify-center';
const LIBRARY_SUBNAV_CHEVRON_SLOT = 'inline-flex w-4 h-4 items-center justify-center shrink-0';

function LibrarySubnavCount({ count, isActive }: { count: number; isActive: boolean }) {
  return (
    <span className={LIBRARY_SUBNAV_COUNT_SLOT}>
      <LibrarySubnavBadge count={count} isCurrent={isActive} />
    </span>
  );
}

function LibrarySubnavTrailing({
  count,
  isActive,
  chevron,
}: {
  count: number;
  isActive: boolean;
  chevron?: React.ReactNode;
}) {
  return (
    <div className="flex items-center shrink-0 gap-2">
      <LibrarySubnavCount count={count} isActive={isActive} />
      <span className={LIBRARY_SUBNAV_CHEVRON_SLOT}>{chevron}</span>
    </div>
  );
}

interface TemplatesSectionProps {
  onOpenDashboard?: (dashboardData: { id: string; title: string; data?: any; type?: string }) => void;
  isNavCollapsed?: boolean;
  setIsNavCollapsed?: (collapsed: boolean) => void;
  // Title of a project to open straight away (e.g. arriving from a dashboard's
  // location menu). Cleared through onInitialProjectOpened once handled.
  initialProjectName?: string;
  onInitialProjectOpened?: () => void;
}

// Zendesk pre-created templates
const zendeskTemplates = [
  {
    id: 'dashboard-initial',
    title: 'Customer support performance',
    description: 'Ticket management and workflow analytics dashboard',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Support',
    projectName: 'Support Analytics',
    owner: 'Support Team',
    lastUpdated: 'Feb 18, 2026 3:25 PM',
    tags: [
      { label: 'support', color: '#1F73B7' },
      { label: 'tickets', color: '#68737D' },
      { label: 'performance', color: '#68737D' }
    ]
  },
  {
    id: 'template-1',
    title: 'Agent Performance Dashboard',
    description: 'Track individual and team agent metrics including resolution rates, response times, and customer satisfaction scores',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Performance',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 2:30 PM',
    tags: [
      { label: 'agents', color: '#1F73B7' },
      { label: 'performance', color: '#68737D' },
      { label: 'metrics', color: '#68737D' }
    ]
  },
  {
    id: 'template-2',
    title: 'Ticket Volume Analytics',
    description: 'Monitor ticket trends, peak hours, and volume distribution across channels and categories',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Operations',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 9:15 AM',
    tags: [
      { label: 'tickets', color: '#038153' },
      { label: 'volume', color: '#68737D' },
      { label: 'trends', color: '#68737D' }
    ]
  },
  {
    id: 'template-3',
    title: 'Customer Satisfaction Report',
    description: 'Comprehensive analysis of CSAT scores, feedback trends, and improvement opportunities',
    type: 'report',
    icon: <BarChartIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Experience',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 4:45 PM',
    hasRealTimeData: true,
    tags: [
      { label: 'csat', color: '#5F4FD1' },
      { label: 'feedback', color: '#68737D' },
      { label: 'satisfaction', color: '#68737D' }
    ]
  },
  {
    id: 'template-4',
    title: 'SLA Compliance Dashboard',
    description: 'Real-time monitoring of service level agreements and breach analysis',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Compliance',
    projectName: 'SLA Management Suite',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 11:20 AM',
    tags: [
      { label: 'sla', color: '#AC5918' },
      { label: 'compliance', color: '#68737D' },
      { label: 'realtime', color: '#68737D' }
    ]
  },
  {
    id: 'template-5',
    title: 'AI Performance Analytics',
    description: 'Track AI agent performance, automation rates, and quality metrics',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'AI & Automation',
    projectName: 'AI Agent Performance',
    owner: 'Zendesk',
    lastUpdated: 'Feb 9, 2026 3:00 PM',
    tags: [
      { label: 'ai', color: '#1F73B7' },
      { label: 'automation', color: '#68737D' },
      { label: 'quality', color: '#68737D' }
    ]
  },
  {
    id: 'template-6',
    title: 'First Response Time Report',
    description: 'Detailed analysis of first response times across teams, channels, and time periods',
    type: 'report',
    icon: <BarChartIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Performance',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 9, 2026 10:30 AM',
    hasRealTimeData: true,
    tags: [
      { label: 'response-time', color: '#038153' },
      { label: 'performance', color: '#68737D' }
    ]
  },
  {
    id: 'template-7',
    title: 'Channel Performance Dashboard',
    description: 'Compare metrics across different support channels including email, chat, phone, and social',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Operations',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 8, 2026 1:15 PM',
    tags: [
      { label: 'channels', color: '#5F4FD1' },
      { label: 'comparison', color: '#68737D' },
      { label: 'metrics', color: '#68737D' }
    ]
  },
  {
    id: 'template-8',
    title: 'Escalation Analysis Report',
    description: 'Identify escalation patterns, root causes, and opportunities for improvement',
    type: 'report',
    icon: <BarChartIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Quality',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 7, 2026 5:00 PM',
    tags: [
      { label: 'escalations', color: '#AC5918' },
      { label: 'analysis', color: '#68737D' },
      { label: 'quality', color: '#68737D' }
    ]
  },
  {
    id: 'template-9',
    title: 'Knowledge Base Impact Dashboard',
    description: 'Measure knowledge base effectiveness, article usage, and self-service rates',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Self-Service',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 7, 2026 8:45 AM',
    tags: [
      { label: 'knowledge-base', color: '#1F73B7' },
      { label: 'self-service', color: '#68737D' },
      { label: 'articles', color: '#68737D' }
    ]
  },
  {
    id: 'template-10',
    title: 'Team Productivity Report',
    description: 'Analyze team efficiency, workload distribution, and productivity trends',
    type: 'report',
    icon: <BarChartIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Performance',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 6, 2026 2:20 PM',
    hasRealTimeData: true,
    tags: [
      { label: 'team', color: '#038153' },
      { label: 'productivity', color: '#68737D' },
      { label: 'efficiency', color: '#68737D' }
    ]
  },
  {
    id: 'template-11',
    title: 'Real-time Monitoring Dashboard',
    description: 'Live view of current ticket queue, agent availability, and key operational metrics',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Operations',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 5, 2026 11:00 AM',
    tags: [
      { label: 'realtime', color: '#5F4FD1' },
      { label: 'monitoring', color: '#68737D' },
      { label: 'live', color: '#68737D' }
    ]
  },
  {
    id: 'template-12',
    title: 'Customer Journey Analysis',
    description: 'Track customer interactions across touchpoints and identify experience bottlenecks',
    type: 'report',
    icon: <BarChartIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Experience',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 4, 2026 3:30 PM',
    tags: [
      { label: 'journey', color: '#AC5918' },
      { label: 'experience', color: '#68737D' },
      { label: 'touchpoints', color: '#68737D' }
    ]
  },
  // Project templates
  {
    id: 'project-1',
    title: 'Real-time Monitoring',
    description: 'Complete monitoring solution with live dashboard and comprehensive reports for tracking ticket volume, trending topics, and operational metrics',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Operations',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 1:00 PM',
    isLive: true,
    assets: [
      { type: 'dashboard', name: 'Real-time Monitoring Dashboard' },
      { type: 'report', name: 'Trending Topics Report', hasRealTimeData: true },
      { type: 'report', name: 'Volume Analysis Report', hasRealTimeData: true },
      { type: 'report', name: 'Operational Metrics Report' },
      { type: 'report', name: 'Queue Performance Report', hasRealTimeData: true },
      { type: 'report', name: 'Channel Distribution Report' },
      { type: 'report', name: 'Peak Hours Analysis Report' },
      { type: 'report', name: 'Agent Availability Report' },
      { type: 'report', name: 'Response Time Trends Report' },
      { type: 'report', name: 'Ticket Status Overview Report' },
      { type: 'report', name: 'Category Breakdown Report' },
      { type: 'dataset', name: 'Support — Tickets (current state)' },
      { type: 'dataset', name: 'Support — Ticket updates / events (ticket history)' },
      { type: 'dataset', name: 'Chat — Live chat sessions and agents' },
      { type: 'dataset', name: 'Talk — Calls (inbound/outbound, voicemail)' },
      { type: 'dataset', name: 'Sunshine Events — event stream / custom events' }
    ],
    tags: [
      { label: 'realtime', color: '#038153' },
      { label: 'monitoring', color: '#68737D' },
      { label: 'operations', color: '#68737D' }
    ]
  },
  {
    id: 'project-2',
    title: 'Agent Performance Analytics',
    description: 'Comprehensive agent analytics project with performance dashboard and detailed reports on productivity, efficiency, and quality metrics',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Performance',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 3:15 PM',
    assets: [
      { type: 'dashboard', name: 'Agent Performance Dashboard' },
      { type: 'report', name: 'Individual Performance Report', hasRealTimeData: true },
      { type: 'report', name: 'Team Productivity Report', hasRealTimeData: true },
      { type: 'report', name: 'Quality Metrics Report' },
      { type: 'report', name: 'Resolution Efficiency Report' },
      { type: 'report', name: 'Response Time Analysis Report' },
      { type: 'report', name: 'Customer Satisfaction by Agent Report' },
      { type: 'report', name: 'Workload Distribution Report' },
      { type: 'report', name: 'Skill-Based Performance Report' },
      { type: 'report', name: 'Training Needs Assessment Report' },
      { type: 'report', name: 'Agent Benchmarking Report' },
      { type: 'dataset', name: 'Support — Ticket metrics (time-based metrics)' },
      { type: 'dataset', name: 'Users (end users & agents)' },
      { type: 'dataset', name: 'Explore legacy / Insights datasets' }
    ],
    tags: [
      { label: 'agents', color: '#1F73B7' },
      { label: 'performance', color: '#68737D' },
      { label: 'analytics', color: '#68737D' }
    ]
  },
  {
    id: 'project-3',
    title: 'Customer Experience Hub',
    description: 'End-to-end customer experience analysis with satisfaction dashboard and journey, feedback, and sentiment reports',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Experience',
    owner: 'Zendesk',
    lastUpdated: 'Feb 9, 2026 10:45 AM',
    assets: [
      { type: 'dashboard', name: 'CSAT Overview Dashboard' },
      { type: 'report', name: 'Customer Journey Report' },
      { type: 'report', name: 'Feedback Analysis Report' },
      { type: 'report', name: 'Sentiment Trends Report' },
      { type: 'report', name: 'NPS Tracking Report' },
      { type: 'report', name: 'Customer Effort Score Report' },
      { type: 'report', name: 'Satisfaction by Channel Report' },
      { type: 'report', name: 'Detractor Analysis Report' },
      { type: 'report', name: 'Customer Loyalty Metrics Report' },
      { type: 'report', name: 'Touchpoint Performance Report' },
      { type: 'report', name: 'Experience Improvement Opportunities Report' },
      { type: 'dataset', name: 'Support — Satisfaction (CSAT)' },
      { type: 'dataset', name: 'Organizations' },
      { type: 'dataset', name: 'Sunshine Profiles — customer profile attributes' },
      { type: 'dataset', name: 'Help Center / Guide — Articles & article metrics' }
    ],
    tags: [
      { label: 'csat', color: '#5F4FD1' },
      { label: 'experience', color: '#68737D' },
      { label: 'feedback', color: '#68737D' }
    ]
  },
  {
    id: 'project-4',
    title: 'SLA Management Suite',
    description: 'Complete SLA compliance tracking with dashboard and detailed breach, performance, and forecasting reports',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Compliance',
    owner: 'Zendesk',
    lastUpdated: 'Feb 8, 2026 9:00 AM',
    assets: [
      { type: 'dashboard', name: 'SLA Compliance Dashboard' },
      { type: 'report', name: 'Breach Analysis Report' },
      { type: 'report', name: 'SLA Performance Report' },
      { type: 'report', name: 'SLA Forecasting Report' },
      { type: 'report', name: 'Compliance by Priority Report' },
      { type: 'report', name: 'At-Risk Tickets Report' },
      { type: 'report', name: 'Response Time Compliance Report' },
      { type: 'report', name: 'Resolution Time Compliance Report' },
      { type: 'report', name: 'SLA Trend Analysis Report' },
      { type: 'report', name: 'Team SLA Performance Report' },
      { type: 'report', name: 'Root Cause Analysis Report' },
      { type: 'dataset', name: 'Support — SLAs' },
      { type: 'dataset', name: 'Support — Ticket metrics (time-based metrics)' },
      { type: 'dataset', name: 'Sell — Leads, Contacts, Deals' }
    ],
    tags: [
      { label: 'sla', color: '#AC5918' },
      { label: 'compliance', color: '#68737D' },
      { label: 'tracking', color: '#68737D' }
    ]
  },
  // Standalone Dataset templates
  {
    id: 'dataset-1',
    title: 'Support — Tickets (current state)',
    description: 'Complete snapshot of all tickets with their current status, assignee, and properties',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Support',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 3:45 PM',
    tags: [
      { label: 'tickets', color: '#038153' },
      { label: 'support', color: '#68737D' },
      { label: 'current', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-2',
    title: 'Support — Ticket updates / events (ticket history)',
    description: 'Historical event stream of all ticket changes, updates, and status transitions',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Support',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 3:40 PM',
    tags: [
      { label: 'history', color: '#038153' },
      { label: 'events', color: '#68737D' },
      { label: 'updates', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-3',
    title: 'Support — Ticket metrics (time-based metrics)',
    description: 'Time-based metrics including first reply time, full resolution time, and handling duration',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Support',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 2:30 PM',
    tags: [
      { label: 'metrics', color: '#1F73B7' },
      { label: 'time', color: '#68737D' },
      { label: 'performance', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-4',
    title: 'Support — SLAs',
    description: 'Service Level Agreement targets, compliance data, and breach tracking',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Compliance',
    projectName: 'SLA Management Suite',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 1:15 PM',
    tags: [
      { label: 'sla', color: '#AC5918' },
      { label: 'compliance', color: '#68737D' },
      { label: 'targets', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-5',
    title: 'Support — Satisfaction (CSAT)',
    description: 'Customer satisfaction scores, ratings, and feedback from support interactions',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Experience',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 12:00 PM',
    tags: [
      { label: 'csat', color: '#5F4FD1' },
      { label: 'satisfaction', color: '#68737D' },
      { label: 'feedback', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-6',
    title: 'Users (end users & agents)',
    description: 'Complete user directory including end users, agents, roles, and permissions',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Users',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 10:30 AM',
    tags: [
      { label: 'users', color: '#1F73B7' },
      { label: 'agents', color: '#68737D' },
      { label: 'directory', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-7',
    title: 'Organizations',
    description: 'Organization data including structure, domains, and associated users',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Users',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 11, 2026 9:15 AM',
    tags: [
      { label: 'organizations', color: '#038153' },
      { label: 'structure', color: '#68737D' },
      { label: 'accounts', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-8',
    title: 'Help Center / Guide — Articles & article metrics',
    description: 'Knowledge base articles, views, ratings, and engagement metrics',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Content',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 5:00 PM',
    tags: [
      { label: 'articles', color: '#5F4FD1' },
      { label: 'help-center', color: '#68737D' },
      { label: 'knowledge', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-9',
    title: 'Talk — Calls (inbound/outbound, voicemail)',
    description: 'Phone call records including inbound, outbound calls, voicemails, and call metrics',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Channels',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 4:30 PM',
    tags: [
      { label: 'calls', color: '#038153' },
      { label: 'voice', color: '#68737D' },
      { label: 'talk', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-10',
    title: 'Chat — Live chat sessions and agents',
    description: 'Live chat conversation data, agent assignments, and session metrics',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Channels',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 3:00 PM',
    tags: [
      { label: 'chat', color: '#1F73B7' },
      { label: 'live', color: '#68737D' },
      { label: 'sessions', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-11',
    title: 'Messaging / Sunshine Conversations — Conversations and messages',
    description: 'Messaging platform data with conversation threads and message history',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Channels',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 2:15 PM',
    tags: [
      { label: 'messaging', color: '#5F4FD1' },
      { label: 'conversations', color: '#68737D' },
      { label: 'sunshine', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-12',
    title: 'Sell — Leads, Contacts, Deals',
    description: 'Sales pipeline data including leads, contacts, deals, and conversion metrics',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Sales',
    projectName: 'SLA Management Suite',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 1:00 PM',
    tags: [
      { label: 'sales', color: '#AC5918' },
      { label: 'deals', color: '#68737D' },
      { label: 'leads', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-13',
    title: 'Sunshine Profiles — customer profile attributes',
    description: 'Unified customer profiles with custom attributes and enrichment data',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Data',
    projectName: 'Customer Experience Hub',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 11:45 AM',
    tags: [
      { label: 'profiles', color: '#038153' },
      { label: 'sunshine', color: '#68737D' },
      { label: 'attributes', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-14',
    title: 'Sunshine Events — event stream / custom events',
    description: 'Custom event tracking and real-time event streams from customer interactions',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Data',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 10, 2026 10:30 AM',
    tags: [
      { label: 'events', color: '#1F73B7' },
      { label: 'sunshine', color: '#68737D' },
      { label: 'streaming', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-15',
    title: 'Custom events / webhooks',
    description: 'Ingested webhook data and custom event tracking from external integrations',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Integrations',
    projectName: 'Real-time Monitoring',
    owner: 'Zendesk',
    lastUpdated: 'Feb 9, 2026 4:00 PM',
    tags: [
      { label: 'webhooks', color: '#5F4FD1' },
      { label: 'custom', color: '#68737D' },
      { label: 'integrations', color: '#68737D' }
    ]
  },
  {
    id: 'dataset-16',
    title: 'Explore legacy / Insights datasets',
    description: 'Legacy analytics datasets from Explore and Insights if still enabled on account',
    type: 'dataset',
    icon: <DatasetIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Legacy',
    projectName: 'Agent Performance Analytics',
    owner: 'Zendesk',
    lastUpdated: 'Feb 9, 2026 2:00 PM',
    tags: [
      { label: 'legacy', color: '#AC5918' },
      { label: 'explore', color: '#68737D' },
      { label: 'insights', color: '#68737D' }
    ]
  }
];

// Created by me projects
const createdByMeProjects = [
  {
    id: 'my-project-1',
    title: 'My project',
    description: 'Custom project created for personalized analytics and reporting needs',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Custom',
    owner: 'Me',
    assets: [
      { type: 'dashboard', name: 'Overview Dashboard' },
      { type: 'report', name: 'Weekly Report' },
      { type: 'report', name: 'Monthly Summary Report' },
      { type: 'report', name: 'Performance Metrics Report' },
      { type: 'report', name: 'Trend Analysis Report' },
      { type: 'report', name: 'KPI Tracking Report' },
      { type: 'report', name: 'Comparison Report' },
      { type: 'report', name: 'Forecast Report' },
      { type: 'report', name: 'Activity Report' },
      { type: 'report', name: 'Status Report' },
      { type: 'report', name: 'Executive Summary Report' },
      { type: 'dataset', name: 'Support — Tickets (current state)' },
      { type: 'dataset', name: 'Custom events / webhooks' }
    ],
    tags: [
      { label: 'custom', color: '#1F73B7' },
      { label: 'personal', color: '#68737D' }
    ]
  }
];

// Shared with me projects
const sharedWithMeProjects = [
  {
    id: 'dashboard-initial',
    title: 'Customer support performance',
    description: 'Ticket management and workflow analytics dashboard',
    type: 'dashboard',
    icon: <LayoutIcon className={FLORA_LIBRARY_ICON} />,
    category: 'Support',
    owner: 'Support Team',
    sharedDate: 'Feb 18, 2026',
    tags: [
      { label: 'support', color: '#1F73B7' },
      { label: 'tickets', color: '#68737D' },
      { label: 'shared', color: '#AC5918' }
    ]
  },
  {
    id: 'shared-project-1',
    title: 'Q1 Performance Review',
    description: 'Comprehensive Q1 performance analysis with key metrics and trends',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Performance',
    owner: 'Sarah Chen',
    sharedDate: 'Feb 8, 2026',
    assets: [
      { type: 'dashboard', name: 'Q1 Performance Dashboard' },
      { type: 'report', name: 'Performance Analysis Report' },
      { type: 'report', name: 'Quarterly Trends Report' },
      { type: 'report', name: 'Revenue Growth Report' },
      { type: 'report', name: 'Cost Analysis Report' },
      { type: 'report', name: 'Efficiency Metrics Report' },
      { type: 'report', name: 'Team Performance Report' },
      { type: 'report', name: 'Goal Achievement Report' },
      { type: 'report', name: 'Market Comparison Report' },
      { type: 'report', name: 'Strategic Initiatives Report' },
      { type: 'report', name: 'Executive Summary Report' },
      { type: 'dataset', name: 'Support — Ticket metrics (time-based metrics)' },
      { type: 'dataset', name: 'Users (end users & agents)' }
    ],
    tags: [
      { label: 'quarterly', color: '#5F4FD1' },
      { label: 'review', color: '#68737D' },
      { label: 'shared', color: '#AC5918' }
    ]
  },
  {
    id: 'shared-project-2',
    title: 'Customer Insights Hub',
    description: 'Deep dive into customer behavior, satisfaction, and journey analytics',
    type: 'project',
    icon: <Folder className={FLORA_LIBRARY_ICON} />,
    category: 'Customer Experience',
    owner: 'Emma Wilson',
    sharedDate: 'Feb 5, 2026',
    assets: [
      { type: 'dashboard', name: 'Customer Satisfaction Dashboard' },
      { type: 'report', name: 'Customer Journey Report' },
      { type: 'report', name: 'Feedback Analysis Report' },
      { type: 'report', name: 'Sentiment Tracking Report' },
      { type: 'report', name: 'Behavior Patterns Report' },
      { type: 'report', name: 'Retention Analysis Report' },
      { type: 'report', name: 'Churn Prediction Report' },
      { type: 'report', name: 'Segmentation Report' },
      { type: 'report', name: 'Lifetime Value Report' },
      { type: 'report', name: 'Engagement Metrics Report' },
      { type: 'report', name: 'Voice of Customer Report' },
      { type: 'dataset', name: 'Support — Satisfaction (CSAT)' },
      { type: 'dataset', name: 'Sunshine Profiles — customer profile attributes' },
      { type: 'dataset', name: 'Messaging / Sunshine Conversations — Conversations and messages' }
    ],
    tags: [
      { label: 'customer', color: '#038153' },
      { label: 'insights', color: '#68737D' },
      { label: 'shared', color: '#AC5918' }
    ]
  }
];

// Active schedules
const activeSchedules = [
  {
    id: 'schedule-1',
    title: 'Weekly Performance Report',
    type: 'report',
    recurrenceType: 'recurring',
    recurrence: 'Every Monday at 9:00 AM',
    recipients: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah.j@company.com' },
      { id: '2', name: 'Mike Chen', email: 'mike.c@company.com' },
      { id: '3', name: 'Analytics Team', email: 'analytics@company.com' }
    ],
    endsOn: 'Mar 31, 2026',
    projectName: 'Agent Performance Analytics',
    lastSent: 'Feb 17, 2026 9:00 AM',
    owner: 'Noah',
    enabled: true
  },
  {
    id: 'schedule-2',
    title: 'Customer Satisfaction Dashboard',
    type: 'dashboard',
    recurrenceType: 'recurring',
    recurrence: 'Daily at 8:00 AM',
    recipients: [
      { id: '4', name: 'Emily Davis', email: 'emily.d@company.com' },
      { id: '5', name: 'Management Team', email: 'management@company.com' }
    ],
    endsOn: 'Dec 31, 2026',
    projectName: 'Customer Experience Hub',
    lastSent: 'Feb 23, 2026 8:00 AM',
    owner: 'Sarah Johnson',
    enabled: true
  },
  {
    id: 'schedule-3',
    title: 'Ticket Volume Alert',
    type: 'report',
    recurrenceType: 'threshold',
    recurrence: 'When ticket volume > 500',
    recipients: [
      { id: '6', name: 'Operations Team', email: 'ops@company.com' },
      { id: '7', name: 'John Smith', email: 'john.s@company.com' }
    ],
    endsOn: 'Jun 30, 2026',
    projectName: 'Real-time Monitoring',
    lastSent: 'Feb 22, 2026 2:15 PM',
    owner: 'Mike Chen',
    enabled: false
  },
  {
    id: 'schedule-4',
    title: 'Agent Productivity Dashboard',
    type: 'dashboard',
    recurrenceType: 'recurring',
    recurrence: 'Every Friday at 5:00 PM',
    recipients: [
      { id: '8', name: 'HR Department', email: 'hr@company.com' },
      { id: '9', name: 'Team Leads', email: 'leads@company.com' },
      { id: '10', name: 'Lisa Brown', email: 'lisa.b@company.com' }
    ],
    endsOn: 'Dec 31, 2026',
    projectName: 'Agent Performance Analytics',
    lastSent: 'Feb 21, 2026 5:00 PM',
    owner: 'Noah',
    enabled: true
  },
  {
    id: 'schedule-5',
    title: 'CSAT Score Alert',
    type: 'report',
    recurrenceType: 'threshold',
    recurrence: 'When CSAT drops below 80%',
    recipients: [
      { id: '11', name: 'Customer Success Team', email: 'success@company.com' },
      { id: '12', name: 'Alex Martinez', email: 'alex.m@company.com' }
    ],
    endsOn: 'No end date',
    projectName: 'Customer Experience Hub',
    lastSent: 'Feb 20, 2026 11:30 AM',
    owner: 'Emily Davis',
    enabled: true
  },
  {
    id: 'schedule-6',
    title: 'Monthly Executive Dashboard',
    type: 'dashboard',
    recurrenceType: 'recurring',
    recurrence: 'First day of month at 7:00 AM',
    recipients: [
      { id: '13', name: 'Executive Team', email: 'executives@company.com' },
      { id: '14', name: 'Board Members', email: 'board@company.com' }
    ],
    endsOn: 'Dec 31, 2026',
    projectName: 'Customer Experience Hub',
    lastSent: 'Feb 1, 2026 7:00 AM',
    owner: 'Sarah Johnson',
    enabled: true
  }
];

const categories = [
  'All',
  'Performance',
  'Operations',
  'Customer Experience',
  'Compliance',
  'AI & Automation',
  'Quality',
  'Self-Service'
];

// Look a project up by the name shown in a breadcrumb / location menu. Falls back
// to an empty project so an unknown folder name still opens a valid detail view.
const findProjectByTitle = (title: string) => {
  const all = [
    ...zendeskTemplates.filter(t => t.type === 'project'),
    ...createdByMeProjects,
    ...sharedWithMeProjects,
  ];
  return (
    all.find(p => p.title.toLowerCase() === title.toLowerCase()) ?? { title, assets: [] as any[] }
  );
};

export function TemplatesSection({ onOpenDashboard, isNavCollapsed: externalIsNavCollapsed, setIsNavCollapsed: externalSetIsNavCollapsed, initialProjectName, onInitialProjectOpened }: TemplatesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<'all' | 'dashboard' | 'report' | 'project'>('all');
  const [activeNavItem, setActiveNavItem] = useState<'all-templates' | 'recents' | 'starred' | 'trending' | 'archived' | 'created-by-me' | 'shared-with-me' | 'zendesk' | 'datasets' | 'schedules' | 'realtime'>('recents');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set(['template-1', 'template-4', 'template-9', 'project-1', 'project-3'])); // Mock starred templates and projects
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set(['project-3'])); // Mock archived items
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<Set<string>>(new Set(['project', 'dashboard', 'report']));
  const [sortBy, setSortBy] = useState<'date-created' | 'date-modified' | 'name'>('date-modified');
  const [starredExpanded, setStarredExpanded] = useState(true);
  const [openedProject, setOpenedProject] = useState<any>(
    initialProjectName ? findProjectByTitle(initialProjectName) : null
  );
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [projectAssetFilter, setProjectAssetFilter] = useState<Set<string>>(new Set(['project', 'dashboard', 'report', 'dataset']));
  const [showManageAccessModal, setShowManageAccessModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [scheduleEnabledStates, setScheduleEnabledStates] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(activeSchedules.map(s => [s.id, s.enabled]))
  );
  const [accessList, setAccessList] = useState([
    { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
    { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
    { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
  ]);
  const [newAccessEmail, setNewAccessEmail] = useState('');
  const [newAccessPermission, setNewAccessPermission] = useState('view');

  // Use external collapse state if provided, otherwise use internal state
  const isCollapsed = externalIsNavCollapsed !== undefined ? externalIsNavCollapsed : sidebarCollapsed;
  const setIsCollapsed = externalSetIsNavCollapsed || setSidebarCollapsed;

  // Open the requested project when arriving from elsewhere (e.g. a dashboard's
  // location menu), then let the parent drop the request so back navigation works.
  useEffect(() => {
    if (!initialProjectName) return;
    setOpenedProject(findProjectByTitle(initialProjectName));
    onInitialProjectOpened?.();
  }, [initialProjectName]);

  // Update viewMode based on activeNavItem
  useEffect(() => {
    if (activeNavItem === 'all-templates') {
      setViewMode('table');
    } else if (activeNavItem === 'recents' || activeNavItem === 'zendesk') {
      setViewMode('grid');
    }
  }, [activeNavItem]);

  const toggleAssetType = (type: string) => {
    const newSelection = new Set(selectedAssetTypes);

    if (newSelection.has(type)) {
      newSelection.delete(type);
      if (newSelection.size === 0) {
        setSelectedAssetTypes(new Set(['project']));
      } else {
        setSelectedAssetTypes(newSelection);
      }
    } else {
      newSelection.add(type);
      setSelectedAssetTypes(newSelection);
    }
  };

  // Get templates based on active navigation
  const getDisplayedTemplates = () => {
    if (activeNavItem === 'created-by-me') {
      return createdByMeProjects;
    } else if (activeNavItem === 'shared-with-me') {
      return sharedWithMeProjects;
    } else if (activeNavItem === 'zendesk') {
      return zendeskTemplates;
    }
    return zendeskTemplates;
  };

  // Filter templates based on search, category, and navigation item
  const filteredTemplates = getDisplayedTemplates().filter(template => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.tags?.some(tag => tag.label.toLowerCase().includes(lowerQuery));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    // Filter by asset type chips
    const matchesAssetType = selectedAssetTypes.has('all') || selectedAssetTypes.has(template.type);
    
    // Filter by navigation item (dashboards, reports, datasets now show all types)
    let matchesNavItem = true;
    if (activeNavItem === 'recents') {
      // Mock: Show recent templates and projects
      matchesNavItem = ['dashboard-initial', 'template-12', 'template-11', 'template-10', 'project-2', 'my-project-1', 'shared-project-1'].includes(template.id);
    } else if (activeNavItem === 'starred') {
      matchesNavItem = starredIds.has(template.id);
    } else if (activeNavItem === 'archived') {
      matchesNavItem = archivedIds.has(template.id);
    } else if (activeNavItem === 'realtime') {
      // Show only reports with real-time data
      matchesNavItem = template.type === 'report' && (template as any).hasRealTimeData === true;
    }

    return matchesSearch && matchesCategory && matchesAssetType && matchesNavItem;
  });

  // For the Zendesk curated view, surface the first 3 projects as "Suggested
  // projects" (rendered above the filters), and show the remaining assets in
  // the main grid below.
  const suggestedProjects =
    activeNavItem === 'zendesk'
      ? filteredTemplates.filter((t: any) => t.type === 'project').slice(0, 3)
      : [];
  const suggestedProjectIds = new Set(suggestedProjects.map((t: any) => t.id));
  const gridItems =
    activeNavItem === 'zendesk'
      ? filteredTemplates.filter((t: any) => !suggestedProjectIds.has(t.id))
      : filteredTemplates;

  // Renders a single library asset card (used in both the main grid and the
  // "Suggested projects" row above the filters in the Zendesk curated view).
  const renderTemplateCard = (template: any) => {
    const cardItem = toLibraryAssetCardItem(template);

    const openTemplate = () => {
      if (template.type === 'project') {
        setOpenedProject(template);
      } else if (template.type === 'dashboard' && onOpenDashboard) {
        onOpenDashboard({ id: template.id, title: template.title, type: 'dashboard', data: { isNew: true, fromCard: true, dashboardName: template.title, projectName: template.projectName } });
      } else if (template.type === 'report' && onOpenDashboard) {
        onOpenDashboard({ id: template.id, title: template.title, type: 'report', data: { isNew: true, fromCard: true } });
      }
    };

    const toggleStar = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (starredIds.has(template.id)) {
        const newStarred = new Set(starredIds);
        newStarred.delete(template.id);
        setStarredIds(newStarred);
      } else {
        setStarredIds(new Set([...starredIds, template.id]));
      }
    };

    const templateMenu = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={LIBRARY_CARD_MENU_BTN}>
            <MoreVertical className={FLORA_LIBRARY_ICON} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {template.type === 'project' ? (
            <>
              <DropdownMenuItem onClick={toggleStar} className="cursor-pointer">
                {starredIds.has(template.id) ? 'Remove from starred' : 'Add to starred'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Archive</DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowManageAccessModal(true);
                }}
                className="cursor-pointer"
              >
                Manage access
              </DropdownMenuItem>
            </>
          ) : template.type === 'report' ? (
            <>
              <DropdownMenuItem onClick={toggleStar} className="cursor-pointer">
                {starredIds.has(template.id) ? 'Remove from starred' : 'Add to starred'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Archive</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Share link</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Export</DropdownMenuItem>
            </>
          ) : template.type === 'dashboard' ? (
            <>
              <DropdownMenuItem onClick={toggleStar} className="cursor-pointer">
                {starredIds.has(template.id) ? 'Remove from starred' : 'Add to starred'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Archive</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Share link</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Export</DropdownMenuItem>
            </>
          ) : template.type === 'dataset' ? (
            <>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">View details</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">Export</DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    );

    if (cardItem) {
      return (
        <LibraryAssetCard
          key={template.id}
          item={cardItem}
          onClick={openTemplate}
          menu={templateMenu}
        />
      );
    }

    return (
      <Card
        key={template.id}
        className="cursor-pointer hover:opacity-80 transition-all relative group h-full flex flex-col"
        style={{ backgroundColor: '#F7F7F7', border: 'none' }}
        onClick={openTemplate}
      >
        <CardContent className="p-5 flex-1">
          <div className="flex gap-4 h-full">
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {template.type === 'dataset' ? (
                    <DatasetIcon className={FLORA_LIBRARY_ICON} />
                  ) : (
                    <Folder className={FLORA_LIBRARY_ICON} />
                  )}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  {templateMenu}
                </div>
              </div>

              <h3 className="text-base font-medium text-foreground leading-[21px]">
                {template.title}
              </h3>

              {(template.type === 'project' || template.type === 'dataset') && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <UserCircle className={FLORA_LIBRARY_ICON} />
                    <p className="text-muted-foreground text-xs">
                      {template.owner || 'Zendesk'}
                    </p>
                  </div>

                  {template.type === 'dataset' && template.projectName && (
                    <div className="flex items-center gap-1.5">
                      <Folder className={FLORA_LIBRARY_ICON} />
                      <p className="text-muted-foreground text-xs">
                        {template.projectName}
                      </p>
                    </div>
                  )}

                  {template.type === 'project' && template.assets && (
                    <>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <LayoutIcon className={FLORA_LIBRARY_ICON} />
                        <span>{template.assets.filter((a: any) => a.type === 'dashboard').length}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BarChartIcon className={FLORA_LIBRARY_ICON} />
                        <span>{template.assets.filter((a: any) => a.type === 'report').length}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <DatasetIcon className={FLORA_LIBRARY_ICON} />
                        <span>{template.assets.filter((a: any) => a.type === 'dataset').length}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Count templates by type
  const dashboardCount = zendeskTemplates.filter(t => t.type === 'dashboard').length;
  const reportCount = zendeskTemplates.filter(t => t.type === 'report').length;
  const datasetCount = zendeskTemplates.filter(t => t.type === 'dataset').length;
  const recentsCount = 6; // Mock: 3 templates + 3 projects
  const starredCount = starredIds.size;
  const realtimeReportsCount = zendeskTemplates.filter(t => t.type === 'report' && (t as any).hasRealTimeData === true).length;

  // If a project is opened, show project detail view
  if (openedProject) {
    return (
      <div className="flex h-full">
        {/* Left Navigation Sidebar */}
        <div
          className={`${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 transition-all duration-200`}
          style={{ backgroundColor: '#F7F7F7' }}
        >
          <div className="p-4">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-6">
              {!isCollapsed && (
                <div>
                  <h3 className="pl-[15px] text-lg">Library</h3>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 p-0"
              >
                {isCollapsed ? <ChevronRight className={FLORA_LIBRARY_ICON} /> : <ChevronLeft className={FLORA_LIBRARY_ICON} />}
              </Button>
            </div>

            {/* Navigation Items */}
            {!isCollapsed && (
              <nav className="space-y-0.5">
                <div className="pb-2">
                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('recents');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'recents'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-base">
                      <Clock className={librarySubnavIcon(activeNavItem === 'recents')} />
                      Recents
                    </div>
                    <LibrarySubnavTrailing count={recentsCount} isActive={activeNavItem === 'recents'} />
                  </button>
                </div>

                <div className="pb-2">
                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('zendesk');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'zendesk'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-base">
                      {!isCollapsed ? (
                        <>
                          <div className="size-[16px] flex items-center justify-center">
                            <Zendesk className={librarySubnavIcon(activeNavItem === 'zendesk')} />
                          </div>
                          <span>Zendesk curated</span>
                        </>
                      ) : (
                        <div className="bg-black rounded w-6 h-6 flex items-center justify-center">
                          <Zendesk className="size-[16px] shrink-0 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                <div className="pt-2 pb-2 border-t border-border space-y-0.5">
                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('created-by-me');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'created-by-me'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center text-base">
                      Created by me
                    </div>
                    <LibrarySubnavTrailing
                      count={createdByMeProjects.length}
                      isActive={activeNavItem === 'created-by-me'}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('shared-with-me');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'shared-with-me'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center text-base">
                      Shared with me
                    </div>
                    <LibrarySubnavTrailing
                      count={sharedWithMeProjects.length}
                      isActive={activeNavItem === 'shared-with-me'}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('all-templates');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'all-templates'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center text-base">
                      All
                    </div>
                    <LibrarySubnavTrailing
                      count={zendeskTemplates.length}
                      isActive={activeNavItem === 'all-templates'}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setActiveNavItem('archived');
                    }}
                    className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                      activeNavItem === 'archived'
                        ? 'bg-foreground text-white pl-3'
                        : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                    }`}
                  >
                    <div className="flex items-center text-base">
                      Archived
                    </div>
                    <LibrarySubnavTrailing count={archivedIds.size} isActive={activeNavItem === 'archived'} />
                  </button>
                </div>

                <div className="pt-2 border-t border-border">
                  <div>
                    <button
                      onClick={() => setStarredExpanded(!starredExpanded)}
                      className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                        activeNavItem === 'starred'
                          ? 'bg-foreground text-white pl-3'
                          : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-base">
                        <StarStroke className={librarySubnavIcon(activeNavItem === 'starred')} />
                        Starred
                      </div>
                      <LibrarySubnavTrailing
                        count={starredIds.size}
                        isActive={activeNavItem === 'starred'}
                        chevron={
                          <ChevronRight className={`${librarySubnavIcon(activeNavItem === 'starred')} transition-transform ${starredExpanded ? 'rotate-90' : ''}`} />
                        }
                      />
                    </button>

                    {/* Expanded starred items */}
                    {starredExpanded && (
                      <div className="mt-1 space-y-0.5">
                        {Array.from(starredIds).map((itemId) => {
                          const item = [...zendeskTemplates, ...createdByMeProjects, ...sharedWithMeProjects].find(t => t.id === itemId);
                          if (!item) return null;

                          return (
                            <button
                              key={itemId}
                              onClick={() => {
                                if (item.type === 'project') {
                                  setOpenedProject(item);
                                } else if (item.type === 'dashboard' && onOpenDashboard) {
                                  onOpenDashboard({ id: item.id, title: item.title, type: 'dashboard', data: { isNew: false, fromCard: true } });
                                } else if (item.type === 'report' && onOpenDashboard) {
                                  onOpenDashboard({ id: item.id, title: item.title, type: 'report', data: { isNew: false, fromCard: true } });
                                }
                              }}
                              className="w-full flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-lg text-sm text-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                              {item.type === 'dashboard' && <LayoutIcon className={FLORA_LIBRARY_ICON} />}
                              {item.type === 'report' && <BarChartIcon className={FLORA_LIBRARY_ICON} />}
                              {item.type === 'project' && <Folder className={FLORA_LIBRARY_ICON} />}
                              <span className="truncate">{item.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            )}
          </div>
        </div>

        {/* Project Detail View */}
        <div className={`flex-1 overflow-auto bg-background ${
          viewMode === 'table' ? 'rounded-l-[24px] my-1 mx-0' : 'rounded-[24px] m-1 ml-0'
        }`}>
          <div className={`px-[35px] pt-[39px] pb-[21px] ${viewMode === 'grid' ? 'max-w-[1600px] mx-auto' : ''}`}>
            {/* Breadcrumbs */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => setOpenedProject(null)}
                className="hover:text-foreground font-semibold transition-colors"
              >
                {activeNavItem === 'recents' && 'Recents'}
                {activeNavItem === 'created-by-me' && 'Created by me'}
                {activeNavItem === 'shared-with-me' && 'Shared with me'}
                {activeNavItem === 'starred' && 'Starred'}
                {activeNavItem === 'all-templates' && 'All'}
                {activeNavItem === 'archived' && 'Archived'}
                {activeNavItem === 'zendesk' && 'Zendesk curated'}
              </button>
              <ChevronRight className={FLORA_LIBRARY_ICON} />
              <span className="text-foreground">{openedProject.title}</span>
            </div>

            {/* Project Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h1>{openedProject.title}</h1>
                  {openedProject.isLive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    onClick={() => setShowManageAccessModal(true)}
                    className="h-10 px-4 text-base bg-[#293239] hover:bg-[#293239]/90 text-white"
                  >
                    Manage access
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreVertical className={FLORA_LIBRARY_ICON} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <StarStroke className={`${FLORA_LIBRARY_ICON} mr-2`} />
                      Add to starred
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className={`${FLORA_LIBRARY_ICON} mr-2`} />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            </div>

            {/* Project Assets */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-[8px]">
                <FloraSearchInput
                  aria-label="Search project assets"
                  value={projectSearchQuery}
                  onChange={(event) => setProjectSearchQuery(event.target.value)}
                  width={250}
                />
                <div className="flex flex-1" />
                <div className="flex shrink-0 items-center gap-[8px]">
                  {LIBRARY_ASSET_FILTER_OPTIONS.map(({ value, label }) => (
                    <ToggleButton
                      key={value}
                      size="small"
                      isPill
                      isPressed={projectAssetFilter.has(value)}
                      onClick={() => setProjectAssetFilter(new Set([value]))}
                    >
                      <MD tag="span">{label}</MD>
                    </ToggleButton>
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-[4px]">
                  <ToggleIconButton
                    size="small"
                    isPill={false}
                    isPressed={viewMode === 'grid'}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid className={FLORA_LIBRARY_ICON} />
                  </ToggleIconButton>
                  <ToggleIconButton
                    size="small"
                    isPill={false}
                    isPressed={viewMode === 'table'}
                    onClick={() => setViewMode('table')}
                    aria-label="List view"
                  >
                    <List className={FLORA_LIBRARY_ICON} />
                  </ToggleIconButton>
                </div>
              </div>

{viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {openedProject.assets
                    .filter((asset: any) => projectAssetFilter.has('all') || projectAssetFilter.has(asset.type))
                    .filter((asset: any) => {
                      if (!projectSearchQuery) return true;
                      const query = projectSearchQuery.toLowerCase();
                      return asset.name?.toLowerCase().includes(query);
                    })
                    .map((asset: any, index: number) => {
                      const cardItem = toLibraryAssetCardItem(
                        {
                          ...asset,
                          owner: asset.owner || openedProject.owner || 'John Smith',
                          lastUpdated: asset.lastUpdated || openedProject.lastUpdated,
                        },
                        openedProject.title,
                      );

                      const openAsset = () => {
                        if (asset.type === 'dashboard' && onOpenDashboard) {
                          onOpenDashboard({
                            id: `dashboard-library-${index}`,
                            title: asset.name,
                            type: 'dashboard',
                            data: { isNew: false, fromCard: true, dashboardName: asset.name, projectName: openedProject.title },
                          });
                        } else if (asset.type === 'report' && onOpenDashboard) {
                          onOpenDashboard({
                            id: `report-library-${index}`,
                            title: asset.name,
                            type: 'report',
                            data: { isNew: false, fromCard: true, reportName: asset.name },
                          });
                        }
                      };

                      if (cardItem) {
                        return (
                          <LibraryAssetCard
                            key={index}
                            item={cardItem}
                            onClick={openAsset}
                            menu={(
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className={LIBRARY_CARD_MENU_BTN}>
                                    <MoreVertical className={FLORA_LIBRARY_ICON} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <StarStroke className={`${FLORA_LIBRARY_ICON} mr-2`} />
                                    Add to starred
                                  </DropdownMenuItem>
                                  {asset.type === 'report' && (
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <StarStroke className={`${FLORA_LIBRARY_ICON} mr-2`} />
                                      Pin to KPI watchlist
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          />
                        );
                      }

                      return (
                    <Card
                      key={index}
                      className="cursor-pointer hover:opacity-80 transition-all relative group h-full flex flex-col"
                      style={{ backgroundColor: '#F7F7F7', border: 'none' }}
                      onClick={openAsset}
                    >
                      <CardContent className="p-5 flex-1">
                        <div className="flex gap-4 h-full">
                          <div className="flex-1 flex flex-col gap-3 min-w-0">
                            <div className="flex items-center gap-2">
                              <DatasetIcon className={FLORA_LIBRARY_ICON} />
                            </div>
                            <h3 className="text-base font-medium text-foreground leading-[21px]">
                              {asset.name}
                            </h3>
                            <div className="flex items-center gap-1.5">
                              <UserCircle className={FLORA_LIBRARY_ICON} />
                              <p className="text-muted-foreground text-xs">
                                {asset.owner || openedProject.owner || 'John Smith'}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Folder className={FLORA_LIBRARY_ICON} />
                              <p className="text-muted-foreground text-xs">
                                {openedProject.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                      );
                    })}
                </div>
              ) : (
                <Table size="small">
                  <Table.Head>
                    <Table.HeaderRow>
                      <Table.HeaderCell>{floraTableHeader('Name')}</Table.HeaderCell>
                      <Table.HeaderCell>{floraTableHeader('Type')}</Table.HeaderCell>
                      <Table.HeaderCell>{floraTableHeader('Owner')}</Table.HeaderCell>
                      <Table.HeaderCell>{floraTableHeader('Last Updated')}</Table.HeaderCell>
                      <Table.HeaderCell>{floraTableHeader('Tags')}</Table.HeaderCell>
                    </Table.HeaderRow>
                  </Table.Head>
                  <Table.Body>
                    {openedProject.assets
                      .filter((asset: any) => projectAssetFilter.has('all') || projectAssetFilter.has(asset.type))
                      .filter((asset: any) => {
                        if (!projectSearchQuery) return true;
                        const query = projectSearchQuery.toLowerCase();
                        return asset.name?.toLowerCase().includes(query);
                      })
                      .map((asset: any, index: number) => (
                      <Table.Row
                        key={index}
                        onClick={() => {
                          console.log('Library table row clicked:', asset.name, asset.type);
                          if (asset.type === 'dashboard' && onOpenDashboard) {
                            console.log('Opening dashboard with fromCard: true');
                            onOpenDashboard({
                              id: `dashboard-library-table-${index}`,
                              title: asset.name,
                              type: 'dashboard',
                              data: { isNew: false, fromCard: true, dashboardName: asset.name, projectName: openedProject.title }
                            });
                          } else if (asset.type === 'report' && onOpenDashboard) {
                            console.log('Opening report with fromCard: true');
                            onOpenDashboard({
                              id: `report-library-table-${index}`,
                              title: asset.name,
                              type: 'report',
                              data: { isNew: false, fromCard: true, reportName: asset.name }
                            });
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Table.Cell isTruncated>
                          <div className="flex items-center gap-[8px] min-w-0">
                            {asset.type === 'dashboard' ? (
                              <LayoutIcon className={FLORA_LIBRARY_ICON} />
                            ) : asset.type === 'dataset' ? (
                              <DatasetIcon className={FLORA_LIBRARY_ICON} />
                            ) : (
                              <BarChartIcon className={FLORA_LIBRARY_ICON} />
                            )}
                            {asset.hasRealTimeData && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="relative shrink-0">
                                      <div className="size-[8px] bg-green-500 rounded-full animate-pulse" />
                                      <div className="absolute top-0 left-0 size-[8px] bg-green-500 rounded-full animate-ping" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Real-time data</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>{asset.name}</MD>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                            {asset.type === 'dashboard' ? 'Dashboard' : asset.type === 'dataset' ? 'Dataset' : 'Report'}
                          </MD>
                        </Table.Cell>
                        <Table.Cell>
                          {(asset.type === 'dashboard' || asset.type === 'report') && (
                            <div className="flex items-center gap-[6px] whitespace-nowrap">
                              <UserCircle className={FLORA_LIBRARY_ICON} />
                              <MD tag="span" className={FLORA_TABLE_PRIMARY}>{asset.owner || 'John Smith'}</MD>
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {(asset.type === 'dashboard' || asset.type === 'report') && asset.lastUpdated && (
                            <div className="flex items-center gap-[6px] whitespace-nowrap">
                              <Clock className={FLORA_LIBRARY_ICON} />
                              <MD tag="span" className={FLORA_TABLE_PRIMARY}>{asset.lastUpdated}</MD>
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {asset.tags && (
                            <div className="flex flex-wrap gap-[6px]">
                              {asset.tags.slice(0, 3).map((tag: any, tagIndex: number) => (
                                <Tag key={tagIndex} size="small">
                                  {tag.label}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
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
                            <Users className={FLORA_LIBRARY_ICON} />
                          ) : (
                            <UserCircle className={FLORA_LIBRARY_ICON} />
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
                          <X className={FLORA_LIBRARY_ICON} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowManageAccessModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowManageAccessModal(false)}>
                Save changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Project Modal */}
        <Dialog open={showCreateProjectModal} onOpenChange={setShowCreateProjectModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create new project</DialogTitle>
              <DialogDescription>
                Define your project name and share it with your team
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-sm text-foreground font-medium">Project name</label>
                <Input
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Share Section */}
              <div className="space-y-2">
                <label className="text-sm text-foreground font-medium">Share with</label>
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

              {/* People with access */}
              <div className="space-y-2">
                <label className="text-sm text-foreground font-medium">People with access</label>
                <div className="border border-border rounded-lg divide-y divide-border max-h-[200px] overflow-y-auto">
                  {accessList.map((access) => (
                    <div key={access.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {access.type === 'group' ? (
                            <Users className={FLORA_LIBRARY_ICON} />
                          ) : (
                            <UserCircle className={FLORA_LIBRARY_ICON} />
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
                        {access.id !== '1' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setAccessList(accessList.filter(a => a.id !== access.id));
                            }}
                          >
                            <X className={FLORA_LIBRARY_ICON} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateProjectModal(false);
                  setProjectName('');
                  setNewAccessEmail('');
                  setAccessList([
                    { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
                    { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
                    { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
                  ]);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (projectName.trim()) {
                    // Create the project logic here
                    console.log('Creating project:', projectName, 'with access:', accessList);
                    setShowCreateProjectModal(false);
                    setProjectName('');
                    setNewAccessEmail('');
                    setAccessList([
                      { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
                      { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
                      { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
                    ]);
                  }
                }}
                disabled={!projectName.trim()}
              >
                Create project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1">
      {/* Left Navigation Sidebar */}
      <div
        className={`${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 transition-all duration-200`}
        style={{ backgroundColor: '#F7F7F7' }}
      >
        <div className="p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            {!isCollapsed && (
              <div>
                <h3 className="pl-[15px] text-lg">Library</h3>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          {!isCollapsed && (
            <nav className="space-y-0.5">
            {false && (
            <button
              onClick={() => setActiveNavItem('trending')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activeNavItem === 'trending'
                  ? 'bg-[#4F6BBF]/15 text-[#4F6BBF] font-light'
                  : 'text-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 text-base">
                <TrendingUp className={librarySubnavIcon(activeNavItem === 'trending')} />
                {!isCollapsed && 'Trending'}
              </div>
            </button>
            )}

            <div className="pb-2">
              <button
                onClick={() => setActiveNavItem('recents')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'recents'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  <Clock className={librarySubnavIcon(activeNavItem === 'recents')} />
                  {!isCollapsed && 'Recents'}
                </div>
                {!isCollapsed && (
                    <LibrarySubnavTrailing count={recentsCount} isActive={activeNavItem === 'recents'} />
                )}
              </button>
            </div>

            <div className="pb-2">
              <button
                onClick={() => setActiveNavItem('zendesk')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'zendesk'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  {!isCollapsed ? (
                    <>
                      <div className="size-[16px] flex items-center justify-center">
                        <Zendesk className={librarySubnavIcon(activeNavItem === 'zendesk')} />
                      </div>
                      <span>Zendesk curated</span>
                    </>
                  ) : (
                    <div className="bg-black rounded w-6 h-6 flex items-center justify-center">
                      <Zendesk className="size-[16px] shrink-0 text-white" />
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="pt-2 pb-2 border-t border-border space-y-0.5">
              <button
                onClick={() => setActiveNavItem('created-by-me')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'created-by-me'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center text-base">
                  {!isCollapsed && 'Created by me'}
                </div>
                {!isCollapsed && (
                  <LibrarySubnavTrailing
                    count={createdByMeProjects.length}
                    isActive={activeNavItem === 'created-by-me'}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveNavItem('shared-with-me')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'shared-with-me'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center text-base">
                  {!isCollapsed && 'Shared with me'}
                </div>
                {!isCollapsed && (
                  <LibrarySubnavTrailing
                    count={sharedWithMeProjects.length}
                    isActive={activeNavItem === 'shared-with-me'}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveNavItem('all-templates')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'all-templates'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center text-base">
                  {!isCollapsed && 'All'}
                </div>
                {!isCollapsed && (
                  <LibrarySubnavTrailing
                    count={zendeskTemplates.length}
                    isActive={activeNavItem === 'all-templates'}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveNavItem('archived')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'archived'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center text-base">
                  {!isCollapsed && 'Archived'}
                </div>
                {!isCollapsed && (
                  <LibrarySubnavTrailing count={archivedIds.size} isActive={activeNavItem === 'archived'} />
                )}
              </button>
            </div>

            <div className="pt-2 border-t border-border">
              <div>
                <button
                  onClick={() => setStarredExpanded(!starredExpanded)}
                  className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                    activeNavItem === 'starred'
                      ? 'bg-foreground text-white pl-3'
                      : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                  }`}
                >
                  <div className="flex items-center gap-3 text-base">
                    <StarStroke className={librarySubnavIcon(activeNavItem === 'starred')} />
                    {!isCollapsed && 'Starred'}
                  </div>
                  {!isCollapsed && (
                    <LibrarySubnavTrailing
                      count={starredCount}
                      isActive={activeNavItem === 'starred'}
                      chevron={
                        <ChevronRight className={`${librarySubnavIcon(activeNavItem === 'starred')} transition-transform ${starredExpanded ? 'rotate-90' : ''}`} />
                      }
                    />
                  )}
                </button>

                {/* Expanded starred items */}
                {starredExpanded && !isCollapsed && (
                  <div className="mt-1 space-y-0.5">
                    {Array.from(starredIds).map((itemId) => {
                      const item = [...zendeskTemplates, ...createdByMeProjects, ...sharedWithMeProjects].find(t => t.id === itemId);
                      if (!item) return null;

                      return (
                        <button
                          key={itemId}
                          onClick={() => {
                            if (item.type === 'project') {
                              setOpenedProject(item);
                            } else if (item.type === 'dashboard' && onOpenDashboard) {
                              onOpenDashboard({ id: item.id, title: item.title, type: 'dashboard', data: { isNew: true, fromCard: true } });
                            } else if (item.type === 'report' && onOpenDashboard) {
                              onOpenDashboard({ id: item.id, title: item.title, type: 'report', data: { isNew: true, fromCard: true } });
                            } else {
                              setActiveNavItem('starred');
                            }
                          }}
                          className="w-full flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-lg text-sm text-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {item.type === 'dashboard' && <LayoutIcon className={FLORA_LIBRARY_ICON} />}
                          {item.type === 'report' && <BarChartIcon className={FLORA_LIBRARY_ICON} />}
                          {item.type === 'project' && <Folder className={FLORA_LIBRARY_ICON} />}
                          <span className="truncate">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {false && (
            <div className="pt-2 border-t border-border">


              <button
                onClick={() => setActiveNavItem('schedules')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeNavItem === 'schedules'
                    ? 'bg-[#4F6BBF]/15 text-[#4F6BBF] font-light'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  <Calendar className={librarySubnavIcon(activeNavItem === 'schedules')} />
                  {!isCollapsed && 'Schedules'}
                </div>
                {!isCollapsed && (
                  <span className="text-sm text-foreground px-2 py-0.5 rounded-md" style={{ backgroundColor: '#F7F7F7' }}>
                    {activeSchedules.length}
                  </span>
                )}
              </button>
            </div>
            )}
          </nav>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto bg-background ${
        viewMode === 'table' || activeNavItem === 'created-by-me' || activeNavItem === 'shared-with-me' || activeNavItem === 'archived'
          ? 'rounded-l-[24px] my-1 mx-0'
          : 'rounded-[24px] m-1 ml-0'
      }`}>
        {activeNavItem === 'datasets' ? (
          <DatasetsSection />
        ) : (
        <div className={`px-[35px] pt-[39px] pb-[21px] ${
          viewMode === 'grid' && activeNavItem !== 'created-by-me' && activeNavItem !== 'shared-with-me' && activeNavItem !== 'archived'
            ? 'max-w-[1600px] mx-auto'
            : ''
        }`}>
          {/* Header */}
          {activeNavItem !== 'zendesk' && (
            <div className="mb-[8px]">
              <div className="flex items-center justify-between gap-2">
                <h1 className="font-light pl-[34px]">
                  {activeNavItem === 'all-templates' && <>All <span style={{ color: '#706F6E' }}>assets</span></>}
                  {activeNavItem === 'recents' && 'Recents'}
                  {activeNavItem === 'starred' && 'Starred'}
                  {activeNavItem === 'trending' && <>Trending<br /><span style={{ color: '#706F6E' }}>across your teams</span></>}
                  {activeNavItem === 'archived' && 'Archived'}
                  {activeNavItem === 'created-by-me' && <>Created <span style={{ color: '#706F6E' }}>by me</span></>}
                  {activeNavItem === 'shared-with-me' && <>Shared <span style={{ color: '#706F6E' }}>with me</span></>}
                  {activeNavItem === 'schedules' && <>Active <span style={{ color: '#706F6E' }}>schedules</span></>}
                </h1>
                {(activeNavItem === 'created-by-me' || activeNavItem === 'all-templates') && (
                  <FloraButton isPrimary size="small" onClick={() => setShowCreateProjectModal(true)}>
                    <MD tag="span">Create project</MD>
                  </FloraButton>
                )}
              </div>
              
            </div>
          )}

          {/* Zendesk Hero Section */}
          {activeNavItem === 'zendesk' && (
            <div
              className="rounded-[20px] relative pt-4 pr-8 pb-4 pl-0 mb-8"
            >
              <div className="flex flex-col gap-4 max-w-3xl">
                <div>
                  <h2 className="mb-3 text-foreground text-2xl font-light">Discover Zendesk built analytics apps</h2>
                  <p className="text-foreground text-base leading-relaxed mb-6 max-w-2xl">
                    Access curated dashboards, reports, crafted by Zendesk analytics experts. Get started instantly with data for common support and customer service scenarios.
                  </p>
                  <div className="relative max-w-xl">


                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggested projects — above the search / filters / view options */}
          {activeNavItem === 'zendesk' && suggestedProjects.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-base font-medium text-foreground">Suggested projects</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {suggestedProjects.map((template: any) => renderTemplateCard(template))}
              </div>
            </div>
          )}

          {/* New Assets Banner */}
          {activeNavItem === 'trending' && !bannerDismissed && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Banner 1 */}
              <div 
                className="rounded-[20px] relative p-6 bg-white border border-gray-200"
              >
                <button
                  className="absolute top-3 right-3 p-1.5 hover:bg-black/5 rounded transition-colors"
                  onClick={() => setBannerDismissed(true)}
                  aria-label="Close banner"
                >
                  <X className={FLORA_LIBRARY_ICON} />
                </button>
                <div className="flex flex-col gap-3">
                  
                  <div className="pr-6">
                    <div className="flex flex-col gap-2 mb-2 px-[0px] pt-[14px] pb-[0px]">
                      <span className="inline-flex items-center text-sm leading-none tracking-[-0.0004px] px-[6px] py-[3px] rounded ml-[0px] mr-[425px] my-[0px]" style={{ color: '#038153', backgroundColor: '#03815315' }}>Updated</span>
                      <div className="flex items-center gap-2">
                        <h3>
                          Agent Productivity Dashboard
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-green-600 text-xs">Real-time</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed mx-[0px] mt-[0px] mb-[53px]">
                      Track agent performance metrics, response times, and productivity trends with live updates and actionable insights.
                    </p>
                    <Button
                      className="bg-white text-primary hover:bg-white/90 px-4 py-2 h-auto"
                      onClick={() => setOpenedProject({ title: 'Agent Productivity Dashboard' })}
                    >
                      View Dashboard
                    </Button>
                  </div>
                </div>
              </div>

              {/* Banner 2 */}
              <div 
                className="rounded-[20px] relative pt-[44px] pl-[44px] pb-6 pr-6"
                style={{
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 544.05 206.25\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(50.8 31.6 -83.355 134 -0.000080325 -78)\"><stop stop-color=\"rgba(93,138,198,1)\" offset=\"0\"/><stop stop-color=\"rgba(92,100,180,1)\" offset=\"0.5\"/><stop stop-color=\"rgba(90,62,161,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                }}
              >
                <button
                  className="absolute top-3 right-3 p-1.5 hover:bg-black/5 rounded transition-colors"
                  onClick={() => setBannerDismissed(true)}
                  aria-label="Close banner"
                >
                  <X className={FLORA_LIBRARY_ICON} />
                </button>
                <div className="flex flex-col gap-3 mx-[0px] mt-[0px] mb-[22px]">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-white text-lg">
                      New project: AI Agent Automation ROI
                    </h3>
                    <p className="text-white/50 mb-4 text-base leading-relaxed">
                      See the ROI of your AI agent automation with automation potential prediction and comprehensive analytics.
                    </p>
                    <Button
                      className="bg-transparent text-white hover:bg-white/10 px-2 h-8 border border-white/30"
                      size="sm"
                      onClick={() => setOpenedProject({ title: 'AI Agent Automation ROI' })}
                    >
                      Open project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Content Wrapper */}
          <div className={(activeNavItem === 'all-templates' || activeNavItem === 'recents' || activeNavItem === 'starred' || activeNavItem === 'archived' || activeNavItem === 'created-by-me' || activeNavItem === 'shared-with-me' || activeNavItem === 'trending' || activeNavItem === 'schedules') ? 'bg-white rounded-[20px] px-8 pt-[8px] pb-8' : ''}>
            {/* Filters */}
            <div className="mb-6">
            {activeNavItem !== 'schedules' && (
              <>
            {/* Search, Filters, and View Toggle - All on one line */}
            <div className="flex items-center gap-[8px]">
              <FloraSearchInput
                aria-label="Search assets"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                width={250}
              />

              <div className="flex flex-1" />

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-[8px]">
                {LIBRARY_ASSET_FILTER_OPTIONS.map(({ value, label }) => (
                  <ToggleButton
                    key={value}
                    size="small"
                    isPill
                    isPressed={selectedAssetTypes.has(value)}
                    onClick={() => toggleAssetType(value)}
                  >
                    <MD tag="span">{label}</MD>
                  </ToggleButton>
                ))}
              </div>

              {/* Category Filter - Hidden */}
              {false && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-background border-border text-foreground hover:bg-muted"
                  >
                    {selectedCategory}
                    <ChevronDown className={FLORA_LIBRARY_ICON} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedCategory('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Performance')}>Performance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Quality')}>Quality</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Operations')}>Operations</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Self-Service')}>Self-Service</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              )}

              {/* Sort Dropdown - Show for all sections except recents */}
              {activeNavItem !== 'recents' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <FloraButton size="small" isPill className={LIBRARY_FILTER_BTN_CLASS}>
                    <MD tag="span" className={LIBRARY_FILTER_BTN_LABEL_CLASS}>
                      {sortBy === 'date-created' ? 'Date created' : sortBy === 'date-modified' ? 'Date modified' : 'Name'}
                    </MD>
                    <ChevronDown className={LIBRARY_FILTER_BTN_ICON_CLASS} aria-hidden />
                  </FloraButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem onClick={() => setSortBy('date-modified')}>Date modified</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('date-created')}>Date created</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              )}

              {/* View Toggle — Flora ToggleIconButton */}
              <div className="flex items-center gap-[4px] shrink-0">
                <ToggleIconButton
                  size="small"
                  isPill={false}
                  isPressed={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className={FLORA_LIBRARY_ICON} />
                </ToggleIconButton>
                <ToggleIconButton
                  size="small"
                  isPill={false}
                  isPressed={viewMode === 'table'}
                  onClick={() => setViewMode('table')}
                  aria-label="List view"
                >
                  <List className={FLORA_LIBRARY_ICON} />
                </ToggleIconButton>
              </div>
            </div>
            </>
            )}
          </div>

          {/* Schedules View */}
          {activeNavItem === 'schedules' ? (
            <Table size="small">
              <Table.Head>
                <Table.HeaderRow>
                  <Table.HeaderCell width="48px">{floraTableHeader('On/Off')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Name')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Type')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Project')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Recurrence / Threshold')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Owner')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Recipients')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Ends on')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Last sent')}</Table.HeaderCell>
                  <Table.HeaderCell hasOverflow />
                </Table.HeaderRow>
              </Table.Head>
              <Table.Body>
                {activeSchedules.map((schedule) => (
                  <Table.Row key={schedule.id}>
                    <Table.Cell>
                      <Switch
                        checked={scheduleEnabledStates[schedule.id]}
                        onCheckedChange={(checked) => {
                          setScheduleEnabledStates(prev => ({
                            ...prev,
                            [schedule.id]: checked
                          }));
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.title}</MD>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-[8px] whitespace-nowrap">
                        {schedule.type === 'dashboard' ? (
                          <>
                            <LayoutIcon className={FLORA_LIBRARY_ICON} />
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>Dashboard</MD>
                          </>
                        ) : (
                          <>
                            <BarChartIcon className={FLORA_LIBRARY_ICON} />
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>Report</MD>
                          </>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.projectName}</MD>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.recurrence}</MD>
                    </Table.Cell>
                    <Table.Cell>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.owner}</MD>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-[6px]">
                        {schedule.recipients.slice(0, 2).map((recipient) => (
                          <Tag key={recipient.id} size="small">
                            {recipient.name}
                          </Tag>
                        ))}
                        {schedule.recipients.length > 2 && (
                          <Tag size="small">
                            +{schedule.recipients.length - 2}
                          </Tag>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.endsOn}</MD>
                    </Table.Cell>
                    <Table.Cell>
                      <MD tag="span" className={FLORA_TABLE_PRIMARY}>{schedule.lastSent}</MD>
                    </Table.Cell>
                    <Table.Cell hasOverflow>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <IconButton size="small" aria-label="Schedule actions">
                            <MoreVertical className={FLORA_LIBRARY_ICON} />
                          </IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <MD tag="span">Edit schedule</MD>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MD tag="span">Pause schedule</MD>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MD tag="span">Send now</MD>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <MD tag="span">Delete schedule</MD>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <>
              {/* Templates Grid */}
              {filteredTemplates.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <MD tag="span" className={FLORA_TABLE_PRIMARY}>No templates found matching your criteria.</MD>
                </div>
              ) : viewMode === 'grid' ? (
            <>
              {activeNavItem === 'zendesk' && suggestedProjects.length > 0 && (
                <h2 className="mb-4 text-base font-medium text-foreground">All assets</h2>
              )}
              <div className={`grid gap-4 ${
                activeNavItem === 'created-by-me' ||
                activeNavItem === 'shared-with-me' ||
                activeNavItem === 'archived'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {gridItems.map((template: any) => renderTemplateCard(template))}
              </div>
            </>
          ) : (
            <Table size="small">
              <Table.Head>
                <Table.HeaderRow>
                  <Table.HeaderCell>{floraTableHeader('Type')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Details')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Owner')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Location')}</Table.HeaderCell>
                  <Table.HeaderCell>{floraTableHeader('Last Updated')}</Table.HeaderCell>
                  <Table.HeaderCell hasOverflow />
                </Table.HeaderRow>
              </Table.Head>
              <Table.Body>
                {filteredTemplates.map((template: any) => (
                  <Table.Row
                    key={template.id}
                    onClick={() => {
                      if (template.type === 'project') {
                        setOpenedProject(template);
                      } else if (template.type === 'dashboard' && onOpenDashboard) {
                        console.log('Library template table row clicked:', template.title);
                        onOpenDashboard({ id: template.id, title: template.title, type: 'dashboard', data: { isNew: true, fromCard: true, dashboardName: template.title, projectName: template.projectName } });
                      } else if (template.type === 'report' && onOpenDashboard) {
                        console.log('Library template table row clicked:', template.title);
                        onOpenDashboard({ id: template.id, title: template.title, type: 'report', data: { isNew: true, fromCard: true } });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Table.Cell>
                      <div className="flex items-center gap-[8px]">
                        {template.type === 'dashboard' ? (
                          <LayoutIcon className={FLORA_LIBRARY_ICON} />
                        ) : template.type === 'report' ? (
                          <BarChartIcon className={FLORA_LIBRARY_ICON} />
                        ) : template.type === 'dataset' ? (
                          <DatasetIcon className={FLORA_LIBRARY_ICON} />
                        ) : (
                          <Folder className={FLORA_LIBRARY_ICON} />
                        )}
                        {template.hasRealTimeData && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="relative shrink-0">
                                  <div className="size-[8px] bg-green-500 rounded-full animate-pulse" />
                                  <div className="absolute top-0 left-0 size-[8px] bg-green-500 rounded-full animate-ping" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Real-time data</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell isTruncated>
                      <div className="flex items-center gap-[8px] min-w-0">
                        <MD tag="span" className={FLORA_TABLE_PRIMARY}>{template.title}</MD>
                        {template.isLive && (
                          <div className="size-[8px] bg-green-500 rounded-full animate-pulse shrink-0" />
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-[6px] whitespace-nowrap">
                        <UserCircle className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                          {template.owner || 'Zendesk'}
                        </MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {template.type !== 'project' && template.projectName && (
                        <div className="flex items-center gap-[6px] whitespace-nowrap">
                          <Folder className={FLORA_LIBRARY_ICON} />
                          <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                            {template.projectName}
                          </MD>
                        </div>
                      )}
                      {template.type === 'project' && template.assets && (
                        <div className="flex items-center gap-[12px] whitespace-nowrap">
                          <div className="flex items-center gap-[6px]">
                            <LayoutIcon className={FLORA_LIBRARY_ICON} />
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                              {template.assets.filter((a: any) => a.type === 'dashboard').length}
                            </MD>
                          </div>
                          <div className="flex items-center gap-[6px]">
                            <BarChartIcon className={FLORA_LIBRARY_ICON} />
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                              {template.assets.filter((a: any) => a.type === 'report').length}
                            </MD>
                          </div>
                          <div className="flex items-center gap-[6px]">
                            <Database className={FLORA_LIBRARY_ICON} />
                            <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                              {template.assets.filter((a: any) => a.type === 'dataset').length}
                            </MD>
                          </div>
                        </div>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-[6px] whitespace-nowrap">
                        <Clock className={FLORA_LIBRARY_ICON} />
                        <MD tag="span" className={FLORA_TABLE_PRIMARY}>
                          {template.lastUpdated || 'Feb 11, 2026 2:30 PM'}
                        </MD>
                      </div>
                    </Table.Cell>
                    <Table.Cell hasOverflow onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                      {template.type === 'project' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <IconButton size="small" aria-label="Project actions">
                              <MoreVertical className={FLORA_LIBRARY_ICON} />
                            </IconButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                if (starredIds.has(template.id)) {
                                  const newStarred = new Set(starredIds);
                                  newStarred.delete(template.id);
                                  setStarredIds(newStarred);
                                } else {
                                  setStarredIds(new Set([...starredIds, template.id]));
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <StarStroke className={FLORA_LIBRARY_ICON + ' mr-2'} />
                              {starredIds.has(template.id) ? 'Remove from starred' : 'Add to starred'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowManageAccessModal(true);
                              }}
                            >
                              <Settings className={FLORA_LIBRARY_ICON + ' mr-2'} />
                              Manage access
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Archive className={FLORA_LIBRARY_ICON + ' mr-2'} />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          </>
          )}
          </div>

        </div>
        )}
      </div>

      {/* Create Project Modal */}
      <Dialog open={showCreateProjectModal} onOpenChange={setShowCreateProjectModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              Define your project name and share it with your team
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-sm text-foreground font-medium">Project name</label>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Share Section */}
            <div className="space-y-2">
              <label className="text-sm text-foreground font-medium">Share with</label>
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

            {/* People with access */}
            <div className="space-y-2">
              <label className="text-sm text-foreground font-medium">People with access</label>
              <div className="border border-border rounded-lg divide-y divide-border max-h-[200px] overflow-y-auto">
                {accessList.map((access) => (
                  <div key={access.id} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {access.type === 'group' ? (
                          <Users className={FLORA_LIBRARY_ICON} />
                        ) : (
                          <UserCircle className={FLORA_LIBRARY_ICON} />
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
                      {access.id !== '1' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setAccessList(accessList.filter(a => a.id !== access.id));
                          }}
                        >
                          <X className={FLORA_LIBRARY_ICON} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCreateProjectModal(false);
                setProjectName('');
                setNewAccessEmail('');
                setAccessList([
                  { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
                  { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
                  { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
                ]);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (projectName.trim()) {
                  // Create the project logic here
                  console.log('Creating project:', projectName, 'with access:', accessList);
                  setShowCreateProjectModal(false);
                  setProjectName('');
                  setNewAccessEmail('');
                  setAccessList([
                    { id: '1', name: 'Marketing Team', type: 'group', permission: 'edit', avatar: null },
                    { id: '2', name: 'Sarah Johnson', type: 'person', permission: 'view', avatar: null },
                    { id: '3', name: 'Analytics Group', type: 'group', permission: 'view', avatar: null }
                  ]);
                }
              }}
              disabled={!projectName.trim()}
            >
              Create project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}