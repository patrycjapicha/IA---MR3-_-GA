import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag as FlagIcon } from '@/components/icons/flora';
import { AlertsSection } from './AlertsSection';

interface SettingsSectionProps {
  isNavCollapsed?: boolean;
  setIsNavCollapsed?: (collapsed: boolean) => void;
  onOpenDashboard?: (dashboardData: { id: string; title: string; data?: any; type?: string }) => void;
  initialSection?: string;
}

export function SettingsSection({ onOpenDashboard }: SettingsSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string>('alerts');

  return (
    <div className="flex h-full flex-1">
      {/* Left Navigation Sidebar */}
      <div
        className={`${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 transition-all duration-200`}
        style={{ backgroundColor: '#F7F7F7' }}
      >
        <div className="p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            {!isCollapsed && (
              <h3 className="text-lg m-0">Settings</h3>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5">
            <div className="pb-2">
              <button
                onClick={() => setActiveNavItem('alerts')}
                className={`w-full flex items-center justify-between pr-3 py-2 rounded-lg transition-colors font-light ${
                  activeNavItem === 'alerts'
                    ? 'bg-foreground text-white pl-3'
                    : 'text-foreground hover:text-foreground hover:bg-muted/50 pl-3'
                }`}
              >
                <div className="flex items-center gap-3 text-base">
                  <FlagIcon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && 'Alerts'}
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-background rounded-l-[24px] my-1 mx-0">
        {activeNavItem === 'alerts' && (
          <AlertsSection onOpenDashboard={onOpenDashboard} />
        )}
      </div>
    </div>
  );
}
