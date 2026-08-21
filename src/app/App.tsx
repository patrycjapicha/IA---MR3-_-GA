import React, { useState, useEffect } from 'react';
import './error-suppression'; // MUST be first to intercept errors early
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { KnowledgeBaseReport } from './components/KnowledgeBaseReport';
import { ExportSetupPage } from './components/ExportSetupPage';
import { TopBar } from './components/TopBar';
import { Toaster } from './components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Hash, AtSign, AlertTriangle, Bell } from '@/components/icons/flora';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider, Modal, Button as FloraButton } from '@zendesk-ui/react-components';

// v1.0.2 - Reorganized sections
type AppState = 'dashboard' | 'report' | 'export-setup';

interface ReportData {
  title: string;
  period: string;
  generated: string;
}

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

// The prototype boots with the Customer support performance dashboard already open, as a
// reader would find it: named, populated, and in view mode. `isDefaultDashboard`
// separates it from a dashboard the user creates while the prototype is running
// (which starts blank, unnamed, and in edit mode).
const DEFAULT_DASHBOARD_NAME = 'Customer support performance';

const createInitialDashboardTab = (): DashboardTab => ({
  id: 'dashboard-initial',
  title: DEFAULT_DASHBOARD_NAME,
  type: 'dashboard',
  isActive: true,
  data: {
    dashboardType: 'analytics',
    section: 'overview',
    isNew: true,
    isDefaultDashboard: true,
    dashboardName: DEFAULT_DASHBOARD_NAME,
    projectName: 'My project',
    createdAt: new Date().toISOString()
  }
});

export default function App() {
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [notifications, setNotifications] = useState<SlackNotification[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);
  const [initialTab] = useState<DashboardTab>(createInitialDashboardTab);
  const [openTabs, setOpenTabs] = useState<DashboardTab[]>([initialTab]);
  const [activeTabId, setActiveTabId] = useState<string | null>(initialTab.id);
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState<boolean>(false);
  const [showAnalyticsAssistant, setShowAnalyticsAssistant] = useState<boolean>(false);
  const [assistantQuery, setAssistantQuery] = useState<string>('');
  const [assistantShowResponse, setAssistantShowResponse] = useState<boolean>(false);
  const [assistantResponseType, setAssistantResponseType] = useState<'default' | 'narrate'>('default');
  const [assistantRecommendationData, setAssistantRecommendationData] = useState<any>(null);
  const [showLegacyTooltip, setShowLegacyTooltip] = useState<boolean>(false);
  // Tab pending a close confirmation (unsaved changes guard)
  const [tabPendingClose, setTabPendingClose] = useState<DashboardTab | null>(null);

  const handleShowLegacyTooltip = () => {
    setShowLegacyTooltip(true);
  };

  const handleReportGeneration = (reportInfo: ReportData) => {
    setReportData(reportInfo);
    setAppState('report');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const handleNavigateToExportSetup = () => {
    setAppState('export-setup');
  };

  const handleBackToExportData = () => {
    setAppState('dashboard');
    setCurrentSection('datasets');
  };

  const handleNavigateToSection = (section: string) => {
    setAppState('dashboard');
    setCurrentSection(section);

    // Deactivate any active tab when navigating to a main section, but keep tabs visible
    if (activeTabId) {
      const updatedTabs = openTabs.map(tab => ({ ...tab, isActive: false }));
      setOpenTabs(updatedTabs);
      setActiveTabId(null);
    }
  };

  const handleCreateDashboard = () => {
    // Generate a unique ID for the new dashboard
    const dashboardId = `dashboard-${Date.now()}`;
    
    // Create a new dashboard tab
    const newDashboardData = {
      id: dashboardId,
      title: 'New dashboard',
      type: 'dashboard' as const,
      data: {
        dashboardType: 'analytics',
        section: 'overview',
        isNew: true,
        dashboardName: 'New dashboard',
        projectName: 'My project',
        createdAt: new Date().toISOString()
      }
    };

    handleOpenDashboard(newDashboardData);
    console.log(`Created new dashboard tab: ${newDashboardData.title} (${dashboardId})`);
  };

  const handleCreateReport = () => {
    const reportId = `report-${Date.now()}`;

    const newReportData = {
      id: reportId,
      title: 'New Report',
      type: 'report' as const,
      data: {
        reportType: 'analytics',
        isNew: true,
        createdAt: new Date().toISOString()
      }
    };

    handleOpenDashboard(newReportData);
    console.log(`Created new report tab: ${newReportData.title} (${reportId})`);
  };

  const handleNotificationsChange = (newNotifications: SlackNotification[], unreadCount: number) => {
    setNotifications(newNotifications);
    setUnreadNotificationCount(unreadCount);
  };

  const handleMarkNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, unread: false } : n
    ));
    // Update unread count
    setUnreadNotificationCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadNotificationCount(0);
  };

  const handleToggleNotificationsDrawer = () => {
    setNotificationsDrawerOpen(!notificationsDrawerOpen);
  };

  const handleOpenAnalyticsAssistant = (query: string = '', showResponse: boolean = false, responseType: 'default' | 'narrate' = 'default', recommendationData: any = null) => {
    setAssistantQuery(query);
    setAssistantShowResponse(showResponse);
    setAssistantResponseType(responseType);
    setAssistantRecommendationData(recommendationData);
    setShowAnalyticsAssistant(true);
  };

  const handleExportData = (config: any) => {
    // In a real app, this would trigger the actual export process
    console.log('Initiating export with config:', config);
    
    // Simulate export process
    if (config.frequency === 'one-time') {
      if (config.destination === 'download') {
        // Simulate file download
        setTimeout(() => {
          console.log('Download ready');
        }, 2000);
      } else {
        // Simulate S3 upload
        setTimeout(() => {
          console.log('S3 upload completed');
        }, 3000);
      }
    }
  };

  // Tab management functions
  const handleOpenDashboard = (dashboardData: { id: string; title: string; data?: any; type?: 'dashboard' | 'report' }) => {
    const existingTab = openTabs.find(tab => tab.id === dashboardData.id);
    
    if (existingTab) {
      // If tab already exists, just activate it
      setOpenTabs(tabs => tabs.map(tab => ({
        ...tab,
        isActive: tab.id === dashboardData.id
      })));
      setActiveTabId(dashboardData.id);
    } else {
      // Create new tab
      const newTab: DashboardTab = {
        id: dashboardData.id,
        title: dashboardData.title,
        type: dashboardData.type || 'dashboard',
        isActive: true,
        data: dashboardData.data
      };
      
      // Deactivate all other tabs and add new one
      const updatedTabs = openTabs.map(tab => ({ ...tab, isActive: false }));
      setOpenTabs([...updatedTabs, newTab]);
      setActiveTabId(dashboardData.id);
      
      console.log(`Opened new dashboard tab: ${dashboardData.title} (${dashboardData.id})`);
    }
  };

  // Ask for confirmation before closing a tab that may have unsaved changes.
  const handleRequestCloseTab = (tabId: string) => {
    const tab = openTabs.find(t => t.id === tabId);
    if (!tab) return;
    setTabPendingClose(tab);
  };

  const handleConfirmCloseTab = () => {
    if (tabPendingClose) {
      handleCloseTab(tabPendingClose.id);
    }
    setTabPendingClose(null);
  };

  const handleCloseTab = (tabId: string) => {
    const updatedTabs = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(updatedTabs);
    
    // If we closed the active tab, activate the last remaining tab or clear active tab
    if (activeTabId === tabId) {
      if (updatedTabs.length > 0) {
        const lastTab = updatedTabs[updatedTabs.length - 1];
        setActiveTabId(lastTab.id);
        setOpenTabs(tabs => tabs.map(tab => ({
          ...tab,
          isActive: tab.id === lastTab.id
        })));
      } else {
        setActiveTabId(null);
        // Restore default left navigation section when no tabs are open if no section is currently active
        if (!currentSection) {
          setCurrentSection('home');
        }
      }
    }
  };

  const handleSwitchTab = (tabId: string) => {
    setOpenTabs(tabs => tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
    setActiveTabId(tabId);
    console.log(`Switched to tab: ${tabId}`);
  };

  const handleUpdateTabTitle = (tabId: string, newTitle: string) => {
    setOpenTabs(tabs => tabs.map(tab => 
      tab.id === tabId ? { ...tab, title: newTitle } : tab
    ));
    console.log(`Updated tab ${tabId} title to: ${newTitle}`);
  };

  // Enhanced function to handle different dashboard types from recent cards
  const handleOpenRecentDashboard = (dashboardInfo: {
    id: string;
    title: string;
    type?: 'performance' | 'analytics' | 'monitoring' | 'reports';
    section?: string;
    data?: any;
  }) => {
    // Map dashboard types to appropriate data structures
    const dashboardData = {
      id: dashboardInfo.id,
      title: dashboardInfo.title,
      type: 'dashboard' as const,
      data: {
        dashboardType: dashboardInfo.type || 'analytics',
        section: dashboardInfo.section || 'overview',
        ...dashboardInfo.data
      }
    };

    handleOpenDashboard(dashboardData);
  };

  // Set up global window function for TopBar integration
  useEffect(() => {
    (window as any).handleOpenDashboard = handleOpenDashboard;
    return () => {
      delete (window as any).handleOpenDashboard;
    };
  }, [handleOpenDashboard]);

  return (
    <ThemeProvider>
    <ErrorBoundary>
      <div className="h-screen flex flex-col overflow-hidden bg-[#F7F7F7] p-[8px]">
        {appState === 'dashboard' && (
          <>
            <TopBar
              onCreateDashboard={handleCreateDashboard}
              onCreateReport={handleCreateReport}
              notifications={notifications}
              unreadNotificationCount={unreadNotificationCount}
              onToggleNotificationsDrawer={handleToggleNotificationsDrawer}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
              onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
              onExportData={handleNavigateToExportSetup}
              openTabs={openTabs}
              activeTabId={activeTabId}
              onSwitchTab={handleSwitchTab}
              onCloseTab={handleRequestCloseTab}
              showAnalyticsAssistant={showAnalyticsAssistant}
              onToggleAnalyticsAssistant={setShowAnalyticsAssistant}
              assistantQuery={assistantQuery}
              onAssistantQueryChange={setAssistantQuery}
              assistantShowResponse={assistantShowResponse}
              assistantResponseType={assistantResponseType}
              assistantRecommendationData={assistantRecommendationData}
              onNavigateToSection={handleNavigateToSection}
              currentSection={currentSection}
              showLegacyTooltipFromParent={showLegacyTooltip}
              onCloseLegacyTooltip={() => setShowLegacyTooltip(false)}
            />
            <div 
              className="flex-1 overflow-hidden transition-all duration-300"
              style={{ 
                marginRight: showAnalyticsAssistant ? '420px' : '0'
              }}
            >
              <AnalyticsDashboard
                type="custom"
                data={{}}
                onReportGeneration={handleReportGeneration}
                onCreateDashboard={handleCreateDashboard}
                onSectionChange={setCurrentSection}
                onNotificationsChange={handleNotificationsChange}
                onNavigateToExportSetup={handleNavigateToExportSetup}
                onNavigateToSection={handleNavigateToSection}
                initialSection={currentSection}
                onOpenDashboard={handleOpenDashboard}
                activeTabId={activeTabId}
                openTabs={openTabs}
                onOpenAnalyticsAssistant={handleOpenAnalyticsAssistant}
                onUpdateTabTitle={handleUpdateTabTitle}
                onShowLegacyTooltip={handleShowLegacyTooltip}
              />
            </div>
          </>
        )}

        {appState === 'report' && reportData && (
          <>
            <TopBar
              notifications={notifications}
              unreadNotificationCount={unreadNotificationCount}
              onToggleNotificationsDrawer={handleToggleNotificationsDrawer}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
              onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
              onExportData={handleNavigateToExportSetup}
              openTabs={openTabs}
              activeTabId={activeTabId}
              onSwitchTab={handleSwitchTab}
              onCloseTab={handleRequestCloseTab}
              showAnalyticsAssistant={showAnalyticsAssistant}
              onToggleAnalyticsAssistant={setShowAnalyticsAssistant}
              assistantQuery={assistantQuery}
              onAssistantQueryChange={setAssistantQuery}
              assistantShowResponse={assistantShowResponse}
              onNavigateToSection={handleNavigateToSection}
              currentSection={currentSection}
              showLegacyTooltipFromParent={showLegacyTooltip}
              onCloseLegacyTooltip={() => setShowLegacyTooltip(false)}
            />
            <div className="flex-1 overflow-hidden">
              <KnowledgeBaseReport
                reportData={reportData}
                onBackToDashboard={handleBackToDashboard}
              />
            </div>
          </>
        )}

        {appState === 'export-setup' && (
          <>
            <TopBar
              notifications={notifications}
              unreadNotificationCount={unreadNotificationCount}
              onToggleNotificationsDrawer={handleToggleNotificationsDrawer}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
              onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
              onExportData={handleNavigateToExportSetup}
              openTabs={openTabs}
              activeTabId={activeTabId}
              onSwitchTab={handleSwitchTab}
              onCloseTab={handleRequestCloseTab}
              showAnalyticsAssistant={showAnalyticsAssistant}
              onToggleAnalyticsAssistant={setShowAnalyticsAssistant}
              assistantQuery={assistantQuery}
              onAssistantQueryChange={setAssistantQuery}
              assistantShowResponse={assistantShowResponse}
              onNavigateToSection={handleNavigateToSection}
              currentSection={currentSection}
              showLegacyTooltipFromParent={showLegacyTooltip}
              onCloseLegacyTooltip={() => setShowLegacyTooltip(false)}
            />
            <div className="flex-1 overflow-hidden">
              <ExportSetupPage 
                onNavigateBack={handleBackToExportData}
                onExport={handleExportData}
                onNavigateToSection={handleNavigateToSection}
              />
            </div>
          </>
        )}
        
        {/* Notifications Modal */}
        <Dialog open={notificationsDrawerOpen} onOpenChange={setNotificationsDrawerOpen}>
          <DialogContent className="max-w-[500px] max-h-[80vh] flex flex-col p-0">
            <DialogHeader className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <DialogTitle>Notifications</DialogTitle>
              </div>
              <DialogDescription className="sr-only">
                View and manage your notifications
              </DialogDescription>
              {notifications.filter(n => n.unread).length > 0 && (
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="text-xs">
                    {notifications.filter(n => n.unread).length} unread
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllNotificationsAsRead}
                    className="text-xs h-6 px-2"
                  >
                    Mark all as read
                  </Button>
                </div>
              )}
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Bell className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      notification.unread
                        ? 'bg-accent/50 border-primary/20'
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleMarkNotificationAsRead(notification.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {notification.type === 'alert' && (
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          )}
                          {notification.type === 'mention' && (
                            <AtSign className="w-4 h-4 text-primary" />
                          )}
                          {notification.type === 'update' && (
                            <Hash className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-foreground">
                              #{notification.channel}
                            </span>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>

                          <p className="text-sm text-foreground line-clamp-2 mb-1">
                            {notification.message}
                          </p>

                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Unsaved changes confirmation when closing a dashboard/report tab */}
        {tabPendingClose && (
          <Modal onClose={() => setTabPendingClose(null)} restoreFocus>
            <Modal.Header tag="h2">Close without saving?</Modal.Header>
            <Modal.Body>
              You have unsaved changes in “{tabPendingClose.title}”. If you close it now, those changes will be lost.
            </Modal.Body>
            <Modal.Footer>
              <Modal.FooterItem>
                <FloraButton onClick={() => setTabPendingClose(null)}>
                  Cancel
                </FloraButton>
              </Modal.FooterItem>
              <Modal.FooterItem>
                <FloraButton isPrimary isDanger onClick={handleConfirmCloseTab}>
                  Close without saving
                </FloraButton>
              </Modal.FooterItem>
            </Modal.Footer>
            <Modal.Close aria-label="Close" />
          </Modal>
        )}

        <Toaster position="top-right" />
      </div>
    </ErrorBoundary>
    </ThemeProvider>
  );
}