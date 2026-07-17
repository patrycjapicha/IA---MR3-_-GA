export const insights = [
  {
    id: 1,
    label: 'Ticket volume',
    value: '6,221',
    change: '11%',
    changeValue: '(684)',
    trend: 'up' as const,
    description: 'Your team is handling 11% more tickets, reflecting increased activity.',
    action: 'What created this spike',
  },
  {
    id: 2,
    label: 'First reply time',
    value: '2m 30s',
    change: '7%',
    changeValue: '(36s)',
    trend: 'down' as const,
    description: 'Average first reply time improved by 36s, enhancing customer satisfaction.',
    action: 'What works well',
  },
  {
    id: 3,
    label: 'Full resolution time',
    value: '16m 51s',
    change: '1%',
    changeValue: '(8s)',
    trend: 'down' as const,
    description: 'Average full resolution time remains steady at 16m 51s.',
    action: 'How to improve it',
  },
];

export const kpis = [
  { id: 1, name: 'CSAT Score', value: '94.2%', change: '+2.1%', trend: 'up' as const },
  { id: 2, name: 'SLA Compliance', value: '96.5%', change: '+1.2%', trend: 'up' as const },
  { id: 3, name: 'First Reply Time', value: '2m 30s', change: '-7%', trend: 'down' as const },
  { id: 4, name: 'Escalation Rate', value: '8.3%', change: '-1.5%', trend: 'down' as const },
  { id: 5, name: 'Agent Utilization', value: '87%', change: '+3%', trend: 'up' as const },
  { id: 6, name: 'Ticket Backlog', value: '342', change: '-18', trend: 'down' as const },
  { id: 7, name: 'NPS Score', value: '68', change: '+4', trend: 'up' as const },
  { id: 8, name: 'Team Productivity', value: '142', change: '+7%', trend: 'up' as const },
];

export const recommendations = [
  {
    id: 1,
    title: 'Route specific tickets to assignee: EMEA Group',
    impact: 'Could improve by 2h 25min',
    tags: ['Triggers', 'Workflow automation'],
    status: null,
  },
  {
    id: 2,
    title: 'Change ticket status for intent: Unsolicited marketing',
    impact: 'Could improve by 1h 05min',
    tags: ['Auto assist', 'Optimization'],
    status: null,
  },
  {
    id: 3,
    title: 'Turn on suggested macros',
    impact: 'Could improve by 50min',
    tags: ['Macros', 'Agent productivity'],
    status: 'Previously declined',
  },
];

export const recentAssets = [
  { id: 1, title: 'Support Performance Dashboard', type: 'Dashboard', author: 'Sarah Johnson', lastAccessed: '2 hours ago' },
  { id: 2, title: 'Weekly CSAT Report', type: 'Report', author: 'Zendesk', lastAccessed: 'Yesterday' },
  { id: 3, title: 'Ticket Volume Trends', type: 'Dashboard', author: 'Mike Chen', lastAccessed: '3 days ago' },
  { id: 4, title: 'Agent Utilization Analysis', type: 'Report', author: 'Analytics Team', lastAccessed: '1 week ago' },
];

export const searchResults = [
  { id: 1, name: 'Support Performance Dashboard', type: 'Dashboard', author: 'Sarah Johnson', updated: 'Oct 12, 2025' },
  { id: 2, name: 'Weekly CSAT Report', type: 'Report', author: 'Zendesk', updated: 'Oct 10, 2025' },
  { id: 3, name: 'Ticket Volume Trends', type: 'Dashboard', author: 'Mike Chen', updated: 'Oct 8, 2025' },
];

export const copilotAnswer = {
  question: 'Why are tickets increasing?',
  answer:
    'Ticket volume increased 11% over the last 7 days, driven primarily by a spike in billing-related inquiries on Tuesday and Wednesday. The EMEA region accounts for 62% of the increase.',
  sources: ['Support Performance Dashboard', 'Ticket Volume Trends'],
  followUps: ['What created this spike?', 'Which channels drove the increase?', 'How does this compare to last month?'],
};
