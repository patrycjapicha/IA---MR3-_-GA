import React, { useState } from 'react';
import { XXL, MD, MediaInput } from '@zendesk-ui/react-components';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Bell, AlertTriangle, Clock, CheckCircle, Search, Filter, MoreVertical, Eye, Edit, Settings as SettingsIcon, Activity, Calendar, ChevronLeft, ChevronRight, X, FLORA_SEARCH_ICON, floraSearchInputWrapperStyle } from '@/components/icons/flora';
import svgPathsCritical from '../imports/svg-oxf3zlxhj3';
import svgPathsWarning from '../imports/svg-nthuxv282e';
import { Switch } from './ui/switch';

interface Alert {
  id: string;
  name: string;
  status: 'active' | 'triggered' | 'resolved';
  condition: string;
  metric: string;
  threshold: string;
  currentValue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  lastTriggered?: string;
  triggeredCount?: number;
  createdDate: string;
  description: string;
  owner: string;
  enabled: boolean;
  recipients: Array<{ id: string; name: string }>;
}

interface AlertsSection {
  onOpenDashboard?: (dashboardInfo: { id: string; title: string; type?: string; section?: string }) => void;
}

export function AlertsSection({ onOpenDashboard }: AlertsSection) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [alertEnabledStates, setAlertEnabledStates] = useState<{ [key: string]: boolean }>({});

  // Mock alert data
  const mockAlerts: Alert[] = [
    {
      id: 'alert-1',
      name: 'Customer Satisfaction Drop',
      status: 'triggered',
      condition: 'CSAT Score drops below',
      metric: 'CSAT Score',
      threshold: '85%',
      currentValue: '82%',
      severity: 'critical',
      lastTriggered: '2 hours ago',
      triggeredCount: 3,
      createdDate: 'Jan 15, 2024',
      description: 'Alert when customer satisfaction score falls below acceptable threshold',
      owner: 'John Doe',
      enabled: true,
      recipients: [
        { id: 'rec-1', name: 'Alice Johnson' },
        { id: 'rec-2', name: 'Bob Brown' }
      ]
    },
    {
      id: 'alert-2',
      name: 'High Resolution Time',
      status: 'triggered',
      condition: 'Average resolution time exceeds',
      metric: 'Resolution Time',
      threshold: '4 hours',
      currentValue: '5.2 hours',
      severity: 'high',
      lastTriggered: '5 hours ago',
      triggeredCount: 2,
      createdDate: 'Jan 10, 2024',
      description: 'Monitor when ticket resolution time exceeds target SLA',
      owner: 'Jane Smith',
      enabled: true,
      recipients: [
        { id: 'rec-3', name: 'Charlie Davis' }
      ]
    },
    {
      id: 'alert-3',
      name: 'Agent Utilization Alert',
      status: 'active',
      condition: 'Agent utilization exceeds',
      metric: 'Utilization Rate',
      threshold: '90%',
      currentValue: '78%',
      severity: 'medium',
      createdDate: 'Jan 8, 2024',
      description: 'Track when agent workload approaches maximum capacity',
      owner: 'Alice Johnson',
      enabled: true,
      recipients: [
        { id: 'rec-4', name: 'John Doe' }
      ]
    },
    {
      id: 'alert-4',
      name: 'Ticket Volume Spike',
      status: 'active',
      condition: 'Daily ticket volume increases by',
      metric: 'Ticket Volume',
      threshold: '30%',
      currentValue: '12%',
      severity: 'high',
      createdDate: 'Jan 5, 2024',
      description: 'Detect unusual spikes in incoming ticket volume',
      owner: 'Bob Brown',
      enabled: true,
      recipients: [
        { id: 'rec-5', name: 'Jane Smith' }
      ]
    },
    {
      id: 'alert-5',
      name: 'First Response Time SLA',
      status: 'active',
      condition: 'First response time exceeds',
      metric: 'Response Time',
      threshold: '2 hours',
      currentValue: '1.3 hours',
      severity: 'medium',
      createdDate: 'Jan 3, 2024',
      description: 'Ensure first response times meet SLA requirements',
      owner: 'Charlie Davis',
      enabled: true,
      recipients: [
        { id: 'rec-6', name: 'Alice Johnson' }
      ]
    }
  ];

  const mockHistoricalAlerts: Alert[] = [
    {
      id: 'hist-1',
      name: 'Customer Satisfaction Drop',
      status: 'resolved',
      condition: 'CSAT Score drops below',
      metric: 'CSAT Score',
      threshold: '85%',
      currentValue: '88%',
      severity: 'critical',
      lastTriggered: '2 days ago',
      triggeredCount: 5,
      createdDate: 'Jan 15, 2024',
      description: 'Alert when customer satisfaction score falls below acceptable threshold',
      owner: 'John Doe',
      enabled: true,
      recipients: [
        { id: 'rec-7', name: 'Bob Brown' }
      ]
    },
    {
      id: 'hist-2',
      name: 'High Resolution Time',
      status: 'resolved',
      condition: 'Average resolution time exceeds',
      metric: 'Resolution Time',
      threshold: '4 hours',
      currentValue: '3.5 hours',
      severity: 'high',
      lastTriggered: '3 days ago',
      triggeredCount: 8,
      createdDate: 'Jan 10, 2024',
      description: 'Monitor when ticket resolution time exceeds target SLA',
      owner: 'Jane Smith',
      enabled: true,
      recipients: [
        { id: 'rec-8', name: 'Charlie Davis' }
      ]
    },
    {
      id: 'hist-3',
      name: 'Agent Utilization Alert',
      status: 'resolved',
      condition: 'Agent utilization exceeds',
      metric: 'Utilization Rate',
      threshold: '90%',
      currentValue: '75%',
      severity: 'medium',
      lastTriggered: '5 days ago',
      triggeredCount: 12,
      createdDate: 'Jan 8, 2024',
      description: 'Track when agent workload approaches maximum capacity',
      owner: 'Alice Johnson',
      enabled: true,
      recipients: [
        { id: 'rec-9', name: 'John Doe' }
      ]
    },
    {
      id: 'hist-4',
      name: 'Ticket Volume Spike',
      status: 'resolved',
      condition: 'Daily ticket volume increases by',
      metric: 'Ticket Volume',
      threshold: '30%',
      currentValue: '18%',
      severity: 'high',
      lastTriggered: '1 week ago',
      triggeredCount: 4,
      createdDate: 'Jan 5, 2024',
      description: 'Detect unusual spikes in incoming ticket volume',
      owner: 'Bob Brown',
      enabled: true,
      recipients: [
        { id: 'rec-10', name: 'Jane Smith' }
      ]
    },
    {
      id: 'hist-5',
      name: 'Knowledge Base Usage Low',
      status: 'resolved',
      condition: 'Self-service rate drops below',
      metric: 'Self-Service Rate',
      threshold: '40%',
      currentValue: '45%',
      severity: 'low',
      lastTriggered: '2 weeks ago',
      triggeredCount: 3,
      createdDate: 'Dec 28, 2023',
      description: 'Monitor self-service adoption and knowledge base effectiveness',
      owner: 'Charlie Davis',
      enabled: true,
      recipients: [
        { id: 'rec-11', name: 'Alice Johnson' }
      ]
    },
    {
      id: 'hist-6',
      name: 'First Contact Resolution Rate',
      status: 'resolved',
      condition: 'FCR rate drops below',
      metric: 'FCR Rate',
      threshold: '70%',
      currentValue: '73%',
      severity: 'medium',
      lastTriggered: '3 weeks ago',
      triggeredCount: 6,
      createdDate: 'Dec 20, 2023',
      description: 'Monitor first contact resolution effectiveness',
      owner: 'Jane Smith',
      enabled: true,
      recipients: [
        { id: 'rec-12', name: 'Bob Brown' }
      ]
    },
    {
      id: 'hist-7',
      name: 'Backlog Growth',
      status: 'resolved',
      condition: 'Unresolved tickets exceeds',
      metric: 'Backlog Size',
      threshold: '200',
      currentValue: '165',
      severity: 'high',
      lastTriggered: '4 weeks ago',
      triggeredCount: 15,
      createdDate: 'Dec 15, 2023',
      description: 'Track when ticket backlog grows beyond capacity',
      owner: 'John Doe',
      enabled: true,
      recipients: [
        { id: 'rec-13', name: 'Alice Johnson' }
      ]
    },
    {
      id: 'hist-8',
      name: 'Customer Wait Time',
      status: 'resolved',
      condition: 'Average wait time exceeds',
      metric: 'Wait Time',
      threshold: '3 minutes',
      currentValue: '2.5 minutes',
      severity: 'medium',
      lastTriggered: '1 month ago',
      triggeredCount: 9,
      createdDate: 'Dec 10, 2023',
      description: 'Alert when customer wait times exceed acceptable levels',
      owner: 'Charlie Davis',
      enabled: true,
      recipients: [
        { id: 'rec-14', name: 'Jane Smith' }
      ]
    },
    {
      id: 'hist-9',
      name: 'Agent Abandonment Rate',
      status: 'resolved',
      condition: 'Abandonment rate exceeds',
      metric: 'Abandonment Rate',
      threshold: '5%',
      currentValue: '3.8%',
      severity: 'critical',
      lastTriggered: '5 weeks ago',
      triggeredCount: 7,
      createdDate: 'Dec 5, 2023',
      description: 'Monitor agent abandonment for quality control',
      owner: 'Alice Johnson',
      enabled: true,
      recipients: [
        { id: 'rec-15', name: 'Bob Brown' }
      ]
    },
    {
      id: 'hist-10',
      name: 'Escalation Rate Increase',
      status: 'resolved',
      condition: 'Escalation rate increases by',
      metric: 'Escalation Rate',
      threshold: '10%',
      currentValue: '8.5%',
      severity: 'high',
      lastTriggered: '6 weeks ago',
      triggeredCount: 11,
      createdDate: 'Nov 28, 2023',
      description: 'Track escalation patterns for training needs',
      owner: 'Jane Smith',
      enabled: true,
      recipients: [
        { id: 'rec-16', name: 'John Doe' }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'triggered': return 'text-red-600 bg-red-50';
      case 'active': return 'text-green-600 bg-green-50';
      case 'resolved': return 'text-gray-600 bg-gray-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'triggered': return <AlertTriangle className="w-4 h-4" />;
      case 'active': return <Activity className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredActiveAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.metric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const filteredHistoricalAlerts = mockHistoricalAlerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.metric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const triggeredAlertsCount = mockAlerts.filter(a => a.status === 'triggered').length;
  const activeAlertsCount = mockAlerts.filter(a => a.status === 'active').length;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar Navigation - Hidden */}
      {false && (
      <div 
        className="h-full border-r border-border bg-background transition-all duration-200 flex-shrink-0 rounded-l-lg"
        style={{ 
          width: sidebarCollapsed ? '60px' : '220px',
          backgroundColor: '#F7F7F7'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header with collapse button */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-border">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                
                <span className="text-base font-medium">Alerts</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 p-0"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation Items */}
          {!sidebarCollapsed && (
            <nav className="space-y-1 p-3">
              <button
                onClick={() => setActiveTab('active')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'active' 
                    ? 'bg-[#4F6BBF]/15 text-[#4F6BBF] font-light' 
                    : 'text-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  <Activity className="w-4 h-4 flex-shrink-0" />
                  Active
                </div>
                <span className="text-sm text-foreground px-2 py-0.5 rounded-md" style={{ backgroundColor: '#FFFFFF' }}>
                  {filteredActiveAlerts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'history' 
                    ? 'bg-[#4F6BBF]/15 text-[#4F6BBF] font-light' 
                    : 'text-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  History
                </div>
                <span className="text-sm text-foreground px-2 py-0.5 rounded-md" style={{ backgroundColor: '#FFFFFF' }}>
                  {filteredHistoricalAlerts.length}
                </span>
              </button>
            </nav>
          )}
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="p-[32px]">
          <div className="mb-[32px]">
            <XXL tag="h1" className="!text-foreground m-0 font-light">Alerts</XXL>
            <MD tag="p" className="!text-muted-foreground m-0 mt-[8px]">
              Set up automated notifications to stay informed about critical metrics and performance changes.
            </MD>
          </div>
        </div>

        {/* Search and Filter Bar - Hidden */}
        {false && (
        <>
        <div className="px-[35px] pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <MediaInput
                isCompact
                type="search"
                placeholder="Search alerts..."
                aria-label="Search alerts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                start={<Search className={FLORA_SEARCH_ICON} />}
                wrapperProps={{
                  style: floraSearchInputWrapperStyle(400),
                }}
              />
            </div>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[180px]" style={{ fontSize: '14px' }}>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-[35px] pb-6">
          {activeTab === 'active' && (
            null
          )}

          {activeTab === 'history' && (
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Name</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Metric</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Threshold</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Resolved Value</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Trigger Count</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Owner</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Recipients</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold">Last Triggered</th>
                    <th className="text-left px-4 py-3 text-sm text-foreground font-semibold w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistoricalAlerts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center">
                        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                          No historical alerts found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredHistoricalAlerts.map((alert, index) => (
                      <tr 
                        key={alert.id} 
                        className={`hover:bg-muted/30 transition-colors opacity-90 ${
                          index !== filteredHistoricalAlerts.length - 1 ? 'border-b border-border' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base text-foreground">{alert.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-base text-[#706F6E]">{alert.metric}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-base text-foreground">{alert.threshold}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-base font-medium text-green-600">
                            {alert.currentValue}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-flex items-center justify-center text-sm px-[8px] py-[3px] rounded font-medium"
                              style={{ backgroundColor: '#F5F6F7', color: '#293239' }}
                            >
                              {alert.triggeredCount || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-base text-[#706F6E]">{alert.owner}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {alert.recipients.slice(0, 2).map((recipient) => (
                              <span
                                key={recipient.id}
                                className="inline-flex items-center text-sm px-[6px] py-[2px] rounded"
                                style={{ backgroundColor: '#E8E7E5', color: '#293239' }}
                              >
                                {recipient.name}
                              </span>
                            ))}
                            {alert.recipients.length > 2 && (
                              <span
                                className="inline-flex items-center text-sm px-[6px] py-[2px] rounded"
                                style={{ backgroundColor: '#E8E7E5', color: '#293239' }}
                              >
                                +{alert.recipients.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-base text-[#706F6E]">
                            {alert.lastTriggered}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}