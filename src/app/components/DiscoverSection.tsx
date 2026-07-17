import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ChevronDown, ChevronUp, Search, AlertTriangle, Clock, BookOpen, Bell, TrendingUp, Users, Database, Settings, Share, Pin, Monitor, FileText, Brain, Shield, DollarSign, CheckSquare, Plus, FLORA_PLUS_ICON, FileSpreadsheet, MessageCircle, Hammer, X, ArrowRight, ArrowUp, MessageSquare, Timer, Target, Activity, Smile, Sparkles, Copy, AtSign, Hash, Paperclip, Folder, Bookmark, History, Layout as LayoutIcon, BarChart3 as BarChartIcon } from '@/components/icons/flora';
import { motion, AnimatePresence } from 'motion/react';
import AiVisual from '../imports/AiVisual-6024-1841';
import InPagePrompt from '../imports/InPagePrompt';
import { ConversationMessage, MemoryInsight, MemoryFolder } from './dashboard/types';
import { articlePerformanceData, mockSlackNotifications, focusAreas, memoryFolders } from './dashboard/data-clean';
import { getTypeColor, handleShareAlert } from './dashboard/utils';

// Mock data for Slack users
const mockSlackUsers = [
  { id: 'johnnie', name: 'Johnnie Hofmann', role: 'Team Lead', avatar: 'JH', status: 'online' },
  { id: 'veronica', name: 'Veronica Dunn', role: 'Senior Analyst', avatar: 'VD', status: 'online' },
  { id: 'johnson', name: 'Johnson Hammons', role: 'Support Manager', avatar: 'JH', status: 'away' },
  { id: 'simone', name: 'Simone Rosenthal', role: 'Analytics Lead', avatar: 'SR', status: 'online' },
  { id: 'sarah', name: 'Sarah Chen', role: 'Product Manager', avatar: 'SC', status: 'online' },
  { id: 'mike', name: 'Mike Rodriguez', role: 'Senior Developer', avatar: 'MR', status: 'offline' },
  { id: 'alex', name: 'Alex Kim', role: 'Data Scientist', avatar: 'AK', status: 'online' },
  { id: 'emma', name: 'Emma Wilson', role: 'UX Researcher', avatar: 'EW', status: 'online' }
];

// Mock data for dashboards/resources
const mockDashboards = [
  {
    id: 1,
    title: 'Q4 Performance Review',
    lastUpdated: '2 hours ago',
    type: 'dashboard',
    author: 'Sarah Chen'
  },
  {
    id: 2,
    title: 'Escalation Tracking',
    lastUpdated: '1 day ago',
    type: 'report',
    author: 'Mike Rodriguez'
  },
  {
    id: 3,
    title: 'Knowledge Base Health',
    lastUpdated: '3 days ago',
    type: 'dashboard',
    author: 'Alex Kim'
  },
  {
    id: 4,
    title: 'AI Performance Metrics',
    lastUpdated: '5 days ago',
    type: 'report',
    author: 'Noah Parker'
  },
  {
    id: 5,
    title: 'Customer Satisfaction Trends',
    lastUpdated: '1 week ago',
    type: 'dashboard',
    author: 'Emma Wilson'
  },
  {
    id: 6,
    title: 'Weekly Operations Summary',
    lastUpdated: '1 week ago',
    type: 'report',
    author: 'James Miller'
  }
];

// Mock data for memories (sources) - Enhanced with Resolution Time Monitoring data
const mockMemories = [
  {
    id: 1,
    title: 'Resolution Time Monitoring - Weekly Performance',
    type: 'insight',
    relevanceScore: 98,
    snippet: 'Average resolution time improved to 3.8h (12% improvement). Technical Support leads with 3.2h average, while Product Issues needs attention at 4.7h...',
    source: 'Dashboard > Resolution Time Monitoring',
    date: 'Today'
  },
  {
    id: 2,
    title: 'Team Performance Trends - Last 7 Days',
    type: 'report',
    relevanceScore: 94,
    snippet: 'Billing Support shows strongest performance with 2.8h resolution time. Monday mornings continue to show highest escalation rates at 6.8%...',
    source: 'Reports > Resolution Analysis',
    date: '1 day ago'
  },
  {
    id: 3,
    title: 'SLA Compliance Achievement',
    type: 'insight',
    relevanceScore: 91,
    snippet: 'SLA compliance reached 94.2% this week, surpassing target. Weekend performance particularly strong with 3.2h average on Saturday...',
    source: 'Dashboard > Resolution Time Monitoring',
    date: '2 days ago'
  },
  {
    id: 4,
    title: 'Weekly Escalation Trends',
    type: 'report',
    relevanceScore: 88,
    snippet: 'Escalation patterns show peak activity during Monday mornings...',
    source: 'Reports > Operations',
    date: 'Oct 12, 2024'
  }
];

// Resolution Time Monitoring data for last 7 days
const resolutionTimeData = {
  summary: {
    avgResolutionTime: 3.8,
    totalTickets: 2891,
    escalationRate: 6.8,
    slaCompliance: 94.2,
    improvement: 12,
    period: 'Last 7 days'
  },
  dailyTrends: [
    { day: 'Mon', avgTime: 4.2, tickets: 521, escalations: 38 },
    { day: 'Tue', avgTime: 3.9, tickets: 448, escalations: 29 },
    { day: 'Wed', avgTime: 3.6, tickets: 412, escalations: 25 },
    { day: 'Thu', avgTime: 3.7, tickets: 389, escalations: 28 },
    { day: 'Fri', avgTime: 4.1, tickets: 467, escalations: 33 },
    { day: 'Sat', avgTime: 3.2, tickets: 301, escalations: 18 },
    { day: 'Sun', avgTime: 3.5, tickets: 353, escalations: 21 }
  ],
  teamPerformance: [
    { team: 'Technical Support', avgTime: 3.2, tickets: 856, trend: '+12%' },
    { team: 'Billing Support', avgTime: 2.8, tickets: 1124, trend: '+8%' },
    { team: 'Product Issues', avgTime: 4.7, tickets: 445, trend: '-15%' },
    { team: 'General Inquiry', avgTime: 1.9, tickets: 466, trend: '+5%' }
  ]
};

// Mock data for search resources
const mockSearchResources = {
  dashboards: [
    {
      id: 1,
      title: 'Resolution Time Monitoring',
      description: 'Real-time tracking of ticket resolution performance and team metrics',
      author: 'System Analytics',
      lastUpdated: '5 minutes ago',
      views: 1247,
      category: 'monitoring'
    },
    {
      id: 2,
      title: 'Real-time Agent Performance',
      description: 'Live dashboard showing current agent metrics and KPIs',
      author: 'Sarah Chen',
      lastUpdated: '2 hours ago',
      views: 847
    },
    {
      id: 3,
      title: 'Escalation Management Dashboard',
      description: 'Track and analyze escalation patterns and resolution rates',
      author: 'Mike Rodriguez', 
      lastUpdated: '4 hours ago',
      views: 523
    }
  ],
  reports: [
    {
      id: 4,
      title: 'Resolution Time Analysis - Last 7 Days',
      description: 'Detailed breakdown of resolution performance across teams and time periods',
      author: 'Analytics Engine',
      lastUpdated: '1 hour ago',
      views: 892,
      category: 'monitoring'
    },
    {
      id: 5,
      title: 'Monthly Performance Summary',
      description: 'Comprehensive analysis of agent productivity and outcomes',
      author: 'Alex Kim',
      lastUpdated: '1 day ago',
      views: 1205
    },
    {
      id: 6,
      title: 'Escalation Root Cause Analysis',
      description: 'Deep dive into escalation triggers and prevention strategies',
      author: 'Emma Wilson',
      lastUpdated: '2 days ago',
      views: 689
    }
  ],
  datasets: [
    {
      id: 7,
      title: 'Resolution Time Metrics - 7 Day Dataset',
      description: 'Comprehensive resolution timing data with team performance breakdowns',
      author: 'Data Pipeline',
      lastUpdated: '30 minutes ago',
      records: 2891,
      category: 'monitoring'
    },
    {
      id: 8,
      title: 'Agent Interaction Logs Q4',
      description: 'Raw conversation data and performance metrics for Q4 2024',
      author: 'System Generated',
      lastUpdated: '6 hours ago',
      records: 45672
    },
    {
      id: 9,
      title: 'Escalation Classification Data',
      description: 'Categorized escalation events with resolution outcomes',
      author: 'Data Pipeline',
      lastUpdated: '12 hours ago',
      records: 8934
    }
  ]
};

// Mock data for pinned dashboard shortcuts
const pinnedDashboards = [
  {
    id: 'operational',
    title: 'Real-time Monitoring',
    description: 'Live system performance and alerts',
    type: 'dashboard',
    isRealTime: true,
    lastAccessed: '2 hours ago',
    category: 'Operations'
  },
  {
    id: 'knowledge',
    title: 'Knowledge & Content',
    description: 'Content performance and gaps analysis',
    type: 'dashboard',
    isRealTime: false,
    lastAccessed: '4 hours ago',
    category: 'Content'
  },
  {
    id: 'ai-performance',
    title: 'AI Agent Performance',
    description: 'AI resolution rates and optimization',
    type: 'dashboard',
    isRealTime: true,
    lastAccessed: '1 day ago',
    category: 'AI & Automation'
  },
  {
    id: 'qa',
    title: 'QA Dashboard',
    description: 'Quality assurance metrics and trends',
    type: 'dashboard',
    isRealTime: false,
    lastAccessed: '2 days ago',
    category: 'Quality'
  },
  {
    id: 'roi',
    title: 'ROI & Strategy',
    description: 'Strategic insights and ROI analysis',
    type: 'report',
    isRealTime: false,
    lastAccessed: '3 days ago',
    category: 'Strategy'
  },
  {
    id: 'custom-dashboard',
    title: 'Executive Summary',
    description: 'High-level KPI overview for leadership',
    type: 'dashboard',
    isRealTime: true,
    lastAccessed: '5 days ago',
    category: 'Executive'
  }
];

// Suggested questions organized by category
const suggestedQuestions = {
  "agent-productivity": [
    "How is resolution time impacted by using copilot?",
    "What's our current escalation rate?",
    "How efficient are our agents at resolving tickets?",
    "Which agents need additional training?",
    "What's the average response time by team?"
  ],
  "knowledge-and-content": [
    "Which articles are performing best?",
    "Show me the top knowledge gaps",
    "What content needs updating urgently?",
    "Which articles have the highest bounce rates?"
  ],
  "ai-performance": [
    "How has AI resolution improved this quarter?",
    "What's the AI automation success rate?",
    "Which AI responses need improvement?",
    "How accurate are our AI predictions?"
  ],
  trends: [
    "How do weekends compare to weekdays?",
    "What seasonal patterns do we see?",
    "Which categories show declining performance?",
    "How has user behavior changed recently?"
  ],
  strategy: [
    "What opportunities can we identify?",
    "What's the ROI of recent content updates?",
    "How can we improve automation rates?",
    "What are our key achievements this month?"
  ],
  "take-action": [
    "Change agent status",
    "Change agent capacity",
    "Change agent skills",
    "Change agent group"
  ]
};

interface DiscoverSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: () => void;
  conversation: ConversationMessage[];
  handleQuickQuestion: (question: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  onCreateDashboard?: () => void;
  onOpenDashboard?: (dashboardData: { id: string; title: string; data?: any }) => void;
}

export function DiscoverSection({ 
  searchQuery, 
  setSearchQuery, 
  handleSearchSubmit,
  conversation,
  handleQuickQuestion,
  onNavigateToSection,
  onCreateDashboard,
  onOpenDashboard
}: DiscoverSectionProps) {
  const [recentPinnedOpen, setRecentPinnedOpen] = useState(true);
  const [activeView, setActiveView] = useState<'recent' | 'pinned'>('recent');
  const [activeMode, setActiveMode] = useState<'ask' | 'search' | 'build'>('ask');
  const [suggestedQuestionsVisible, setSuggestedQuestionsVisible] = useState(true);
  const [searchResults, setSearchResults] = useState<{
    query: string;
    aiSummary: string;
    memories: typeof mockMemories;
    resources: typeof mockSearchResources;
  } | null>(null);
  
  // Context modal state
  const [showContextModal, setShowContextModal] = useState(false);
  const [selectedContextItems, setSelectedContextItems] = useState<MemoryInsight[]>([]);
  
  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [shareMethod, setShareMethod] = useState<'direct' | 'channel'>('direct');
  
  // Bookmarks state
  const [bookmarkedSummaries, setBookmarkedSummaries] = useState<Array<{
    id: string;
    query: string;
    aiSummary: string;
    timestamp: string;
  }>>([
    {
      id: '1',
      query: 'How is resolution time impacted by using copilot?',
      aiSummary: 'Analysis across multiple queries reveals that the introduction of CoPilot on July 11, 2025, significantly reduced average ticket resolution times across all manager groups, demonstrating a positive impact on support efficiency.\n\n**Key Findings:**\n\n**1. Significant Reduction in Resolution Time Post-CoPilot:**\n    * Average resolution times decreased by 17.6% to 54.2% across managers.\n    * Veronica Dunn\'s team showed the largest percentage drop (54.17%), from ~572 minutes to ~262 minutes.\n    * Johnnie Hofmann also saw a ~54% drop, while Johnson Hammons and Simone Rosenthal had smaller yet meaningful reductions.',
      timestamp: new Date(Date.now() - 86400000).toLocaleString()
    },
    {
      id: '2',
      query: 'What\'s our current escalation rate?',
      aiSummary: 'Based on your current data, escalation rates have decreased by 15% this quarter. The primary factors contributing to escalations are: unresolved technical issues (34%), billing inquiries (28%), and product feature requests (22%). Peak escalation times occur on Monday mornings between 9-11 AM, with an average resolution time of 4.2 hours. Recent training initiatives have improved first-contact resolution rates to 78%, reducing the need for escalations.',
      timestamp: new Date(Date.now() - 172800000).toLocaleString()
    }
  ]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInternalSearchSubmit();
    }
  };

  const handleInternalSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    
    // Generate mock AI summary based on search query
    const generateAISummary = (query: string) => {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('copilot') || lowerQuery.includes('co-pilot')) {
        return `Analysis across multiple queries reveals that the introduction of CoPilot on July 11, 2025, significantly reduced average ticket resolution times across all manager groups, demonstrating a positive impact on support efficiency.

**Key Findings:**

**1. Significant Reduction in Resolution Time Post-CoPilot:**
    * Average resolution times decreased by 17.6% to 54.2% across managers.
    * Veronica Dunn's team showed the largest percentage drop (54.17%), from ~572 minutes to ~262 minutes.
    * Johnnie Hofmann also saw a ~54% drop, while Johnson Hammons and Simone Rosenthal had smaller yet meaningful reductions.

**2. Manager-Level Variability:**
    * Managers with lower pre-CoPilot resolution times tended to achieve higher percentage improvements.
    * Johnson Hammons' group had the highest baseline resolution time (~2183 minutes) and the smallest relative improvement (~33%).

**3. Temporal Trends:**
    * Weekly data confirms consistent reduction in resolution times post-CoPilot with no significant weekly seasonality.
    * Daily trends show early period spikes above 1,500 minutes, stabilizing to lower, consistent resolution times (~160-670 minutes) after CoPilot rollout.

**4. Correlation with Autoassist Adoption:**
    * Autoassist (another AI assistance feature) adoption increased over time.
    * Higher Autoassist usage correlates moderately with lower resolution times (Pearson correlation ~ -0.52).
    * Veronica Dunn's group, with the highest Autoassist adoption, consistently had the lowest resolution times, reinforcing the positive impact of AI assistance.`;
      } else if (lowerQuery.includes('resolution') || lowerQuery.includes('time') || lowerQuery.includes('monitoring')) {
        return `**Resolution Time Monitoring - Last 7 Days Summary:** Your team achieved an average resolution time of 3.8 hours, representing a 12% improvement over the previous period. Key insights: (1) **Team Performance:** Technical Support leads with 3.2h average, Billing Support at 2.8h, while Product Issues requires attention at 4.7h. (2) **Daily Patterns:** Monday shows highest escalation rate (6.8%), weekend performance is strongest. (3) **SLA Achievement:** 94.2% compliance rate exceeded target. (4) **Volume Analysis:** 2,891 total tickets processed with balanced distribution. Recommendation: Focus training efforts on Product Issues team to reduce resolution times and consider staffing adjustments for Monday peak periods.`;
      } else if (lowerQuery.includes('escalation') || lowerQuery.includes('escalat')) {
        return `Based on your current data, escalation rates have decreased by 15% this quarter. The primary factors contributing to escalations are: unresolved technical issues (34%), billing inquiries (28%), and product feature requests (22%). Peak escalation times occur on Monday mornings between 9-11 AM, with an average resolution time of 4.2 hours. Recent training initiatives have improved first-contact resolution rates to 78%, reducing the need for escalations.`;
      } else if (lowerQuery.includes('performance') || lowerQuery.includes('agent')) {
        return `Agent performance metrics show positive trends across key indicators. Average resolution time has improved by 12% to 3.8 hours, while customer satisfaction scores increased to 4.2/5. Top-performing agents demonstrate strong knowledge base utilization (85%+) and proactive communication patterns. Resolution time monitoring shows Technical Support and Billing teams exceeding targets. Areas for improvement include Product Issues team training, with targeted programs showing 23% improvement rates.`;
      } else if (lowerQuery.includes('knowledge') || lowerQuery.includes('content')) {
        return `Your knowledge base analysis reveals strong content performance with 89% article relevance scores. Top-performing articles include troubleshooting guides (94% helpful rating) and product tutorials (91% completion rate). Content gaps identified in advanced feature documentation and integration guides. Recent content updates have reduced average search time by 18% and increased self-service resolution rates to 67%.`;
      } else {
        return `Analysis across multiple queries reveals that the introduction of CoPilot on July 11, 2025, significantly reduced average ticket resolution times across all manager groups, demonstrating a positive impact on support efficiency.

**Key Findings:**

**1. Significant Reduction in Resolution Time Post-CoPilot:**
    * Average resolution times decreased by 17.6% to 54.2% across managers.
    * Veronica Dunn's team showed the largest percentage drop (54.17%), from ~572 minutes to ~262 minutes.
    * Johnnie Hofmann also saw a ~54% drop, while Johnson Hammons and Simone Rosenthal had smaller yet meaningful reductions.

**2. Manager-Level Variability:**
    * Managers with lower pre-CoPilot resolution times tended to achieve higher percentage improvements.
    * Johnson Hammons' group had the highest baseline resolution time (~2183 minutes) and the smallest relative improvement (~33%).

**3. Temporal Trends:**
    * Weekly data confirms consistent reduction in resolution times post-CoPilot with no significant weekly seasonality.
    * Daily trends show early period spikes above 1,500 minutes, stabilizing to lower, consistent resolution times (~160-670 minutes) after CoPilot rollout.

**4. Correlation with Autoassist Adoption:**
    * Autoassist (another AI assistance feature) adoption increased over time.
    * Higher Autoassist usage correlates moderately with lower resolution times (Pearson correlation ~ -0.52).
    * Veronica Dunn's group, with the highest Autoassist adoption, consistently had the lowest resolution times, reinforcing the positive impact of AI assistance.`;
      }
    };

    // Mock search results
    const results = {
      query: searchQuery,
      aiSummary: generateAISummary(searchQuery),
      memories: mockMemories,
      resources: mockSearchResources
    };

    setSearchResults(results);
    handleSearchSubmit(); // Call the original handler
  };

  const handleCloseSearchResults = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  const handleDashboardClick = (dashboardId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(dashboardId);
    }
  };

  const getPlaceholderText = () => {
    switch (activeMode) {
      case 'ask':
        return '';
      case 'search':
        return '';
      case 'build':
        return '';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (activeMode) {
      case 'ask':
        return 'Ask';
      case 'search':
        return 'Search';
      case 'build':
        return 'Build';
      default:
        return 'Ask';
    }
  };

  // Share modal functions
  const handleOpenShareModal = () => {
    if (searchResults) {
      // Pre-populate share message with summary
      const defaultMessage = `Hi! I found some interesting insights about our resolution times with CoPilot. The data shows an overall 27.4% improvement across all agents. Worth discussing in our next team meeting!\n\nKey highlights:\n• Veronica Dunn: -25.7% improvement\n• Johnnie Hofmann: -29.0% improvement\n• Johnson Hammons: -25.6% improvement\n• Simone Rosenthal: -30.0% improvement\n\nCheck out the full analysis when you have a moment.`;
      setShareMessage(defaultMessage);
    }
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedUser('');
    setShareMessage('');
    setShareMethod('direct');
  };

  // Bookmark functions
  const handleBookmarkSummary = () => {
    if (!searchResults) return;
    
    const newBookmark = {
      id: Date.now().toString(),
      query: searchResults.query,
      aiSummary: searchResults.aiSummary,
      timestamp: new Date().toLocaleString()
    };
    
    setBookmarkedSummaries(prev => [newBookmark, ...prev]);
  };
  
  const handleRemoveBookmark = (id: string) => {
    setBookmarkedSummaries(prev => prev.filter(bookmark => bookmark.id !== id));
  };
  
  const isCurrentSummaryBookmarked = () => {
    if (!searchResults) return false;
    return bookmarkedSummaries.some(bookmark => 
      bookmark.query === searchResults.query && 
      bookmark.aiSummary === searchResults.aiSummary
    );
  };

  const handleShareSubmit = () => {
    if (!selectedUser || !shareMessage.trim()) return;
    
    const selectedUserData = mockSlackUsers.find(user => user.id === selectedUser);
    
    // Simulate sharing
    console.log('Sharing via Slack:', {
      method: shareMethod,
      recipient: selectedUserData?.name,
      message: shareMessage
    });
    
    // Close modal
    handleCloseShareModal();
  };

  return (
    <div className="flex-1 overflow-auto bg-background flex">
      {/* Bookmarks Drawer - Left Side */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div 
            initial={{ x: -380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -380, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[380px] border-r border-border bg-background overflow-hidden flex flex-col flex-shrink-0"
          >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border h-[40px]">
            <h3 className="leading-[34px] text-base" style={{ fontWeight: 300 }}>Bookmarked summaries</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBookmarks(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {bookmarkedSummaries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                
                <h3 className="text-lg font-medium text-foreground mb-2">No bookmarked summaries</h3>
                <p className="text-base text-muted-foreground">
                  Bookmark AI summaries to access them later
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {bookmarkedSummaries.map((bookmark, index) => (
                    <motion.div 
                      key={bookmark.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        delay: index * 0.05 
                      }}
                      className="p-4 rounded-lg border border-border bg-background hover:bg-muted/20 transition-colors"
                    >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Search className="w-4 h-4 text-primary" />
                          <h3 className="text-sm font-medium text-foreground">
                            "{bookmark.query}"
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          Saved on {bookmark.timestamp}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBookmark(bookmark.id)}
                        className="h-7 w-7 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-base text-foreground leading-relaxed line-clamp-3">
                      {bookmark.aiSummary.split('\n\n')[0]}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 px-2 text-xs"
                      onClick={() => {
                        setSearchQuery(bookmark.query);
                        setSearchResults({
                          query: bookmark.query,
                          aiSummary: bookmark.aiSummary,
                          memories: mockMemories,
                          resources: mockSearchResources
                        });
                        setShowBookmarks(false);
                      }}
                    >
                      View Full Summary
                    </Button>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-[35px] pt-[77px] pb-[21px] relative z-10 space-y-6">
      {/* Top Right Corner Gradient - Positioned outside container */}
      
      
      {/* Bottom Left Corner Gradient */}
      
      
      {/* Hidden: Let's dive in section */}
      {false && (
      <>
      <div className="flex items-center justify-between relative z-10 mx-[0px] mt-[52px] mb-[-9px]">
        <div className="flex flex-col items-start">
          {/* Q&A Icon - No background, violet icon */}       <div className="mb-4">
            
          </div>
          
          <h1 className="m-[0px] text-[#706F6E] text-[30px]">Let's dive in</h1><h1 className="m-[0px] px-[0px] pt-[0px] pb-[20px]">Ask for insight, create assets or take action</h1>
          
          
        </div>
        
        {/* History Button - Always visible in top right corner */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBookmarks(!showBookmarks)}
          className="gap-2 absolute left-0 top-[-20px]"
        >
          <Bookmark className="w-6 h-6" />
        </Button>
      </div>

      {/* Create New Section */}


      {/* Search and Suggested Questions Section */}
      <Card className="border-0 relative z-10 bg-transparent">
        <CardContent className="ml-0 pl-[0px] pr-[21px] pt-[20px] pb-[21px] bg-transparent">
          
          {/* Enhanced Text Input with Embedded Controls */}
          <div className="relative max-w-[900px]">
            {/* Gradient border wrapper */}
            <div 
              className="rounded-2xl group border border-[#E8EAEC]"
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(135deg, #447DF5, #3b82f6, #8b5cf6, #7c3aed)';
                e.currentTarget.style.backgroundOrigin = 'border-box';
                e.currentTarget.style.backgroundClip = 'padding-box, border-box';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid #E8EAEC';
                e.currentTarget.style.backgroundImage = 'none';
                e.currentTarget.style.backgroundOrigin = '';
                e.currentTarget.style.backgroundClip = '';
              }}
            >
              <textarea
                placeholder={getPlaceholderText()}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full min-h-[80px] border-0 rounded-2xl resize-none focus:outline-none transition-all text-base bg-transparent text-foreground pl-[14px] pr-[56px] pt-[31px] pb-[78px]"
                rows={2}
              />
            </div>
            
            {/* Mode Selector - Positioned inside text area at bottom left */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              
              
              {/* Context Selection - Show selected items as tags or "All projects" button */}
              {selectedContextItems.length === 0 ? (
                <button
                  onClick={() => setShowContextModal(true)}
                  className="h-[30px] px-2.5 flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Folder className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-base text-muted-foreground">All projects</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  {selectedContextItems.map((item) => (
                    <div
                      key={item.id}
                      className="h-[30px] px-2.5 flex items-center gap-1.5 bg-[#4F6BBF]/15 border border-black/20 rounded-lg"
                    >
                      <span className="text-base text-[#4F6BBF] font-light">{item.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedContextItems(prev => prev.filter(i => i.id !== item.id));
                        }}
                        className="hover:bg-black/20 rounded"
                      >
                        <X className="w-3 h-3 text-foreground" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowContextModal(true)}
                    className="h-[30px] w-[30px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className={FLORA_PLUS_ICON} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button - Positioned inside text area at bottom right */}
            <button 
              onClick={handleInternalSearchSubmit}
              className={`absolute bottom-3 right-3 h-[32px] w-[32px] rounded-full flex items-center justify-center transition-colors ${
                searchQuery.trim() 
                  ? 'bg-black text-white hover:bg-black/90' 
                  : 'bg-gray-100 text-gray-400'
              }`}
              disabled={!searchQuery.trim()}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          
          {/* Suggested Questions - show below text composer when no search results */}
          {!searchResults && suggestedQuestionsVisible && (
            <div className="mt-6 space-y-4">
              <Tabs defaultValue="agent-productivity" className="w-full px-[0px] pt-[30px] pb-[0px]">
                <TabsList className="inline-flex border-0 border-b border-solid border-[#d8dcde] bg-transparent p-0 h-auto rounded-none">
                  <TabsTrigger 
                    value="agent-productivity"
                    className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                  >
                    Agent Productivity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="knowledge-and-content"
                    className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                  >
                    Knowledge & Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai-performance"
                    className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                  >
                    AI Performance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trends"
                    className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                  >
                    Trends
                  </TabsTrigger>
                  <TabsTrigger 
                    value="strategy"
                    className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                  >
                    Strategy
                  </TabsTrigger>
                  
                </TabsList>

                <TabsContent value="agent-productivity" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions["agent-productivity"].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="knowledge-and-content" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions["knowledge-and-content"].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ai-performance" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions["ai-performance"].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.trends.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="strategy" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.strategy.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="take-action" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions["take-action"].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(question);
                          handleQuickQuestion(question);
                        }}
                        className="cursor-pointer"
                      >
                        <InPagePrompt text={question} />
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Content Sections - Trending, Curated, Starred, Recent */}
          {!searchResults && (
            <div className="mt-12 space-y-8">
              {/* Trending Section */}
              

              {/* Zendesk Curated Section */}
              

              {/* Starred Section */}
              

              {/* Recent Section */}
              
            </div>
          )}
          
          {/* Search Results */}
          {searchResults && (
            <div className="mt-6 space-y-6">
              {/* Search Results Header with Close Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  <h3 className="text-sm text-foreground">
                    Search results for "{searchResults.query}"
                  </h3>
                </div>
                <button
                  onClick={handleCloseSearchResults}
                  className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* AI Summary - Full Width */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Summary - Left Column (2/3 width) */}
                <div className="space-y-3 lg:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                      <AiVisual />
                    </div>
                    <h3 className="text-sm text-foreground">AI Summary</h3>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div className="text-base text-foreground leading-relaxed mb-3">
                      {searchResults.aiSummary.split('\n\n').map((section, index) => {
                        if (section.trim() === '') return null;
                        
                        // Handle "Key Findings:" header
                        if (section.includes('**Key Findings:**')) {
                          return (
                            <div key={index} className="mb-4">
                              <h4 className="text-foreground mb-3">Key Findings:</h4>
                            </div>
                          );
                        }
                        
                        // Handle numbered sections (1., 2., 3., 4.)
                        if (section.match(/^\*\*\d+\./)) {
                          const lines = section.split('\n');
                          const header = lines[0].replace(/^\*\*/, '').replace(/\*\*:$/, '');
                          const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('*'));
                          
                          return (
                            <div key={index} className="mb-4">
                              <h5 className="text-foreground mb-2">{header}</h5>
                              <ul className="ml-4 space-y-1">
                                {bulletPoints.map((point, pointIndex) => (
                                  <li key={pointIndex} className="text-muted-foreground">
                                    <span className="inline-block w-2 text-center mr-2">•</span>
                                    {point.replace(/^\s*\*\s*/, '')}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                        
                        // Handle regular paragraphs (intro text)
                        return (
                          <p key={index} className="mb-4 text-foreground">
                            {section}
                          </p>
                        );
                      })}
                      
                      {/* Data Table Section */}
                      <div className="mb-4">
                        <h5 className="text-foreground mb-3">Resolution Time Impact Data</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 text-foreground">Agent Name</th>
                                <th className="text-right py-2 px-3 text-foreground">Before CoPilot (hrs)</th>
                                <th className="text-right py-2 px-3 text-foreground">After CoPilot (hrs)</th>
                                <th className="text-right py-2 px-3 text-foreground">Change (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border/50">
                                <td className="py-2 px-3 text-foreground">Veronica Dunn</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">24.5</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">18.2</td>
                                <td className="py-2 px-3 text-right text-green-600">-25.7%</td>
                              </tr>
                              <tr className="border-b border-border/50">
                                <td className="py-2 px-3 text-foreground">Johnnie Hofmann</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">32.1</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">22.8</td>
                                <td className="py-2 px-3 text-right text-green-600">-29.0%</td>
                              </tr>
                              <tr className="border-b border-border/50">
                                <td className="py-2 px-3 text-foreground">Johnson Hammons</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">28.9</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">21.5</td>
                                <td className="py-2 px-3 text-right text-green-600">-25.6%</td>
                              </tr>
                              <tr className="border-b border-border/50">
                                <td className="py-2 px-3 text-foreground">Simone Rosenthal</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">19.7</td>
                                <td className="py-2 px-3 text-right text-muted-foreground">13.8</td>
                                <td className="py-2 px-3 text-right text-green-600">-30.0%</td>
                              </tr>
                              <tr className="bg-muted/30">
                                <td className="py-2 px-3 text-foreground">Overall Average</td>
                                <td className="py-2 px-3 text-right text-foreground">26.3</td>
                                <td className="py-2 px-3 text-right text-foreground">19.1</td>
                                <td className="py-2 px-3 text-right text-green-600">-27.4%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Conclusion Section */}
                      <div className="mb-4">
                        <h5 className="text-foreground mb-2">Conclusion</h5>
                        <p className="text-foreground">
                          CoPilot introduction is strongly associated with reduced ticket resolution times, enhancing support efficiency. The impact varies by manager groups, with those having lower initial resolution times seeing greater relative gains. Increased adoption of AI tools like Autoassist further supports improved resolution efficiency. Additional data on direct CoPilot usage per ticket could further clarify causality and granular impacts.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <Button
                        onClick={() => {
                          // Handle continue exploration action
                          console.log('Continue exploration clicked');
                        }}
                      >
                        Continue Exploration
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => {
                            navigator.clipboard.writeText(searchResults.aiSummary);
                            // Could add toast notification here
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 w-7 p-0 ${isCurrentSummaryBookmarked() ? 'text-primary' : ''}`}
                          onClick={handleBookmarkSummary}
                        >
                          <Bookmark className={`w-3 h-3 ${isCurrentSummaryBookmarked() ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={handleOpenShareModal}
                        >
                          <Share className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Reports - Right Column (1/3 width) */}
                <div className="space-y-3 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-primary" />
                    <h3 className="text-sm text-foreground">Source Reports</h3>
                  </div>
                  <div className="space-y-2">
                    {searchResults.memories.slice(0, 3).map((memory) => (
                      <div key={memory.id} className="p-3 rounded-lg border border-border bg-transparent hover:bg-muted/20 transition-colors">
                        <h4 className="text-xs text-foreground line-clamp-2 mb-1">{memory.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{memory.snippet}</p>
                        <div className="flex items-center justify-end text-xs text-muted-foreground">
                          <span className="flex-shrink-0">{memory.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resources Section */}
              <div className="space-y-4 pt-[24px] pr-[0px] pb-[0px] pl-[0px]">
                <h3 className="tracking-[-0.374px] leading-[34px] text-lg" style={{ fontWeight: 500 }}>
                  Related assets
                </h3>

                <Tabs defaultValue="dashboards" className="w-full">
                  <TabsList className="inline-flex border-0 border-b border-solid border-[#d8dcde] bg-transparent p-0 h-auto rounded-none">
                    <TabsTrigger 
                      value="dashboards" 
                      className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                    >
                      <LayoutIcon className="w-3 h-3 mr-2" />
                      Dashboards ({searchResults.resources.dashboards.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reports" 
                      className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                    >
                      <BarChartIcon className="w-3 h-3 mr-2" />
                      Reports ({searchResults.resources.reports.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="datasets" 
                      className="relative flex-shrink-0 pb-[9px] pt-[10px] px-[28px] bg-transparent border-0 rounded-none text-base text-center whitespace-nowrap leading-[20px] text-foreground data-[state=active]:text-[#4F6BBF] data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F6BBF] data-[state=active]:after:content-['']"
                    >
                      <Database className="w-3 h-3 mr-2" />
                      Datasets ({searchResults.resources.datasets.length})
                    </TabsTrigger>
                    
                  </TabsList>

                  <TabsContent value="dashboards" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.resources.dashboards.map((item) => (
                        <Card 
                          key={item.id} 
                          className="cursor-pointer hover:shadow-sm transition-shadow border border-border"
                          onClick={() => onOpenDashboard?.({
                            id: `search-dashboard-${item.id}`,
                            title: item.title,
                            data: { type: 'dashboard', description: item.description }
                          })}
                        >
                          <CardContent 
                            className="p-4" 
                            onClick={() => {
                              if (item.title === "Resolution Time Monitoring") {
                                window.open("https://www.figma.com/proto/ORd7MboOz613hwFD1Al9WA/Strategy-prototype-2026---builder-section?page-id=0%3A1&node-id=5-30&viewport=230%2C240%2C0.13&t=8dBXQAdT5BxfbYqp-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A30", "_blank");
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <LayoutIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm text-foreground line-clamp-1">{item.title}</h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                  <span>by {item.author}</span>
                                  <span>{item.views} views</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{item.lastUpdated}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reports" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.resources.reports.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:shadow-sm transition-shadow border border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <BarChartIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm text-foreground line-clamp-1">{item.title}</h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                  <span>by {item.author}</span>
                                  <span>{item.views} views</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{item.lastUpdated}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="datasets" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.resources.datasets.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:shadow-sm transition-shadow border border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Database className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#293239' }} />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm text-foreground line-clamp-1">{item.title}</h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                  <span>by {item.author}</span>
                                  <span>{item.records} records</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{item.lastUpdated}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="memories" className="mt-4">
                    <div className="space-y-3">
                      {searchResults.memories.map((memory) => (
                        <div key={memory.id} className="p-3 rounded-lg border border-border bg-transparent hover:bg-muted/20 transition-colors cursor-pointer">
                          <h4 className="text-sm text-foreground line-clamp-2 mb-2">{memory.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-3">{memory.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </>
      )}




      {/* Share Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share className="w-5 h-5 text-primary" />
              Share
            </DialogTitle>
            <DialogDescription>
              Share your analytics insights with team members via Slack direct messages or channels.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Share Method Selection */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">Share to:</label>
              <div className="flex gap-2">
                <Button
                  variant={shareMethod === 'direct' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShareMethod('direct')}
                  className="flex-1"
                >
                  <AtSign className="w-4 h-4 mr-2" />
                  Direct Message
                </Button>
                <Button
                  variant={shareMethod === 'channel' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShareMethod('channel')}
                  className="flex-1"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Channel
                </Button>
              </div>
            </div>

            {/* User Selection */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">
                {shareMethod === 'direct' ? 'Select recipient:' : 'Select channel:'}
              </label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder={shareMethod === 'direct' ? 'Choose a person...' : 'Choose a channel...'} />
                </SelectTrigger>
                <SelectContent>
                  {shareMethod === 'direct' ? (
                    mockSlackUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.role}</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === 'online' ? 'bg-green-500' : 
                            user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="general"># general</SelectItem>
                      <SelectItem value="analytics"># analytics</SelectItem>
                      <SelectItem value="team-leads"># team-leads</SelectItem>
                      <SelectItem value="support"># support</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm text-foreground">Message:</label>
              <Textarea
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                placeholder="Add a message to share with the insights..."
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseShareModal}>
                Cancel
              </Button>
              <Button 
                onClick={handleShareSubmit}
                disabled={!selectedUser || !shareMessage.trim()}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Context Selection Modal */}
      <Dialog open={showContextModal} onOpenChange={setShowContextModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              Select Projects
            </DialogTitle>
            <DialogDescription>
              Choose one or more projects to provide context for your question.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2">
              {memoryFolders.map((project) => {
                const isSelected = selectedContextItems.some(item => item.id === project.id);
                
                return (
                  <Card 
                    key={project.id}
                    className={`cursor-pointer transition-all hover:bg-muted/50 ${ 
                      isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/20'
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedContextItems(prev => prev.filter(item => item.id !== project.id));
                      } else {
                        // Convert MemoryFolder to MemoryInsight format for compatibility
                        const projectAsInsight = {
                          id: project.id,
                          title: project.name,
                          type: 'project' as const,
                          icon: project.icon,
                          summary: project.description,
                          date: project.lastEditedDate
                        };
                        setSelectedContextItems(prev => [...prev, projectAsInsight]);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          {project.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-normal text-foreground">{project.name}</h4>
                            {project.views > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {project.views} views
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {project.createdDate}</span>
                            <span>•</span>
                            <span>Last edited: {project.lastEditedDate}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <CheckSquare className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {selectedContextItems.length} {selectedContextItems.length === 1 ? 'project' : 'projects'} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowContextModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => setShowContextModal(false)}
              >
                Add Context
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      </div>
      </div>
    </div>
  );
}