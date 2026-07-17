import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ChevronDown, ChevronUp, BarChart3, MessageCircle, TrendingUp, AlertTriangle, Users, Clock, Target, CheckSquare, FileText, HelpCircle, TrendingDown, MoreVertical, X, Send, Bot, User, Shield, Brain, DollarSign, Database, Bell, Edit3, Plus, ArrowDown, ArrowUp, Info, Play, Share, Folder, FolderOpen, Settings, Pin, Download, ArrowLeft, Tag, Calendar, Copy, Link, MessageSquare, Trash2, ChevronsUpDown, Filter, ExternalLink, Mail, Lightbulb, Eye } from '@/components/icons/flora';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';

// Import from extracted files
import { DashboardProps, ConversationMessage, MemoryInsight, InsightComment } from './dashboard/types';
import { 
  mockSlackNotifications, 
  articlePerformanceData, 
  chartData, 
  timelineImpactData, 
  mockResponses, 
  knowledgeGaps, 
  tasks, 
  memoryFolders, 
  focusAreas, 
  defaultSuggestedQuestions,
  mockSlackUsers,
  mockSlackChannels
} from './dashboard/data-clean';
import { 
  getTypeColor, 
  getUrgencyColor, 
  getTrendIcon, 
  getNotificationIcon, 
  getImpactColor, 
  getSectionIcon, 
  getSectionTitle, 
  handleShareAlert 
} from './dashboard/utils';
import { ImpactTooltip, TimelineTooltip, MiniChart } from './dashboard/components';
import { SettingsPage } from './SettingsPage';
import { DiscoverSection } from './DiscoverSection';
import { DiscoverSidebar } from './DiscoverSidebar';
import { TemplatesSection } from './TemplatesSection';
import { ExportDataDialog } from './ExportDataDialog';
import { ExportDataSection } from './ExportDataSection';
import { DatasetsSection } from './DatasetsSection';
import { ResolutionTimeMonitoring } from './ResolutionTimeMonitoring';
import { RealTimeMonitoring } from './RealTimeMonitoring';
import { DashboardBuilder } from './DashboardBuilder';
import { ReportBuilder } from './ReportBuilder';
import { HomeSection } from './HomeSection';
import { AlertsSection } from './AlertsSection';
import { SettingsSection } from './SettingsSection';

export function AnalyticsDashboard({ type, data, onReportGeneration, onCreateDashboard, onCreateReport, onSectionChange, onNotificationsChange, onNavigateToExportSetup, onNavigateToSection, initialSection, onOpenDashboard, activeTabId, openTabs, onOpenAnalyticsAssistant, onUpdateTabTitle, onShowLegacyTooltip }: DashboardProps) {
  // Simple counter for unique IDs
  const idCounterRef = React.useRef(0);
  const generateUniqueId = () => {
    idCounterRef.current += 1;
    return Date.now() + idCounterRef.current;
  };

  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeMainTab, setActiveMainTab] = useState('focus-areas');
  const [activeDiscoverTab, setActiveDiscoverTab] = useState('performance');
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [showAssistant, setShowAssistant] = useState(false);
  const [projects, setProjects] = useState(memoryFolders);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockSlackNotifications);
  const [assistantInput, setAssistantInput] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['alerts', 'insights', 'opportunities']));
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(new Set([1]));
  const [activeNavItem, setActiveNavItem] = useState(initialSection || 'search');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [expandedQuestionTabs, setExpandedQuestionTabs] = useState<Set<string>>(new Set(['performance', 'issues', 'trends']));
  const [selectedInsight, setSelectedInsight] = useState<MemoryInsight | null>(null);
  const [showInsightDetail, setShowInsightDetail] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMethod, setShareMethod] = useState<'email' | 'slack'>('email');
  const [slackTarget, setSlackTarget] = useState<'user' | 'channel'>('user');
  const [slackUser, setSlackUser] = useState('');
  const [slackChannel, setSlackChannel] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'created' | 'edited'>('all');
  
  // Search result sharing state
  const [selectedSearchResult, setSelectedSearchResult] = useState<ConversationMessage | null>(null);
  const [showSearchResultShare, setShowSearchResultShare] = useState(false);
  const [searchShareEmail, setSearchShareEmail] = useState('');
  const [searchShareMethod, setSearchShareMethod] = useState<'email' | 'slack'>('email');
  const [searchSlackTarget, setSearchSlackTarget] = useState<'user' | 'channel'>('user');
  const [searchSlackUser, setSearchSlackUser] = useState('');
  const [searchSlackChannel, setSearchSlackChannel] = useState('');

  // Folder export and share state
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showFolderExportDialog, setShowFolderExportDialog] = useState(false);
  const [showFolderShareDialog, setShowFolderShareDialog] = useState(false);
  const [folderExportFormat, setFolderExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [folderShareEmail, setFolderShareEmail] = useState('');
  const [folderShareMethod, setFolderShareMethod] = useState<'email' | 'slack'>('email');
  const [folderSlackTarget, setFolderSlackTarget] = useState<'user' | 'channel'>('user');
  const [folderSlackUser, setFolderSlackUser] = useState('');
  const [folderSlackChannel, setFolderSlackChannel] = useState('');

  // State for alerts and insights section
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());
  const [alertsActiveTab, setAlertsActiveTab] = useState('all');

  // State for project/folder actions
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'folder' | 'item', folderId?: number, itemId?: number} | null>(null);

  // State for export functionality
  const [showExportDialog, setShowExportDialog] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Notify parent of section changes for TopBar
  React.useEffect(() => {
    onSectionChange?.(activeNavItem);
  }, [activeNavItem, onSectionChange]);

  // Notify parent of notification changes for TopBar
  React.useEffect(() => {
    const unreadCount = notifications.filter(n => n.unread).length;
    onNotificationsChange?.(notifications, unreadCount);
  }, [notifications, onNotificationsChange]);

  // Clone and delete functions for projects
  const cloneFolder = (folderId: number) => {
    const folderToClone = projects.find(f => f.id === folderId);
    if (!folderToClone) return;

    const clonedFolder = {
      ...folderToClone,
      id: generateUniqueId(),
      name: `${folderToClone.name} (Copy)`,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastEditedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0,
      insights: folderToClone.insights.map(insight => ({
        ...insight,
        id: generateUniqueId(),
        title: `${insight.title} (Copy)`,
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastEditedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        views: 0
      }))
    };

    setProjects(prev => [...prev, clonedFolder]);
  };

  const cloneItem = (folderId: number, itemId: number) => {
    const folder = projects.find(f => f.id === folderId);
    const itemToClone = folder?.insights.find(i => i.id === itemId);
    if (!itemToClone) return;

    const clonedItem = {
      ...itemToClone,
      id: generateUniqueId(),
      title: `${itemToClone.title} (Copy)`,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastEditedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0
    };

    setProjects(prev => prev.map(folder => 
      folder.id === folderId
        ? { ...folder, insights: [...folder.insights, clonedItem] }
        : folder
    ));
  };

  const deleteFolder = (folderId: number) => {
    setProjects(prev => prev.filter(f => f.id !== folderId));
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const deleteItem = (folderId: number, itemId: number) => {
    setProjects(prev => prev.map(folder => 
      folder.id === folderId
        ? { ...folder, insights: folder.insights.filter(i => i.id !== itemId) }
        : folder
    ));
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleDeleteClick = (type: 'folder' | 'item', folderId?: number, itemId?: number) => {
    setItemToDelete({ type, folderId, itemId });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'folder' && itemToDelete.folderId) {
      deleteFolder(itemToDelete.folderId);
    } else if (itemToDelete.type === 'item' && itemToDelete.folderId && itemToDelete.itemId) {
      deleteItem(itemToDelete.folderId, itemToDelete.itemId);
    }
  };

  const incrementItemViews = (folderId: number, itemId: number) => {
    setProjects(prev => prev.map(folder => 
      folder.id === folderId
        ? {
            ...folder,
            insights: folder.insights.map(insight => 
              insight.id === itemId
                ? { ...insight, views: (insight.views || 0) + 1 }
                : insight
            )
          }
        : folder
    ));
  };

  const incrementFolderViews = (folderId: number) => {
    setProjects(prev => prev.map(folder => 
      folder.id === folderId
        ? { ...folder, views: (folder.views || 0) + 1 }
        : folder
    ));
  };

  const toggleFolderExpanded = (folderId: number) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const openInsightDetail = (insight: MemoryInsight) => {
    setSelectedInsight(insight);
    setShowInsightDetail(true);
  };

  // Check if there's an active tab that needs a builder
  const activeTab = activeTabId ? openTabs?.find(tab => tab.id === activeTabId && tab.isActive) : null;
  
  // Check if we need to show a pre-created dashboard (only for specific named dashboards)
  const preCreatedDashboardNames = ['Resolution Time Monitoring', 'Real-time Monitoring', 'Customer Satisfaction Trends', 'Agent Productivity Dashboard'];
  const showPreCreatedDashboard = activeTab && activeTab.type === 'dashboard' && activeTab.data?.isNew === false && activeTab.data?.dashboardName && preCreatedDashboardNames.includes(activeTab.data.dashboardName);
  
  // Show dashboard builder for new dashboards OR existing dashboards without specific components
  const showDashboardBuilder = activeTab && activeTab.type === 'dashboard' && (activeTab.data?.isNew === true || (activeTab.data?.isNew === false && !showPreCreatedDashboard));
  const showReportBuilder = activeTab && activeTab.type === 'report' && activeTab.data?.isNew === true;

  // Early return for pre-created dashboards
  if (showPreCreatedDashboard) {
    const dashboardName = activeTab.data.dashboardName;
    
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
            onNavigateToSection={onNavigateToSection}
          />

          {/* Main Content - Pre-created Dashboard */}
          <div className="flex-1 overflow-auto bg-white rounded-[24px] m-1">
            {dashboardName === 'Resolution Time Monitoring' && (
              <ResolutionTimeMonitoring onOpenAssistant={() => setShowAssistant(true)} />
            )}
            {dashboardName === 'Real-time Monitoring' && (
              <RealTimeMonitoring onOpenAssistant={() => setShowAssistant(true)} />
            )}
            {dashboardName === 'Customer Satisfaction Trends' && (
              <ResolutionTimeMonitoring onOpenAssistant={() => setShowAssistant(true)} />
            )}
            {dashboardName === 'Agent Productivity Dashboard' && (
              <ResolutionTimeMonitoring onOpenAssistant={() => setShowAssistant(true)} />
            )}
            {/* Add more pre-created dashboards as needed */}
          </div>
        </div>
      </div>
    );
  }

  // Early return for dashboard builder
  if (showDashboardBuilder) {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
            onNavigateToSection={onNavigateToSection}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0 overflow-hidden m-1">
          <DashboardBuilder 
            key={activeTabId} 
            dashboardTitle={activeTab?.data?.dashboardName || activeTab?.title || 'New Dashboard'}
            projectName={activeTab?.data?.projectName}
            onClose={() => {
              // Close the active tab
              if (activeTabId) {
                const updatedTabs = openTabs.filter(tab => tab.id !== activeTabId);
                const newActiveTab = updatedTabs[updatedTabs.length - 1];
                
                if (newActiveTab) {
                  // Switch to the last remaining tab
                  setActiveNavItem(newActiveTab.type === 'dashboard' ? 'dashboards' : 'reports');
                } else {
                  // No tabs left, go back to home
                  setActiveNavItem('home');
                }
              }
            }}
            onSave={(dashboardData: any) => {
              console.log('Dashboard saved:', dashboardData);
              onUpdateTabTitle?.(activeTabId || '', dashboardData.name);
              
              if (activeTab) {
                activeTab.data.isNew = false;
              }
            }}
            initialData={activeTab?.data}
            isFromCard={activeTab?.data?.fromCard || false}
            onOpenAnalyticsAssistant={onOpenAnalyticsAssistant}
          />
          </div>
        </div>
      </div>
    );
  }

  // Early return for report builder
  if (showReportBuilder) {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar 
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            onNavigateToSection={onNavigateToSection}
          />

          {/* Main Content */}
          <ReportBuilder 
            onClose={() => {
              // Close the active tab
              if (activeTabId) {
                const updatedTabs = openTabs.filter(tab => tab.id !== activeTabId);
                const newActiveTab = updatedTabs[updatedTabs.length - 1];
                
                if (newActiveTab) {
                  // Switch to the last remaining tab
                  setActiveNavItem(newActiveTab.type === 'dashboard' ? 'dashboards' : 'reports');
                } else {
                  // No tabs left, go back to home
                  setActiveNavItem('home');
                }
              }
            }}
            onSave={(reportData: any) => {
              console.log('Report saved:', reportData);
              onUpdateTabTitle?.(activeTabId || '', reportData.name);
              
              if (activeTab) {
                activeTab.data.isNew = false;
              }
            }}
            initialData={activeTab?.data}
            onOpenAnalyticsAssistant={onOpenAnalyticsAssistant}
          />
        </div>
      </div>
    );
  }

  // Early return for discover section
  if (activeNavItem === 'search') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar 
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Main Content - Discover Section */}
          <div className="flex-1 overflow-auto bg-white rounded-[24px] m-1">
            <DiscoverSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchSubmit={() => {}}
              conversation={conversation}
              handleQuickQuestion={() => {}}
              onNavigateToSection={(sectionId) => setActiveNavItem(sectionId)}
              onCreateDashboard={onCreateDashboard || (() => {})}
              onCreateReport={onCreateReport || (() => {})}
              onOpenDashboard={onOpenDashboard}
            />
          </div>
        </div>
      </div>
    );
  }


  // Datasets section
  if (activeNavItem === 'datasets') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar 
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Main Content - Datasets Section */}
          <div className="flex-1 overflow-auto bg-white rounded-[24px] m-1">
            <DatasetsSection onNavigateToExportSetup={onNavigateToExportSetup} />
          </div>
        </div>
      </div>
    );
  }

  // Projects section
  if (activeNavItem === 'projects') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar 
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Main Content - Templates/Assets Section */}
          <TemplatesSection
            onOpenDashboard={onOpenDashboard}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />
        </div>
      </div>
    );
  }

  // Templates section
  if (activeNavItem === 'templates') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar 
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Main Content - Templates Section */}
          <TemplatesSection onOpenDashboard={onOpenDashboard} />
        </div>
      </div>
    );
  }


  // Home section
  if (activeNavItem === 'home') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
            onNavigateToSection={onNavigateToSection}
          />

          {/* Main Content - Home Section */}
          <HomeSection
            onNavigateToSection={(section) => setActiveNavItem(section)}
            onOpenAnalyticsAssistant={onOpenAnalyticsAssistant}
            onOpenDashboard={onOpenDashboard}
          />
        </div>
      </div>
    );
  }

  // Settings + Alerts section
  if (activeNavItem === 'alerts' || activeNavItem === 'settings') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />
          <SettingsSection
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
            onOpenDashboard={onOpenDashboard}
            initialSection={activeNavItem}
          />
        </div>
      </div>
    );
  }

  // Monitoring Home section
  if (activeNavItem === 'monitoring-home') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Main Content - Monitoring Home */}
          <div className="flex-1 overflow-auto bg-white rounded-[24px] m-1">
            <RealTimeMonitoring onOpenAssistant={() => setShowAssistant(true)} />
          </div>
        </div>
      </div>
    );
  }

  // Library section
  if (activeNavItem === 'library') {
    return (
      <div className="h-full bg-[#F7F7F7]">
        <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
          {/* Sidebar */}
          <DiscoverSidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />

          {/* Templates Section (contains its own sidebar + content) */}
          <TemplatesSection
            onOpenDashboard={onOpenDashboard}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />
        </div>
      </div>
    );
  }

  // Default fallback - could be other sections
  return (
    <div className="h-full bg-[#F7F7F7]">
      <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
        {/* Sidebar */}
        <DiscoverSidebar 
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
          isNavCollapsed={isNavCollapsed}
          setIsNavCollapsed={setIsNavCollapsed}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-0 py-6 max-w-6xl mx-auto w-full bg-white rounded-[24px] m-1">
          <div className="mb-6">
            <h1 className="mb-2">Section Under Development</h1>
            <p className="text-muted-foreground">
              This section is currently being developed. Please check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}