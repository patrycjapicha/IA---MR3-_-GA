import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import { Input } from './ui/input';
import { ArrowLeft, Download, Share, ExternalLink, TrendingUp, TrendingDown, AlertTriangle, Users, FileText, Target, Brain, Zap, Calendar, BarChart3, CheckCircle, ArrowRight, Info, Lightbulb, Eye, BookOpen, ThumbsUp, ThumbsDown, Settings, RefreshCw, PinIcon, Plus, FLORA_PLUS_ICON, X } from '@/components/icons/flora';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ComposedChart, Area, AreaChart, PieChart } from 'recharts';

interface ReportData {
  title: string;
  period: string;
  generated: string;
}

interface KnowledgeBaseReportProps {
  reportData: ReportData;
  onBackToDashboard: () => void;
}

// Sample data for the 3-month report
const quarterlyMetrics = {
  overview: {
    totalArticles: 1250,
    articlesCreated: 89,
    articlesUpdated: 156,
    totalQueries: 45678,
    escalationRate: { current: 12.5, change: -4.2 },
    automationRate: { current: 88.4, change: +15.3 },
    customerSatisfaction: { current: 4.2, change: +0.8 },
    avgResolutionTime: { current: 2.3, change: -1.2 }
  },
  monthlyTrends: [
    { month: 'Oct', escalationRate: 16.7, automationRate: 73.1, satisfaction: 3.4, articles: 28 },
    { month: 'Nov', escalationRate: 14.8, automationRate: 79.2, satisfaction: 3.8, articles: 31 },
    { month: 'Dec', escalationRate: 12.5, automationRate: 88.4, satisfaction: 4.2, articles: 30 }
  ],
  categoryPerformance: [
    { category: 'Billing', escalationRate: 18.3, improvement: -5.2, queries: 8945 },
    { category: 'Technical', escalationRate: 9.1, improvement: -8.1, queries: 12456 },
    { category: 'Account', escalationRate: 11.8, improvement: -3.4, queries: 9876 },
    { category: 'Mobile', escalationRate: 15.2, improvement: -2.8, queries: 7234 },
    { category: 'Security', escalationRate: 7.3, improvement: -4.5, queries: 4567 }
  ],
  topPerformingArticles: [
    { title: 'Mobile Login Troubleshooting', impact: '+34%', queries: 1247, created: 'Dec 15' },
    { title: 'Two-Factor Authentication Setup', impact: '+28%', queries: 678, created: 'Dec 7' },
    { title: 'Password Reset Guide', impact: '+16%', queries: 1156, updated: 'Nov 14' },
    { title: 'Billing FAQ Update', impact: '+15%', queries: 892, updated: 'Nov 12' }
  ],
  knowledgeGaps: [
    { topic: 'Mobile App Integration', urgency: 'high', queries: 156, trend: 'up' },
    { topic: 'API Documentation', urgency: 'medium', queries: 89, trend: 'stable' },
    { topic: 'Advanced Security Features', urgency: 'medium', queries: 67, trend: 'up' }
  ]
};

const aiImpactData = [
  { week: 'Week 1', before: 73, after: 78, improvement: 5 },
  { week: 'Week 2', before: 78, after: 81, improvement: 3 },
  { week: 'Week 3', before: 81, after: 84, improvement: 3 },
  { week: 'Week 4', before: 84, after: 87, improvement: 3 },
  { week: 'Week 5', before: 87, after: 88, improvement: 1 }
];

const distributionData = [
  { name: 'Fully Automated', value: 68, color: 'var(--color-chart-4)' },
  { name: 'Assisted Resolution', value: 20, color: 'var(--color-chart-1)' },
  { name: 'Human Escalation', value: 12, color: 'var(--color-destructive)' }
];

export function KnowledgeBaseReport({ reportData, onBackToDashboard }: KnowledgeBaseReportProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [queryNotesOpen, setQueryNotesOpen] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reportData.title,
        text: `${reportData.title} - ${reportData.period}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading report...');
  };

  const formatChange = (value: number) => {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value}%`;
  };

  const getChangeColor = (value: number, inverse: boolean = false) => {
    if (inverse) {
      return value > 0 ? 'text-destructive' : 'text-chart-4';
    }
    return value > 0 ? 'text-chart-4' : 'text-destructive';
  };

  const getChangeIcon = (value: number, inverse: boolean = false) => {
    if (inverse) {
      return value > 0 ? <TrendingUp className="w-3 h-3 text-destructive" /> : <TrendingDown className="w-3 h-3 text-chart-4" />;
    }
    return value > 0 ? <TrendingUp className="w-3 h-3 text-chart-4" /> : <TrendingDown className="w-3 h-3 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-0 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBackToDashboard}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="w-px h-6 bg-border"></div>
              <div>
                <h1 className="text-2xl font-medium text-foreground">{reportData.title}</h1>
                <p className="text-muted-foreground">{reportData.period} • Generated {reportData.generated}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('Memory button clicked');
                  setQueryNotesOpen(true);
                }} 
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Memory
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-0 py-8">
        {/* Executive Summary */}
        <div className="mb-12">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Our knowledge base performance over the last three months shows significant improvement across all key metrics. 
                The escalation rate has decreased by <span className="font-medium text-chart-4">4.2%</span> to 12.5%, while automation rates 
                increased by <span className="font-medium text-chart-4">15.3%</span> to 88.4%. Customer satisfaction improved from 3.4 to 4.2 out of 5, 
                representing a <span className="font-medium text-chart-4">23.5% improvement</span> in user experience.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-medium text-foreground mb-1">
                    {quarterlyMetrics.overview.escalationRate.current}%
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Escalation Rate</div>
                  <div className={`flex items-center justify-center gap-1 text-xs ${getChangeColor(quarterlyMetrics.overview.escalationRate.change, true)}`}>
                    {getChangeIcon(quarterlyMetrics.overview.escalationRate.change, true)}
                    {formatChange(quarterlyMetrics.overview.escalationRate.change)}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-medium text-foreground mb-1">
                    {quarterlyMetrics.overview.automationRate.current}%
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Automation Rate</div>
                  <div className={`flex items-center justify-center gap-1 text-xs ${getChangeColor(quarterlyMetrics.overview.automationRate.change)}`}>
                    {getChangeIcon(quarterlyMetrics.overview.automationRate.change)}
                    {formatChange(quarterlyMetrics.overview.automationRate.change)}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-medium text-foreground mb-1">
                    {quarterlyMetrics.overview.customerSatisfaction.current}/5
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Customer Satisfaction</div>
                  <div className={`flex items-center justify-center gap-1 text-xs ${getChangeColor(quarterlyMetrics.overview.customerSatisfaction.change)}`}>
                    {getChangeIcon(quarterlyMetrics.overview.customerSatisfaction.change)}
                    {formatChange(quarterlyMetrics.overview.customerSatisfaction.change * 10)}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-medium text-foreground mb-1">
                    {quarterlyMetrics.overview.avgResolutionTime.current}h
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Avg Resolution Time</div>
                  <div className={`flex items-center justify-center gap-1 text-xs ${getChangeColor(quarterlyMetrics.overview.avgResolutionTime.change, true)}`}>
                    {getChangeIcon(quarterlyMetrics.overview.avgResolutionTime.change, true)}
                    {formatChange(quarterlyMetrics.overview.avgResolutionTime.change * 10)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Monthly Trends */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-chart-4" />
                  Quarterly Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={quarterlyMetrics.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                      <Tooltip />
                      
                      <Bar yAxisId="left" dataKey="articles" fill="var(--color-primary)" opacity={0.3} />
                      <Line yAxisId="right" type="monotone" dataKey="automationRate" stroke="var(--color-chart-4)" strokeWidth={3} />
                      <Line yAxisId="right" type="monotone" dataKey="escalationRate" stroke="var(--color-destructive)" strokeWidth={3} />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="var(--color-chart-2)" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart Insights */}
                <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-chart-1" />
                    <h4 className="font-medium text-foreground">Key Insights from Trends</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                      <span><strong>Consistent article output:</strong> Maintained steady content creation (~30 articles/month) while dramatically improving performance metrics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <span><strong>Inverse correlation:</strong> As automation rates climbed from 73% to 88%, escalation rates dropped from 16.7% to 12.5%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                      <span><strong>Customer satisfaction surge:</strong> 23.5% improvement suggests content quality improvements directly impact user experience</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resolution Distribution */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-chart-1" />
                  Query Resolution Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <PieChart 
                        data={distributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </PieChart>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {distributionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>

                {/* Chart Insights */}
                <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-chart-1" />
                    <h4 className="font-medium text-foreground">Distribution Analysis</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                      <span><strong>Automation excellence:</strong> 68% fully automated resolution exceeds industry benchmark of 55%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0"></div>
                      <span><strong>Hybrid efficiency:</strong> 20% assisted resolution shows effective AI-human collaboration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <span><strong>Escalation target:</strong> 12% escalation rate is approaching industry best practice of 8-10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Performance */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-chart-2" />
                Category Performance Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Escalation rates and improvement trends across knowledge base categories
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyMetrics.categoryPerformance.map((category, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-foreground">{category.category}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {category.queries.toLocaleString()} queries
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-foreground">{category.escalationRate}%</div>
                        <div className={`flex items-center gap-1 text-xs ${getChangeColor(category.improvement, true)}`}>
                          {getChangeIcon(category.improvement, true)}
                          {formatChange(category.improvement)}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-chart-4 to-chart-1" 
                        style={{ width: `${Math.max(5, category.escalationRate)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Analysis Insights */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-chart-1" />
                  <h4 className="font-medium text-foreground">Category Performance Insights</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <span><strong>Billing challenges:</strong> Highest escalation rate (18.3%) despite 8,945 queries suggests complex pricing/policy issues</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                    <span><strong>Technical excellence:</strong> Best performance (9.1% escalation) with highest query volume shows strong documentation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                    <span><strong>Security efficiency:</strong> Lowest escalation rate (7.3%) indicates well-structured security content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0"></div>
                    <span><strong>Mobile opportunity:</strong> 15.2% escalation rate with moderate improvement suggests need for mobile-specific content</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-chart-4" />
                Top Performing Articles
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Articles that drove the highest automation improvements
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {quarterlyMetrics.topPerformingArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-chart-4/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-chart-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{article.title}</h5>
                      <p className="text-xs text-muted-foreground">
                        {article.queries} queries • {article.created ? `Created ${article.created}` : `Updated ${article.updated}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-chart-4">{article.impact}</div>
                    <div className="text-xs text-muted-foreground">automation boost</div>
                  </div>
                </div>
              ))}

              {/* Article Performance Insights */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-chart-1" />
                  <h4 className="font-medium text-foreground">Content Success Factors</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                    <span><strong>Mobile focus pays off:</strong> Mobile login article achieved 34% automation boost with 1,247 queries resolved</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                    <span><strong>Security content wins:</strong> 2FA setup guide shows users prefer step-by-step security guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0"></div>
                    <span><strong>Update strategy:</strong> Updated articles (Password Reset, Billing FAQ) show refreshed content drives performance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-chart-1" />
                Priority Knowledge Gaps
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Areas requiring immediate content development attention
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {quarterlyMetrics.knowledgeGaps.map((gap, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-foreground">{gap.topic}</h5>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        gap.urgency === 'high' 
                          ? 'bg-destructive/10 text-destructive border-destructive/20' 
                          : 'bg-chart-1/10 text-chart-1 border-chart-1/20'
                      }`}
                    >
                      {gap.urgency} priority
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{gap.queries} unanswered queries</span>
                    <div className="flex items-center gap-1">
                      {gap.trend === 'up' && <TrendingUp className="w-3 h-3 text-destructive" />}
                      <span className="text-xs text-muted-foreground">trending {gap.trend}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Knowledge Gap Insights */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-chart-1" />
                  <h4 className="font-medium text-foreground">Gap Analysis</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <span><strong>Mobile integration crisis:</strong> 156 queries trending up indicates urgent need for comprehensive mobile guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0"></div>
                    <span><strong>Developer documentation gap:</strong> API docs show steady demand, opportunity for developer portal expansion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                    <span><strong>Advanced features:</strong> Security queries trending up suggests users need advanced configuration guidance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Impact Analysis */}
        <div className="mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-chart-1" />
                AI Performance Enhancement Timeline
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Weekly progression of AI automation rates following model improvements
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={aiImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} domain={[70, 90]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="after" 
                      stackId="1"
                      stroke="var(--color-chart-4)" 
                      fill="var(--color-chart-4)" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="before" 
                      stackId="2"
                      stroke="var(--color-muted)" 
                      fill="var(--color-muted)" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* AI Impact Insights */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-chart-1" />
                  <h4 className="font-medium text-foreground">AI Enhancement Analysis</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                    <span><strong>Initial acceleration:</strong> First two weeks showed strong 5% and 3% weekly improvements as new model learned</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                    <span><strong>Plateau approach:</strong> Weeks 3-5 show consistent 3% gains, indicating model optimization reaching maturity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0"></div>
                    <span><strong>Performance ceiling:</strong> Final 1% gain suggests current architecture limits; next upgrade needed for further improvement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-5 mt-2 flex-shrink-0"></div>
                    <span><strong>Total impact:</strong> 15% automation improvement (73% to 88%) represents significant operational efficiency gain</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <Card className="shadow-sm border-l-4 border-l-chart-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-chart-4" />
                Strategic Recommendations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Data-driven recommendations based on chart analysis and performance trends
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-chart-4" />
                    Immediate Actions (0-30 days)
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                      <span>Develop comprehensive mobile app integration documentation to address 156 pending queries trending upward</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                      <span>Update billing articles to target the 18.3% escalation rate - highest among all categories despite 8,945 query volume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0"></div>
                      <span>Deploy next-generation AI model to break through the current 88% automation ceiling</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-chart-2" />
                    Strategic Initiatives (30-90 days)
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                      <span>Implement predictive content gap analysis based on trending query patterns identified in mobile and API categories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                      <span>Replicate technical support success (9.1% escalation) model across billing and mobile categories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0"></div>
                      <span>Establish automated content refresh workflows for high-impact articles like "Password Reset Guide" and "Billing FAQ"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Report generated on {reportData.generated} • Analytics Platform v2.1
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This report contains confidential information. Please do not distribute outside authorized stakeholders.
          </p>
        </div>
      </div>

      {/* Query Notes Drawer */}
      <Drawer open={queryNotesOpen} onOpenChange={setQueryNotesOpen} direction="right">
        <DrawerContent className="h-full w-[400px] ml-auto flex flex-col fixed right-0 top-0 z-[100] bg-slate-800 text-white border-l border-slate-700">
          <DrawerHeader className="border-b border-slate-700 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-white text-base font-medium">Query Notes</DrawerTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQueryNotesOpen(false)}
                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription className="sr-only">
              Add and manage query notes for this report
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Query Input */}
            <div className="space-y-2">
              <Input
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="What will you discover?"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => console.log('Thumbs up')}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => console.log('Thumbs down')}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => console.log('Settings')}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => console.log('Refresh')}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => console.log('Pin')}
                >
                  <PinIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sample queries/notes area */}
            <div className="space-y-3 mt-6">
              <div className="text-sm text-slate-300 font-medium">Recent Notes</div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-650 transition-colors">
                  <div className="text-sm text-white mb-1 font-medium">Mobile integration analysis</div>
                  <div className="text-xs text-slate-400">156 queries trending up - needs immediate attention</div>
                </div>
                <div className="p-3 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-650 transition-colors">
                  <div className="text-sm text-white mb-1 font-medium">Billing escalation patterns</div>
                  <div className="text-xs text-slate-400">18.3% rate suggests policy complexity issues</div>
                </div>
                <div className="p-3 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-650 transition-colors">
                  <div className="text-sm text-white mb-1 font-medium">Security feature requests</div>
                  <div className="text-xs text-slate-400">Advanced configuration guidance needed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Query Notes Button */}
          <div className="p-4 border-t border-slate-700 flex-shrink-0">
            <Button 
              className="w-full bg-slate-700 hover:bg-slate-600 border border-amber-500 text-white hover:border-amber-400 transition-colors"
              onClick={() => {
                if (queryText.trim()) {
                  console.log('Adding query:', queryText);
                  setQueryText('');
                } else {
                  console.log('Query Notes clicked');
                }
              }}
            >
              <Plus className={`${FLORA_PLUS_ICON} mr-2`} />
              Query Notes
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}