interface RealTimeMonitoringProps {
  onOpenAssistant?: () => void;
}

export function RealTimeMonitoring(_props: RealTimeMonitoringProps) {
  return <div className="flex-1 overflow-auto" style={{ backgroundColor: '#fbfbfa' }} />;
}
