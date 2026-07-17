# Home Section - Feature Capabilities

## Overview
The Home section serves as the central hub for analytics insights, providing intelligent search, AI-powered recommendations, and customizable KPI monitoring.

---

## 🤖 Analyst Copilot

### Dual Mode Interface
The Copilot features two distinct modes accessible via toggle buttons:

#### **Ask Mode**
- **Purpose**: Natural language Q&A about your data
- **How it works**: 
  - Type questions in plain English (e.g., "What can Analyst copilot do?", "Why are tickets increasing?")
  - Press Enter or click the arrow button to submit
  - Receive AI-generated answers with explanations
- **Capabilities**:
  - Answer questions about data and trends using existing sources
  - Provide reporting tips for users without analytics experience
  - Suggest next steps and related questions
  - Reference specific dashboards and reports as sources
- **Features**:
  - Project filter (scope answers to specific projects)
  - Close button to dismiss answers
  - Follow-up question suggestions
  - Source citations with links to underlying reports

#### **Search Mode**
- **Purpose**: Find existing dashboards and reports
- **How it works**:
  - Type keywords to search across all assets
  - Press Enter or click the search icon
  - View results in a structured table
- **Results Display**:
  - Asset name with clickable links
  - Type (Dashboard/Report)
  - Author information
  - Last updated timestamp
  - Hover actions (Open, Share, Copy link)
- **Features**:
  - Real-time filtering
  - Recent searches displayed
  - Quick access to frequently used assets

### AI Answer Capabilities

**What Analyst Copilot Can Do:**
1. **Data Analysis**: Answer questions about metrics, trends, and performance
2. **Reporting Guidance**: Provide tips on how to create reports and visualizations
3. **Next Steps**: Suggest follow-up actions based on data insights
4. **Source Attribution**: Show which dashboards/reports contain relevant data

**Example Interactions:**
- "What created this spike in ticket volume?"
- "What works well for first reply time?"
- "How to improve resolution time?"
- "Show me customer satisfaction trends"

**Response Format:**
- Clear, conversational explanations
- Bullet points for key insights
- Referenced sources (dashboards, reports)
- Suggested next questions
- Action buttons to explore deeper

---

## 📊 Latest Insights

**Auto-generated insights** with visual trend indicators:

1. **Ticket Volume**
   - Current value with change percentage
   - Visual trend chart (sparkline)
   - Color-coded (red for increases, green for decreases)
   - "What created this spike" action button → Opens Analytics Assistant

2. **First Reply Time**
   - Average response time
   - Improvement metrics
   - "What works well" action button

3. **Full Resolution Time**
   - Average resolution duration
   - Trend analysis
   - "How to improve it" action button

**Features:**
- Collapsible section
- Time range filter (7 days, 30 days, 3 months)
- Direct link to Analytics Assistant with pre-filled questions
- Visual indicators for trend direction

---

## 📈 KPI Watchlist

### Overview
Customizable dashboard of key performance indicators (up to 8 metrics displayed simultaneously).

### Available Metrics (42 total)
**Performance**: Avg Resolution Time, Response Time, First Reply Time, SLA Compliance, Handle Time
**Quality**: Escalation Rate, First Contact Resolution, Reopen Rate, Transfer Rate, Resolution Rate
**Satisfaction**: BSAT Score, CSAT Score, NPS Score, Agent Satisfaction, Customer Effort Score, Sentiment Score
**Volume**: Active Tickets, Ticket Backlog, Peak Hour Volume, After Hours Volume, Priority Ticket %
**Productivity**: Agent Utilization, Agent Occupancy, Avg Tickets per Agent, Team Productivity
**Efficiency**: Self-Service Rate, Ticket Deflection Rate, Knowledge Base Usage
**Automation**: Chatbot Resolution Rate, AI Accuracy Rate, AI Resolution Rate, Auto-Resolved
**Finance**: Cost per Ticket, Revenue Impact
**Engagement**: Proactive Outreach, Customer Retention

### Customization Options

#### **Manual Mode**
- Search and filter by category
- Multi-select from complete library
- Drag to reorder
- Preview metrics before saving
- Category filters: Performance, Quality, Satisfaction, Volume, Productivity, Efficiency, Automation, Finance, Engagement

#### **Copilot Mode** 🤖
- **AI-powered KPI selection**
- Describe your role and goals in natural language
- Copilot suggests relevant metrics
- Conversational refinement
- One-click apply suggestions

**Example Copilot Interaction:**
```
User: "I'm a support manager focused on improving customer satisfaction"
Copilot: "I've analyzed your request and suggested the following KPIs: 
         CSAT Score, First Contact Resolution, Average Response Time, 
         Escalation Rate, and Agent Utilization. Would you like me to 
         add these to your watchlist?"
```

### Features
- **Time Filters**: 24h, 7 days, 30 days, 3 months
- **Ticket Group Filter**: All tickets, specific groups
- **Brand Filter**: Multi-brand support
- **Custom Filters**: Create and save custom filter combinations
- **Visual Indicators**: 
  - Trend arrows (up/down)
  - Color-coded status (green for good, orange for warning, red for critical)
  - Percentage/absolute change values
- **Collapse/Expand**: Show or hide entire section

---

## 💡 Recommendations

AI-powered suggestions to improve workflows and performance:

**Features:**
- **Smart Routing**: Suggest ticket routing rules to reduce resolution time
- **Status Automation**: Recommend automated status changes for specific intents
- **Macro Suggestions**: Identify opportunities to enable productivity features
- **Impact Metrics**: Show estimated time savings (e.g., "Could improve by 2h 25min")
- **Tagging System**: 
  - Feature category (Triggers, Auto assist, Macros)
  - Impact area (Workflow automation, Optimization, Agent productivity)
  - Status badges (Previously declined)
- **Action Buttons**: 
  - "Set up" → Opens configuration
  - "Preview" → Shows what would change
  - "Dismiss" → Hide recommendation

**Example Recommendations:**
1. Route specific tickets to assignee: EMEA Group (saves 2h 25min)
2. Change ticket status for intent: Unsolicited marketing (saves 1h 05min)
3. Turn on suggested macros (saves 50min)

---

## ⭐ Starred & Recent Assets

### Starred Assets
- Manually pinned dashboards and reports
- Quick access to frequently used items
- Shows: Title, Type, Last accessed, Author
- Actions: Open, Remove from starred

### Recent Assets
- Auto-populated based on access history
- Last 8 accessed items
- Same metadata as starred
- Actions: Open, Star, Share

**Features:**
- Click to open asset
- Hover to see additional actions
- Star/unstar toggle
- Share via email or Slack
- Copy link functionality

---

## 🎯 Workflow Templates

Pre-configured layouts optimized for different roles:

### Available Personas

1. **Support Manager**
   - Focus: Team performance, efficiency metrics, strategic insights
   - KPIs: Ticket Volume, Avg Resolution Time, CSAT Score, First Response Time, Agent Utilization, SLA Compliance, Escalation Rate, Team Productivity

2. **Support Agent**
   - Focus: Daily tasks, personal metrics, quick actions
   - KPIs: My Open Tickets, My Avg Response, My CSAT, Tickets Solved Today, My Resolution Time, Pending Reviews

3. **Executive**
   - Focus: High-level overview, strategic KPIs, business impact
   - KPIs: CSAT Score, SLA Compliance, Revenue Impact, Customer Retention, Support Cost/Ticket, NPS Score, Monthly Active Users, Escalation Rate

4. **Data Analyst**
   - Focus: Deep data analysis, custom reports, advanced analytics
   - KPIs: Ticket Volume, Avg Resolution Time, Ticket Backlog, Channel Distribution, Peak Hour Volume, Category Coverage, Data Quality Score, Agent Utilization

5. **Quality Assurance**
   - Focus: Quality metrics, review cases, improvement trends
   - KPIs: CSAT Score, QA Review Score, Cases to Review, Compliance Rate, Auto-QA Flagged, Training Needed, Escalation Rate, Avg Review Time

6. **Supervisor Monitoring** (Real-time)
   - Focus: Live operations monitoring, team performance tracking
   - KPIs: Agent Utilization, Active Agents, Team Response Time, Queue Wait Time, Team CSAT, Coaching Sessions, Team Productivity, Staffing Level
   - Special: Real-time data updates

7. **AI Admin**
   - Focus: Automated resolution, AI agent performance
   - KPIs: AI Resolution Rate, Auto-Resolved, AI Accuracy, Deflection Rate, AI Response Time, Agent Assist Uses, Model Confidence, Training Queue

### Template Application
- One-click apply
- Customization wizard (3 steps)
- Preview before applying
- Save custom templates
- Update frequency settings

---

## 🔔 Alert Banner

**Critical Alerts** displayed prominently at the top:

- Visual indicators (warning icons)
- Count of active alerts
- Click to expand details drawer
- Alert types: Performance degradation, SLA breaches, System issues
- Dismissible (closes banner but alerts remain accessible)
- Direct links to affected dashboards

---

## ⚙️ Customization & Settings

### Edit Mode
- **Toggle**: Click "Edit" button to enter edit mode
- **Drag & Drop**: Reorder sections (Latest insights, KPI watchlist, Recommendations, Starred, Recent)
- **Show/Hide**: Toggle section visibility
- **Count Adjustment**: Change number of items displayed
- **Save/Cancel**: Persist changes or revert

### Section Settings
- **Latest Insights**: Show/hide, adjust count (1-5)
- **KPI Watchlist**: Show/hide, adjust count (4-12)
- **Recommendations**: Show/hide
- **Starred**: Show/hide
- **Recent**: Show/hide
- **Announcements**: Show/hide

### Preferences
- **Default Page**: Set Home as default landing page
- **Time Range**: Default filter (7 days, 30 days, 3 months)
- **Watchlist Time Filter**: Default KPI timeframe (24h, 7 days, 30 days, 3 months)
- **Update Frequency**: Auto-refresh intervals

### Project Selector
- Filter all data by project
- Multi-project support
- "All projects" view
- Available projects:
  - Support Analytics
  - Performance Metrics
  - Customer Insights
  - AI Performance
  - Quality Assurance
  - Operations Dashboard

---

## 🎨 Visual Design

### Color Coding
- **Green**: Positive trends (improvements, decreases in bad metrics)
- **Red**: Negative trends (increases in bad metrics, degradations)
- **Blue**: Informational (neutral status)
- **Orange**: Warnings (attention needed)
- **Purple**: AI/Copilot features (gradient accents)

### Interactive Elements
- Hover states on all cards
- Click-through to detailed views
- Expandable/collapsible sections
- Tooltips for complex metrics
- Loading states for AI responses

### Responsive Layout
- Adapts to screen size
- Card-based grid system
- Flexible column layout
- Mobile-friendly (collapsed navigation)

---

## 🔗 Integration Points

### Analytics Assistant
- Direct links from insight action buttons
- Pre-filled questions
- Context preservation (knows which metric triggered the question)

### Dashboards & Reports
- One-click open from Starred/Recent
- Tabbed interface (opens in new tab)
- Preserves Home state

### Slack Integration
- Share recommendations
- Alert notifications
- User/channel selection

### Export
- KPI data export
- Schedule automated reports
- Download formats: CSV, Excel, PDF

---

## 📱 User Experience Flow

### First-Time User
1. See default "Support Manager" template
2. Alert banner explains customization options
3. Workflow template selector appears
4. Choose persona → Instant personalized view
5. Copilot introduction tooltip

### Daily Usage
1. Land on Home
2. Scan Latest Insights for anomalies
3. Review KPI Watchlist for trends
4. Check Recommendations
5. Use Ask mode to investigate specific questions
6. Access Recent assets for ongoing work

### Power User
1. Custom KPI selection via Copilot
2. Drag-and-drop section reordering
3. Multiple project switching
4. Advanced filtering
5. Shared custom templates with team

---

## 🚀 Key Differentiators

1. **Dual-Mode Copilot**: Ask vs. Search provides flexibility for different workflows
2. **AI-Powered Everything**: From KPI selection to recommendations to Q&A
3. **Role-Based Templates**: Instant personalization for different job functions
4. **Real-Time Monitoring**: Live data for supervisors and operations teams
5. **Contextual Actions**: Every insight has a "what to do next" button
6. **Conversational AI**: Natural language interaction, not rigid commands
7. **Source Attribution**: AI answers always cite their data sources
8. **Adaptive UI**: Learns from usage patterns and suggests improvements

---

## 💬 Copilot Behavior Details

### Ask Mode Interaction Pattern
1. User types question
2. Copilot analyzes intent
3. Searches relevant dashboards/reports
4. Generates natural language answer
5. Provides source citations
6. Suggests follow-up questions
7. Offers action buttons (e.g., "Open dashboard", "Create report")

### Search Mode Interaction Pattern
1. User enters keywords
2. Full-text search across:
   - Dashboard names
   - Report titles
   - Descriptions
   - Author names
   - Tags/categories
3. Returns ranked results
4. Shows metadata for quick decisions
5. One-click open or multi-step actions (share, copy link)

### AI Response Quality
- **Accuracy**: Cites specific data sources
- **Clarity**: Conversational, jargon-free language
- **Actionability**: Always suggests next steps
- **Relevance**: Context-aware based on project filter
- **Timeliness**: Real-time data where applicable

### Privacy & Permissions
- Only searches assets user has access to
- Respects project-level permissions
- Audit trail for AI interactions
- Option to disable AI features

---

## 📊 Success Metrics

**User Adoption:**
- % of users with customized Home
- Average session time on Home
- Copilot usage rate (Ask vs. Search)
- Template adoption by persona

**Business Impact:**
- Time saved via Recommendations
- Faster insight discovery (Ask mode)
- Reduced training time (role templates)
- Increased dashboard usage (Recent/Starred)

**AI Performance:**
- Answer accuracy rate
- User satisfaction with AI responses
- Follow-up question rate
- Recommendation acceptance rate
