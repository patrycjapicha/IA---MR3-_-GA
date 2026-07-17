import { TrendingUp, TrendingDown, AlertTriangle, CheckSquare, Users, Lightbulb, Target } from '@/components/icons/flora';
import { FocusArea } from './types';

export const getTypeColor = (type: FocusArea['type']) => {
  switch (type) {
    case 'critical': return 'border-destructive/20 bg-destructive/5';
    case 'warning': return 'border-chart-1/20 bg-chart-1/5';
    case 'positive': return 'border-chart-4/20 bg-chart-4/5';
    default: return 'border-border bg-card';
  }
};

export const getUrgencyColor = (urgency: 'high' | 'medium' | 'low') => {
  switch (urgency) {
    case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium': return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    case 'low': return 'bg-muted text-muted-foreground border-border';
  }
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return <TrendingUp className="w-3 h-3 text-destructive" />;
    case 'down': return <TrendingDown className="w-3 h-3 text-chart-4" />;
    case 'stable': return <div className="w-3 h-3 rounded-full bg-chart-1" />;
  }
};

export const getNotificationIcon = (type: 'alert' | 'update' | 'mention') => {
  switch (type) {
    case 'alert': return <AlertTriangle className="w-3 h-3 text-destructive" />;
    case 'update': return <CheckSquare className="w-3 h-3 text-chart-4" />;
    case 'mention': return <Users className="w-3 h-3 text-chart-1" />;
  }
};

export const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
  switch (impact) {
    case 'positive': return 'text-chart-4';
    case 'negative': return 'text-destructive';
    case 'neutral': return 'text-muted-foreground';
  }
};

export const getSectionIcon = (section: string) => {
  switch (section) {
    case 'insights': return <Lightbulb className="w-5 h-5 text-foreground" />;
    case 'alerts': return <AlertTriangle className="w-5 h-5 text-foreground" />;
    case 'opportunities': return <Target className="w-5 h-5 text-foreground" />;
    default: return <Lightbulb className="w-5 h-5 text-foreground" />;
  }
};

export const getSectionTitle = (section: string) => {
  switch (section) {
    case 'insights': return 'Insights';
    case 'alerts': return 'Alerts';
    case 'opportunities': return 'Opportunities';
    default: return 'Section';
  }
};

export const handleShareAlert = (area: FocusArea) => {
  const shareText = `Analytics Alert: ${area.alert}\n\nDetails: ${area.details}\n\nSuggested Action: ${area.suggestedAction}\n\nShared from Analytics Dashboard`;
  
  if (navigator.share) {
    navigator.share({
      title: `Analytics Alert: ${area.alert}`,
      text: shareText,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      console.log('Alert copied to clipboard');
    }).catch(console.error);
  }
};