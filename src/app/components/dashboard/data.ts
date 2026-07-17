import { AlertTriangle, Users, Clock, Target, Lightbulb, CheckSquare, FileText, HelpCircle, TrendingUp, Brain, Zap, PieChart, BarChart, BarChart3, LineChart as LineChartIcon, Bot, TrendingDown, Database, Layout, Search, Table, Shield, DollarSign, MessageCircle, BookOpen } from '@/components/icons/flora';
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
  },
  {
    id: 3,
    title: 'Billing FAQ Update',
    type: 'edited',
    date: '2024-01-12',
    daysAgo: 6,
    beforeViews: 567,
    afterViews: 892,
    beforeSuccess: 72,
    afterSuccess: 84,
    beforeRating: 4.1,
    afterRating: 4.5,
    impact: 'positive',
    changePercent: 17,
    beforeEscalationRate: 35,
    afterEscalationRate: 22,
    escalationImpact: -13,
    automationRateIncrease: 15,
    queriesResolved: 123
  },
  {
    id: 4,
    title: 'API Integration Guide',
    type: 'created',
    date: '2024-01-10',
    daysAgo: 8,
    afterViews: 234,
    afterSuccess: 76,
    afterRating: 4.3,
    impact: 'positive',
    changePercent: 76,
    automationRateIncrease: 18,
    queriesResolved: 45,
    afterEscalationRate: 15
  },
  {
    id: 5,
    title: 'Account Settings Tutorial',
    type: 'edited',
    date: '2024-01-08',
    daysAgo: 10,
    beforeViews: 445,
    afterViews: 398,
    beforeSuccess: 81,
    afterSuccess: 73,
    beforeRating: 4.4,
    afterRating: 4.0,
    impact: 'negative',
    changePercent: -10,
    beforeEscalationRate: 18,
    afterEscalationRate: 23,
    escalationImpact: 5,
    automationRateIncrease: -3,
    queriesResolved: -12
  },
  {
    id: 6,
    title: 'Two-Factor Authentication Setup',
    type: 'created',
    date: '2024-01-07',
    daysAgo: 11,
    afterViews: 678,
    afterSuccess: 82,
    afterRating: 4.6,
    impact: 'positive',
    changePercent: 82,
    automationRateIncrease: 28,
    queriesResolved: 87,
    afterEscalationRate: 8
  },
  {
    id: 7,
    title: 'Subscription Management',
    type: 'edited',
    date: '2024-01-05',
    daysAgo: 13,
    beforeViews: 623,
    afterViews: 751,
    beforeSuccess: 69,
    afterSuccess: 79,
    beforeRating: 3.8,
    afterRating: 4.3,
    impact: 'positive',
    changePercent: 14,
    beforeEscalationRate: 42,
    afterEscalationRate: 31,
    escalationImpact: -11,
    automationRateIncrease: 12,
    queriesResolved: 67
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
  "3 months summary": {
    id: 100001,
    type: 'assistant',
    message: "I'll generate a comprehensive 3-month knowledge base performance summary for you. This executive report will include quarterly trends, category analysis, top-performing content, AI impact metrics, and strategic recommendations perfect for stakeholder presentations.",
    timestamp: new Date().toLocaleTimeString(),
    isReportGeneration: true,
    data: {
      metrics: [
        { label: 'Escalation Rate Change', value: '-4.2%', change: '16.7% → 12.5%' },
        { label: 'Automation Rate Improvement', value: '+15.3%', change: '73.1% → 88.4%' },
        { label: 'Customer Satisfaction', value: '+23.5%', change: '3.4 → 4.2/5' },
        { label: 'Articles Created/Updated', value: '245', change: '89 new, 156 updated' }
      ],
      insights: [
        'Significant improvement across all key performance indicators',
        'Billing category showed largest escalation reduction (-5.2%)',
        'Mobile login troubleshooting article drove 34% automation increase',
        'AI model updates contributed to 15.3% automation improvement'
      ],
      actions: [
        'Generate comprehensive stakeholder report',
        'Include quarterly trend analysis',
        'Provide strategic recommendations for next quarter'
      ]
    },
    suggestedQuestions: [
      "Generate the full stakeholder report",
      "What were the biggest wins this quarter?",
      "Which categories need the most attention?",
      "What should our Q1 priorities be?"
    ]
  },
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
      ],
      insights: [
        'Peak escalation times are Monday mornings and end of month',
        'Most common billing issues: payment processing, refund requests, subscription changes',
        'Customer satisfaction is down 8% due to this spike'
      ],
      actions: [
        'Schedule billing article review meeting this week',
        'Analyze top 10 escalated billing queries',
        'Create FAQ for most common payment issues'
      ],
      chartType: 'pie',
      chartData: [
        { name: 'Billing', value: 35, color: '#444444' },
        { name: 'Technical', value: 28, color: '#666666' },
        { name: 'Account', value: 22, color: '#888888' },
        { name: 'Other', value: 15, color: '#bbbbbb' }
      ]
    },
    suggestedQuestions: [
      "What specific billing issues cause the most escalations?",
      "How can we reduce billing escalation response time?",
      "What's the historical trend for billing escalations?",
      "Which team members handle billing escalations best?"
    ]
  },
  "mobile": {
    id: 100003,
    type: 'assistant',
    message: "Mobile app login issues are definitely a hot topic right now. I'm seeing a 40% increase in unanswered queries about mobile login, with 156 total queries. This represents 23% of all mobile-related issues, and the escalation rate for these queries is 45%.",
    timestamp: new Date().toLocaleTimeString(),
    data: {
      metrics: [
        { label: 'Unanswered Mobile Login Queries', value: '156', change: '+40%' },
        { label: 'Mobile Login Issue Share', value: '23%', change: '+8%' },
        { label: 'Escalation Rate', value: '45%', change: '+12%' }
      ],
      insights: [
        'No comprehensive article exists for mobile login troubleshooting',
        'Common issues include two-factor authentication, social login, and biometric login',
        'Users often escalate after failed self-service attempts'
      ],
      actions: [
        'Create comprehensive mobile login troubleshooting guide',
        'Include 2FA setup and troubleshooting steps',
        'Add video tutorials for common scenarios'
      ]
    },
    suggestedQuestions: [
      "Which mobile platforms have the most login issues?",
      "What's the success rate of mobile self-service attempts?",
      "How do mobile login issues compare to web login issues?",
      "What authentication methods work best on mobile?"
    ]
  },
  "ai performance": {
    id: 100004,
    type: 'assistant',
    message: "Great question about AI performance! The recent model updates have been quite successful. Your AI resolution rate has increased to 84.2%, up 12% from before the update. Response times have also improved by 25%, now averaging just 1.8 seconds.",
    timestamp: new Date().toLocaleTimeString(),
    data: {
      metrics: [
        { label: 'AI Resolution Rate', value: '84.2%', change: '+12%' },
        { label: 'Average Response Time', value: '1.8s', change: '-25%' },
        { label: 'User Satisfaction', value: '4.6/5', change: '+18%' }
      ],
      insights: [
        'Improved accuracy particularly in technical queries and billing questions',
        'User satisfaction with AI responses is up 18%',
        'Reduced escalations and improved overall customer experience'
      ],
      actions: [
        'Expand AI training data for more categories',
        'Test AI on complex troubleshooting scenarios',
        'Gather feedback for continuous improvement'
      ],
      chartType: 'line',
      chartData: [
        { month: 'Oct', rate: 72, satisfaction: 3.8 },
        { month: 'Nov', rate: 76, satisfaction: 4.1 },
        { month: 'Dec', rate: 79, satisfaction: 4.3 },
        { month: 'Jan', rate: 84.2, satisfaction: 4.6 }
      ]
    },
    suggestedQuestions: [
      "Which query types see the highest AI resolution rates?",
      "How does AI performance vary by time of day?",
      "What's the ROI of the recent AI improvements?",
      "How can we optimize AI for specific customer segments?"
    ]
  },
  "knowledge gaps": {
    id: 100005,
    type: 'assistant',
    message: "Looking at your knowledge gaps, I see several areas that need attention. The top gap is Mobile App Login Issues with 43 queries (trending up), followed by Two-Factor Authentication Setup with 28 queries. Both are marked as high urgency.",
    timestamp: new Date().toLocaleTimeString(),
    data: {
      metrics: [
        { label: 'Mobile App Login Issues', value: '43 queries', change: 'trending up' },
        { label: 'Two-Factor Authentication', value: '28 queries', change: 'trending up' },
        { label: 'Billing Cycle Questions', value: '19 queries', change: 'stable' }
      ],
      insights: [
        'Mobile and authentication issues are becoming more prominent',
        'Users are struggling with new security features',
        'These gaps are directly impacting escalation rates'
      ],
      actions: [
        'Prioritize mobile login troubleshooting content',
        'Create step-by-step 2FA setup guides',
        'Consider video tutorials for complex processes'
      ],
      chartType: 'bar',
      chartData: [
        { day: 'Mobile Login', escalations: 43 },
        { day: '2FA Setup', escalations: 28 },
        { day: 'Billing Cycles', escalations: 19 },
        { day: 'Account Suspension', escalations: 16 },
        { day: 'API Limits', escalations: 12 }
      ]
    },
    suggestedQuestions: [
      "How quickly are knowledge gaps being filled?",
      "Which gaps have the highest business impact?",
      "What's the process for prioritizing new content creation?",
      "How do we identify knowledge gaps before they spike?"
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
  },
  {
    id: 2,
    topic: 'Two-Factor Authentication Setup',
    queries: 28,
    trend: 'up',
    urgency: 'high'
  },
  {
    id: 3,
    topic: 'Billing Cycle Questions',
    queries: 19,
    trend: 'stable',
    urgency: 'medium'
  },
  {
    id: 4,
    topic: 'Account Suspension Process',
    queries: 16,
    trend: 'up',
    urgency: 'medium'
  },
  {
    id: 5,
    topic: 'API Rate Limits',
    queries: 12,
    trend: 'down',
    urgency: 'low'
  }
];

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Update Billing Articles to reduce escalations'
  },
  {
    id: 2,
    title: 'Rewrite "Resetting Password" article based on negative feedback'
  },
  {
    id: 3,
    title: 'Create new article on "Mobile App login" issues'
  },
  {
    id: 4,
    title: 'Audit articles older than 6 months with >100 views'
  },
  {
    id: 5,
    title: 'Collaborate with support agents to gather missing content requests'
  }
];

export const memoryFolders: MemoryFolder[] = [
  {
    id: 1,
    name: 'Support Tickets',
    description: 'Ticket management and workflow analytics',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 15, 2024',
    lastEditedDate: 'Jan 18, 2025',
    views: 342,
    insights: [
      {
        id: 1,
        title: 'Ticket Volume Dashboard',
        summary: 'Real-time ticket volume tracking with priority distribution and status analytics',
        date: '1 day ago',
        type: 'dashboard',
        chartType: 'line',
        chartData: [
          { day: 'Mon', tickets: 521, priority: 'High', resolved: 467 },
          { day: 'Tue', tickets: 448, priority: 'Medium', resolved: 423 },
          { day: 'Wed', tickets: 412, priority: 'Low', resolved: 398 },
          { day: 'Thu', tickets: 389, priority: 'High', resolved: 356 },
          { day: 'Fri', tickets: 467, priority: 'Medium', resolved: 445 },
          { day: 'Sat', tickets: 301, priority: 'Low', resolved: 289 },
          { day: 'Sun', tickets: 353, priority: 'Medium', resolved: 334 }
        ],
        icon: <BarChart className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive ticket volume analysis showing daily patterns, priority distribution, and resolution rates across all support channels.',
        tags: ['tickets', 'volume', 'priority', 'resolution', 'realtime'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 15, 2024',
        lastEditedDate: 'Jan 18, 2025',
        views: 234,
        comments: [
          {
            id: 1,
            author: 'Noah',
            content: 'The weekend volume patterns help us optimize staffing schedules.',
            timestamp: '2 days ago'
          }
        ]
      },
      {
        id: 2,
        title: 'Ticket Lifecycle Analysis',
        summary: 'End-to-end ticket journey analysis with bottleneck identification and resolution optimization',
        date: '3 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'Avg Resolution Time', value: '4.2h', change: '-8%' },
          { label: 'First Touch Resolution', value: '67%', change: '+12%' },
          { label: 'Escalation Rate', value: '8.3%', change: '-15%' }
        ],
        icon: <Target className="w-4 h-4 text-muted-foreground" />,
        description: 'Detailed analysis of ticket lifecycle from creation to resolution, identifying process bottlenecks and optimization opportunities.',
        tags: ['lifecycle', 'resolution', 'bottlenecks', 'optimization'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 20, 2024',
        lastEditedDate: 'Jan 16, 2025',
        views: 189,
        comments: []
      },
      {
        id: 3,
        title: 'Priority Classification Report',
        summary: 'Ticket priority accuracy analysis and classification improvement recommendations',
        date: '5 days ago',
        type: 'report',
        chartType: 'pie',
        chartData: [
          { priority: 'Critical', count: 156, accuracy: 94 },
          { priority: 'High', count: 423, accuracy: 87 },
          { priority: 'Medium', count: 1247, accuracy: 92 },
          { priority: 'Low', count: 834, accuracy: 89 }
        ],
        icon: <AlertTriangle className="w-4 h-4 text-muted-foreground" />,
        description: 'Analysis of ticket priority classification accuracy and recommendations for improving automated priority assignment.',
        tags: ['priority', 'classification', 'accuracy', 'automation'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 18, 2024',
        lastEditedDate: 'Jan 14, 2025',
        views: 167,
        comments: []
      },
      {
        id: 4,
        title: 'Channel Performance Comparison',
        summary: 'Multi-channel ticket analysis comparing email, chat, phone, and web form effectiveness',
        date: '1 week ago',
        type: 'dashboard',
        chartType: 'bar',
        chartData: [
          { channel: 'Email', volume: 45, satisfaction: 4.2, resolution: 87 },
          { channel: 'Live Chat', volume: 35, satisfaction: 4.6, resolution: 92 },
          { channel: 'Phone', volume: 15, satisfaction: 4.1, resolution: 89 },
          { channel: 'Web Form', volume: 5, satisfaction: 3.9, resolution: 85 }
        ],
        icon: <MessageCircle className="w-4 h-4 text-muted-foreground" />,
        description: 'Comparative analysis of support channels including volume distribution, satisfaction scores, and resolution effectiveness.',
        tags: ['channels', 'comparison', 'satisfaction', 'effectiveness'],
        createdBy: 'Zendesk',
        createdDate: 'Jan 10, 2025',
        lastEditedDate: 'Jan 17, 2025',
        views: 145,
        comments: []
      }
    ]
  },
  {
    id: 2,
    name: 'Agent Productivity',
    description: 'Agent performance tracking and productivity analytics',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 10, 2024',
    lastEditedDate: 'Jan 17, 2025',
    views: 298,
    insights: [
      {
        id: 5,
        title: 'Agent Performance Dashboard',
        summary: 'Real-time agent performance monitoring with individual and team metrics',
        date: '1 day ago',
        type: 'dashboard',
        chartType: 'bar',
        chartData: [
          { agent: 'Sarah C.', tickets: 34, satisfaction: 4.8, resolution: 3.2 },
          { agent: 'Mike R.', tickets: 28, satisfaction: 4.6, resolution: 4.1 },
          { agent: 'Emma J.', tickets: 31, satisfaction: 4.7, resolution: 3.8 },
          { agent: 'David K.', tickets: 26, satisfaction: 4.5, resolution: 4.3 }
        ],
        icon: <BarChart className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive agent performance dashboard tracking tickets handled, customer satisfaction scores, and average resolution times.',
        tags: ['agents', 'performance', 'satisfaction', 'resolution', 'realtime'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 12, 2024',
        lastEditedDate: 'Jan 17, 2025',
        views: 189,
        comments: [
          {
            id: 1,
            author: 'Team Manager',
            content: 'Great visibility into individual performance trends. Sarah consistently delivers excellent results.',
            timestamp: '6 hours ago'
          }
        ]
      },
      {
        id: 6,
        title: 'Workload Distribution Analysis',
        summary: 'Agent workload balance analysis with capacity planning recommendations',
        date: '3 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'Active Agents', value: '47', change: '+3' },
          { label: 'Avg Tickets/Agent', value: '23', change: '-5%' },
          { label: 'Utilization Rate', value: '78%', change: '+8%' }
        ],
        icon: <Users className="w-4 h-4 text-muted-foreground" />,
        description: 'Analysis of ticket distribution across agents with workload balance insights and capacity optimization recommendations.',
        tags: ['workload', 'distribution', 'capacity', 'optimization'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 14, 2024',
        lastEditedDate: 'Jan 15, 2025',
        views: 156,
        comments: []
      },
      {
        id: 7,
        title: 'Agent Training Impact Report',
        summary: 'Training program effectiveness analysis with skill development tracking',
        date: '5 days ago',
        type: 'report',
        chartType: 'line',
        chartData: [
          { week: 'W1', preTraining: 3.8, postTraining: 4.2 },
          { week: 'W2', preTraining: 4.0, postTraining: 4.4 },
          { week: 'W3', preTraining: 4.1, postTraining: 4.6 },
          { week: 'W4', preTraining: 4.2, postTraining: 4.7 }
        ],
        icon: <TrendingUp className="w-4 h-4 text-muted-foreground" />,
        description: 'Impact assessment of agent training programs on performance metrics including satisfaction scores and resolution efficiency.',
        tags: ['training', 'development', 'impact', 'skills'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 8, 2024',
        lastEditedDate: 'Jan 12, 2025',
        views: 134,
        comments: []
      },
      {
        id: 8,
        title: 'Response Time Analysis',
        summary: 'Agent response time tracking with SLA compliance and improvement insights',
        date: '1 week ago',
        type: 'dashboard',
        metrics: [
          { label: 'Avg First Response', value: '12m', change: '-18%' },
          { label: 'SLA Compliance', value: '94.2%', change: '+3%' },
          { label: 'Peak Response Time', value: '8m', change: '-22%' }
        ],
        icon: <Clock className="w-4 h-4 text-muted-foreground" />,
        description: 'Detailed analysis of agent response times across different channels with SLA compliance tracking and performance optimization.',
        tags: ['response-time', 'sla', 'compliance', 'performance', 'realtime'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 11, 2024',
        lastEditedDate: 'Jan 13, 2025',
        views: 178,
        comments: []
      }
    ]
  },
  {
    id: 3,
    name: 'AI Agent Performance',
    description: 'Knowledge base analytics and content performance',
    icon: <Brain className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 8, 2024',
    lastEditedDate: 'Jan 16, 2025',
    views: 267,
    insights: [
      {
        id: 9,
        title: 'Article Performance Dashboard',
        summary: 'Knowledge base article analytics with usage patterns and effectiveness metrics',
        date: '2 days ago',
        type: 'dashboard',
        chartType: 'area',
        chartData: [
          { week: 'W1', views: 15623, helpfulness: 4.1, deflection: 67 },
          { week: 'W2', views: 16789, helpfulness: 4.2, deflection: 71 },
          { week: 'W3', views: 17234, helpfulness: 4.3, deflection: 73 },
          { week: 'W4', views: 18456, helpfulness: 4.4, deflection: 75 }
        ],
        icon: <FileText className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive analysis of knowledge base article performance including view counts, helpfulness ratings, and ticket deflection rates.',
        tags: ['articles', 'performance', 'deflection', 'helpfulness'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 16, 2024',
        lastEditedDate: 'Jan 16, 2025',
        views: 234,
        comments: [
          {
            id: 1,
            author: 'Content Manager',
            content: 'The deflection rate improvement shows our content strategy is working well.',
            timestamp: '1 day ago'
          }
        ]
      },
      {
        id: 10,
        title: 'Content Gap Analysis',
        summary: 'Knowledge gaps identification with content creation prioritization',
        date: '4 days ago',
        type: 'dashboard',
        chartType: 'pie',
        chartData: [
          { category: 'Mobile Issues', queries: 43, impact: 'High' },
          { category: 'Authentication', queries: 28, impact: 'High' },
          { category: 'Billing Cycles', queries: 19, impact: 'Medium' },
          { category: 'API Limits', queries: 12, impact: 'Low' }
        ],
        icon: <Target className="w-4 h-4 text-muted-foreground" />,
        description: 'Strategic analysis identifying knowledge gaps based on unanswered queries and their business impact on support operations.',
        tags: ['gaps', 'content', 'prioritization', 'impact'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 9, 2024',
        lastEditedDate: 'Jan 14, 2025',
        views: 178,
        comments: []
      },
      {
        id: 11,
        title: 'Search Analytics Report',
        summary: 'Knowledge base search behavior analysis with query optimization insights',
        date: '1 week ago',
        type: 'report',
        chartType: 'line',
        chartData: [
          { week: 'W1', searches: 8945, success: 67, noResults: 892 },
          { week: 'W2', searches: 9234, success: 71, noResults: 834 },
          { week: 'W3', searches: 8756, success: 73, noResults: 756 },
          { week: 'W4', searches: 9012, success: 75, noResults: 723 }
        ],
        icon: <Search className="w-4 h-4 text-muted-foreground" />,
        description: 'Analysis of user search patterns including query success rates, common search terms, and content discoverability optimization.',
        tags: ['search', 'queries', 'optimization', 'discoverability'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 18, 2024',
        lastEditedDate: 'Jan 12, 2025',
        views: 156,
        comments: []
      },
      {
        id: 12,
        title: 'Content Freshness Audit',
        summary: 'Knowledge base content lifecycle tracking with update recommendations',
        date: '3 days ago',
        type: 'report',
        metrics: [
          { label: 'Articles Reviewed', value: '1,247', change: '+23%' },
          { label: 'Outdated Content', value: '8.3%', change: '-12%' },
          { label: 'Update Frequency', value: '89%', change: '+15%' }
        ],
        icon: <Clock className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive audit of content freshness with identification of outdated articles and recommendations for content maintenance.',
        tags: ['content', 'freshness', 'maintenance', 'lifecycle'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 5, 2024',
        lastEditedDate: 'Jan 13, 2025',
        views: 145,
        comments: []
      }
    ]
  },
  {
    id: 4,
    name: 'AI Agent performance',
    description: 'AI-powered support analytics and automation insights',
    icon: <Bot className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 5, 2024',
    lastEditedDate: 'Jan 15, 2025',
    views: 289,
    insights: [
      {
        id: 13,
        title: 'AI Resolution Dashboard',
        summary: 'AI agent performance tracking with resolution rates and accuracy metrics',
        date: '1 day ago',
        type: 'dashboard',
        chartType: 'line',
        chartData: [
          { month: 'Oct', resolution: 72, accuracy: 85, satisfaction: 3.8 },
          { month: 'Nov', resolution: 76, accuracy: 87, satisfaction: 4.1 },
          { month: 'Dec', resolution: 79, accuracy: 89, satisfaction: 4.3 },
          { month: 'Jan', resolution: 84.2, accuracy: 92, satisfaction: 4.6 }
        ],
        icon: <Bot className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive AI agent performance metrics including resolution rates, accuracy scores, and customer satisfaction trends.',
        tags: ['ai', 'resolution', 'accuracy', 'satisfaction', 'realtime'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 11, 2024',
        lastEditedDate: 'Jan 15, 2025',
        views: 178,
        comments: [
          {
            id: 1,
            author: 'AI Team Lead',
            content: 'Excellent progress on resolution rates. The January improvements are particularly impressive.',
            timestamp: '4 hours ago'
          }
        ]
      },
      {
        id: 14,
        title: 'Automation Impact Analysis',
        summary: 'AI automation effectiveness with cost savings and efficiency improvements',
        date: '3 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'Tickets Automated', value: '67.3%', change: '+12%' },
          { label: 'Cost Savings', value: '$124K', change: '+23%' },
          { label: 'Efficiency Gain', value: '34%', change: '+8%' }
        ],
        icon: <Zap className="w-4 h-4 text-muted-foreground" />,
        description: 'Analysis of AI automation impact including ticket deflection, cost savings, and operational efficiency improvements.',
        tags: ['automation', 'efficiency', 'cost-savings', 'deflection'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 6, 2024',
        lastEditedDate: 'Jan 13, 2025',
        views: 134,
        comments: []
      },
      {
        id: 15,
        title: 'AI Learning Progress Report',
        summary: 'Machine learning model performance tracking with training effectiveness analysis',
        date: '5 days ago',
        type: 'report',
        chartType: 'area',
        chartData: [
          { week: 'W1', accuracy: 87, confidence: 82, training: 1247 },
          { week: 'W2', accuracy: 89, confidence: 84, training: 1356 },
          { week: 'W3', accuracy: 91, confidence: 86, training: 1423 },
          { week: 'W4', accuracy: 92, confidence: 88, training: 1298 }
        ],
        icon: <Brain className="w-4 h-4 text-muted-foreground" />,
        description: 'Machine learning model progress tracking including accuracy improvements, confidence scores, and training data effectiveness.',
        tags: ['machine-learning', 'training', 'accuracy', 'confidence', 'realtime'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 3, 2024',
        lastEditedDate: 'Jan 11, 2025',
        views: 245,
        comments: []
      },
      {
        id: 16,
        title: 'AI-Human Handoff Analysis',
        summary: 'AI to human agent handoff patterns with optimization recommendations',
        date: '1 week ago',
        type: 'dashboard',
        chartType: 'bar',
        chartData: [
          { category: 'Complex Technical', handoffs: 156, success: 78, reason: 'Complexity' },
          { category: 'Emotional Support', handoffs: 89, success: 94, reason: 'Empathy' },
          { category: 'Account Changes', handoffs: 67, success: 85, reason: 'Authorization' },
          { category: 'Billing Disputes', handoffs: 45, success: 82, reason: 'Policy' }
        ],
        icon: <Users className="w-4 h-4 text-muted-foreground" />,
        description: 'Analysis of AI to human agent handoff patterns including triggers, success rates, and optimization opportunities.',
        tags: ['handoff', 'escalation', 'optimization', 'collaboration'],
        createdBy: 'Zendesk',
        createdDate: 'Dec 7, 2024',
        lastEditedDate: 'Jan 10, 2025',
        views: 167,
        comments: []
      }
    ]
  },
  {
    id: 4,
    name: 'Strategy & ROI',
    description: 'Strategic insights and return on investment analysis',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Nov 28, 2024',
    lastEditedDate: 'Jan 12, 2025',
    views: 156,
    insights: [
      {
        id: 10,
        title: 'Operations Dataset',
        summary: 'Real-time operational data including agent metrics, queue volumes, and response times',
        date: '1 week ago',
        type: 'dataset',
        metrics: [
          { label: 'Records', value: '125K+', change: '+8%' },
          { label: 'Real-time Updates', value: 'Every 30s', change: 'Active' },
          { label: 'Data Quality', value: '98.5%', change: '+1.2%' }
        ],
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive real-time dataset containing all operational metrics including agent performance, queue management, and customer interaction data.',
        tags: ['real-time', 'operations', 'agents', 'metrics'],
        createdBy: 'Operations Team',
        createdDate: 'Nov 28, 2024',
        lastEditedDate: 'Jan 12, 2025',
        views: 89,
        comments: []
      }
    ]
  },
  {
    id: 5,
    name: 'Knowledge & Content',
    description: 'Content performance and knowledge base analytics',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 5, 2024',
    lastEditedDate: 'Jan 16, 2025',
    views: 223,
    insights: [
      {
        id: 4,
        title: 'Content Performance Dashboard',
        summary: 'Interactive dashboard analyzing article performance, user engagement, and knowledge gaps',
        date: '2 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'Billing Escalations', value: '18.3%', change: '+3.2%' },
          { label: 'Weekend Spike', value: '45%', change: '+12%' },
          { label: 'Payment Issues', value: '67%', change: '+8%' }
        ],
        icon: <AlertTriangle className="w-4 h-4 text-muted-foreground" />,
        description: 'Advanced analytical query investigating billing escalation root causes, including temporal patterns, payment method correlations, and customer segment analysis.',
        tags: ['billing', 'escalations', 'deep-dive', 'analysis'],
        createdBy: 'Data Analytics Team',
        createdDate: 'Dec 8, 2024',
        lastEditedDate: 'Jan 16, 2025',
        views: 167,
        comments: [
          {
            id: 1,
            author: 'Lisa Wang',
            content: 'This query revealed the weekend payment processing issue we didn\'t know existed. Critical finding!',
            timestamp: '4 hours ago'
          },
          {
            id: 2,
            author: 'David Kim',
            content: 'Can we set up an automated alert based on this query logic?',
            timestamp: '6 hours ago'
          }
        ]
      },
      {
        id: 5,
        title: 'Knowledge Base Analytics Report',
        summary: 'Comprehensive monthly report analyzing content effectiveness and user satisfaction trends',
        date: '4 days ago',
        type: 'report',
        chartType: 'bar',
        chartData: [
          { method: 'Biometric', success: 94, volume: 1247 },
          { method: '2FA SMS', success: 87, volume: 856 },
          { method: 'Social Login', success: 91, volume: 723 },
          { method: 'Password', success: 76, volume: 1534 }
        ],
        icon: <HelpCircle className="w-4 h-4 text-muted-foreground" />,
        description: 'Detailed query examining mobile authentication success rates by method, platform, and user demographics to optimize login experience.',
        tags: ['mobile', 'authentication', 'success-rates', 'optimization'],
        createdBy: 'Mobile Team',
        createdDate: 'Dec 12, 2024',
        lastEditedDate: 'Jan 14, 2025',
        views: 198,
        comments: [
          {
            id: 1,
            author: 'Alex Rodriguez',
            content: 'The biometric authentication data supports our push for increased adoption. Great validation.',
            timestamp: '2 days ago'
          }
        ]
      },
      {
        id: 6,
        title: 'Content Gap Analysis Dashboard',
        summary: 'Interactive dashboard tracking knowledge gaps and their business impact on customer success',
        date: '1 week ago',
        type: 'dashboard',
        chartType: 'pie',
        chartData: [
          { category: 'Mobile Issues', impact: 43, cost: 15400 },
          { category: 'Authentication', impact: 28, cost: 9800 },
          { category: 'Billing Cycles', impact: 19, cost: 6700 },
          { category: 'API Limits', impact: 12, cost: 4200 }
        ],
        icon: <Brain className="w-4 h-4 text-muted-foreground" />,
        description: 'Strategic query measuring the quantitative impact of knowledge gaps on business metrics including escalation costs and satisfaction scores.',
        tags: ['knowledge-gaps', 'impact', 'business-metrics', 'roi'],
        createdBy: 'Content Strategy Team',
        createdDate: 'Dec 6, 2024',
        lastEditedDate: 'Jan 13, 2025',
        views: 134,
        comments: [
          {
            id: 1,
            author: 'Maya Patel',
            content: 'The cost impact visualization really helps prioritize our content roadmap. Mobile issues are clearly the priority.',
            timestamp: '5 days ago'
          }
        ]
      },
      {
        id: 202,
        title: 'Article Performance Dataset',
        summary: 'Historical data on all knowledge base articles including views, ratings, and effectiveness metrics',
        date: '3 days ago',
        type: 'dataset',
        metrics: [
          { label: 'Total Articles', value: '1,247', change: '+23' },
          { label: 'Data Points', value: '845K+', change: '+15%' },
          { label: 'Update Frequency', value: 'Daily', change: 'Automated' }
        ],
        icon: <Database className=\"w-4 h-4 text-muted-foreground\" />,
        description: 'Complete dataset tracking all knowledge base article performance metrics including view counts, user ratings, effectiveness scores, and content optimization opportunities.',
        tags: ['articles', 'performance', 'analytics', 'content'],
        createdBy: 'Content Analytics Team',
        createdDate: 'Dec 3, 2024',
        lastEditedDate: 'Jan 15, 2025',
        views: 245,
        comments: []
      }
    ]
  },
  {
    id: 3,
    name: 'QA & Quality',
    description: 'Quality assurance metrics and analysis reports',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 1, 2024',
    lastEditedDate: 'Jan 14, 2025',
    views: 187,
    insights: [
      {
        id: 7,
        title: 'Quality Assurance Dashboard',
        summary: 'Real-time QA metrics dashboard tracking support quality, agent performance, and customer feedback',
        date: '3 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'Total Records', value: '247,583', change: '+12%' },
          { label: 'Data Quality Score', value: '94.2%', change: '+2.1%' },
          { label: 'Processing Time', value: '3.2s', change: '-18%' }
        ],
        icon: <Table className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive dataset containing all customer support interactions with enriched metadata including sentiment analysis, category classification, and resolution outcomes.',
        tags: ['interactions', 'customer-support', 'metadata', 'outcomes'],
        createdBy: 'Data Engineering Team',
        createdDate: 'Dec 2, 2024',
        lastEditedDate: 'Jan 14, 2025',
        views: 156,
        comments: [
          {
            id: 1,
            author: 'Carlos Rodriguez',
            content: 'The data quality improvements are paying off. Much cleaner analytics results now.',
            timestamp: '1 day ago'
          }
        ]
      },
      {
        id: 8,
        title: 'Quality Trends Report',
        summary: 'Weekly quality analysis report showing performance trends, improvement areas, and recommendations',
        date: '5 days ago',
        type: 'report',
        chartType: 'line',
        chartData: [
          { week: 'W1', articles: 1247, avgRating: 4.1, totalViews: 15623 },
          { week: 'W2', articles: 1256, avgRating: 4.2, totalViews: 16891 },
          { week: 'W3', articles: 1263, avgRating: 4.3, totalViews: 17234 },
          { week: 'W4', articles: 1271, avgRating: 4.4, totalViews: 18456 }
        ],
        icon: <FileText className="w-4 h-4 text-muted-foreground" />,
        description: 'Rich dataset tracking article performance metrics including view counts, user ratings, effectiveness scores, and content optimization opportunities.',
        tags: ['articles', 'performance', 'ratings', 'knowledge-base'],
        createdBy: 'Content Analytics Team',
        comments: [
          {
            id: 1,
            author: 'Emma Thompson',
            content: 'The trend shows consistent improvement in both quantity and quality. Great work by the content team.',
            timestamp: '2 days ago'
          }
        ]
      },
      {
        id: 9,
        title: 'QA Compliance Dashboard',
        summary: 'Compliance tracking dashboard showing audit results, policy adherence, and risk assessments',
        date: '1 week ago',
        type: 'dashboard',
        metrics: [
          { label: 'Training Examples', value: '89,456', change: '+23%' },
          { label: 'Accuracy Score', value: '94.7%', change: '+2.8%' },
          { label: 'Model Version', value: 'v3.2.1', change: 'Latest' }
        ],
        icon: <Brain className="w-4 h-4 text-muted-foreground" />,
        description: 'High-quality training dataset for AI models including labeled customer queries, responses, and outcome classifications for continuous model improvement.',
        tags: ['ai-training', 'machine-learning', 'model-data', 'accuracy'],
        createdBy: 'AI/ML Team',
        comments: [
          {
            id: 1,
            author: 'Jennifer Lee',
            content: 'The latest dataset improvements resulted in significant accuracy gains. Model v3.2.1 is performing exceptionally well.',
            timestamp: '4 days ago'
          }
        ]
      },
      {
        id: 203,
        title: 'Support Interactions Dataset',
        summary: 'Comprehensive dataset of all customer support interactions with enriched metadata and classifications',
        date: '2 weeks ago',
        type: 'dataset',
        metrics: [
          { label: 'Total Records', value: '247,583', change: '+12%' },
          { label: 'Data Quality Score', value: '94.2%', change: '+2.1%' },
          { label: 'Processing Time', value: '3.2s', change: '-18%' }
        ],
        icon: <Database className=\"w-4 h-4 text-muted-foreground\" />,
        description: 'Rich dataset containing all customer support interactions with sentiment analysis, category classification, resolution outcomes, and quality scores.',
        tags: ['interactions', 'customer-support', 'metadata', 'sentiment'],
        createdBy: 'Data Engineering Team',
        comments: []
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
        title: 'ROI Impact Dashboard',
        summary: 'Comprehensive ROI analysis showing 23% improvement in customer satisfaction metrics',
        date: '2 days ago',
        type: 'dashboard',
        metrics: [
          { label: 'ROI Improvement', value: '23%', change: '+15%' },
          { label: 'Cost Reduction', value: '$47k', change: '+12%' },
          { label: 'Efficiency Gain', value: '34%', change: '+8%' }
        ],
        icon: <Layout className="w-4 h-4 text-muted-foreground" />,
        description: 'Strategic ROI dashboard providing executive-level insights into investment returns and cost optimization across all business units.',
        tags: ['roi', 'strategy', 'executive', 'dashboard'],
        createdBy: 'Strategy Team',
        comments: [
          {
            id: 1,
            author: 'Noah',
            content: 'These ROI improvements are exactly what the board wants to see. Great strategic direction.',
            timestamp: '1 hour ago'
          }
        ]
      },
      {
        id: 11,
        title: 'Quarterly Performance Report',
        summary: 'Executive quarterly report with strategic recommendations and performance benchmarks',
        date: '1 week ago',
        type: 'report',
        chartType: 'line',
        chartData: [
          { quarter: 'Q1', performance: 78, target: 75 },
          { quarter: 'Q2', performance: 82, target: 80 },
          { quarter: 'Q3', performance: 88, target: 85 },
          { quarter: 'Q4', performance: 91, target: 90 }
        ],
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        description: 'Comprehensive quarterly performance report featuring strategic analysis, goal achievement tracking, and forward-looking recommendations.',
        tags: ['quarterly', 'performance', 'strategy', 'report'],
        createdBy: 'Executive Team',
        comments: [
          {
            id: 1,
            author: 'Sarah Mitchell',
            content: 'Excellent progress against our strategic goals. Q4 performance exceeded all expectations.',
            timestamp: '3 days ago'
          }
        ]
      }
    ]
  },
  // My Projects (IDs 5-6)
  {
    id: 5,
    name: 'Personal Analytics',
    description: 'Noah\'s personal analytics projects and custom dashboards',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 10, 2025',
    lastEditedDate: 'Jan 18, 2025',
    views: 89,
    insights: [
      {
        id: 17,
        title: 'Executive KPI Dashboard',
        summary: 'Personal executive dashboard tracking key performance indicators across all departments',
        date: '1 day ago',
        type: 'dashboard',
        chartType: 'line',
        chartData: [
          { month: 'Oct', satisfaction: 4.1, escalations: 15.2, automation: 72 },
          { month: 'Nov', satisfaction: 4.3, escalations: 13.8, automation: 76 },
          { month: 'Dec', satisfaction: 4.5, escalations: 12.5, automation: 84 },
          { month: 'Jan', satisfaction: 4.6, escalations: 11.2, automation: 88 }
        ],
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        description: 'Personalized executive dashboard providing real-time insights into customer satisfaction, escalation trends, and automation effectiveness.',
        tags: ['executive', 'kpi', 'satisfaction', 'automation'],
        createdBy: 'Noah',
        createdDate: 'Jan 10, 2025',
        lastEditedDate: 'Jan 18, 2025',
        views: 45,
        comments: [
          {
            id: 1,
            author: 'Noah',
            content: 'This dashboard helps me track our progress toward quarterly goals. The automation improvements are particularly impressive.',
            timestamp: '6 hours ago'
          }
        ]
      },
      {
        id: 18,
        title: 'Weekly Performance Summary',
        summary: 'Personal weekly summary combining insights from all key business areas',
        date: '3 days ago',
        type: 'report',
        metrics: [
          { label: 'Team Performance', value: '94.2%', change: '+2.3%' },
          { label: 'Customer Satisfaction', value: '4.6/5', change: '+0.1' },
          { label: 'Automation Rate', value: '88%', change: '+4%' }
        ],
        icon: <TrendingUp className="w-4 h-4 text-muted-foreground" />,
        description: 'Weekly performance summary compiling key metrics and insights from across the organization for strategic decision making.',
        tags: ['weekly', 'summary', 'performance', 'strategy'],
        createdBy: 'Noah',
        createdDate: 'Jan 8, 2025',
        lastEditedDate: 'Jan 15, 2025',
        views: 23,
        comments: []
      },
      {
        id: 19,
        title: 'Custom Analysis Workspace',
        summary: 'Flexible analytics workspace for ad-hoc analysis and data exploration',
        date: '1 week ago',
        type: 'dashboard',
        chartType: 'mixed',
        chartData: [
          { category: 'Billing', issues: 156, resolved: 134, satisfaction: 4.2 },
          { category: 'Technical', issues: 89, resolved: 82, satisfaction: 4.4 },
          { category: 'Account', issues: 67, resolved: 63, satisfaction: 4.6 },
          { category: 'Mobile', issues: 45, resolved: 38, satisfaction: 4.1 }
        ],
        icon: <Brain className="w-4 h-4 text-muted-foreground" />,
        description: 'Personal analytics workspace for conducting custom analysis and exploring data patterns across different business dimensions.',
        tags: ['analysis', 'custom', 'exploration', 'workspace'],
        createdBy: 'Noah',
        createdDate: 'Jan 5, 2025',
        lastEditedDate: 'Jan 12, 2025',
        views: 67,
        comments: [
          {
            id: 1,
            author: 'Noah',
            content: 'This workspace has been invaluable for deep-dive analysis. The mobile category needs attention.',
            timestamp: '2 days ago'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Strategic Initiatives',
    description: 'Strategic projects and long-term planning analytics',
    icon: <Target className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Jan 5, 2025',
    lastEditedDate: 'Jan 17, 2025',
    views: 134,
    insights: [
      {
        id: 20,
        title: 'Q1 Goals Tracking Dashboard',
        summary: 'Progress tracking for Q1 strategic initiatives and key objectives',
        date: '2 days ago',
        type: 'dashboard',
        chartType: 'bar',
        chartData: [
          { goal: 'Reduce Escalations', current: 11.2, target: 10, progress: 89 },
          { goal: 'Increase Automation', current: 88, target: 90, progress: 93 },
          { goal: 'Improve Satisfaction', current: 4.6, target: 4.7, progress: 87 },
          { goal: 'Content Creation', current: 45, target: 50, progress: 90 }
        ],
        icon: <Target className="w-4 h-4 text-muted-foreground" />,
        description: 'Strategic dashboard tracking progress toward Q1 objectives including escalation reduction, automation improvements, and satisfaction goals.',
        tags: ['q1', 'goals', 'strategic', 'objectives'],
        createdBy: 'Noah',
        createdDate: 'Jan 1, 2025',
        lastEditedDate: 'Jan 17, 2025',
        views: 78,
        comments: [
          {
            id: 1,
            author: 'Noah',
            content: 'Great progress on most objectives. The automation goal is within reach.',
            timestamp: '1 day ago'
          }
        ]
      },
      {
        id: 21,
        title: 'Innovation Pipeline Report',
        summary: 'Analysis of new feature adoption and innovation impact on key metrics',
        date: '5 days ago',
        type: 'report',
        metrics: [
          { label: 'New Features Deployed', value: '12', change: '+3' },
          { label: 'Adoption Rate', value: '67%', change: '+23%' },
          { label: 'Impact Score', value: '8.4/10', change: '+1.2' }
        ],
        icon: <Lightbulb className="w-4 h-4 text-muted-foreground" />,
        description: 'Innovation pipeline report tracking new feature development, user adoption rates, and business impact measurements.',
        tags: ['innovation', 'features', 'adoption', 'impact'],
        createdBy: 'Noah',
        createdDate: 'Dec 28, 2024',
        lastEditedDate: 'Jan 13, 2025',
        views: 56,
        comments: []
      }
    ]
  },
  // Shared Projects (IDs 7+)
  {
    id: 7,
    name: 'Team Collaboration Hub',
    description: 'Shared analytics and insights from the broader team',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 20, 2024',
    lastEditedDate: 'Jan 16, 2025',
    views: 267,
    insights: [
      {
        id: 22,
        title: 'Cross-Team Performance Dashboard',
        summary: 'Collaborative dashboard shared by all team leads showing unified performance metrics',
        date: '1 day ago',
        type: 'dashboard',
        chartType: 'area',
        chartData: [
          { team: 'Support', performance: 92, satisfaction: 4.6, tickets: 1247 },
          { team: 'Content', performance: 89, satisfaction: 4.4, articles: 156 },
          { team: 'Engineering', performance: 94, satisfaction: 4.7, features: 23 },
          { team: 'QA', performance: 91, satisfaction: 4.5, audits: 78 }
        ],
        icon: <Users className="w-4 h-4 text-muted-foreground" />,
        description: 'Cross-functional dashboard providing visibility into performance metrics across all teams, shared by team leads for coordination.',
        tags: ['cross-team', 'collaboration', 'performance', 'shared'],
        createdBy: 'Sarah Chen',
        createdDate: 'Dec 22, 2024',
        lastEditedDate: 'Jan 16, 2025',
        views: 156,
        comments: [
          {
            id: 1,
            author: 'Mike Rodriguez',
            content: 'Great visibility across teams. The Engineering performance is particularly strong this month.',
            timestamp: '4 hours ago'
          },
          {
            id: 2,
            author: 'Emma Wilson',
            content: 'This shared dashboard helps us coordinate better during sprint planning.',
            timestamp: '1 day ago'
          }
        ]
      },
      {
        id: 23,
        title: 'Shared Analytics Dataset',
        summary: 'Comprehensive dataset shared across teams for collaborative analysis',
        date: '4 days ago',
        type: 'dataset',
        metrics: [
          { label: 'Total Records', value: '892K+', change: '+15%' },
          { label: 'Team Access', value: '8 teams', change: '+2' },
          { label: 'Query Volume', value: '1.2K/day', change: '+23%' }
        ],
        icon: <Database className="w-4 h-4 text-muted-foreground" />,
        description: 'Centralized dataset accessible by all teams containing customer interactions, performance metrics, and business intelligence data.',
        tags: ['dataset', 'shared', 'collaboration', 'analytics'],
        createdBy: 'Alex Kim',
        createdDate: 'Dec 18, 2024',
        lastEditedDate: 'Jan 14, 2025',
        views: 234,
        comments: [
          {
            id: 1,
            author: 'Data Team',
            content: 'The unified schema makes cross-team analysis much more efficient.',
            timestamp: '2 days ago'
          }
        ]
      },
      {
        id: 24,
        title: 'Monthly Business Review',
        summary: 'Collaborative monthly review report compiled from all team contributions',
        date: '1 week ago',
        type: 'report',
        chartType: 'mixed',
        chartData: [
          { month: 'Oct', revenue: 145000, satisfaction: 4.1, churn: 2.3 },
          { month: 'Nov', revenue: 152000, satisfaction: 4.3, churn: 2.1 },
          { month: 'Dec', revenue: 168000, satisfaction: 4.5, churn: 1.9 },
          { month: 'Jan', revenue: 171000, satisfaction: 4.6, churn: 1.8 }
        ],
        icon: <BarChart3 className="w-4 h-4 text-muted-foreground" />,
        description: 'Monthly business review report collaboratively created by multiple teams, providing comprehensive business performance insights.',
        tags: ['monthly', 'business-review', 'collaborative', 'comprehensive'],
        createdBy: 'Leadership Team',
        createdDate: 'Dec 15, 2024',
        lastEditedDate: 'Jan 12, 2025',
        views: 189,
        comments: [
          {
            id: 1,
            author: 'Executive Team',
            content: 'Excellent collaborative effort. The insights from all teams provide a complete picture.',
            timestamp: '3 days ago'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Knowledge Sharing',
    description: 'Community-shared insights and best practices',
    icon: <Brain className="w-5 h-5" />,
    color: 'bg-muted/20 text-foreground border-border',
    createdDate: 'Dec 10, 2024',
    lastEditedDate: 'Jan 15, 2025',
    views: 345,
    insights: [
      {
        id: 25,
        title: 'Best Practices Dashboard',
        summary: 'Community-curated dashboard showcasing proven strategies and successful patterns',
        date: '2 days ago',
        type: 'dashboard',
        chartType: 'pie',
        chartData: [
          { practice: 'Proactive Communication', adoption: 78, success: 94 },
          { practice: 'Knowledge Base Updates', adoption: 67, success: 89 },
          { practice: 'AI-Human Collaboration', adoption: 56, success: 91 },
          { practice: 'Customer Feedback Loops', adoption: 83, success: 87 }
        ],
        icon: <CheckSquare className="w-4 h-4 text-muted-foreground" />,
        description: 'Community dashboard highlighting successful practices with adoption rates and effectiveness metrics across different teams.',
        tags: ['best-practices', 'community', 'success-patterns', 'adoption'],
        createdBy: 'Community',
        createdDate: 'Dec 12, 2024',
        lastEditedDate: 'Jan 15, 2025',
        views: 298,
        comments: [
          {
            id: 1,
            author: 'Team Lead Community',
            content: 'The proactive communication practice has been a game-changer for our team.',
            timestamp: '1 day ago'
          },
          {
            id: 2,
            author: 'Best Practices Group',
            content: 'Great to see AI-Human collaboration gaining traction across teams.',
            timestamp: '2 days ago'
          }
        ]
      },
      {
        id: 26,
        title: 'Lessons Learned Repository',
        summary: 'Shared collection of lessons learned from projects and initiatives across the organization',
        date: '1 week ago',
        type: 'report',
        metrics: [
          { label: 'Total Lessons', value: '147', change: '+12' },
          { label: 'Active Contributors', value: '23', change: '+5' },
          { label: 'Implementation Rate', value: '67%', change: '+8%' }
        ],
        icon: <BookOpen className="w-4 h-4 text-muted-foreground" />,
        description: 'Collaborative repository documenting lessons learned from various projects with implementation guidance and success stories.',
        tags: ['lessons-learned', 'knowledge-sharing', 'projects', 'guidance'],
        createdBy: 'Knowledge Team',
        createdDate: 'Dec 8, 2024',
        lastEditedDate: 'Jan 11, 2025',
        views: 234,
        comments: [
          {
            id: 1,
            author: 'Project Management',
            content: 'This repository has saved us from repeating common mistakes. Invaluable resource.',
            timestamp: '4 days ago'
          }
        ]
      }
    ]
  }
];

export const focusAreas: FocusArea[] = [
  {
    id: 1,
    alert: 'High Escalation Rate',
    details: 'Escalation rate has spiked above 15% in last 7 days for Billing category',
    suggestedAction: 'Review & update Billing articles. Coordinate with support team.',
    type: 'critical',
    icon: <AlertTriangle className="w-4 h-4 text-destructive" />,
    category: 'alerts',
    expandedContent: {
      additionalDetails: [
        'Billing-related queries represent 35% of all escalations this week',
        'Most common issues: payment processing, refund requests, subscription changes',
        'Peak escalation times: Monday mornings and end of month'
      ],
      metrics: [
        { label: 'Current Rate', value: '18.3%', change: '+3.2%' },
        { label: 'Weekly Volume', value: '247', change: '+45%' },
        { label: 'Avg Resolution Time', value: '4.2h', change: '+12%' }
      ],
      timeline: [
        { date: 'Mon', value: 22 },
        { date: 'Tue', value: 18 },
        { date: 'Wed', value: 15 },
        { date: 'Thu', value: 19 },
        { date: 'Fri', value: 16 },
        { date: 'Sat', value: 12 },
        { date: 'Sun', value: 14 }
      ]
    }
  },
  {
    id: 2,
    alert: 'Content Gap Identified',
    details: 'Mobile login issues showing 156 unresolved queries - no comprehensive guide exists',
    suggestedAction: 'Create mobile login troubleshooting guide with video tutorials.',
    type: 'urgent',
    icon: <HelpCircle className="w-4 h-4 text-orange-500" />,
    category: 'insights',
    expandedContent: {
      additionalDetails: [
        '40% increase in mobile login queries over past 2 weeks',
        'Common issues: biometric login, 2FA setup, social login problems',
        'High escalation rate of 45% for mobile-specific authentication issues'
      ],
      metrics: [
        { label: 'Unresolved Queries', value: '156', change: '+40%' },
        { label: 'Escalation Rate', value: '45%', change: '+12%' },
        { label: 'User Impact', value: '23%', change: '+8%' }
      ]
    }
  },
  {
    id: 3,
    alert: 'AI Performance Improvement',
    details: 'AI resolution rate increased to 84.2% (+12%) following latest model update',
    suggestedAction: 'Expand AI coverage to additional query categories.',
    type: 'success',
    icon: <TrendingUp className="w-4 h-4 text-green-600" />,
    category: 'insights',
    expandedContent: {
      additionalDetails: [
        'Significant improvement in technical and billing query resolution',
        'Response time reduced by 25% to average 1.8 seconds',
        'User satisfaction with AI responses increased by 18%'
      ],
      metrics: [
        { label: 'Resolution Rate', value: '84.2%', change: '+12%' },
        { label: 'Response Time', value: '1.8s', change: '-25%' },
        { label: 'User Satisfaction', value: '4.6/5', change: '+18%' }
      ]
    }
  },
  {
    id: 4,
    alert: 'Automation Opportunity',
    details: 'Password reset queries can be automated - currently 67% manual resolution',
    suggestedAction: 'Implement automated password reset flow with self-service options.',
    type: 'opportunity',
    icon: <Zap className="w-4 h-4 text-blue-500" />,
    category: 'opportunities',
    expandedContent: {
      additionalDetails: [
        'Password reset queries represent 23% of all support volume',
        'Current manual resolution rate is inefficient for routine requests',
        'Estimated 40% reduction in support volume with full automation'
      ],
      metrics: [
        { label: 'Manual Resolution', value: '67%', change: 'High' },
        { label: 'Query Volume', value: '23%', change: 'Stable' },
        { label: 'Automation Potential', value: '40%', change: 'Opportunity' }
      ]
    }
  },
  {
    id: 5,
    alert: 'Customer Satisfaction Trend',
    details: 'Overall satisfaction improved to 4.2/5 despite billing issues - mobile experience driving gains',
    suggestedAction: 'Continue mobile experience improvements, address billing satisfaction.',
    type: 'success',
    icon: <Users className="w-4 h-4 text-green-600" />,
    category: 'insights',
    expandedContent: {
      additionalDetails: [
        'Mobile experience improvements showing 15% satisfaction increase',
        'Billing category satisfaction down 8% due to escalation issues',
        'Overall trend positive with consistent quarter-over-quarter improvement'
      ],
      metrics: [
        { label: 'Overall Satisfaction', value: '4.2/5', change: '+0.3' },
        { label: 'Mobile Experience', value: '4.6/5', change: '+15%' },
        { label: 'Billing Satisfaction', value: '3.8/5', change: '-8%' }
      ]
    }
  },
  {
    id: 6,
    alert: 'Peak Volume Management',
    details: 'Monday mornings show 40% higher escalation rates - staffing optimization needed',
    suggestedAction: 'Adjust staffing schedules for Monday morning peak periods.',
    type: 'insight',
    icon: <Clock className="w-4 h-4 text-blue-500" />,
    category: 'opportunities',
    expandedContent: {
      additionalDetails: [
        'Consistent pattern of Monday morning escalation spikes',
        'Weekend issues accumulate and surface on Monday',
        'Staffing levels currently optimized for average daily volume'
      ],
      metrics: [
        { label: 'Monday Escalations', value: '40%', change: 'Above avg' },
        { label: 'Staff Utilization', value: '127%', change: 'Peak' },
        { label: 'Response Delay', value: '2.3x', change: 'Above target' }
      ]
    }
  }
];

export const defaultSuggestedQuestions = [
  "What's our current escalation rate?",
  "How efficient are our agents at resolving tickets?",
  "Which articles are performing best?",
  "Show me the top knowledge gaps"
];