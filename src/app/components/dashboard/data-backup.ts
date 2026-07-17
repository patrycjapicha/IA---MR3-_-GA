import { AlertTriangle, Users, Clock, Target, Lightbulb, CheckSquare, FileText, HelpCircle, TrendingUp, Brain, Zap, PieChart, BarChart, BarChart3, LineChart as LineChartIcon, Bot, TrendingDown, Database, Layout, Search, Table, Shield, DollarSign } from '@/components/icons/flora';
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

export const memoryFolders: MemoryFolder[] = [
  {
    id: 1,
    name: 'Real-time Monitoring',
    description: 'Live system performance and operational metrics',
    icon: <Shield className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    insights: [
      {
        id: 1,
        title: 'Executive KPI Dashboard',
        summary: 'High-level performance metrics for leadership team with quarterly trends and strategic insights',
        date: '1 week ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Analytics Team'
      },
      {
        id: 2,
        title: 'Real-time Operations Monitor',
        summary: 'Live monitoring dashboard for support operations with real-time alerts and team performance metrics',
        date: '3 days ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Operations Team'
      },
      {
        id: 3,
        title: 'Customer Experience Analytics',
        summary: 'Customer journey analysis dashboard with satisfaction tracking and behavioral insights',
        date: '5 days ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'UX Research Team'
      },
      {
        id: 201,
        title: 'Live Operations Dataset',
        summary: 'Real-time operational data including agent metrics, queue volumes, and response times',
        date: '1 week ago',
        type: 'dataset',
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Operations Team'
      }
    ]
  },
  {
    id: 2,
    name: 'Knowledge & Content',
    description: 'Content performance and knowledge base analytics',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    insights: [
      {
        id: 4,
        title: 'Content Performance Dashboard',
        summary: 'Interactive dashboard analyzing article performance, user engagement, and knowledge gaps',
        date: '2 days ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Data Analytics Team'
      },
      {
        id: 5,
        title: 'Knowledge Base Analytics Report',
        summary: 'Comprehensive monthly report analyzing content effectiveness and user satisfaction trends',
        date: '4 days ago',
        type: 'report',
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Mobile Team'
      },
      {
        id: 6,
        title: 'Content Gap Analysis Dashboard',
        summary: 'Interactive dashboard tracking knowledge gaps and their business impact on customer success',
        date: '1 week ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Content Strategy Team'
      },
      {
        id: 202,
        title: 'Article Performance Dataset',
        summary: 'Historical data on all knowledge base articles including views, ratings, and effectiveness metrics',
        date: '3 days ago',
        type: 'dataset',
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Content Analytics Team'
      }
    ]
  },
  {
    id: 3,
    name: 'QA & Quality',
    description: 'Quality assurance metrics and analysis reports',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    insights: [
      {
        id: 7,
        title: 'Quality Assurance Dashboard',
        summary: 'Real-time QA metrics dashboard tracking support quality, agent performance, and customer feedback',
        date: '3 days ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Data Engineering Team'
      },
      {
        id: 8,
        title: 'Quality Trends Report',
        summary: 'Weekly quality analysis report showing performance trends, improvement areas, and recommendations',
        date: '5 days ago',
        type: 'report',
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Content Analytics Team'
      },
      {
        id: 9,
        title: 'QA Compliance Dashboard',
        summary: 'Compliance tracking dashboard showing audit results, policy adherence, and risk assessments',
        date: '1 week ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'AI/ML Team'
      },
      {
        id: 203,
        title: 'Support Interactions Dataset',
        summary: 'Comprehensive dataset of all customer support interactions with enriched metadata and classifications',
        date: '2 weeks ago',
        type: 'dataset',
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Data Engineering Team'
      }
    ]
  },
  {
    id: 4,
    name: 'Strategy & ROI',
    description: 'Strategic insights and return on investment analysis',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    insights: [
      {
        id: 10,
        title: 'ROI Analysis Dashboard',
        summary: 'Strategic return on investment dashboard showing business impact and financial metrics',
        date: '1 week ago',
        type: 'dashboard',
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Strategy Team'
      },
      {
        id: 11,
        title: 'Strategic Insights Report',
        summary: 'Monthly strategic analysis report with actionable business insights and recommendations',
        date: '3 days ago',
        type: 'report',
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Business Intelligence Team'
      },
      {
        id: 204,
        title: 'Business Metrics Dataset',
        summary: 'Complete business intelligence dataset with financial and operational performance data',
        date: '5 days ago',
        type: 'dataset',
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        createdBy: 'Finance Team'
      }
    ]
  }
];