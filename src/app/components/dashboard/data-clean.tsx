import React from 'react';
import { AlertTriangle, Users, Clock, Target, Lightbulb, CheckSquare, FileText, HelpCircle, TrendingUp, Brain, Zap, PieChart, BarChart, BarChart3, LineChart as LineChartIcon, Bot, TrendingDown, Database, Layout, Search, Table, Shield, DollarSign, Folder, BookOpen, Smile, Monitor } from '@/components/icons/flora';
import { SlackNotification, ArticlePerformance, ConversationMessage, KnowledgeGap, Task, MemoryFolder, FocusArea } from './types';

// Mock Slack users and channels for sharing
export const mockSlackUsers = [
  { id: 'john.doe', name: 'John Doe', email: 'john.doe@company.com' },
  { id: 'sarah.wilson', name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
  { id: 'mike.chen', name: 'Mike Chen', email: 'mike.chen@company.com' },
  { id: 'emma.johnson', name: 'Emma Johnson', email: 'emma.johnson@company.com' },
  { id: 'alex.rodriguez', name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com' }
];

export const mockSlackChannels = [
  { id: 'analytics', name: 'analytics', description: 'Data insights and analytics discussions' },
  { id: 'team-updates', name: 'team-updates', description: 'Weekly team updates and announcements' },
  { id: 'knowledge-base', name: 'knowledge-base', description: 'Knowledge base improvements and updates' },
  { id: 'customer-success', name: 'customer-success', description: 'Customer success metrics and insights' },
  { id: 'general', name: 'general', description: 'General company discussions' }
];

export const mockSlackNotifications: SlackNotification[] = [
  {
    id: 1,
    channel: '#analytics-alerts',
    message: 'Billing escalation rate exceeded 18% threshold',
    timestamp: '2 min ago',
    type: 'alert',
    unread: true
  },
  {
    id: 2,
    channel: '#knowledge-updates',
    message: 'New article "Mobile Login Guide" published and live',
    timestamp: '15 min ago',
    type: 'update',
    unread: true
  },
  {
    id: 3,
    channel: '#ai-performance',
    message: '@noah AI model update completed - 12% improvement in resolution rate',
    timestamp: '1 hour ago',
    type: 'mention',
    unread: false
  },
  {
    id: 4,
    channel: '#support-team',
    message: 'Weekly knowledge gap report ready for review',
    timestamp: '3 hours ago',
    type: 'update',
    unread: false
  },
  {
    id: 5,
    channel: '#analytics-alerts',
    message: 'Peak volume alert: 40% increase in support queries',
    timestamp: '5 hours ago',
    type: 'alert',
    unread: false
  }
];

export const articlePerformanceData: ArticlePerformance[] = [
  {
    id: 1,
    title: 'Mobile Login Troubleshooting',
    type: 'created',
    date: '2024-01-15',
    daysAgo: 3,
    afterViews: 1247,
    afterSuccess: 89,
    afterRating: 4.7,
    impact: 'positive',
    changePercent: 89,
    automationRateIncrease: 34,
    queriesResolved: 156,
    afterEscalationRate: 12
  },
  {
    id: 2,
    title: 'Password Reset Guide',
    type: 'edited',
    date: '2024-01-14',
    daysAgo: 4,
    beforeViews: 850,
    afterViews: 1156,
    beforeSuccess: 67,
    afterSuccess: 78,
    beforeRating: 3.9,
    afterRating: 4.2,
    impact: 'positive',
    changePercent: 16,
    beforeEscalationRate: 28,
    afterEscalationRate: 19,
    escalationImpact: -9,
    automationRateIncrease: 8,
    queriesResolved: 85
  }
];

export const chartData = articlePerformanceData.map(article => ({
  name: article.title.length > 20 ? article.title.substring(0, 17) + '...' : article.title,
  fullName: article.title,
  daysAgo: article.daysAgo,
  beforeSuccess: article.beforeSuccess || 0,
  afterSuccess: article.afterSuccess,
  successChange: article.afterSuccess - (article.beforeSuccess || 0),
  beforeViews: article.beforeViews || 0,
  afterViews: article.afterViews,
  viewsChange: article.afterViews - (article.beforeViews || 0),
  type: article.type,
  impact: article.impact,
  changePercent: article.changePercent,
  beforeEscalationRate: article.beforeEscalationRate || 0,
  afterEscalationRate: article.afterEscalationRate || 0,
  escalationImpact: article.escalationImpact || 0,
  automationRateIncrease: article.automationRateIncrease || 0,
  queriesResolved: article.queriesResolved || 0
})).sort((a, b) => a.daysAgo - b.daysAgo);

export const timelineImpactData = [
  { day: 13, escalationRate: 18.5, automationRate: 78.2, articles: 1 },
  { day: 11, escalationRate: 17.8, automationRate: 81.5, articles: 2 },
  { day: 10, escalationRate: 17.1, automationRate: 82.1, articles: 2 },
  { day: 8, escalationRate: 16.2, automationRate: 83.8, articles: 3 },
  { day: 6, escalationRate: 14.8, automationRate: 85.1, articles: 4 },
  { day: 4, escalationRate: 13.9, automationRate: 86.2, articles: 5 },
  { day: 3, escalationRate: 12.5, automationRate: 88.4, articles: 6 },
  { day: 0, escalationRate: 12.5, automationRate: 88.4, articles: 7 }
];

export const mockResponses: Record<string, ConversationMessage> = {
  "escalation": {
    id: 100002,
    type: 'assistant',
    message: "I can see you're asking about escalation rates. Currently, your escalation rate is at 12.5%, which is down 2% from last week - that's good news! However, there's a concerning spike in billing-related escalations at 18.3%, representing 35% of all escalations this week.",
    timestamp: new Date().toLocaleTimeString(),
    data: {
      metrics: [
        { label: 'Overall Escalation Rate', value: '12.5%', change: '-2%' },
        { label: 'Billing Escalation Rate', value: '18.3%', change: '+3.2%' },
        { label: 'Billing Share of Escalations', value: '35%', change: '+12%' }
      ]
    },
    suggestedQuestions: [
      "What specific billing issues cause the most escalations?",
      "How can we reduce billing escalation response time?",
      "What's the historical trend for billing escalations?",
      "Which team members handle billing escalations best?"
    ]
  }
};

export const knowledgeGaps: KnowledgeGap[] = [
  {
    id: 1,
    topic: 'Mobile App Login Issues',
    queries: 43,
    trend: 'up',
    urgency: 'high'
  }
];

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Update Billing Articles to reduce escalations'
  }
];

export const memoryFolders: MemoryFolder[] = [
  {
    id: 1,
    name: 'my 1st project',
    description: 'Your first project - start organizing your analytics here',
    icon: <Folder className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Feb 10, 2026',
    lastEditedDate: 'Feb 10, 2026',
    views: 0,
    insights: []
  },
  {
    id: 2,
    name: 'Q4 Performance Analysis',
    description: 'Quarterly performance metrics and team analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 15, 2026',
    lastEditedDate: 'Feb 18, 2026',
    views: 23,
    insights: []
  },
  {
    id: 3,
    name: 'Resolution Time Monitoring',
    description: 'Weekly resolution time tracking and SLA compliance',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 5, 2026',
    lastEditedDate: 'Feb 19, 2026',
    views: 45,
    insights: []
  },
  {
    id: 4,
    name: 'Knowledge Base Health',
    description: 'Article performance and content gap analysis',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 20, 2025',
    lastEditedDate: 'Feb 17, 2026',
    views: 34,
    insights: []
  },
  {
    id: 5,
    name: 'Customer Satisfaction Trends',
    description: 'CSAT scores and feedback analysis',
    icon: <Smile className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 10, 2026',
    lastEditedDate: 'Feb 16, 2026',
    views: 28,
    insights: []
  },
  {
    id: 6,
    name: 'AI CoPilot Impact Study',
    description: 'Analysis of CoPilot adoption and effectiveness',
    icon: <Brain className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 1, 2025',
    lastEditedDate: 'Feb 15, 2026',
    views: 67,
    insights: []
  },
  {
    id: 7,
    name: 'Team Productivity Dashboard',
    description: 'Agent performance and workload distribution',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Nov 28, 2025',
    lastEditedDate: 'Feb 14, 2026',
    views: 52,
    insights: []
  },
  {
    id: 8,
    name: 'Escalation Tracking',
    description: 'Escalation patterns and root cause analysis',
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 3, 2026',
    lastEditedDate: 'Feb 13, 2026',
    views: 41,
    insights: []
  },
  {
    id: 9,
    name: 'Real-time Data Monitoring',
    description: 'Live metrics and alert tracking',
    icon: <Monitor className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 8, 2026',
    lastEditedDate: 'Feb 19, 2026',
    views: 89,
    insights: []
  },
  {
    id: 10,
    name: 'Weekly Operations Summary',
    description: 'Comprehensive weekly reporting and insights',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 15, 2025',
    lastEditedDate: 'Feb 12, 2026',
    views: 36,
    insights: []
  }
];

export const focusAreas: FocusArea[] = [
  {
    id: 1,
    alert: 'Billing escalation rate is 18.3%',
    details: 'Up 3.2% from last week',
    suggestedAction: 'Review top billing articles and FAQ content',
    type: 'critical',
    category: 'alerts',
    icon: <AlertTriangle className="w-4 h-4" />
  }
];

export const defaultSuggestedQuestions = [
  "What's our current escalation rate?",
  "How has AI resolution improved?",
  "Which articles need updates?",
  "What are the top knowledge gaps?"
];