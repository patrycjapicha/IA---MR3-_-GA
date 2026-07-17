import React from 'react';

export interface DashboardProps {
  type: 'custom' | 'template';
  data: { description?: string; templateId?: string };
  onReportGeneration?: (reportData: { title: string; period: string; generated: string }) => void;
  onCreateDashboard?: () => void;
  onCreateReport?: () => void;
  onSectionChange?: (section: string) => void;
  onNotificationsChange?: (notifications: SlackNotification[], unreadCount: number) => void;
  onNavigateToExportSetup?: () => void;
  onNavigateToSection?: (section: string) => void;
  initialSection?: string;
  onOpenDashboard?: (dashboardData: { id: string; title: string; data?: any }) => void;
  activeTabId?: string | null;
  openTabs?: Array<{
    id: string;
    title: string;
    type: 'dashboard' | 'report';
    isActive: boolean;
    data?: any;
  }>;
  onOpenAnalyticsAssistant?: (query: string) => void;
  onUpdateTabTitle?: (tabId: string, newTitle: string) => void;
  onShowLegacyTooltip?: () => void;
}

export interface FocusArea {
  id: number;
  alert: string;
  details: string;
  suggestedAction: string;
  type: 'critical' | 'warning' | 'positive' | 'neutral';
  icon: React.ReactNode;
  category?: 'insights' | 'alerts' | 'opportunities';
  expandedContent?: {
    additionalDetails?: string[];
    metrics?: { label: string; value: string; change?: string }[];
    timeline?: string;
    impact?: string;
    nextSteps?: string[];
  };
}

export interface Task {
  id: number;
  title: string;
  completed?: boolean;
}

export interface KnowledgeGap {
  id: number;
  topic: string;
  queries: number;
  trend: 'up' | 'down' | 'stable';
  urgency: 'high' | 'medium' | 'low';
}

export interface InsightComment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface MemoryInsight {
  id: number;
  title: string;
  summary: string;
  date: string;
  type: 'chart' | 'metric' | 'trend' | 'dashboard' | 'report' | 'dataset';
  chartData?: any[];
  chartType?: 'line' | 'bar' | 'pie' | 'area';
  metrics?: { label: string; value: string; change?: string }[];
  icon: React.ReactNode;
  description?: string;
  tags?: string[];
  comments?: InsightComment[];
  sharedWith?: string[];
  createdBy?: string;
  createdDate?: string;
  lastEditedDate?: string;
  views?: number;
}

export interface MemoryFolder {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  insights: MemoryInsight[];
  isExpanded?: boolean;
  createdDate?: string;
  lastEditedDate?: string;
  views?: number;
}

export interface ConversationMessage {
  id: number;
  type: 'user' | 'assistant';
  message: string;
  timestamp: string;
  isPinned?: boolean;
  isReportGeneration?: boolean;
  data?: {
    metrics?: { label: string; value: string; change?: string }[];
    insights?: string[];
    actions?: string[];
    chartType?: 'line' | 'bar' | 'pie' | 'area';
    chartData?: any[];
  };
  suggestedQuestions?: string[];
}

export interface SlackNotification {
  id: number;
  channel: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'update' | 'mention';
  unread: boolean;
}

export interface ArticlePerformance {
  id: number;
  title: string;
  type: 'created' | 'edited';
  date: string;
  daysAgo: number;
  beforeViews?: number;
  afterViews: number;
  beforeSuccess?: number;
  afterSuccess: number;
  beforeRating?: number;
  afterRating: number;
  impact: 'positive' | 'negative' | 'neutral';
  changePercent: number;
  beforeEscalationRate?: number;
  afterEscalationRate?: number;
  escalationImpact?: number;
  automationRateIncrease?: number;
  queriesResolved?: number;
}