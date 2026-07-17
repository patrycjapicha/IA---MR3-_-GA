import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Settings } from '@/components/icons/flora';

export function SettingsPage() {
  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-background">
        {/* Header Section */}
        <div className="flex items-start justify-between px-[35px] pt-[39px] pb-[21px]">
          <div>
            <h1 className="mb-2">Settings</h1>
          </div>
        </div>

        {/* Placeholder Content */}
        
      </div>
    </div>
  );
}