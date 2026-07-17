import React from 'react';
import { DiscoverSection } from './DiscoverSection';
import { ConversationMessage } from './dashboard/types';

interface MainContentProps {
  activeNavItem: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: () => void;
  conversation: ConversationMessage[];
  handleQuickQuestion: (question: string) => void;
  children: React.ReactNode; // For existing content when not in discover mode
}

export function MainContent({
  activeNavItem,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  conversation,
  handleQuickQuestion,
  children
}: MainContentProps) {
  // Render DiscoverSection when activeNavItem is 'search'
  if (activeNavItem === 'search') {
    return (
      <DiscoverSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
        conversation={conversation}
        handleQuickQuestion={handleQuickQuestion}
      />
    );
  }

  // Render existing content for other nav items
  return <>{children}</>;
}