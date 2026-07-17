import React from 'react';
import { XXL, MD } from '@zendesk-ui/react-components';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { 
  TrendingUp, 
  AlertTriangle, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  Star, 
  Users, 
  Bot,
  ArrowRight,
  ChevronRight
} from '@/components/icons/flora';

interface RealTimeMonitoringProps {
  onOpenAssistant?: () => void;
}

export function RealTimeMonitoring({ onOpenAssistant }: RealTimeMonitoringProps) {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1200px] mx-auto p-[32px]">
        {/* Page header — Flora XXL title, MD description, space.lg padding */}
        <div className="mb-[32px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <XXL tag="h1" className="!text-foreground m-0">Real-time monitoring</XXL>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="size-[8px] bg-green-500 rounded-full shrink-0" />
              </TooltipTrigger>
              <TooltipContent>Real-time data</TooltipContent>
            </Tooltip>
          </div>
          <MD tag="p" className="!text-muted-foreground m-0">
            Track live performance metrics and AI agent interactions with instant visibility into SLA performance and trending issues.
          </MD>
        </div>

        {/* Alerts and insights - Hidden */}
        {false && (
        <>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-0.5">Last insights and alerts</h2>
              <p className="text-base text-muted-foreground">Last 24 hours · Updated 2 mins ago</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* SLA Breach Alert */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#fff2f3' }}
                >
                  <AlertTriangle className="w-4 h-4" style={{ color: '#CD3642' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    13 tickets breached SLA
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    Priority tickets exceeded <b>24-hour</b> resolution target in the last hour.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  View tickets
                </button>
              </div>
            </div>

            {/* Queue Volume Spike */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#fff3e4' }}
                >
                  <TrendingUp className="w-4 h-4" style={{ color: '#AC5918' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    Billing queue at 155% capacity
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    Volume increased <b>55%</b> compared to forecast. Consider agent reassignment.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  Assign agents
                </button>
              </div>
            </div>

            {/* AI Performance Improvement */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#edf7ff' }}
                >
                  <Bot className="w-4 h-4" style={{ color: '#1F73B7' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    AI automation up 8%
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    Automated resolution rate reached <b>34%</b>, exceeding target by 4 percentage points.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  View AI metrics
                </button>
              </div>
            </div>

            {/* Agent Availability Alert */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#fff3e4' }}
                >
                  <Users className="w-4 h-4" style={{ color: '#AC5918' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    Only 12 agents available
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    <b>18 agents</b> are in meetings or breaks. Peak hour starts in 30 minutes.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  View schedule
                </button>
              </div>
            </div>

            {/* Response Time Trending Up */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#edf7ff' }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: '#1F73B7' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    First response time steady
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    <b>1.8 minutes</b> on average, maintaining SLA target despite volume increase.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  View dashboard
                </button>
              </div>
            </div>

            {/* Critical Ticket Alert */}
            <div className="bg-white border border-[#E8EAEC] rounded-[16px] p-5">
              <div className="flex flex-col gap-3">
                <div 
                  className="w-fit p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#fff2f3' }}
                >
                  <AlertCircle className="w-4 h-4" style={{ color: '#CD3642' }} />
                </div>
                <div>
                  <h3 className="mb-1">
                    5 critical tickets unassigned
                  </h3>
                  <p 
                    className="text-base leading-[20px] tracking-[-0.154px] text-[#838384]"
                  >
                    High-priority tickets waiting <b>over 15 minutes</b> for agent assignment.
                  </p>
                </div>
                <button 
                  onClick={onOpenAssistant}
                  className="leading-[16px] tracking-[-0.0004px] text-foreground font-normal hover:text-foreground/80 transition-colors w-fit flex items-center gap-1.5 text-base"
                >
                  Assign now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI agent performance */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2>AI agent performance</h2>
            <Button 
              variant="ghost" 
              className="text-foreground font-normal hover:text-foreground/80 p-0 h-auto text-base"
            >
              View more
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Automated resolutions (AR) */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Automated resolutions (AR)</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">34%</div>
                <div className="text-xs text-muted-foreground">3400 conversations</div>
              </CardContent>
            </Card>

            {/* Escalated conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Escalated conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">46%</div>
                <div className="text-xs text-muted-foreground">4600 conversations</div>
              </CardContent>
            </Card>

            {/* Total conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Total conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">10,000</div>
                <div className="text-xs text-muted-foreground">All AI Interactions</div>
              </CardContent>
            </Card>

            {/* BSAT */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">BSAT</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">65%</div>
                <div className="text-xs text-muted-foreground mb-3">6500 conversations</div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div className="bg-foreground h-1 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Understood conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Understood conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">54%</div>
                <div className="text-xs text-muted-foreground">5400 conversations</div>
              </CardContent>
            </Card>

            {/* Rated conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Rated conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">45%</div>
                <div className="text-xs text-muted-foreground">4500 conversations</div>
              </CardContent>
            </Card>

            {/* Assisted conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Assisted conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">54%</div>
                <div className="text-xs text-muted-foreground">5400 conversations</div>
              </CardContent>
            </Card>

            {/* Handled conversations */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium">Handled conversations</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>Real-time data</TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-3xl mb-1">46%</div>
                <div className="text-xs text-muted-foreground">4600 conversations</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI agent ticket flow */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2>AI agent ticket flow</h2>
          </div>

          <div className="flex items-center justify-between bg-background border border-border rounded-lg p-6">
            {/* Tickets sent by AI agent */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-blue-600">847</span>
              </div>
              <div className="text-base">Tickets sent by AI agent</div>
              <div className="text-xs text-muted-foreground">Total incoming</div>
            </div>

            {/* Arrow */}
            <div className="text-muted-foreground">
              <ChevronRight className="w-5 h-5" />
            </div>

            {/* Moved to queue */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-blue-600">672</span>
              </div>
              <div className="text-base">Moved to queue</div>
              <div className="text-xs text-muted-foreground">79% of total</div>
            </div>

            {/* Arrow */}
            <div className="text-muted-foreground">
              <ChevronRight className="w-5 h-5" />
            </div>

            {/* Assigned to agents */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-blue-600">534</span>
              </div>
              <div className="text-base">Assigned to agents</div>
              <div className="text-xs text-muted-foreground">79% of queued</div>
            </div>

            {/* Arrow */}
            <div className="text-muted-foreground">
              <ChevronRight className="w-5 h-5" />
            </div>

            {/* Assisted by copilot */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-blue-600">487</span>
              </div>
              <div className="text-base">Assisted by copilot</div>
              <div className="text-xs text-muted-foreground">91% assisted</div>
            </div>

            {/* Arrow */}
            <div className="text-muted-foreground">
              <ChevronRight className="w-5 h-5" />
            </div>

            {/* Resolved */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-green-600">421</span>
              </div>
              <div className="text-base">Resolved</div>
              <div className="text-xs text-muted-foreground">86% completion</div>
            </div>
          </div>
        </div>

        {/* SLA Performance */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2>SLA performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Response Time SLA */}
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Response Time SLA</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-3xl text-green-600">94%</div>
            </div>

            {/* Resolution Time SLA */}
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Resolution Time SLA</h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="text-3xl text-orange-600">87%</div>
            </div>

            {/* First Contact Resolution */}
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>First Contact Resolution</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-3xl mb-2 text-green-600">78%</div>
              <div className="text-sm text-muted-foreground">Target: {`>`} 75%</div>
            </div>
          </div>

          {/* SLA Status Legend */}
          <div className="flex items-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Meeting SLA (426 tickets)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>At Risk (48 tickets)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Breached (13 tickets)</span>
            </div>
          </div>
        </div>

        {/* Actions and tasks */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2>Actions and tasks</h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 p-0 h-auto"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Move 10 agents to Billing queue */}
            <Card className="border border-border">
              <CardContent className="p-6 relative">
                <div className="pr-40">
                  <div className="flex-1">
                    <h3 className="mb-2">Move 10 agents to Billing queue</h3>
                    <p className="text-base text-muted-foreground mb-4">
                      The Billing queue is experiencing a 55% increase in ticket volume compared to forecast. Assign available agents with Refund skills to help manage this unexpected volume.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Agent assignments
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Queue management
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-white whitespace-nowrap"
                  >
                    Move 10 agents
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <span className="text-muted-foreground">•••</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Prepare for 2 agent performance reviews */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 max-w-2xl">
                    <h3 className="mb-2">Prepare for 2 agent performance reviews</h3>
                    <p className="text-base text-muted-foreground mb-4">
                      Mia Hansen's review is at 11:30am and Karen Hyne's review is at 12:30pm. Review their performance dashboards and skill recommendations.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Google Calendar
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Agent performance reviews
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-6 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-primary border-primary hover:bg-primary hover:text-white whitespace-nowrap"
                    >
                      View agent performance
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <span className="text-muted-foreground">•••</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}