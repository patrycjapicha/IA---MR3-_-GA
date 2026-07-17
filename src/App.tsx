import { useState } from 'react';
import GlobalNav, { type NavKey } from './components/GlobalNav';
import EmptyPage from './components/EmptyPage';
import LibrarySection from './components/LibrarySection';

function App() {
  const [currentNav, setCurrentNav] = useState<NavKey>('home');

  return (
    <GlobalNav currentNav={currentNav} onNavChange={setCurrentNav}>
      {currentNav === 'library' ? (
        <LibrarySection onNavigate={setCurrentNav} />
      ) : (
        <EmptyPage />
      )}
    </GlobalNav>
  );
}

export default App;
