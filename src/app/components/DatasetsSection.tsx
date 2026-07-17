import React from 'react';
import { XXL } from '@zendesk-ui/react-components';

interface DatasetsSectionProps {
  onNavigateToExportSetup?: () => void;
}

export function DatasetsSection({ onNavigateToExportSetup }: DatasetsSectionProps) {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1200px] mx-auto p-[32px]">
        <XXL tag="h1" className="!text-foreground m-0">Datasets</XXL>
      </div>
    </div>
  );
}
