import React from 'react';

interface DatasetsSectionProps {
  onNavigateToExportSetup?: () => void;
}

export function DatasetsSection({ onNavigateToExportSetup }: DatasetsSectionProps) {
  return (
    <>
      <div className="mb-[8px] pt-8 px-8">
        <h1 className="font-light pl-[34px] mb-6">Datasets</h1>

        {/* Flora Info Alert */}
        <div className="flex gap-3 p-4 border border-[#e9ebed] rounded-[8px] bg-[#f8f9f9] ml-[34px]" role="alert">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="#68737d" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <div className="text-base font-[600] text-foreground mb-1">Not covered in prototype</div>
            <div className="text-base leading-[20px] text-foreground">This page is not included in the current prototype scope.</div>
          </div>
        </div>
      </div>
    </>
  );
}
