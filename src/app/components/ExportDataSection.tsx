import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Download, Cloud, Calendar, Database, FileSpreadsheet, Settings, Check, Clock, AlertCircle, Play, Pause, Trash2, Edit, Copy, Plus, FLORA_PLUS_ICON, TrendingUp, Users, BarChart3, Zap, Package, ExternalLink } from '@/components/icons/flora';
import { toast } from 'sonner';
import { memoryFolders } from './dashboard/data-clean';

// Mock data for scheduled exports
const mockScheduledExports = [
  {
    id: 1,
    name: 'Weekly Agent Performance Report',
    frequency: 'weekly',
    schedule: 'Every Monday at 09:00',
    destination: 'download',
    datasets: ['agent-performance', 'response-times'],
    format: 'csv',
    status: 'active',
    lastRun: '2024-01-15 09:00',
    nextRun: '2024-01-22 09:00',
    createdBy: 'Noah Parker',
    createdDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'Monthly Analytics Backup',
    frequency: 'monthly',
    schedule: 'First day of month at 02:00',
    destination: 's3',
    s3Bucket: 'analytics-backup-bucket',
    datasets: ['agent-performance', 'escalations', 'knowledge-base', 'customer-satisfaction'],
    format: 'json',
    status: 'active',
    lastRun: '2024-01-01 02:00',
    nextRun: '2024-02-01 02:00',
    createdBy: 'Sarah Chen',
    createdDate: '2023-12-15'
  },
  {
    id: 3,
    name: 'Daily Escalation Summary',
    frequency: 'daily',
    schedule: 'Daily at 18:00',
    destination: 's3',
    s3Bucket: 'daily-reports-bucket',
    datasets: ['escalations'],
    format: 'xlsx',
    status: 'paused',
    lastRun: '2024-01-10 18:00',
    nextRun: '-',
    createdBy: 'Mike Rodriguez',
    createdDate: '2024-01-05'
  }
];

// Mock data for export history
const mockExportHistory = [
  {
    id: 1,
    name: 'Agent Performance Q4 Export',
    type: 'one-time',
    datasets: ['agent-performance', 'customer-satisfaction'],
    format: 'xlsx',
    destination: 'download',
    status: 'completed',
    fileSize: '2.4 MB',
    records: '15,420',
    completedAt: '2024-01-15 14:30',
    downloadUrl: '#'
  },
  {
    id: 2,
    name: 'Knowledge Base Analytics',
    type: 'one-time',
    datasets: ['knowledge-base', 'content-performance'],
    format: 'csv',
    destination: 's3',
    s3Bucket: 'analytics-exports',
    status: 'completed',
    fileSize: '4.9 MB',
    records: '27,680',
    completedAt: '2024-01-14 11:15'
  },
  {
    id: 3,
    name: 'Emergency Escalation Data',
    type: 'one-time',
    datasets: ['escalations'],
    format: 'json',
    destination: 'download',
    status: 'failed',
    error: 'Network timeout during export',
    attemptedAt: '2024-01-13 16:45'
  },
  {
    id: 4,
    name: 'Complete Dataset Export',
    type: 'scheduled',
    datasets: ['agent-performance', 'escalations', 'knowledge-base', 'customer-satisfaction', 'response-times', 'content-performance'],
    format: 'csv',
    destination: 'download',
    status: 'in-progress',
    progress: 65,
    startedAt: '2024-01-15 15:00'
  }
];

// Extract datasets from memory folders for the overview
const availableDatasets = memoryFolders.flatMap(folder => 
  folder.insights
    .filter(insight => insight.type === 'dataset')
    .map(insight => ({
      id: `${folder.id}-${insight.id}`,
      name: insight.title,
      description: insight.summary,
      folderName: folder.name,
      createdBy: insight.createdBy,
      views: insight.views || 0,
      // Mock additional metadata
      size: ['2.3 MB', '1.8 MB', '3.4 MB', '1.1 MB', '4.9 MB', '2.7 MB'][Math.floor(Math.random() * 6)],
      records: ['15,420', '8,950', '27,680', '12,340', '31,250', '19,875'][Math.floor(Math.random() * 6)],
      lastUpdated: ['2 hours ago', '1 day ago', '3 days ago', '5 days ago', '1 week ago'][Math.floor(Math.random() * 5)]
    }))
);

// Quick export templates
const exportTemplates = [
  {
    id: 1,
    name: 'Weekly Performance Summary',
    description: 'Agent performance, customer satisfaction, and key metrics',
    datasets: ['agent-performance', 'customer-satisfaction', 'response-times'],
    format: 'xlsx',
    frequency: 'weekly',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: 2,
    name: 'Complete Analytics Backup',
    description: 'Full dataset backup for compliance and analysis',
    datasets: ['all'],
    format: 'json',
    frequency: 'monthly',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  {
    id: 3,
    name: 'Quality Assurance Export',
    description: 'QA metrics and support interaction analysis',
    datasets: ['qa-metrics', 'support-interactions'],
    format: 'csv',
    frequency: 'daily',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
  {
    id: 4,
    name: 'Business Intelligence Pack',
    description: 'Strategic insights and ROI analysis data',
    datasets: ['business-metrics', 'strategic-insights'],
    format: 'xlsx',
    frequency: 'monthly',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-orange-50 border-orange-200 text-orange-700'
  }
];

interface ExportDataSectionProps {
  onNavigateBack?: () => void;
  onNavigateToExportSetup?: () => void;
}

export function ExportDataSection({ onNavigateBack, onNavigateToExportSetup }: ExportDataSectionProps) {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'history'>('scheduled');
  const [scheduledExports, setScheduledExports] = useState(mockScheduledExports);
  const [exportHistory] = useState(mockExportHistory);

  const handleExportConfig = (config: any) => {
    console.log('Export configuration received:', config);
    
    if (config.frequency === 'recurring') {
      // Add to scheduled exports
      const newScheduledExport = {
        id: Date.now(),
        name: `${config.datasets.length > 1 ? 'Multi-Dataset' : 'Dataset'} Export`,
        frequency: config.schedule.interval,
        schedule: `${config.schedule.interval} at ${config.schedule.time}`,
        destination: config.destination,
        ...(config.destination === 's3' && { s3Bucket: config.s3Config.bucket }),
        datasets: config.datasets,
        format: config.format,
        status: 'active',
        lastRun: '-',
        nextRun: 'Calculating...',
        createdBy: 'Noah Parker',
        createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      };
      
      setScheduledExports(prev => [newScheduledExport, ...prev]);
      setActiveTab('scheduled');
      
      toast.success('Recurring export scheduled!', {
        description: `Export will run ${config.schedule.interval} at ${config.schedule.time}`,
        icon: <Clock className="w-4 h-4" />
      });
    } else {
      // Handle one-time export
      if (config.destination === 'download') {
        toast.success('Export started!', {
          description: `Preparing ${config.datasets.length} dataset${config.datasets.length !== 1 ? 's' : ''} for download...`,
          icon: <Download className="w-4 h-4" />
        });
      } else {
        toast.success('Export to S3 initiated!', {
          description: `Uploading to ${config.s3Config.bucket}...`,
          icon: <Cloud className="w-4 h-4" />
        });
      }
      
      setActiveTab('history');
    }
  };

  const handleTemplateSelect = (template: any) => {
    toast.success('Template selected!', {
      description: `Using "${template.name}" template for export setup`,
      icon: <Package className="w-4 h-4" />
    });
    onNavigateToExportSetup?.();
  };

  const toggleExportStatus = (exportId: number) => {
    setScheduledExports(prev => prev.map(exp => 
      exp.id === exportId 
        ? { ...exp, status: exp.status === 'active' ? 'paused' : 'active' }
        : exp
    ));
  };

  const deleteScheduledExport = (exportId: number) => {
    setScheduledExports(prev => prev.filter(exp => exp.id !== exportId));
    toast.success('Scheduled export deleted');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDestinationBadge = (destination: string, s3Bucket?: string) => {
    if (destination === 'download') {
      return <Badge variant="outline" className="gap-1"><Download className="w-3 h-3" />Download</Badge>;
    } else {
      return <Badge variant="outline" className="gap-1"><Cloud className="w-3 h-3" />S3: {s3Bucket}</Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1200px] mx-auto px-[35px] pt-[77px] pb-[21px] space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Export Data</h1>
            <p className="text-muted-foreground">Export your analytics data with flexible scheduling and formatting options</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="gap-2"
              onClick={onNavigateToExportSetup}
            >
              <Plus className={FLORA_PLUS_ICON} />
              New Export
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs Section - Above Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Datasets</p>
                <p className="text-2xl font-medium">{availableDatasets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Schedules</p>
                <p className="text-2xl font-medium">{scheduledExports.filter(e => e.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exports</p>
                <p className="text-2xl font-medium">{exportHistory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Volume</p>
                <p className="text-2xl font-medium">2.1 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-6 border-b border-border">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'scheduled'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Scheduled Exports ({scheduledExports.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Export History
        </button>
      </div>

      {/* Scheduled Exports Tab */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          {scheduledExports.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Scheduled Exports</h3>
                <p className="text-muted-foreground mb-4">Create recurring exports to automate your data workflows</p>
                <Button onClick={onNavigateToExportSetup}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Export
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {scheduledExports.map((exportItem) => (
                <Card key={exportItem.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{exportItem.name}</h3>
                          {getStatusBadge(exportItem.status)}
                          {getDestinationBadge(exportItem.destination, exportItem.s3Bucket)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Schedule:</span> {exportItem.schedule}
                          </div>
                          <div>
                            <span className="font-medium">Last Run:</span> {exportItem.lastRun}
                          </div>
                          <div>
                            <span className="font-medium">Next Run:</span> {exportItem.nextRun}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span><strong>Datasets:</strong> {exportItem.datasets.length}</span>
                          <span><strong>Format:</strong> {exportItem.format.toUpperCase()}</span>
                          <span><strong>Created by:</strong> {exportItem.createdBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExportStatus(exportItem.id)}
                        >
                          {exportItem.status === 'active' ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteScheduledExport(exportItem.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Export History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {exportHistory.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Export History</h3>
                <p className="text-muted-foreground">Your export history will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {exportHistory.map((exportItem) => (
                <Card key={exportItem.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{exportItem.name}</h3>
                          {getStatusBadge(exportItem.status)}
                          {exportItem.destination && getDestinationBadge(exportItem.destination, exportItem.s3Bucket)}
                        </div>
                        
                        {exportItem.status === 'in-progress' && exportItem.progress && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Export Progress</span>
                              <span>{exportItem.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${exportItem.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Datasets:</span> {exportItem.datasets.length}
                          </div>
                          <div>
                            <span className="font-medium">Format:</span> {exportItem.format.toUpperCase()}
                          </div>
                          {exportItem.fileSize && (
                            <div>
                              <span className="font-medium">Size:</span> {exportItem.fileSize}
                            </div>
                          )}
                          {exportItem.records && (
                            <div>
                              <span className="font-medium">Records:</span> {exportItem.records}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 text-sm text-muted-foreground">
                          {exportItem.completedAt && (
                            <span><strong>Completed:</strong> {exportItem.completedAt}</span>
                          )}
                          {exportItem.startedAt && (
                            <span><strong>Started:</strong> {exportItem.startedAt}</span>
                          )}
                          {exportItem.attemptedAt && (
                            <span><strong>Attempted:</strong> {exportItem.attemptedAt}</span>
                          )}
                        </div>
                        
                        {exportItem.error && (
                          <div className="mt-2 text-sm text-red-600">
                            <strong>Error:</strong> {exportItem.error}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {exportItem.status === 'completed' && exportItem.downloadUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {exportItem.status === 'failed' && (
                          <Button variant="outline" size="sm">
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}