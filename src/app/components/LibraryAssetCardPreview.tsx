import { LibraryCardDashboardPreview } from './LibraryCardDashboardPreview';
import { LibraryCardReportPreview } from './LibraryCardReportPreview';

type LibraryAssetCardPreviewProps = {
  type: 'dashboard' | 'report';
};

export function LibraryAssetCardPreview({ type }: LibraryAssetCardPreviewProps) {
  return type === 'dashboard' ? <LibraryCardDashboardPreview /> : <LibraryCardReportPreview />;
}
