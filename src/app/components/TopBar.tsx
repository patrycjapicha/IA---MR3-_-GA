import React, { useState, useEffect } from 'react';
import { Button as FloraButton, IconButton, MD, SM, Menu, Item, ItemGroup } from '@zendesk-ui/react-components';
import { FloraSearchInput } from './FloraSearchInput';
import { Button } from './ui/button';
import {
  Avatar, AvatarFallback, AvatarImage,
} from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { HelpCircle, Bell, Settings, LogOut, User, FileText, MessageCircle, Book, Video, Mail, ExternalLink, ChevronRight, Plus, FLORA_PLUS_ICON, Hash, AtSign, AlertTriangle, Download, X, ChevronDown, Paperclip, Maximize2, History, Sparkles, Sparkles as SparkleIcon, Copy, Share, Smile, Users, UserCircle, Share2, BarChart3Stroke, LayoutStroke, DatabaseStroke, FolderStroke, FilterStroke, Send as SendArrowIcon, Zendesk, FLORA_NAV_ICON, Search } from '@/components/icons/flora';
import { Input } from './ui/input';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import AiVisual from '../imports/AiVisual-6024-1841';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AvatarComponent from '../imports/Avatar';

const FLORA_MENU_ICON = 'size-[16px] shrink-0 text-muted-foreground';
const FLORA_HEADER_ICON = 'size-[20px] shrink-0 text-muted-foreground';
const FLORA_BTN_ICON = '!size-[16px] shrink-0';
const FLORA_TAB_ICON = 'size-[16px] shrink-0';
const FLORA_RECT_RADIUS = 'rounded-[8px]';
// Flora uses fixed px (theme.space.base=4), not rem — html font-size is 14px here
const FLORA_NAV_WIDTH = 'w-[56px]';
const FLORA_NAV_ICON_WRAPPER = 'size-[32px] flex items-center justify-center rounded-[8px] text-foreground';
const FLORA_HEADER_CLASS =
  'sticky top-0 z-50 relative flex items-center py-[8px] pr-[8px] pl-0 gap-[8px] box-border whitespace-nowrap bg-[#F7F7F7] shrink-0';
const FLORA_HEADER_CONTROL = 'h-[32px] shrink-0';
const FLORA_TAB = FLORA_RECT_RADIUS;

interface SlackNotification {
  id: number;
  channel: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'update' | 'mention';
  unread: boolean;
}

interface DashboardTab {
  id: string;
  title: string;
  type: 'dashboard' | 'report';
  isActive: boolean;
  data?: any;
}

interface TopBarProps {
  onCreateDashboard?: () => void;
  onCreateReport?: () => void;
  onCreateProject?: () => void;
  onCreateDataset?: () => void;
  notifications?: SlackNotification[];
  unreadNotificationCount?: number;
  onToggleNotificationsDrawer?: () => void;
  onMarkNotificationAsRead?: (id: number) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onExportData?: (config: any) => void;
  openTabs?: DashboardTab[];
  activeTabId?: string | null;
  onSwitchTab?: (tabId: string) => void;
  onCloseTab?: (tabId: string) => void;
  showAnalyticsAssistant?: boolean;
  onToggleAnalyticsAssistant?: (show: boolean) => void;
  assistantQuery?: string;
  onAssistantQueryChange?: (query: string) => void;
  assistantShowResponse?: boolean;
  assistantResponseType?: 'default' | 'narrate';
  assistantRecommendationData?: any;
  onNavigateToSection?: (section: string) => void;
  currentSection?: string;
  showLegacyTooltipFromParent?: boolean;
  onCloseLegacyTooltip?: () => void;
}

export function TopBar({
  onCreateDashboard,
  onCreateReport,
  onCreateProject,
  onCreateDataset,
  notifications = [],
  unreadNotificationCount = 0,
  onToggleNotificationsDrawer,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onExportData,
  openTabs = [],
  activeTabId,
  onSwitchTab,
  onCloseTab,
  showAnalyticsAssistant = false,
  onToggleAnalyticsAssistant,
  assistantQuery = '',
  onAssistantQueryChange,
  assistantShowResponse = false,
  assistantResponseType = 'default',
  assistantRecommendationData,
  onNavigateToSection,
  currentSection = 'home',
  showLegacyTooltipFromParent = false,
  onCloseLegacyTooltip
}: TopBarProps) {
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAnalyticsMenu, setShowAnalyticsMenu] = useState(false);
  const [selectedView, setSelectedView] = useState('Analytics');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [showAssistantResponse, setShowAssistantResponse] = useState(false);
  const [copilotTab, setCopilotTab] = useState<'chat' | 'history'>('chat');
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const [animatedIcon, setAnimatedIcon] = useState<'dashboard' | 'report'>('dashboard');

  const showLegacyTooltip = showLegacyTooltipFromParent;

  // Animate icon switching
  useEffect(() => {
    if (showLegacyTooltipFromParent) {
      const interval = setInterval(() => {
        setAnimatedIcon(prev => prev === 'dashboard' ? 'report' : 'dashboard');
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showLegacyTooltipFromParent]);
  
  // Create Project Modal states
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [newAccessEmail, setNewAccessEmail] = useState('');
  const [newAccessPermission, setNewAccessPermission] = useState<'view' | 'edit' | 'manage'>('edit');
  const [accessList, setAccessList] = useState<Array<{
    id: string;
    name: string;
    type: 'person' | 'group';
    permission: 'view' | 'edit' | 'manage';
    avatar: string | null;
  }>>([
    {
      id: '1',
      name: 'Noah (You)',
      type: 'person',
      permission: 'manage',
      avatar: null
    }
  ]);

  // Sync showAssistantResponse with prop when drawer opens
  React.useEffect(() => {
    if (showAnalyticsAssistant && assistantShowResponse) {
      setShowAssistantResponse(true);
    } else if (!showAnalyticsAssistant) {
      // Reset when drawer closes
      setShowAssistantResponse(false);
    }
  }, [showAnalyticsAssistant, assistantShowResponse]);

  // Mock data for AI response
  const mockSourceReports = [
    {
      id: 1,
      title: 'Q4 Customer Satisfaction Report',
      snippet: 'Comprehensive analysis of customer satisfaction metrics for Q4 2024',
      date: 'Dec 15, 2024'
    },
    {
      id: 2,
      title: 'Agent Performance Dashboard',
      snippet: 'Monthly performance insights across all support agents',
      date: 'Dec 10, 2024'
    },
    {
      id: 3,
      title: 'Resolution Time Trends',
      snippet: 'Analysis of ticket resolution times by category and priority',
      date: 'Dec 8, 2024'
    },
    {
      id: 4,
      title: 'Support Volume Analysis',
      snippet: 'Tracking support ticket volume and distribution patterns',
      date: 'Dec 5, 2024'
    }
  ];

  const mockAiSummary = `Based on your recent analytics data, customer satisfaction has shown steady improvement over the past quarter. Here are the key insights:

**Key Findings:**

**1. Customer Satisfaction Trends**
* Overall CSAT score increased by 12% compared to last quarter
* Response time improvements contributed significantly to higher satisfaction
* Self-service adoption reduced ticket volume by 18%

**2. Agent Performance**
* Top performers maintained 95%+ satisfaction ratings
* Average resolution time decreased by 25 minutes
* Training initiatives showed positive impact on newer agents

**3. Efficiency Improvements**
* CoPilot introduction reduced average handling time by 27%
* Automated routing improved first-response times
* Knowledge base updates decreased escalations by 15%

These improvements indicate strong momentum in customer experience metrics.`;

  // Generate recommendation content if recommendation data is provided
  const generateRecommendationContent = () => {
    if (!assistantRecommendationData) return null;
    
    return `**Recommendation Details**

${assistantRecommendationData.title}

${assistantRecommendationData.description}

**Rationale**
Tickets with some intents tend to be routed to the same agent.

**Supporting insights**
* **Detected intents:** Sending documentation, Create new account, Signup issue, Recover account, Set up access if deceased, Account was hacked, Change phone number, Change social security number, Change tax number.
* Most of these tickets were routed to the same agent: **EMEA Group**.
* 482 related tickets
* Average manual triage time 2h 45min

**Next step**
Automate this action with a trigger to reduce manual triage and help improve resolution time.

*Based on a sample of 48,200 tickets from July 16, 2025 to July 23, 2025.*`;
  };

  const displayContent = assistantRecommendationData ? generateRecommendationContent() : mockAiSummary;

  const handleSendQuery = () => {
    if (assistantQuery.trim()) {
      setShowAssistantResponse(true);
    }
  };

  const helpCenterItems = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of analytics platform',
      icon: <Book className="w-4 h-4" />,
      items: [
        'Platform overview',
        'Setting up your first dashboard',
        'Understanding metrics'
      ]
    },
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: <FileText className="w-4 h-4" />,
      items: [
        'User guide',
        'API documentation',
        'Integration tutorials'
      ]
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: <Video className="w-4 h-4" />,
      items: [
        'Dashboard creation',
        'Advanced analytics',
        'Best practices'
      ]
    },
    {
      title: 'Support',
      description: 'Get help from our team',
      icon: <MessageCircle className="w-4 h-4" />,
      items: [
        'Submit a ticket',
        'Live chat',
        'Community forum'
      ]
    }
  ];

  const userMenuItems = [
    { label: 'Profile', icon: <User className="w-4 h-4" /> },
    { label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];



  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'mention': return <AtSign className="w-4 h-4 text-blue-500" />;
      case 'update': return <Bell className="w-4 h-4 text-muted-foreground" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleCreateMenuChange = (changes: { type?: string; value?: string }) => {
    if (changes.type !== 'menuItem:click' || !changes.value) return;

    switch (changes.value) {
      case 'report':
        onCreateReport?.();
        break;
      case 'dashboard':
        onCreateDashboard?.();
        break;
      case 'dataset':
        onCreateDataset?.();
        break;
      case 'project':
        setShowCreateProjectModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header className={FLORA_HEADER_CLASS}>
        {/* Nav-aligned brand slot — 56px column, matches DiscoverSidebar icon frame */}
        <div className={`${FLORA_NAV_WIDTH} ${FLORA_HEADER_CONTROL} shrink-0 flex items-center justify-center`}>
          <div className={FLORA_NAV_ICON_WRAPPER}>
            <Zendesk className={FLORA_NAV_ICON} />
          </div>
        </div>

        {/* Product selector — Flora Header.Button: isBasic, small, not pill */}
        <div className="relative shrink-0">
          <FloraButton
            isBasic
            size="small"
            onClick={() => setShowAnalyticsMenu(!showAnalyticsMenu)}
          >
            <MD tag="span" isBold className="!text-foreground">Analytics</MD>
            <FloraButton.EndIcon>
              <ChevronDown className={FLORA_BTN_ICON} />
            </FloraButton.EndIcon>
          </FloraButton>

          {showAnalyticsMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowAnalyticsMenu(false)}
              />
              <Card className="absolute left-0 top-12 w-64 z-50 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">View Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    onClick={() => {
                      setSelectedView('Analytics');
                      setShowAnalyticsMenu(false);
                    }}
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      <LayoutStroke className="size-[20px]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">Analytics</div>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 text-muted-foreground hover:bg-muted/50"
                    onClick={() => {
                      setSelectedView('Reports');
                      setShowAnalyticsMenu(false);
                    }}
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      <BarChart3Stroke className="size-[20px]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">Reports</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Asset tabs */}
        {openTabs.length > 0 && (
          <div className="flex items-center gap-2 min-w-0 overflow-x-auto">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`box-border flex items-center gap-[6px] px-[8px] ${FLORA_HEADER_CONTROL} ${FLORA_TAB} transition-colors whitespace-nowrap ${
                  tab.isActive
                    ? 'text-white border border-[#293239]'
                    : 'text-foreground hover:bg-muted/50 border border-border'
                }`}
                style={tab.isActive ? { backgroundColor: '#293239' } : undefined}
              >
                <button
                  type="button"
                  onClick={() => onSwitchTab?.(tab.id)}
                  className={`flex items-center gap-1.5 min-w-0 h-full ${tab.isActive ? 'text-white' : 'text-foreground'}`}
                >
                  {tab.type === 'dashboard' ? (
                    <LayoutStroke className={`${FLORA_TAB_ICON} ${tab.isActive ? 'text-white' : 'text-muted-foreground'}`} />
                  ) : (
                    <BarChart3Stroke className={`${FLORA_TAB_ICON} ${tab.isActive ? 'text-white' : 'text-muted-foreground'}`} />
                  )}
                  <MD tag="span" className={`truncate max-w-[120px] ${tab.isActive ? '!text-white' : '!text-foreground'}`}>{tab.title}</MD>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab?.(tab.id);
                  }}
                  className={`p-0.5 rounded-sm transition-colors ${
                    tab.isActive
                      ? 'hover:bg-white/20 text-white/70 hover:text-white'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Create — Flora Menu with groups, icons, and hint text */}
        <div className="relative shrink-0">
          <Menu
            placement="bottom-start"
            hasArrow={false}
            onChange={handleCreateMenuChange}
            style={{ minWidth: 320 }}
            button={(props) => (
              <FloraButton {...props} isBasic size="small">
                <FloraButton.StartIcon>
                  <Plus className={FLORA_BTN_ICON} />
                </FloraButton.StartIcon>
                <MD tag="span" className="!text-foreground">Create</MD>
              </FloraButton>
            )}
          >
            <ItemGroup legend="Create new">
              <Item
                value="report"
                icon={<BarChart3Stroke className={FLORA_MENU_ICON} />}
              >
                Report
              </Item>
              <Item
                value="dashboard"
                icon={<LayoutStroke className={FLORA_MENU_ICON} />}
              >
                Dashboard
              </Item>
            </ItemGroup>
            <ItemGroup>
              <Item
                value="project"
                icon={<FolderStroke className={FLORA_MENU_ICON} />}
              >
                Project
                <Item.Meta>Organize related assets into projects for access management and more.</Item.Meta>
              </Item>
            </ItemGroup>
            <ItemGroup>
              <Item
                value="dataset"
                icon={<DatabaseStroke className={FLORA_MENU_ICON} />}
              >
                Dataset
                <Item.Meta>Create, combine, clean, and prepare datasets for analysis.</Item.Meta>
              </Item>
              <Item
                value="filter-set"
                icon={<FilterStroke className={FLORA_MENU_ICON} />}
              >
                Filter set
                <Item.Meta>Create set of reusable filter values to share across reports and dashboards.</Item.Meta>
              </Item>
            </ItemGroup>
          </Menu>
        </div>

        {/* Flora Header.Spacer — pushes actions to the end */}
        <div className="flex-grow min-w-0" aria-hidden="true" />

        {/* Compact search — collapses to an icon, reveals input on click */}
        {isSearchOpen ? (
          <FloraSearchInput
            placeholder="Search analytics"
            aria-label="Search analytics"
            width={220}
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => {
              if (!searchQuery) setIsSearchOpen(false);
            }}
          />
        ) : (
          <IconButton
            size="small"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search analytics"
          >
            <Search className={FLORA_HEADER_ICON} />
          </IconButton>
        )}

        {/* Flora Header.Separator — 24px tall, 4px horizontal margin */}
        <hr className="h-[24px] w-px border-0 bg-border shrink-0 mx-[4px]" aria-hidden="true" />

        <div className="relative z-[200] shrink-0">
          <FloraButton
            isBasic
            size="small"
            onClick={() => window.open('https://www.figma.com/make/og2SiEB4vIHMKLQ6k0xTsb/MR3---Explore-only?t=bGoPOcWtIAcU9IFY-20&fullscreen=1', '_blank')}
          >
              <FloraButton.StartIcon>
                <ExternalLink className={FLORA_BTN_ICON} />
              </FloraButton.StartIcon>
              <MD tag="span" className="!text-foreground">Open Explore</MD>
            </FloraButton>

            {/* Violet Onboarding Tooltip */}
            {showLegacyTooltip && (
              <div className="fixed top-[56px] right-[74px] w-[320px] z-[9999] animate-in fade-in duration-700" style={{ pointerEvents: 'auto', display: currentSection === 'library' ? 'none' : 'block' }}>
                <div className="relative">
                  {/* Arrow pointing up */}
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-[#293239] transform rotate-45 animate-in fade-in duration-700 delay-100"></div>

                  {/* Tooltip content */}
                  <div className="relative rounded-2xl p-6 shadow-lg bg-[#293239]">
                    <button
                      onClick={() => onCloseLegacyTooltip?.()}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>

                    <div className="pr-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <LayoutStroke
                            className={`size-[20px] text-white absolute transition-all duration-500 ${
                              animatedIcon === 'dashboard' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                          />
                          <BarChart3Stroke
                            className={`size-[20px] text-white absolute transition-all duration-500 ${
                              animatedIcon === 'report' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                          />
                        </div>
                        <p className="text-white text-base leading-[20px] font-semibold">
                          Your legacy assets are now here.
                        </p>
                      </div>
                      <p className="text-white text-base leading-[18px] mb-4">
                        Zendesk Analytics is transforming. Create new assets with Agentic analytics for a faster, easier experience.
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-white/70 text-base">2 of 2</span>
                        <FloraButton isPill onClick={() => onCloseLegacyTooltip?.()}>
                          Ok
                        </FloraButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Flora Header.Separator — right side of Open Explore */}
        <hr className="h-[24px] w-px border-0 bg-border shrink-0 mx-[4px]" aria-hidden="true" />

        <IconButton
          size="small"
          onClick={() => setShowHelpCenter(!showHelpCenter)}
          aria-label="Help"
        >
          <HelpCircle className={FLORA_HEADER_ICON} />
        </IconButton>

        <div className="relative shrink-0 h-[32px] flex items-center">
          <IconButton
            size="small"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <div className="size-[20px] overflow-hidden rounded-full flex items-center justify-center">
              <AvatarComponent />
            </div>
          </IconButton>

            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <Card className="absolute right-0 top-12 w-64 z-50 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="Noah" />
                        <AvatarFallback className="bg-primary/10 text-primary">N</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Noah</div>
                        <div className="text-sm text-muted-foreground">noah@company.com</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {userMenuItems.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        {item.icon}
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                    
                    <Separator className="my-2" />
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
        </div>
      </header>
      
      {/* Make Assistant Drawer */}
      <Drawer open={showAnalyticsAssistant} onOpenChange={onToggleAnalyticsAssistant} direction="right" modal={false}>
        {/* Background overlay to match top bar color */}
        {showAnalyticsAssistant && (
          <div 
            className="fixed top-[56px] right-[8px] h-[calc(100vh-64px)] transition-all duration-300 z-40"
            style={{
              width: isAssistantExpanded ? 'calc(100vw - 64px - 16px)' : '412px',
              backgroundColor: '#F7F7F7'
            }}
          />
        )}
        
        <DrawerContent 
          className={`fixed top-[56px] right-0 h-[calc(100vh-64px)] flex flex-col transition-all duration-300 z-50 border-l border-border bg-background rounded-[24px] overflow-hidden`}
          style={isAssistantExpanded ? { width: 'calc(100vw - 64px)', maxWidth: 'calc(100vw - 64px)' } : { width: '420px', maxWidth: '420px' }}
        >
          <DrawerHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-base font-medium">Analyst copilot</DrawerTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="h-8 w-8 p-0"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAssistantExpanded(!isAssistantExpanded)}
                  className="h-8 w-8 p-0"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onToggleAnalyticsAssistant?.(false);
                    setIsAssistantExpanded(false);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DrawerDescription className="sr-only">
              AI-powered assistant to help you build and customize your analytics
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            {!showAssistantResponse ? (
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-8 h-8">
                      <SparkleIcon />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-normal mb-2">Welcome to Analyst copilot</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-base font-medium text-foreground">What I can do:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Answer questions about your data and trends using existing sources</li>
                    <li>• Provide tips on how to report on data if you don't have experience</li>
                    <li>• Generate insights based on your analytics</li>
                    <li>• Help you create dashboards and reports tailored to your needs</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="text-base font-medium text-foreground">Try asking me:</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="question-bubble">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6743E1' }} />
                      <span className="text-base leading-[18px] tracking-[-0.08px] text-muted-foreground">What are the trends in ticket volume this month?</span>
                    </button>
                    <button className="question-bubble">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6743E1' }} />
                      <span className="text-base leading-[18px] tracking-[-0.08px] text-muted-foreground">Show me resolution time analytics by category</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recommendation Content - Different layout */}
                {assistantRecommendationData ? (
                  <div className="space-y-6">
                    {/* Title and Description */}
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold leading-[24px] text-foreground tracking-[-0.45px]">{assistantRecommendationData.title}</h2>
                      <p className="text-base leading-[20px] text-foreground tracking-[-0.154px]">{assistantRecommendationData.description}</p>
                    </div>

                    {/* Tags */}
                    {assistantRecommendationData.tags && assistantRecommendationData.tags.length > 0 && (
                      <div className="flex gap-3 flex-wrap">
                        {assistantRecommendationData.tags.map((tag: any, index: number) => (
                          <div 
                            key={index}
                            className="px-2 py-0.5 rounded-[16px] flex items-center gap-1"
                            style={{ 
                              backgroundColor: index === 0 ? '#f4f5fc' : '#f4f5f6'
                            }}
                          >
                            <span 
                              className="text-sm font-semibold leading-[16px] tracking-[-0.0004px]"
                              style={{ color: tag.color }}
                            >
                              {tag.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rationale Section */}
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold leading-[20px] text-foreground tracking-[-0.154px]">Rationale</h3>
                      <p className="text-base leading-[20px] text-foreground tracking-[-0.154px]">Tickets with some intents tend to be routed to the same agent.</p>
                    </div>

                    {/* Supporting Insights Section */}
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold leading-[20px] text-foreground tracking-[-0.154px]">Supporting insights</h3>
                      <ul className="space-y-2 text-base leading-[20px] text-foreground tracking-[-0.154px]">
                        <li className="list-disc ml-5">
                          <span className="font-semibold">Detected intents:</span> Sending documentation, Create new account, Signup issue, Recover account, Set up access if deceased, Account was hacked, Change phone number, Change social security number, Change tax number.
                        </li>
                        <li className="list-disc ml-5">
                          Most of these tickets were routed to the same agent: <span className="font-semibold">EMEA Group</span>.
                        </li>
                        <li className="list-disc ml-5">482 related tickets</li>
                        <li className="list-disc ml-5">Average manual triage time 2h 45min</li>
                      </ul>
                      <button className="text-base leading-[20px] text-[#1f73b7] tracking-[-0.154px] hover:underline">
                        View related tickets
                      </button>
                    </div>

                    {/* Next Step Section */}
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold leading-[20px] text-foreground tracking-[-0.154px]">Next step</h3>
                      <p className="text-base leading-[20px] text-foreground tracking-[-0.154px]">Automate this action with a trigger to reduce manual triage and help improve resolution time.</p>
                    </div>

                    {/* Footnote */}
                    <p className="text-sm leading-[16px] text-muted-foreground tracking-[-0.0004px]">Based on a sample of 48,200 tickets from July 16, 2025 to July 23, 2025.</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button className="px-4 py-2.5 rounded-full border border-black text-base leading-[20px] text-foreground tracking-[-0.154px] hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                      <button className="px-4 py-2.5 rounded-full bg-black text-white text-base leading-[20px] tracking-[-0.154px] hover:bg-foreground transition-colors">
                        Review trigger
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* AI Summary */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6">
                          <AiVisual />
                        </div>
                        <h3 className="text-sm font-medium text-foreground">AI Summary</h3>
                      </div>
                      <div className="p-4 rounded-lg bg-background">
                        <div className="text-base text-foreground leading-relaxed">
                          {displayContent.split('\n\n').map((section, index) => {
                            if (section.trim() === '') return null;
                            
                            // Handle "Key Findings:" header
                            if (section.includes('**Key Findings:**')) {
                              return (
                                <div key={index} className="mb-4">
                                  <h4 className="font-semibold text-foreground mb-3">Key Findings:</h4>
                                </div>
                              );
                            }
                            
                            // Handle numbered sections (1., 2., 3.)
                            if (section.match(/^\*\*\d+\./)) {
                              const lines = section.split('\n');
                              const header = lines[0].replace(/^\*\*/, '').replace(/\*\*$/, '');
                              const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('*'));
                              
                              return (
                                <div key={index} className="mb-4">
                                  <h5 className="font-semibold text-foreground mb-2">{header}</h5>
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
                        </div>
                      </div>
                    </div>

                    {/* View Report Button and Copy/Share icons - Only show for default type */}
                    {assistantResponseType === 'default' && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 px-4 gap-2 bg-black text-white hover:bg-black/90 rounded-full"
                          onClick={() => {
                            console.log('View report clicked');
                          }}
                        >
                          View report
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Copy"
                          onClick={() => {
                            navigator.clipboard.writeText(mockAiSummary);
                          }}
                        >
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Share"
                          onClick={() => {}}
                        >
                          <Share2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    )}

                    {/* Sources - Only show for default type and not recommendations */}
                    {assistantResponseType === 'default' && !assistantRecommendationData && (
                      <div>
                        <h4 className="text-base font-medium text-foreground mb-3">Sources</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Agent performance weekly · Alex Quek · 3h ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Response metrics Q4 · Maria Lopez · 1d ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Team performance report · Operations Team · 2d ago</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-border p-4">
            <div className="relative">
              <textarea
                placeholder="Ask Analyst copilot..."
                className={`w-full pt-3 px-4 pr-16 pb-10 border border-border rounded-lg resize-none focus:outline-none transition-all text-base bg-white text-foreground overflow-y-auto leading-normal ${
                  isTextareaExpanded ? 'min-h-[200px] max-h-[400px]' : 'min-h-[100px] max-h-[200px]'
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e0 transparent'
                }}
                value={assistantQuery}
                onChange={(e) => onAssistantQueryChange?.(e.target.value)}
              />

              {/* Add Context Button - Positioned inside text area at bottom left */}
              <button
                className="absolute bottom-3 left-3 w-[28px] h-[28px] bg-white border border-[#e9ebed] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className={FLORA_PLUS_ICON} />
              </button>

              {/* Expand/Collapse Button */}
              <button
                className="absolute bottom-3 left-12 w-[28px] h-[28px] bg-white border border-[#e9ebed] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={() => setIsTextareaExpanded(!isTextareaExpanded)}
                title={isTextareaExpanded ? 'Collapse' : 'Expand'}
              >
                <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
              </button>

              {/* Submit Button - Positioned inside text area at bottom right */}
              <button
                className={`absolute bottom-3 right-3 transition-opacity ${
                  assistantQuery.trim()
                    ? 'opacity-100 hover:opacity-90'
                    : 'opacity-40'
                }`}
                onClick={handleSendQuery}
                disabled={!assistantQuery.trim()}
              >
                <SendArrowIcon className={assistantQuery.trim() ? 'text-foreground' : 'text-gray-400'} />
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

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
                <Select value={newAccessPermission} onValueChange={(value: 'view' | 'edit' | 'manage') => setNewAccessPermission(value)}>
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
                          permission: newAccessPermission,
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
                        onValueChange={(value: 'view' | 'edit' | 'manage') => {
                          setAccessList(accessList.map(a =>
                            a.id === access.id ? { ...a, permission: value } : a
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
                          <X className="w-4 h-4" />
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
                  {
                    id: '1',
                    name: 'Noah (You)',
                    type: 'person',
                    permission: 'manage',
                    avatar: null
                  }
                ]);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (projectName.trim()) {
                  onCreateProject?.();
                  setShowCreateProjectModal(false);
                  setProjectName('');
                  setNewAccessEmail('');
                  setAccessList([
                    {
                      id: '1',
                      name: 'Noah (You)',
                      type: 'person',
                      permission: 'manage',
                      avatar: null
                    }
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
    </>
  );
}