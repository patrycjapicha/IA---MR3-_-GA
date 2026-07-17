import React, { useState } from 'react';
import { MediaInput } from '@zendesk-ui/react-components';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RecommendationDrawer } from './RecommendationDrawer';
import { 
  ChevronRight, 
  Undo2, 
  Redo2,
  Search,
  FLORA_SEARCH_ICON,
  floraSearchInputWrapperStyle,
  Calendar,
  User,
  Users,
  Building2,
  Tag,
  BarChart3,
  PieChart,
  LineChart,
  AreaChart,
  TrendingUp,
  Database,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Settings,
  RefreshCw,
  PinIcon,
  Plus,
  X,
  Send,
  Sparkles,
  CheckCircle,
  Edit2,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  History,
  MoreVertical,
  Download,
  Clock
} from '@/components/icons/flora';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import branchIcon from 'figma:asset/f6bf15f9bc3413cfbb23c27e3ff2c4d387b177e4.png';

interface ReportBuilderProps {
  reportTitle: string;
  onSave?: (reportConfig: any) => void;
  onUpdateTitle?: (newTitle: string) => void;
  onOpenAnalyticsAssistant?: (query: string, showResponse: boolean, responseType?: 'default' | 'narrate') => void;
}

// Mock data for the chart
const mockChartData = [
  { name: 'Jan', responseTime: 400, resolution: 350, satisfaction: 420, tickets: 380 },
  { name: 'Feb', responseTime: 300, resolution: 420, satisfaction: 380, tickets: 340 },
  { name: 'Mar', responseTime: 200, resolution: 300, satisfaction: 450, tickets: 290 },
  { name: 'Apr', responseTime: 278, resolution: 380, satisfaction: 400, tickets: 410 },
  { name: 'May', responseTime: 189, resolution: 450, satisfaction: 470, tickets: 350 },
  { name: 'Jun', responseTime: 239, resolution: 390, satisfaction: 440, tickets: 380 },
];

const datasets = [
  { id: 'all-tickets', name: 'All Tickets', type: 'personal' },
  { id: 'resolved-tickets', name: 'Resolved Tickets', type: 'default' },
  { id: 'pending-tickets', name: 'Pending Tickets', type: 'personal' },
  { id: 'escalated-tickets', name: 'Escalated Tickets', type: 'default' },
];

const dateFields = [
  { id: 'created-date', name: 'Created Date', checked: true },
  { id: 'first-reply-date', name: 'Suggested First Reply Date', checked: false },
  { id: 'last-usage-date', name: 'Suggested First Reply Last Usage', checked: false },
  { id: 'resolved-date', name: 'Ticket Resolved Date', checked: false },
];

const dimensionFields = [
  { id: 'agent-first-name', name: 'Agent First Name', checked: false },
  { id: 'agent-group-id', name: 'Agent Group ID', checked: false },
  { id: 'agent-last-name', name: 'Agent Last Name', checked: false },
  { id: 'agent-name', name: 'Agent Name', checked: true },
  { id: 'agent-role', name: 'Agent Role', checked: false },
  { id: 'channel-group', name: 'Channel Group', checked: false },
];

const chartTypes = [
  { id: 'bar', name: 'Bar', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'line', name: 'Line', icon: <LineChart className="w-4 h-4" /> },
  { id: 'pie', name: 'Pie', icon: <PieChart className="w-4 h-4" /> },
  { id: 'area', name: 'Area', icon: <AreaChart className="w-4 h-4" /> },
];

export function ReportBuilder({ reportTitle, onSave, onUpdateTitle, onOpenAnalyticsAssistant }: ReportBuilderProps) {
  const [selectedDataset, setSelectedDataset] = useState('all-tickets');
  const [datasetType, setDatasetType] = useState('personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDates, setSelectedDates] = useState<string[]>(['created-date']);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(['agent-name']);
  const [chartType, setChartType] = useState('bar');
  const [groupingsEnabled, setGroupingsEnabled] = useState(true);
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [limitValue, setLimitValue] = useState('500');
  const [queryField, setQueryField] = useState('CT');
  const [displayOption, setDisplayOption] = useState('Quantity');
  const [visualizationOpen, setVisualizationOpen] = useState(true);
  const [queryNotesOpen, setQueryNotesOpen] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');
  const [hyperGraphEnabled, setHyperGraphEnabled] = useState<boolean>(false);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState<boolean>(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(reportTitle);
  
  // Search states for metrics and attributes
  const [metricsSearchQuery, setMetricsSearchQuery] = useState('');
  const [attributesSearchQuery, setAttributesSearchQuery] = useState('');
  const [describeChangesQuery, setDescribeChangesQuery] = useState('');
  
  // Dropped items in the drop zones
  const [droppedMetrics, setDroppedMetrics] = useState<string[]>([]);
  const [droppedAttributes, setDroppedAttributes] = useState<string[]>([]);
  
  // Conversation state
  interface ConversationMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    insight?: {
      title: string;
      value: string;
      description: string;
      trend?: 'up' | 'down' | 'stable';
    };
  }
  
  interface AnalysisStep {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'processing' | 'pending';
    timestamp?: Date;
  }
  
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([
    {
      id: 1,
      title: 'Data Source Selection',
      description: 'Connected to tickets dataset with 847 records',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Query Processing',
      description: 'Ready to analyze your data',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Visualization Selection',
      description: 'Will recommend best chart type',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Grouping Applied',
      description: 'Awaiting grouping preferences',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Filters Applied',
      description: 'Ready to apply filters',
      status: 'pending'
    }
  ]);
  
  const [dropZonesCollapsed, setDropZonesCollapsed] = useState(false);
  const [memoryDrawerOpen, setMemoryDrawerOpen] = useState(false);
  const [activeBuilderTab, setActiveBuilderTab] = useState<string>('manual');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showRecommendationDrawer, setShowRecommendationDrawer] = useState(false);

  const handleSaveReport = () => {
    const reportConfig = {
      title: reportTitle,
      dataset: selectedDataset,
      datasetType,
      chartType,
      dateFields: selectedDates,
      dimensions: selectedDimensions,
      groupings: groupingsEnabled,
      filters: filtersEnabled,
      limit: parseInt(limitValue),
      queryField,
      displayOption,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave?.(reportConfig);
  };

  const handleDateFieldChange = (fieldId: string, checked: boolean) => {
    if (checked) {
      setSelectedDates([...selectedDates, fieldId]);
    } else {
      setSelectedDates(selectedDates.filter(id => id !== fieldId));
    }
  };

  const handleDimensionChange = (fieldId: string, checked: boolean) => {
    if (checked) {
      setSelectedDimensions([...selectedDimensions, fieldId]);
    } else {
      setSelectedDimensions(selectedDimensions.filter(id => id !== fieldId));
    }
  };

  // Mock insights generator
  const generateInsight = (query: string) => {
    const insights = [
      {
        title: 'Agent Performance',
        value: '87%',
        description: 'Average resolution rate across all agents with Sarah leading at 94% efficiency',
        trend: 'up' as const
      },
      {
        title: 'Peak Activity Hours',
        value: '2-4 PM',
        description: 'Highest ticket volume occurs between 2-4 PM with 34% of daily tickets',
        trend: 'stable' as const
      },
      {
        title: 'Resolution Time',
        value: '2.3 hours',
        description: 'Average time to resolution decreased by 15% compared to last month',
        trend: 'down' as const
      },
      {
        title: 'Category Distribution',
        value: 'Technical: 45%',
        description: 'Technical issues represent 45% of tickets, followed by billing at 28%',
        trend: 'stable' as const
      }
    ];
    
    return insights[Math.floor(Math.random() * insights.length)];
  };

  // Handle query submission
  const handleSendQuery = () => {
    if (!queryText.trim()) return;

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: queryText,
      timestamp: new Date()
    };

    // Add user message
    setConversation(prev => [...prev, userMessage]);

    // Clear input
    const currentQuery = queryText;
    setQueryText('');

    // Update analysis steps
    setAnalysisSteps(prev => prev.map(step => {
      if (step.id === 2) {
        return {
          ...step,
          description: `Analyzing: "${currentQuery}"`,
          status: 'processing' as const,
          timestamp: new Date()
        };
      }
      return step;
    }));

    // Simulate processing delay
    setTimeout(() => {
      const insight = generateInsight(currentQuery);
      
      const assistantMessage: ConversationMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: `Based on your query "${currentQuery}", I've analyzed the data and found some key insights.`,
        timestamp: new Date(),
        insight
      };

      setConversation(prev => [...prev, assistantMessage]);

      // Update analysis steps with completed processing
      setAnalysisSteps(prev => prev.map(step => {
        switch (step.id) {
          case 2:
            return {
              ...step,
              description: `Query processed: "${currentQuery}"`,
              status: 'completed' as const,
              timestamp: new Date()
            };
          case 3:
            return {
              ...step,
              description: 'Bar chart recommended for comparative analysis',
              status: 'completed' as const,
              timestamp: new Date()
            };
          case 4:
            return {
              ...step,
              description: 'Agent grouping applied based on performance data',
              status: 'completed' as const,
              timestamp: new Date()
            };
          case 5:
            return {
              ...step,
              description: 'Time-based filters applied for recent data',
              status: 'completed' as const,
              timestamp: new Date()
            };
          default:
            return step;
        }
      }));
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-background">
      <div
        className="h-full w-full flex flex-col transition-all duration-300 rounded-tl-lg overflow-hidden"
        style={{ marginRight: showRecommendationDrawer ? '420px' : '0' }}
      >
        {/* Header with breadcrumb navigation */}
        <div className="border-b border-border bg-white px-[21px] py-[8px] rounded-tl-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center group">
              {isEditingTitle ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onUpdateTitle?.(editedTitle);
                      setIsEditingTitle(false);
                    } else if (e.key === 'Escape') {
                      setEditedTitle(reportTitle);
                      setIsEditingTitle(false);
                    }
                  }}
                  onBlur={() => {
                    onUpdateTitle?.(editedTitle);
                    setIsEditingTitle(false);
                  }}
                  className="h-8 text-base"
                  autoFocus
                />
              ) : (
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <span className="text-foreground text-base font-normal">
                    {reportTitle || 'New Report'}
                  </span>
                  <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Undo action');
                  }}
                  disabled={true}
                  className="p-2 h-8 w-8 hover:bg-muted"
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Redo action');
                  }}
                  disabled={true}
                  className="p-2 h-8 w-8 hover:bg-muted"
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMemoryDrawerOpen(true)}
                className="gap-2 text-sm"
              >
                <img src={branchIcon} alt="" className="w-4 h-4" />
                Memory
              </Button>
              {false && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (onOpenAnalyticsAssistant) {
                    onOpenAnalyticsAssistant('Provide a summary of this report', true, 'narate');
                  }
                }}
                className="gap-2 text-sm bg-white text-foreground border-black hover:bg-gray-50 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-foreground" />
                Explain
              </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveReport}
                className="gap-2 text-sm bg-primary text-primary-foreground border-primary hover:bg-primary/90 rounded-full"
              >
                Save
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-2 h-8 w-8 hover:bg-muted"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                {showMoreMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <Card className="absolute right-0 top-12 w-48 z-50 shadow-lg">
                      <CardContent className="p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={() => {
                            console.log('Export report');
                            setShowMoreMenu(false);
                          }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={() => {
                            console.log('Schedule report');
                            setShowMoreMenu(false);
                          }}
                        >
                          <Clock className="w-4 h-4" />
                          <span>Schedule</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <div className={`${leftPanelCollapsed ? 'w-12' : 'w-80'} border-r border-border bg-white overflow-y-auto transition-all duration-300 relative`}>
            {/* Collapse/Expand Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-muted"
            >
              <ChevronRight 
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  leftPanelCollapsed ? '' : 'rotate-180'
                }`} 
              />
            </Button>
            
            {!leftPanelCollapsed && (
              <div className="p-4 space-y-6">
                {/* Dataset Section */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Dataset</h3>
                  <div className="space-y-3">
                    <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {datasets.map((dataset) => (
                          <SelectItem key={dataset.id} value={dataset.id}>
                            <div className="flex items-center gap-2">
                              <Database className="w-4 h-4" />
                              {dataset.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <RadioGroup value={datasetType} onValueChange={setDatasetType}>


                    </RadioGroup>
                  </div>
                </div>

                

                {/* Tabs for Manual / Assistant */}
                <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    {false && (
                    <TabsTrigger value="assistant">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                        <span>Copilot</span>
                      </div>
                    </TabsTrigger>
                    )}
                  </TabsList>

                  {/* Manual Tab */}
                  <TabsContent value="manual" className="space-y-6 mt-4">
                    {/* Metrics Section */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-foreground">Metrics</h3>
                      </div>
                      
                      {/* Search for Metrics */}
                      <MediaInput
                        isCompact
                        type="search"
                        placeholder="Search metrics..."
                        aria-label="Search metrics"
                        value={metricsSearchQuery}
                        onChange={(e) => setMetricsSearchQuery(e.target.value)}
                        start={<Search className={FLORA_SEARCH_ICON} />}
                        wrapperProps={{
                          style: { ...floraSearchInputWrapperStyle('100%'), marginBottom: 12 },
                        }}
                      />
                      
                      <div className="space-y-2">
                        {dateFields
                          .filter(field => 
                            field.name.toLowerCase().includes(metricsSearchQuery.toLowerCase())
                          )
                          .map((field) => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={field.id}
                              checked={selectedDates.includes(field.id)}
                              onCheckedChange={(checked) => handleDateFieldChange(field.id, !!checked)}
                            />
                            <Label htmlFor={field.id} className="text-sm text-foreground flex-1">
                              {field.name}
                            </Label>
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Attributes Section */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-foreground">Attributes</h3>
                      </div>
                      
                      {/* Search for Attributes */}
                      <MediaInput
                        isCompact
                        type="search"
                        placeholder="Search attributes..."
                        aria-label="Search attributes"
                        value={attributesSearchQuery}
                        onChange={(e) => setAttributesSearchQuery(e.target.value)}
                        start={<Search className={FLORA_SEARCH_ICON} />}
                        wrapperProps={{
                          style: { ...floraSearchInputWrapperStyle('100%'), marginBottom: 12 },
                        }}
                      />
                      
                      <div className="space-y-2">
                        {dimensionFields
                          .filter(field => 
                            field.name.toLowerCase().includes(attributesSearchQuery.toLowerCase())
                          )
                          .map((field) => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={field.id}
                              checked={selectedDimensions.includes(field.id)}
                              onCheckedChange={(checked) => handleDimensionChange(field.id, !!checked)}
                            />
                            <Label htmlFor={field.id} className="text-sm text-foreground flex-1">
                              {field.name}
                            </Label>
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Assistant Tab */}
                  {false && (
                  <TabsContent value="assistant" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <h3 className="text-muted-foreground text-base">
                        Describe changes you want to make in report
                      </h3>

                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Suggestions</h4>
                        <div className="space-y-2">
                          <button className="w-full text-left px-4 py-3 text-sm bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors border-0 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
                            <span>Show average resolution time by priority</span>
                          </button>
                          <button className="w-full text-left px-4 py-3 text-sm bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors border-0 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
                            <span>Add ticket count grouped by status</span>
                          </button>
                          <button className="w-full text-left px-4 py-3 text-sm bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors border-0 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
                            <span>Filter tickets from last 30 days</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  )}
                </Tabs>

                {/* Describe Changes Composer at Bottom - Hidden when Manual tab is active */}
                {false && (
                  <div className="mt-auto pt-6">
                    
                    <div className="relative">
                      <Input
                        value={describeChangesQuery}
                        onChange={(e) => setDescribeChangesQuery(e.target.value)}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 pr-10 h-24"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && describeChangesQuery.trim()) {
                            console.log('Apply changes:', describeChangesQuery);
                            setDescribeChangesQuery('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (describeChangesQuery.trim()) {
                            console.log('Apply changes:', describeChangesQuery);
                            setDescribeChangesQuery('');
                          }
                        }}
                        className={`absolute right-1 bottom-1 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                          describeChangesQuery.trim() 
                            ? 'bg-black text-white hover:bg-black/90' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                        disabled={!describeChangesQuery.trim()}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Visualization Header */}
            <div className="border-b border-border bg-white">
              <Collapsible open={visualizationOpen} onOpenChange={setVisualizationOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/20 transition-colors">
                  <h3 className="font-medium text-foreground">Visualization</h3>
                  <ChevronRight 
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      visualizationOpen ? 'rotate-90' : ''
                    }`} 
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Type</Label>
                        <Select value={chartType} onValueChange={setChartType}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {chartTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                <div className="flex items-center gap-2">
                                  {type.icon}
                                  {type.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      

                      <div>
                        <Label className="text-sm font-medium text-foreground">Display</Label>
                        <Select value={displayOption} onValueChange={setDisplayOption}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Quantity">Quantity</SelectItem>
                            <SelectItem value="Percentage">Percentage</SelectItem>
                            <SelectItem value="Sum">Sum</SelectItem>
                            <SelectItem value="Average">Average</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium text-foreground">Groupings</Label>
                          <Switch
                            checked={groupingsEnabled}
                            onCheckedChange={setGroupingsEnabled}
                          />
                        </div>
                        {groupingsEnabled && (
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select attribute to group by" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="agent-name">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  Agent Name
                                </div>
                              </SelectItem>
                              <SelectItem value="agent-id">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  Agent ID
                                </div>
                              </SelectItem>
                              <SelectItem value="team">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  Team
                                </div>
                              </SelectItem>
                              <SelectItem value="department">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4" />
                                  Department
                                </div>
                              </SelectItem>
                              <SelectItem value="tags">
                                <div className="flex items-center gap-2">
                                  <Tag className="w-4 h-4" />
                                  Tags
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      

                      
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Drop Zone Area for Metrics and Attributes */}
            <div className="border-b border-border bg-white">
              <Collapsible open={!dropZonesCollapsed} onOpenChange={(open) => setDropZonesCollapsed(!open)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/20 transition-colors">
                  <h3 className="font-medium text-foreground">Selected Fields</h3>
                  <ChevronRight 
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      !dropZonesCollapsed ? 'rotate-90' : ''
                    }`} 
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Metrics Drop Zone */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Selected Metrics</Label>
                        <div className="min-h-[100px] border-2 border-dashed border-border rounded-lg p-3 bg-muted/20">
                          {selectedDates.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedDates.map(dateId => {
                                const field = dateFields.find(f => f.id === dateId);
                                return field ? (
                                  <div 
                                    key={dateId}
                                    className="flex items-center gap-2 bg-white border border-border rounded px-2 py-1 text-sm"
                                  >
                                    <Calendar className="w-3 h-3 text-muted-foreground" />
                                    <span>{field.name}</span>
                                    <button
                                      onClick={() => handleDateFieldChange(dateId, false)}
                                      className="ml-1 text-muted-foreground hover:text-foreground"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                              Select metrics from the left panel
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Attributes Drop Zone */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Selected Attributes</Label>
                        <div className="min-h-[100px] border-2 border-dashed border-border rounded-lg p-3 bg-muted/20">
                          {selectedDimensions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedDimensions.map(dimId => {
                                const field = dimensionFields.find(f => f.id === dimId);
                                return field ? (
                                  <div 
                                    key={dimId}
                                    className="flex items-center gap-2 bg-white border border-border rounded px-2 py-1 text-sm"
                                  >
                                    <User className="w-3 h-3 text-muted-foreground" />
                                    <span>{field.name}</span>
                                    <button
                                      onClick={() => handleDimensionChange(dimId, false)}
                                      className="ml-1 text-muted-foreground hover:text-foreground"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                              Select attributes from the left panel
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Filters Drop Zone */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Selected Filters</Label>
                        <div className="min-h-[100px] border-2 border-dashed border-border rounded-lg p-3 bg-muted/20">
                          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                            Select filters from the left panel
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Chart Area */}
            <div className="flex-1 bg-muted/20">
              <div className="h-full">
                {chartType === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px'
                        }} 
                      />
                      <Bar 
                        dataKey="responseTime" 
                        fill="#000000" 
                        radius={[4, 4, 0, 0]}
                        name="Opened"
                      />
                      <Bar 
                        dataKey="resolution" 
                        fill="#8B5CF6" 
                        radius={[4, 4, 0, 0]}
                        name="Received"
                      />
                      <Bar 
                        dataKey="satisfaction" 
                        fill="#3DCCE7" 
                        radius={[4, 4, 0, 0]}
                        name="Clicked"
                      />
                      <Bar 
                        dataKey="tickets" 
                        fill="#3B82F6" 
                        radius={[4, 4, 0, 0]}
                        name="Sent"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {chartType !== 'bar' && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Chart preview for {chartType} type</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query Notes Drawer */}
      <Drawer open={queryNotesOpen} onOpenChange={setQueryNotesOpen} direction="right">
        <DrawerContent className={`h-full ${hyperGraphEnabled ? '!w-[600px] !max-w-[600px]' : '!w-[400px] !max-w-[400px]'} ml-auto flex flex-col fixed right-0 top-0 z-[100] bg-background text-foreground border-l border-border`}>
          <DrawerHeader className="border-b border-border p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <DrawerTitle className="text-foreground">Analytics assistant</DrawerTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Analysis steps</Label>
                  <Switch
                    checked={hyperGraphEnabled}
                    onCheckedChange={setHyperGraphEnabled}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQueryNotesOpen(false)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription className="sr-only">
              Add and manage query notes for this report
            </DrawerDescription>
          </DrawerHeader>
          
          {/* Main Content Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="h-full flex flex-col">
              {/* Content Layout */}
              <div className={`flex-1 ${hyperGraphEnabled ? 'flex gap-4' : ''}`}>
                {/* Conversation Section */}
                <div className={`${hyperGraphEnabled ? 'flex-1' : 'w-full'} space-y-4`}>
                  {conversation.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Ask me anything about your data</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {conversation.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          } rounded-lg p-3`}>
                            <p className="text-sm">{message.content}</p>
                            
                            {message.insight && (
                              <div className="mt-3 p-3 bg-background/10 rounded-lg border border-border/20">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-sm">{message.insight.title}</h4>
                                  <div className="flex items-center gap-1">
                                    <span className="text-lg font-semibold">{message.insight.value}</span>
                                    {message.insight.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                    {message.insight.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                                  </div>
                                </div>
                                <p className="text-xs opacity-90">{message.insight.description}</p>
                              </div>
                            )}
                            
                            <div className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Hyper Graph Section - Only visible when enabled */}
                {hyperGraphEnabled && (
                  <div className="flex-1 border-l border-border pl-4">
                    <div className="space-y-4">
                      <div className="text-sm text-foreground font-medium">Analysis Steps</div>
                      
                      {/* Analysis Flow - Flowchart Style */}
                      <div className="space-y-4">
                        {analysisSteps.map((step, index) => (
                          <div key={step.id} className="relative">
                            {/* Connecting Arrow from Previous Step */}
                            {index > 0 && (
                              <div className="absolute -top-4 left-4">
                                <div className="w-0.5 h-4 bg-border"></div>
                              </div>
                            )}
                            
                            {/* Step Card */}
                            <div className={`relative p-3 rounded-lg border-2 transition-all ${
                              step.status === 'completed' 
                                ? 'bg-background border-border' 
                                : step.status === 'processing'
                                ? 'bg-orange-50 border-orange-200 animate-pulse'
                                : 'bg-muted/20 border-border'
                            } ${index === analysisSteps.length - 1 && step.status === 'completed' ? 'border-primary/50 bg-primary/5' : ''}`}>
                              
                              <div className="flex items-start gap-3">
                                {/* Status Icon */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  step.status === 'completed' 
                                    ? 'bg-green-100' 
                                    : step.status === 'processing'
                                    ? 'bg-orange-100'
                                    : 'bg-muted'
                                }`}>
                                  {step.status === 'completed' && (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  )}
                                  {step.status === 'processing' && (
                                    <RefreshCw className="w-5 h-5 text-orange-600 animate-spin" />
                                  )}
                                  {step.status === 'pending' && (
                                    <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                                  )}
                                </div>
                                
                                {/* Step Content */}
                                <div className="flex-1 min-w-0">
                                  <div className={`font-medium mb-1 text-sm ${
                                    step.status === 'completed' 
                                      ? 'text-foreground' 
                                      : step.status === 'processing'
                                      ? 'text-foreground'
                                      : 'text-muted-foreground'
                                  }`}>
                                    {step.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {step.description}
                                  </div>
                                  {step.timestamp && (
                                    <div className="text-xs text-muted-foreground/70 mt-1">
                                      {step.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Composer at Bottom */}
          <div className="border-t border-border p-4 flex-shrink-0">
            <div className="relative">
              <Input
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="What you want to discover"
                className="bg-input-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 pr-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && queryText.trim()) {
                    handleSendQuery();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendQuery}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                disabled={!queryText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Floating Query Notes Button */}

        </DrawerContent>
      </Drawer>

      {/* Memory Drawer */}
      <Drawer open={memoryDrawerOpen} onOpenChange={setMemoryDrawerOpen} direction="right">
        <DrawerContent className="h-full !w-[500px] !max-w-[500px] ml-auto flex flex-col fixed right-0 top-0 z-[100] bg-background text-foreground border-l border-border">
          <DrawerHeader className="border-b border-border p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={branchIcon} alt="" className="w-5 h-5" />
                <DrawerTitle className="text-foreground">Memory</DrawerTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMemoryDrawerOpen(false)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription className="sr-only">
              View analysis steps, summary, and notes
            </DrawerDescription>
          </DrawerHeader>
          
          {/* Main Content Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Tabs defaultValue="steps" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="analysis">Analysis Note</TabsTrigger>
              </TabsList>

              {/* Steps Tab */}
              <TabsContent value="steps" className="space-y-0 mt-4">
                <div className="space-y-0">
                  {analysisSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Step Card */}
                      <div className={`relative p-3 rounded-lg border-2 transition-all ${
                        step.status === 'completed' 
                          ? 'bg-background border-border' 
                          : step.status === 'processing'
                          ? 'bg-orange-50 border-orange-200 animate-pulse'
                          : 'bg-muted/20 border-border'
                      } ${index === analysisSteps.length - 1 && step.status === 'completed' ? 'border-primary/50 bg-primary/5' : ''}`}>
                        
                        <div className="flex items-start gap-3">
                          {/* Step Content */}
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium mb-1 text-sm ${
                              step.status === 'completed' 
                                ? 'text-foreground' 
                                : step.status === 'processing'
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {step.description}
                            </div>
                            {step.timestamp && (
                              <div className="text-xs text-muted-foreground/70 mt-1">
                                {step.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Connecting Arrow to Next Step */}
                      {index < analysisSteps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="space-y-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-3">This report analyzes ticket data across multiple dimensions including agent performance, resolution times, and customer satisfaction metrics.</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5"></div>
                      <span>Dataset: All Tickets (847 records)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5"></div>
                      <span>Time Range: Last 6 months</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5"></div>
                      <span>Visualization: Bar Chart</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5"></div>
                      <span>Grouping: Agent Name</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Analysis Note Tab */}
              <TabsContent value="analysis" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Key Insights</div>
                    <p className="text-sm text-muted-foreground">
                      Agent performance shows strong correlation with ticket complexity. Consider redistributing high-priority tickets more evenly across the team.
                    </p>
                  </div>
                  <div 
                    className="p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setShowRecommendationDrawer(true)}
                  >
                    <div className="text-sm font-medium text-foreground mb-1">Recommendations</div>
                    <p className="text-sm text-muted-foreground">
                      Focus on reducing resolution time during peak hours (2-4 PM) by allocating additional support resources.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Data Quality</div>
                    <p className="text-sm text-muted-foreground">
                      All metrics validated. 3% of records missing agent assignment data.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Recommendation Details Drawer */}
      <RecommendationDrawer 
        open={showRecommendationDrawer}
        onOpenChange={setShowRecommendationDrawer}
      />
    </div>
  );
}