import { Header, Nav, Main, Product, ProfileMenu } from '@zendesk-ui/navigation';
import { Drawer } from '@zendesk-ui/react-components';
import { getFormattedProducts } from '@zendesk-ui/product-tray';
import {
  Home as HomeIcon,
  LineChart as LineChartIcon,
  BookOpen as BookIcon,
  Database as DatabaseIcon,
  Settings as GearIcon,
  Search as MagnifyingGlassIcon,
  Bell as BellIcon,
  HelpCircle as HelpIcon,
} from '@/components/icons/flora';
import type { ReactNode } from 'react';

export type NavKey = 'home' | 'monitoring' | 'library' | 'datasets' | 'settings';

interface GlobalNavProps {
  children: ReactNode;
  currentNav: NavKey;
  onNavChange: (nav: NavKey) => void;
}

const products = getFormattedProducts({
  products: [
    { key: 'lotus' },
    { key: 'guide' },
    { key: 'gather' },
    { key: 'chat' },
    { key: 'talk' },
    { key: 'explore' },
    { key: 'sell' },
    { key: 'workforce_management' },
    { key: 'quality_assurance' },
    { key: 'ai_agents' },
    { key: 'central_admin' },
  ],
  locale: 'en-US',
  selectedKey: 'explore',
});

function GlobalNav({ children, currentNav, onNavChange }: GlobalNavProps) {
  return (
    <Product isFlora locale="en-US" products={products}>
      <Header
        startChildren={
          <>
            <Header.Separator />
            <Header.Button>Acme</Header.Button>
          </>
        }
      >
        <Header.Menu button="Add">
          <Header.MenuItemGroup aria-label="Create">
            <Header.MenuItem value="dashboard">Dashboard</Header.MenuItem>
            <Header.MenuItem value="report">Report</Header.MenuItem>
            <Header.MenuItem value="dataset">Dataset</Header.MenuItem>
          </Header.MenuItemGroup>
        </Header.Menu>
        <Header.IconButton tooltip="Search">
          <MagnifyingGlassIcon />
        </Header.IconButton>
        <Header.IconButton tooltip="Notifications" badge={3}>
          <BellIcon />
        </Header.IconButton>
        <Header.Help>
          <Drawer.Header tag="h2">Help</Drawer.Header>
          <Drawer.Body>
            <HelpIcon />
          </Drawer.Body>
        </Header.Help>
        <ProfileMenu name="Leah Chen">
          <ProfileMenu.ItemGroup aria-label="Profile actions">
            <ProfileMenu.Item value="profile">Manage profile</ProfileMenu.Item>
            <ProfileMenu.Item value="feedback">Give feedback</ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
          <ProfileMenu.ItemGroup aria-label="Session actions">
            <ProfileMenu.Item value="logout">Sign out</ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
        </ProfileMenu>
      </Header>

      <Nav>
        <Nav.Item
          icon={<HomeIcon />}
          isCurrent={currentNav === 'home'}
          onAction={() => onNavChange('home')}
        >
          Home
        </Nav.Item>
        <Nav.Item
          icon={<LineChartIcon />}
          isCurrent={currentNav === 'monitoring'}
          onAction={() => onNavChange('monitoring')}
        >
          Monitoring
        </Nav.Item>
        <Nav.Item
          icon={<BookIcon />}
          isCurrent={currentNav === 'library'}
          onAction={() => onNavChange('library')}
        >
          Library
        </Nav.Item>
        <Nav.Item
          icon={<DatabaseIcon />}
          isCurrent={currentNav === 'datasets'}
          onAction={() => onNavChange('datasets')}
        >
          Datasets
        </Nav.Item>
        <Nav.Item
          icon={<GearIcon />}
          isCurrent={currentNav === 'settings'}
          onAction={() => onNavChange('settings')}
        >
          Settings
        </Nav.Item>
      </Nav>

      <Main>{children}</Main>
    </Product>
  );
}

export default GlobalNav;
