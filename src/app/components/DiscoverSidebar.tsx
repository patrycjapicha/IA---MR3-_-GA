import React from 'react';
import { MessageSquare, Monitor, Folder, Database, Settings, FileSpreadsheet, Activity, Home as HomeIcon, LineChart as LineGraphIcon, Layout as LayoutIcon, Flag as FlagIcon, BookOpen as LibraryIcon, BarChart3 as BarChartIcon, Sparkles as SparkleIcon, FLORA_NAV_ICON } from '@/components/icons/flora';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface DiscoverSidebarProps {
  activeNavItem: string;
  setActiveNavItem: (item: string) => void;
  isNavCollapsed?: boolean;
  setIsNavCollapsed?: (collapsed: boolean) => void;
  onNavigateToSection?: (section: string) => void;
}

const FLORA_NAV_ITEM = 'h-[48px] w-full flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer';

function navIconClass(isActive: boolean) {
  return `size-[32px] flex items-center justify-center rounded-[8px] transition-colors ${
    isActive ? 'bg-foreground text-white' : 'text-muted-foreground hover:bg-muted'
  }`;
}

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ label, icon, isActive, onClick }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" onClick={onClick} className={FLORA_NAV_ITEM}>
          <div className={navIconClass(isActive)}>{icon}</div>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function DiscoverSidebar({ activeNavItem, setActiveNavItem, isNavCollapsed, setIsNavCollapsed, onNavigateToSection }: DiscoverSidebarProps) {
  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
    onNavigateToSection?.(item);
  };

  const isSettingsActive = activeNavItem === 'settings' || activeNavItem === 'alerts';

  return (
    <div className="w-[56px] h-full flex flex-col relative z-10" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="flex-1 relative rounded-bl-none">
        <nav className="flex flex-col">
          <NavItem
            id="home"
            label="Home"
            isActive={activeNavItem === 'home'}
            onClick={() => handleNavItemClick('home')}
            icon={<HomeIcon className={FLORA_NAV_ICON} />}
          />
          <NavItem
            id="monitoring-home"
            label="Real-time monitoring"
            isActive={activeNavItem === 'monitoring-home'}
            onClick={() => handleNavItemClick('monitoring-home')}
            icon={<LineGraphIcon className={FLORA_NAV_ICON} />}
          />
          <NavItem
            id="library"
            label="Library"
            isActive={activeNavItem === 'library'}
            onClick={() => handleNavItemClick('library')}
            icon={<LibraryIcon className={FLORA_NAV_ICON} />}
          />
          <NavItem
            id="datasets"
            label="Datasets"
            isActive={activeNavItem === 'datasets'}
            onClick={() => handleNavItemClick('datasets')}
            icon={<Database className={FLORA_NAV_ICON} />}
          />
          <NavItem
            id="settings"
            label="Settings"
            isActive={isSettingsActive}
            onClick={() => handleNavItemClick('settings')}
            icon={<Settings className={FLORA_NAV_ICON} />}
          />
        </nav>

        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg width="56" height="231" viewBox="0 0 56 231" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="231" fill="url(#paint0_linear_52833_54622)"/>
            <defs>
              <linearGradient id="paint0_linear_52833_54622" x1="28" y1="0" x2="28" y2="231" gradientUnits="userSpaceOnUse">
                <stop stopOpacity="0"/>
                <stop offset="1" stopColor="#646864" stopOpacity="0.08"/>
              </linearGradient>
            </defs>
          </svg>

          {activeNavItem === 'library' && setIsNavCollapsed && (
            <button
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-auto hover:opacity-80 transition-opacity"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200" style={{ transform: isNavCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5 10.1667V21.8333H21C21.4602 21.8333 21.8333 21.4602 21.8333 21V11C21.8333 10.5398 21.4602 10.1667 21 10.1667H13.5ZM8.5 11C8.5 9.61929 9.61929 8.5 11 8.5H21C22.3807 8.5 23.5 9.61929 23.5 11V21C23.5 22.3807 22.3807 23.5 21 23.5H11C9.61929 23.5 8.5 22.3807 8.5 21V11Z" fill="#646864"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
