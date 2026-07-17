# Analytics Platform - UI Capabilities Documentation

## Overview
This document outlines the user interface capabilities and interactions available throughout the analytics platform, organized by section.

---

## Executive Summary: Key Features & Platform Architecture

### Home Dashboard Possibilities

The Home dashboard serves as the central command center for data exploration and insight discovery. Users can:

**Data Exploration & Monitoring**
- View real-time KPI metrics in a horizontal overview strip with percentage change indicators
- Access comprehensive analytics visualizations including time-series charts, trend analysis, and category breakdowns
- Monitor key business metrics with automatic updates and conditional displays based on data availability
- Navigate between prepopulated dashboard views (with full analytics) and empty states (with onboarding guidance)

**Conversational Intelligence**
- Engage with an AI-powered conversational assistant using natural language queries
- Ask questions about data patterns, trends, and specific metrics
- Receive instant AI-generated responses with contextual insights
- Save valuable responses directly to the Projects section for future reference
- Review conversation history to track analytical exploration

**AI-Powered Narration**
- Access the Narrate feature via header button to open the analytics assistant drawer
- Get narrative explanations of data trends and patterns in plain language
- View insights in both minimized state (80px, icon-only) and expanded full-functionality mode
- Receive contextual AI interpretations of chart data and metric changes

**Project & Content Organization**
- Organize saved insights within folder structures in Projects section
- Create, rename, and manage project folders for different analytical workstreams
- Quick access to frequently referenced analyses and saved conversation responses

**Personalization**
- Personalized greeting with user name and current date/time context
- Global search across all analytics, reports, and datasets from header
- Slack notifications integration with preview panel
- Customizable dashboard views based on user preferences and data availability

---

### Analyst Copilot: AI-Powered Report Building System

The Analyst Copilot is the platform's intelligent assistant for report creation, modification, and workflow tracking. It operates across multiple contexts within the prototype:

#### In Report Builder (Primary Context)

**Left Panel - Copilot Tab**
- **Natural Language Report Modification**: Users describe desired changes in plain language instead of manual configuration
- **Violet Sparkle Icons**: Visual indicators throughout showing AI-powered features
- **Instruction-Guided Interface**: Clear heading "Describe changes you want to make in report" guides user input
- **Smart Suggestions**: Pre-written suggestion bubbles for common report modifications (e.g., "Add revenue trends by region", "Show monthly comparison")
- **Bottom Composer**: Text input field positioned at bottom of panel for natural report change requests
- **Dual-Mode Operation**: Toggle between Manual tab (checkbox selection of metrics/attributes) and Copilot tab (AI-powered natural language)

**Minimized State (Default)**
- **80px Width**: Collapsed to show only essential icons
- **Icon-Only Display**: Stripped-down interface for maximum workspace
- **Persistent Accessibility**: Always available but unobtrusive
- **One-Click Expand**: Instant access to full functionality when needed

**Expanded State**
- **Full Tool Access**: Complete feature set with labels and descriptions
- **Smooth Animations**: 60fps transitions between states
- **Minimize Control**: Easy return to compact view
- **Workspace Preservation**: Chart and visualization area adjusts dynamically

#### Memory Drawer (Right Panel Integration)

The Analyst Copilot includes a sophisticated Memory feature accessed via a branch icon button next to Narrate:

**Three Sub-Tab System:**

1. **Steps Tab - Workflow Visualization**
   - Flowchart-style display with vertical lines and directional arrows
   - Sequential progression of analysis steps taken
   - Status indicators showing completed vs in-progress steps
   - Visual branching for alternative analysis paths explored
   - Helps users understand the analytical journey and decision points

2. **Summary Tab - Key Findings**
   - Bullet-point format for quick scanning
   - Report configuration summary (selected metrics and attributes)
   - Key findings and insights extracted from data
   - Concise overview of what the analysis reveals
   - Reference point for report context

3. **Analysis Note Tab - AI Insight Cards**
   - **Key Insights Card**: Main findings and patterns identified
   - **Recommendations Card**: Suggested actions based on data
   - **Data Quality Card**: Assessment of data completeness and reliability
   - Flat design with background colors only (no borders/strokes)
   - Each card displays title and AI-generated description
   - Uses bg-muted/30 for subtle visual separation

**Drawer Functionality**
- Opens from button in header (next to Narrate)
- Custom branch icon representing workflow branching concept
- Resizable width for user preference
- Persistent state remembers last selected sub-tab
- Close button collapses back to button state
- Provides analytical context and memory across report iterations

#### Cross-Platform Analyst Copilot Features

**In Home Dashboard**
- Narrate button provides narrative insights on dashboard data
- Conversational assistant serves as conversational interface for ad-hoc queries
- Integrated AI recommendations based on visible metrics and trends

**In Report Builder**
- Full Copilot tab for natural language report modifications
- Memory drawer tracks analysis workflow and decisions
- Real-time visualization updates as copilot interprets requests
- Suggestion system learns from common user patterns

**In Library Section**
- AI Summary provides intelligent recommendations when searching templates
- Contextual suggestions based on user's search queries and filters
- Smart categorization and relevance scoring

---

### Library Structure & Asset Management

The Library section provides comprehensive organization and discovery of analytical assets:

**Organizational Hierarchy**
- **All Templates**: Master view of all available assets
- **Recents**: Recently accessed items with count badges
- **Starred**: Favorited items with expandable nested structure
- **Trending**: Popular templates across organization
- **Archived**: Inactive but preserved templates
- **Created by Me**: User's own created assets
- **Shared with Me**: Assets shared by team members
- **Zendesk**: Default platform-provided templates

**Asset Types**
- **Projects**: Collections of related dashboards, reports, and datasets
- **Dashboards**: Visual analytics displays with multiple charts
- **Reports**: Specific analytical outputs with defined metrics
- **Datasets**: Data source connections and definitions

**Asset Type Filtering**
- Toggle chips to show/hide specific asset types
- Multi-select capability (can view multiple types simultaneously)
- Count indicators show number of items per type
- Real-time filtering updates view instantly

**Sidebar Navigation**
- **Collapsible Design**: 264px expanded, 64px collapsed
- **Icon + Label**: Clear identification in expanded mode
- **Icon Only**: Space-efficient collapsed mode
- **Nested Items**: Starred section expands to show individual favorites
- **Count Badges**: Show number of items in Recents and other categories

**Search & Discovery Tools**
- Global search bar for finding assets by name or description
- Category dropdown filters (Performance, Operations, Customer Experience, etc.)
- View toggle between Grid (visual cards) and Table (detailed list) layouts
- Real-time search results with instant filtering

**Asset Actions (Three-Dot Menu)**
- Open: Launch asset in appropriate view
- Rename: Change asset name inline
- Duplicate: Create copy for modification
- Move to Folder: Organize within Projects structure
- Archive: Remove from active view but preserve
- Manage Access: Control sharing and permissions
- Delete: Permanently remove (with confirmation)

**Project Detail View**
- Asset filter tabs at top to filter by type within project
- List of all dashboards, reports, and datasets contained in project
- Breadcrumb navigation to return to templates list
- Project metadata: owner, last updated, status
- Nested organization mimicking folder structure

**Access Management System**
- Modal interface for permission control
- View current users/groups with access
- Add new users or team groups
- Set permission levels (View or Edit)
- Remove access for individual users/groups
- Audit trail of who has access

**Banner Notifications**
- Dismissible informational banners at top of Library
- Platform updates and important announcements
- Persistent until user explicitly dismisses
- Non-intrusive but visible placement

---

### Integration Points Across Prototype

**Home ↔ Library**
- Save conversations from Home conversational assistant to Library Projects
- Open templates from Library to populate Home dashboard
- Projects created in Home appear in Library navigation

**Home ↔ Report Builder**
- Click metrics on Home dashboard to drill into Report Builder
- Reports created in Report Builder can be saved to Home Projects
- Narrate functionality consistent across both contexts

**Library ↔ Report Builder**
- Templates from Library open in Report Builder for customization
- Reports saved from Report Builder appear in Library
- Memory drawer workflow tracking bridges both interfaces

**Global Features Across All Sections**
- Persistent left sidebar navigation (Home, Discover, Library, Datasets)
- Global header with search, notifications, user avatar
- Narrate button available in Home and Report Builder contexts
- Consistent design system (flat design, SF Pro Display, #0D6BC primary color)
- Standardized question bubble styling everywhere
- Unified 14px body text and 28px headlines typography

---

## 1. Onboarding Experience

### Capabilities
- **Natural Language Input**: Users can describe their analytics focus in free-form text to generate a customized dashboard
- **Template Selection**: Users can browse and select from pre-built analytics templates
- **Quick Start**: Skip onboarding to access the platform with default settings

### User Interactions
- Text input field for natural language dashboard requests
- Template cards with preview information
- Continue/Skip navigation buttons

---

## 2. Home Section (Main Dashboard)

### Capabilities

#### Header & Navigation
- **Personalized Greeting**: Displays user's name and current date/time
- **Global Search**: Search across all analytics, reports, and datasets
- **Notifications**: Access Slack notifications preview
- **User Profile**: Access account settings and preferences

#### Data Overview Metrics
- **Key Performance Indicators**: View horizontal metrics strip with real-time data
- **Metric Cards**: Each KPI displays:
  - Current value
  - Percentage change indicator (positive/negative)
  - No target values (removed per design spec)

#### Conversational Assistant
- **Natural Language Queries**: Ask questions about data in conversational format
- **Question Bubbles**: Standardized styling across all question inputs
- **Save Responses**: Save valuable insights to Projects section
- **Conversation History**: Review previous queries and responses

#### Analytics Visualizations
- **Interactive Charts**: View comprehensive analytics charts with:
  - Time-series data
  - Trend analysis
  - Comparative metrics
  - Category breakdowns
- **Chart Interactions**: Hover for details, click for drill-down

#### Narrate Functionality
- **Analytics Assistant Drawer**: Opens from "Narrate" button in header
- **Minimized State**: 80px wide showing only essential icons
- **Expanded State**: Full functionality with smooth transitions
- **AI-Powered Insights**: Get narrative explanations of data trends

#### Projects Section
- **Folder Organization**: View projects organized in folders
- **Saved Insights**: Access previously saved data insights
- **Project Management**: Create, rename, and organize projects

### Conditional Display Logic
- **Prepopulated Dashboard**: Shows full analytics when data exists
- **Empty State**: Displays onboarding prompts when no data available

---

## 3. Discover Section

### Capabilities

#### Search & Filter
- **Search Bar**: Search across all available content
- **Category Filters**: Filter by predefined categories
- **Asset Type Filters**: Filter by dashboards, reports, datasets, projects
- **Real-time Results**: Instant filtering as criteria change

#### Content Display
- **View Modes**: 
  - Grid view for visual browsing
  - Table view for detailed information
- **Template Cards**: Each card shows:
  - Template title and description
  - Asset type indicator
  - Category tags
  - Owner information
  - Last updated timestamp
  - Star/favorite option

#### AI Summary
- **Intelligent Recommendations**: AI-generated summaries based on search queries
- **Contextual Suggestions**: Relevant templates and insights

#### Actions
- **Star/Favorite**: Mark templates for quick access
- **Open Template**: Launch template to create new instance
- **Preview**: View template details before opening
- **Share**: Share templates with team members

---

## 4. Library/Templates Section

### Capabilities

#### Left Navigation Sidebar
- **Collapsible Sidebar**: Toggle between expanded (264px) and collapsed (64px) states
- **Navigation Items**:
  - All Templates
  - Recents (with count badges)
  - Starred (expandable with nested items)
  - Trending
  - Archived
  - Created by Me
  - Shared with Me
  - Zendesk (default templates)

#### Content Management
- **Asset Type Chips**: Toggle visibility of Projects, Dashboards, Reports, Datasets
- **Multiple Selection**: Select multiple asset types simultaneously
- **Count Indicators**: See number of items per type

#### Search & Discovery
- **Global Search**: Search across all template types
- **Category Dropdown**: Filter by categories (Performance, Operations, Customer Experience, etc.)
- **View Toggle**: Switch between Grid and Table views

#### Template Actions
- **Three-Dot Menu**: Access contextual actions per template:
  - Open
  - Rename
  - Duplicate
  - Move to folder
  - Archive
  - Manage access
  - Delete

#### Project Detail View
- **Asset Filter Tabs**: Filter project contents by type
- **Asset Listings**: View all dashboards, reports, and datasets within project
- **Breadcrumb Navigation**: Navigate back to templates list
- **Project Information**: View owner, last updated, and project status

#### Access Management Modal
- **View Permissions**: See who has access to selected item
- **Add Users/Groups**: Grant access to new users or teams
- **Permission Levels**: Set view or edit permissions
- **Remove Access**: Revoke access for users/groups

#### Banner Notifications
- **Dismissible Banners**: Display important platform updates
- **Persistent Until Dismissed**: Remain visible until user closes

---

## 5. Datasets Section

### Capabilities

#### Dataset Browser
- **List View**: View all available datasets
- **Dataset Cards**: Each shows:
  - Dataset name and icon
  - Description
  - Category/source
  - Last sync time
  - Row count and column count

#### Search & Filter
- **Dataset Search**: Find specific datasets by name or description
- **Category Filters**: Filter by data source or category
- **Tags**: Filter by applied tags

#### Actions
- **Preview Data**: View sample rows and schema
- **Connect**: Link dataset to reports or dashboards
- **Refresh**: Manually trigger data refresh
- **Manage**: Access dataset settings and configuration

---

## 6. Report Builder

### Capabilities

#### Left Panel - Report Configuration

##### Manual Tab
- **Metrics Selection**:
  - Searchable metric list
  - Checkbox selection for multiple metrics
  - Date field indicators with calendar icons
  - Visual confirmation of selected items

- **Attributes Selection**:
  - Searchable attributes list
  - Checkbox selection for multiple attributes
  - User/dimension field indicators
  - Grouped organization

##### Copilot Tab
- **AI-Powered Assistance**:
  - Violet sparkle icon indicating AI features
  - Instruction heading: "Describe changes you want to make in report"
  - Suggestion bubbles with sparkle icons
  - Pre-written suggestions for common actions

- **Describe Changes Composer** (Bottom of Panel):
  - Text input field for natural language requests
  - Send button to submit changes
  - Enter key support for quick submission
  - No placeholder text (clean interface)

#### Tab Controls
- **Manual/Copilot Toggle**: Switch between manual configuration and AI assistance
- **Visual Active State**: Tabs show active state with 13px typography

#### Right Panel - Visualization

##### Chart Display
- **Interactive Visualizations**: View report with selected metrics and attributes
- **Real-time Updates**: Chart updates as configuration changes
- **Chart Types**: Support for various visualization types

##### Memory Feature
- **Memory Button**: Opens right-side drawer next to Narrate button
- **Custom Branch Icon**: Indicates branching workflow functionality

#### Memory Drawer (Right Side)

##### Three Nested Sub-tabs:
1. **Steps Tab**:
   - Flowchart visualization with arrows
   - Step-by-step analysis progression
   - Status indicators (completed, in-progress)
   - Sequential workflow display
   - Connected with vertical lines and arrows

2. **Summary Tab**:
   - Bullet point format
   - Key findings and insights
   - Report configuration summary
   - Selected metrics and attributes list

3. **Analysis Note Tab**:
   - AI-generated insight cards (no borders/strokes - flat design)
   - Key Insights card
   - Recommendations card
   - Data Quality card
   - Each card shows title and description
   - Background color only (bg-muted/30)

##### Drawer Controls
- **Close Button**: Collapse drawer back to button state
- **Resizable**: Adjust drawer width as needed
- **Persistent State**: Remembers last tab selection

#### Analyst Copilot Drawer (Left Side)

##### Default State
- **Minimized**: 80px wide by default
- **Icon-Only Display**: Shows essential icons without labels
- **Smooth Transitions**: Animated expand/collapse

##### Expanded State
- **Full Functionality**: Complete feature access
- **Tool Options**: All copilot features available
- **Minimize Control**: Return to minimal state

---

## 7. Global Navigation (Left Sidebar)

### Capabilities

#### Navigation Items
- **Home**: Return to main dashboard
- **Discover**: Browse and explore content
- **Library**: Access templates and projects
- **Datasets**: Manage data connections

#### Navigation Behavior
- **Active State Indication**: Blue accent line on active section (using primary color #0D6BC)
- **Icon + Label**: Clear visual and text indicators
- **Persistent Access**: Always available across all views

---

## 8. Top Bar (Global Header)

### Capabilities

#### Left Side
- **Logo/Branding**: Platform identifier
- **Current Section Title**: Shows active section name

#### Center
- **Global Search**: 
  - Search across entire platform
  - Auto-complete suggestions
  - Recent searches
  - Quick navigation to results

#### Right Side
- **Notifications Bell**: 
  - Slack notifications preview
  - Unread count badge
  - Click to open notifications panel

- **Narrate Button**:
  - Opens analytics assistant drawer
  - AI-powered data explanations
  - Contextual insights

- **Memory Button** (in Report Builder):
  - Opens Memory drawer
  - Shows branching workflow
  - Access to Steps, Summary, and Analysis tabs

- **User Avatar**: 
  - Profile picture
  - Click for account menu
  - Settings and logout options

---

## 9. Interactive Elements & Design System

### Capabilities

#### Buttons & Links
- **Primary Color (#0D6BC)**: Used exclusively for:
  - Call-to-action buttons
  - Active links
  - Interactive element highlights
  - Active tab indicators

#### Typography
- **Font**: SF Pro Display throughout
- **Body Text**: 14px, normal weight
- **Headlines**: 28px for h1, 13px for tabs
- **H1 Specific**: font-weight 500
- **Consistency**: No bold text except h1 headlines

#### Visual Design
- **Flat Design**: No drop shadows or depth effects
- **Color Palette**: Black, white, and grayscale for insights and projects
- **Primary Color**: Reserved for alerts, buttons, links, and interactive elements
- **Border Usage**: Minimal borders, removed from insight cards

#### Question Bubbles
- **Standardized Styling**: Consistent across entire application
- **Visual Hierarchy**: Clear distinction between user and system messages

#### Notification System
- **Slack Integration**: Preview notifications from Slack
- **Real-time Updates**: Live notification feed
- **Action Buttons**: Quick actions from notification panel

---

## 10. Responsive Behavior

### Capabilities

#### Desktop Experience
- **Optimal Layout**: Full feature access with horizontal metric cards
- **Multi-panel Views**: Side-by-side panels in Report Builder
- **Expanded Navigation**: Full labels and descriptions

#### Tablet Experience
- **Adaptive Layout**: Reorganizes for medium screens
- **Collapsible Panels**: Side panels can collapse to save space
- **Touch Optimization**: Larger hit areas for touch interaction

#### Mobile Experience (if applicable)
- **Vertical Stacking**: Metrics and content stack vertically
- **Hamburger Menu**: Navigation collapses to menu
- **Simplified Views**: Priority content first

---

## 11. Data Interaction Patterns

### Capabilities

#### Filtering
- **Multi-select Filters**: Apply multiple criteria simultaneously
- **Real-time Filtering**: Results update instantly
- **Clear All**: Quick reset of all filters
- **Filter Persistence**: Maintains selections during session

#### Sorting
- **Column Sorting**: Click headers to sort (table view)
- **Ascending/Descending**: Toggle sort direction
- **Multi-column Sort**: Hold shift for secondary sorting

#### Selection
- **Checkbox Selection**: Multi-select items for batch actions
- **Select All**: Quick selection of all visible items
- **Selection Counter**: Shows number of selected items
- **Bulk Actions**: Perform actions on multiple items

---

## 12. Empty States & Onboarding

### Capabilities

#### Empty Dashboard State
- **Onboarding Prompts**: Guide users to create first dashboard
- **Template Suggestions**: Recommend starting templates
- **Quick Actions**: Fast paths to get started

#### Empty Search Results
- **No Results Message**: Clear feedback when search finds nothing
- **Suggestions**: Recommend alternative searches or filters
- **Clear Filters**: Quick action to reset search

#### Loading States
- **Skeleton Screens**: Show content structure while loading
- **Progress Indicators**: Communicate loading progress
- **Smooth Transitions**: Fade in content when ready

---

## 13. Collaboration Features

### Capabilities

#### Sharing
- **Share Button**: Share dashboards, reports, and projects
- **Access Control**: Set view or edit permissions
- **Share Links**: Generate shareable URLs
- **Team Sharing**: Share with entire groups/teams

#### Comments & Annotations (if applicable)
- **Inline Comments**: Comment on specific data points
- **@Mentions**: Tag team members for attention
- **Comment Threads**: Organized discussion threads

#### Version History (if applicable)
- **Track Changes**: View history of modifications
- **Restore Previous**: Revert to earlier versions
- **Compare Versions**: See differences between versions

---

## Design Specifications Summary

### Typography
- **Base**: SF Pro Display, 14px, normal weight
- **Headlines**: 28px (h1 with font-weight 500)
- **Tabs**: 13px

### Colors
- **Primary**: #0D6BC (buttons, links, active states, alerts)
- **Content**: Black, white, grayscale
- **Accents**: Category-specific colors for tags only

### Layout
- **Metrics**: Horizontal arrangement at top
- **Sidebar**: 264px expanded, 64px collapsed
- **Copilot Drawer**: 80px minimized state
- **No Shadows**: Completely flat design

### Spacing & Rhythm
- **Consistent Padding**: Standardized spacing throughout
- **Clear Hierarchy**: Visual importance through size and color
- **White Space**: Generous spacing for clarity

---

## User Workflow Examples

### Workflow 1: Creating a New Report
1. Navigate to Library section
2. Click "New Report" or select template
3. Opens Report Builder
4. Use Manual tab to select metrics and attributes OR
5. Use Copilot tab to describe desired report
6. View real-time visualization updates
7. Open Memory drawer to review analysis steps
8. Save report to project folder

### Workflow 2: Exploring Data Insights
1. Start from Home dashboard
2. Review Data Overview metrics
3. Ask question in conversational assistant
4. Receive AI-generated insights
5. Save valuable response to Projects
6. Click Narrate for deeper explanation
7. Open Memory to see analysis progression

### Workflow 3: Finding and Using Templates
1. Navigate to Discover or Library section
2. Use search and filters to find relevant templates
3. Review AI Summary for recommendations
4. Preview template details
5. Star favorites for quick access
6. Open template to create instance
7. Customize using Report Builder
8. Share with team members

---

## Accessibility Considerations

### Capabilities
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Indicators**: Clear visual focus states
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Meets WCAG standards
- **Text Sizing**: Readable typography at default sizes

---

## Performance & Optimization

### Capabilities
- **Lazy Loading**: Content loads as needed
- **Caching**: Frequently accessed data cached
- **Instant Search**: Real-time search with debouncing
- **Smooth Animations**: 60fps transitions and animations
- **Progressive Enhancement**: Core functionality works everywhere

---

*Document Version: 1.0*
*Last Updated: February 17, 2026*