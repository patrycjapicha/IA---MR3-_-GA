import svgPaths from "./svg-c2hp74fznn";
import { Button } from '../components/ui/button';
import { X, AlertTriangle } from '@/components/icons/flora';

function Icon() {
  return (
    <div className="content-stretch flex items-start shrink-0" data-name="Icon">
      <AlertTriangle className="w-5 h-5 text-[#373205]" />
    </div>
  );
}

export default function RefreshAlert({ onViewMonitoring, onViewAlerts, onClose }: { onViewMonitoring?: () => void; onViewAlerts?: () => void; onClose?: () => void }) {
  return (
    <div className="bg-[#f6ec94] flex items-center justify-between px-[16px] py-[8px] rounded-[16px] w-full relative" data-name=".Refresh Alert">
      <div className="flex items-center gap-3">
        <Icon />
        <p className="font-['SF_Pro_Text',sans-serif] text-[14px] leading-[20px] tracking-[-0.154px] text-[#373205]">
          <span className="font-semibold">3</span> alerts triggered in last <span className="font-semibold">24</span> h
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-[13px] bg-transparent border-[#373205]/50 text-[#373205] hover:bg-[#373205]/10 rounded-full"
          onClick={onViewAlerts}
        >
          View alerts
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-[13px] bg-transparent border-[#373205]/50 text-[#373205] hover:bg-[#373205]/10 rounded-full"
          onClick={onViewMonitoring}
        >
          Go to realtime monitoring
        </Button>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-[#373205]/10 rounded transition-colors"
          aria-label="Close alert"
        >
          <X className="w-4 h-4 text-[#373205]" />
        </button>
      </div>
    </div>
  );
}