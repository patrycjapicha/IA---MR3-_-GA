import { useState } from 'react';
import { DiscoverSidebar } from '../app/components/DiscoverSidebar';
import { TemplatesSection } from '../app/components/TemplatesSection';
import type { NavKey } from './GlobalNav';

interface LibrarySectionProps {
  onNavigate: (nav: NavKey) => void;
}

const sidebarToNav: Record<string, NavKey> = {
  home: 'home',
  'monitoring-home': 'monitoring',
  library: 'library',
  datasets: 'datasets',
  settings: 'settings',
  alerts: 'settings',
};

export default function LibrarySection({ onNavigate }: LibrarySectionProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleNavItemChange = (item: string) => {
    const nav = sidebarToNav[item];
    if (nav) {
      onNavigate(nav);
    }
  };

  return (
    <div className="h-full bg-[#F7F7F7] p-2">
      <div className="bg-[#f6f5f4] rounded-[28px] h-full flex overflow-hidden">
        <DiscoverSidebar
          activeNavItem="library"
          setActiveNavItem={handleNavItemChange}
          isNavCollapsed={isNavCollapsed}
          setIsNavCollapsed={setIsNavCollapsed}
          onNavigateToSection={handleNavItemChange}
        />
        <TemplatesSection
          isNavCollapsed={isNavCollapsed}
          setIsNavCollapsed={setIsNavCollapsed}
        />
      </div>
    </div>
  );
}
