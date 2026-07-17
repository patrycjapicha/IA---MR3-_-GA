import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { ArrowRight, BarChart3, Users, Brain, Shield, Target, TrendingUp, MessageSquare, Zap, Activity, Home, DollarSign, Database, Settings, Download, ChevronsLeft, ChevronsRight } from '@/components/icons/flora';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'popular' | 'specialized';
  backgroundColor: string;
}

const allTemplates: Template[] = [
  {
    id: 'ai-performance',
    title: 'AI Performance Overview',
    description: 'Automated resolution, escalation, conversation insights',
    icon: <Brain className="w-6 h-6 text-[var(--color-chart-5)]" />,
    backgroundColor: 'bg-[var(--color-chart-5)]/10',
    category: 'popular'
  },
  {
    id: 'team-productivity',
    title: 'Team Productivity',
    description: 'Monitor team performance, SLAs',
    icon: <Users className="w-6 h-6 text-[var(--color-chart-4)]" />,
    backgroundColor: 'bg-[var(--color-chart-4)]/10',
    category: 'popular'
  },
  {
    id: 'knowledge-health',
    title: 'Knowledge Health & Content',
    description: 'Knowledge gaps, article insights',
    icon: <BarChart3 className="w-6 h-6 text-[var(--color-primary)]" />,
    backgroundColor: 'bg-[var(--color-primary)]/10',
    category: 'popular'
  },
  {
    id: 'security-insights',
    title: 'Security & Compliance',
    description: 'Security incident tracking, compliance monitoring',
    icon: <Shield className="w-6 h-6 text-[var(--color-chart-1)]" />,
    backgroundColor: 'bg-[var(--color-chart-1)]/10',
    category: 'popular'
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience',
    description: 'Satisfaction scores, journey analytics, feedback trends',
    icon: <MessageSquare className="w-6 h-6 text-[var(--color-chart-2)]" />,
    backgroundColor: 'bg-[var(--color-chart-2)]/10',
    category: 'popular'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Response times, system performance, efficiency metrics',
    icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
    backgroundColor: 'bg-[#F59E0B]/10',
    category: 'popular'
  },
  {
    id: 'roi-strategy',
    title: 'ROI & Strategy',
    description: 'Cost analysis, business impact, strategic metrics',
    icon: <Target className="w-6 h-6 text-[var(--color-chart-4)]" />,
    backgroundColor: 'bg-[var(--color-chart-4)]/10',
    category: 'specialized'
  },
  {
    id: 'escalation-analysis',
    title: 'Escalation Analysis',
    description: 'Deep dive into escalation patterns and resolution',
    icon: <TrendingUp className="w-6 h-6 text-[var(--color-chart-1)]" />,
    backgroundColor: 'bg-[var(--color-chart-1)]/10',
    category: 'specialized'
  },
  {
    id: 'real-time-monitoring',
    title: 'Real-time Monitoring',
    description: 'Live dashboards, alerts, system health monitoring',
    icon: <Activity className="w-6 h-6 text-[var(--color-destructive)]" />,
    backgroundColor: 'bg-[var(--color-destructive)]/10',
    category: 'specialized'
  }
];

interface AnalyticsOnboardingProps {
  onComplete: (type: 'custom' | 'template', data: { description?: string; templateId?: string }) => void;
}

export function AnalyticsOnboarding({ onComplete }: AnalyticsOnboardingProps) {
  const [customDescription, setCustomDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Show first 6 templates initially, all when expanded
  const visibleTemplates = showAllTemplates ? allTemplates : allTemplates.slice(0, 6);
  const hasMoreTemplates = allTemplates.length > 6;

  const handleCustomSubmit = () => {
    if (customDescription.trim()) {
      onComplete('custom', { description: customDescription });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onComplete('template', { templateId });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Navigation Sidebar */}
        <div className={`${isNavCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-border min-h-screen flex flex-col bg-white`}>
          {/* Navigation */}
          <div className="py-4 flex-1">
            {/* Account Section */}
            {!isNavCollapsed && (
              <div className="px-4 py-1">
              </div>
            )}

            
            <nav className="space-y-0">
              <button
                onClick={() => setActiveNavItem('home')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'home' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'Home' : ''}
              >
                <Home className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>Home</span>}
              </button>
              
              <button
                onClick={() => setActiveNavItem('operational')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'operational' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'Operational Center' : ''}
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>Operational Center</span>}
              </button>
              
              <button
                onClick={() => setActiveNavItem('knowledge')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'knowledge' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'Knowledge & Content' : ''}
              >
                <Database className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>Knowledge & Content</span>}
              </button>
              
              <button
                onClick={() => setActiveNavItem('ai-performance')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'ai-performance' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'AI Agent Performance' : ''}
              >
                <Brain className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>AI Agent Performance</span>}
              </button>
              
              <button
                onClick={() => setActiveNavItem('roi')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'roi' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'ROI & Strategy' : ''}
              >
                <DollarSign className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>ROI & Strategy</span>}
              </button>
            </nav>

            {/* Data Export and Settings */}
            <div className="mt-4">
              {/* Separator line */}
              <div className="px-4 py-2">
                <div className="h-px bg-border"></div>
              </div>

              <button
                onClick={() => setActiveNavItem('data-export')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'data-export' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'Data export' : ''}
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>Data export</span>}
              </button>
              
              <button
                onClick={() => setActiveNavItem('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                  activeNavItem === 'settings' 
                    ? 'bg-black text-white rounded-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isNavCollapsed ? 'justify-center' : ''}`}
                title={isNavCollapsed ? 'Settings' : ''}
              >
                <Settings className="w-4 h-4 flex-shrink-0" />
                {!isNavCollapsed && <span>Settings</span>}
              </button>
            </div>

            {/* Collapse Button at Bottom */}
            <div className="mt-auto p-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="w-8 h-8 flex items-center justify-center bg-background hover:bg-muted/50 border border-border/50 transition-all duration-200"
                title={isNavCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isNavCollapsed ? (
                  <ChevronsRight className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronsLeft className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                </div>
              </div>
              
              <h1 className="mb-4">Your analytics, your way</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Create a dashboard that fits your focus. Describe what you need, or start with one of our curated templates.
              </p>
            </div>

            {/* Custom Description Section - Now at Top */}
            <div className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="mb-2">Describe your analytics focus</h2>
                    <p className="text-sm text-muted-foreground">
                      Use natural language to tell what data you want to track and analyze
                    </p>
                  </div>
                  
                  <div className="relative">
                    <Textarea
                      placeholder="I want to track team performance metrics, focusing on response times, resolution rates, and customer satisfaction scores. I'm particularly interested in identifying bottlenecks in our support workflow and understanding which knowledge base articles are most effective..."
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      className={`min-h-[120px] resize-none border-border bg-background ${customDescription.trim() ? 'pr-12' : ''}`}
                    />
                    {customDescription.trim() && (
                      <Button
                        onClick={handleCustomSubmit}
                        className="absolute bottom-3 right-3 w-8 h-8 p-0 bg-primary hover:bg-primary/90"
                        size="sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Templates Section - Now Below */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="mb-2">Or, start with a template</h2>
                  <p className="text-sm text-muted-foreground">
                    Select a template that best describes your analytics focus
                  </p>
                </div>
              </div>
              
              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {visibleTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:scale-[1.02] ${
                      selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${template.backgroundColor} flex items-center justify-center`}>
                          {template.icon}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs opacity-60 hover:opacity-100">
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-foreground mb-2">{template.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreTemplates && !showAllTemplates && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAllTemplates(true)}
                    className="gap-2"
                  >
                    Load more templates ({allTemplates.length - 6} more)
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Show Less Button */}
              {showAllTemplates && (
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowAllTemplates(false)}
                    className="text-muted-foreground text-sm"
                  >
                    Show fewer templates
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}