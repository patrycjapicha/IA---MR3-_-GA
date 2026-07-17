import { useState } from 'react';
import styled from 'styled-components';
import {
  Alert,
  Button,
  Field,
  Input,
  MD,
  SM,
  MediaInput,
  Table,
  Tag,
  ToggleButton,
  XL,
  getColor,
} from '@zendesk-ui/react-components';
import {
  Sparkles as SparkleIcon,
  ArrowRight as ArrowRightIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Search,
  FLORA_SEARCH_ICON,
  floraSearchInputWrapperStyle,
} from '@/components/icons/flora';
import {
  copilotAnswer,
  insights,
  kpis,
  recommendations,
  recentAssets,
  searchResults,
} from '../data/mockData';

const Page = styled.div`
  padding: ${({ theme }) => theme.space.lg};
  max-width: 1200px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const CopilotCard = styled.div`
  background: ${({ theme }) => getColor({ theme, variable: 'background.raised' })};
  border: 1px solid ${({ theme }) => getColor({ theme, variable: 'border.subtle' })};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.space.lg};
`;

const ModeToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InsightCard = styled.div`
  background: ${({ theme }) => getColor({ theme, variable: 'background.raised' })};
  border: 1px solid ${({ theme }) => getColor({ theme, variable: 'border.subtle' })};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.md};
`;

const InsightValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => getColor({ theme, variable: 'foreground.default' })};
  margin: ${({ theme }) => theme.space.xs} 0;
`;

const ChangeText = styled.span<{ $positive?: boolean }>`
  color: ${({ theme, $positive }) =>
    getColor({
      theme,
      variable: $positive ? 'foreground.success' : 'foreground.danger',
    })};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const KpiCard = styled.div`
  background: ${({ theme }) => getColor({ theme, variable: 'background.raised' })};
  border: 1px solid ${({ theme }) => getColor({ theme, variable: 'border.subtle' })};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.md};
`;

const RecommendationCard = styled.div`
  background: ${({ theme }) => getColor({ theme, variable: 'background.raised' })};
  border: 1px solid ${({ theme }) => getColor({ theme, variable: 'border.subtle' })};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const AnswerCard = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => getColor({ theme, variable: 'background.subtle' })};
  border-radius: ${({ theme }) => theme.borderRadii.md};
`;

const TagRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.xs};
`;

function HomeContent() {
  const [showAlert, setShowAlert] = useState(true);
  const [copilotMode, setCopilotMode] = useState<'ask' | 'search'>('ask');
  const [query, setQuery] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSubmit = () => {
    if (!query.trim()) return;
    if (copilotMode === 'ask') {
      setShowAnswer(true);
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
      setShowAnswer(false);
    }
  };

  return (
    <Page>
      <PageHeader>
        <div>
          <XL tag="h1">Good morning, Leah</XL>
          <MD tag="p" style={{ color: 'inherit', opacity: 0.7 }}>
            Your daily brief and analytics overview.
          </MD>
        </div>
        <Button>Customize</Button>
      </PageHeader>

      {showAlert && (
        <Section>
          <Alert type="warning">
            <Alert.Title>3 active alerts</Alert.Title>
            <Alert.Paragraph>
              High ticket volume, response time threshold exceeded, and CSAT score dropped in the last 24 hours.
            </Alert.Paragraph>
            <Button size="small" onClick={() => setShowAlert(false)}>
              Dismiss alert
            </Button>
          </Alert>
        </Section>
      )}

      <Section>
        <CopilotCard>
          <SectionHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SparkleIcon />
              <MD tag="h2" isBold>
                Analyst copilot
              </MD>
            </div>
          </SectionHeader>

          <ModeToggle>
            <ToggleButton
              isPressed={copilotMode === 'ask'}
              onClick={() => setCopilotMode('ask')}
            >
              Ask
            </ToggleButton>
            <ToggleButton
              isPressed={copilotMode === 'search'}
              onClick={() => setCopilotMode('search')}
            >
              Search
            </ToggleButton>
          </ModeToggle>

          {copilotMode === 'search' ? (
            <MediaInput
              isCompact
              type="search"
              placeholder="Search dashboards and reports..."
              aria-label="Search dashboards and reports"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              start={<Search className={FLORA_SEARCH_ICON} />}
              wrapperProps={{
                style: floraSearchInputWrapperStyle('100%'),
              }}
            />
          ) : (
            <Field>
              <Field.Label>Ask a question about your data</Field.Label>
              <Input
                placeholder="Ask a question about your data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </Field>
          )}

          <div style={{ marginTop: 12 }}>
            <Button isPrimary onClick={handleSubmit}>
              {copilotMode === 'ask' ? 'Send question' : 'Find assets'}
            </Button>
          </div>

          {showAnswer && copilotMode === 'ask' && (
            <AnswerCard>
              <SM tag="p" isBold>
                {copilotAnswer.question}
              </SM>
              <MD tag="p">{copilotAnswer.answer}</MD>
              <SM tag="p" style={{ marginTop: 8 }}>
                Sources: {copilotAnswer.sources.join(', ')}
              </SM>
              <TagRow>
                {copilotAnswer.followUps.map((q) => (
                  <Button key={q} size="small">
                    {q}
                  </Button>
                ))}
              </TagRow>
            </AnswerCard>
          )}

          {showSearchResults && copilotMode === 'search' && (
            <div style={{ marginTop: 16 }}>
              <Table>
                <Table.Head>
                  <Table.HeaderRow>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Last updated</Table.HeaderCell>
                  </Table.HeaderRow>
                </Table.Head>
                <Table.Body>
                  {searchResults.map((result) => (
                    <Table.Row key={result.id}>
                      <Table.Cell>{result.name}</Table.Cell>
                      <Table.Cell>{result.type}</Table.Cell>
                      <Table.Cell>{result.author}</Table.Cell>
                      <Table.Cell>{result.updated}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </CopilotCard>
      </Section>

      <Section>
        <SectionHeader>
          <div>
            <MD tag="h2" isBold>
              Latest insights
            </MD>
            <SM tag="p">Sep 20–Sep 28, 2025</SM>
          </div>
        </SectionHeader>
        <InsightGrid>
          {insights.map((insight) => (
            <InsightCard key={insight.id}>
              <SM tag="p">{insight.label}</SM>
              <InsightValue>{insight.value}</InsightValue>
              <ChangeText $positive={insight.trend === 'down'}>
                {insight.trend === 'up' ? (
                  <TrendingUpIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
                ) : (
                  <TrendingDownIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
                )}
                {insight.change} {insight.changeValue}
              </ChangeText>
              <MD tag="p" style={{ marginTop: 8 }}>
                {insight.description}
              </MD>
              <Button size="small" style={{ marginTop: 8 }}>
                <Button.EndIcon>
                  <ArrowRightIcon />
                </Button.EndIcon>
                {insight.action}
              </Button>
            </InsightCard>
          ))}
        </InsightGrid>
      </Section>

      <Section>
        <SectionHeader>
          <MD tag="h2" isBold>
            KPI watchlist
          </MD>
          <Button size="small">Edit watchlist</Button>
        </SectionHeader>
        <KpiGrid>
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id}>
              <SM tag="p">{kpi.name}</SM>
              <InsightValue>{kpi.value}</InsightValue>
              <ChangeText $positive={kpi.trend === 'up' || kpi.trend === 'down'}>
                {kpi.change}
              </ChangeText>
            </KpiCard>
          ))}
        </KpiGrid>
      </Section>

      <Section>
        <SectionHeader>
          <MD tag="h2" isBold>
            Recommendations
          </MD>
        </SectionHeader>
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id}>
            <MD tag="p" isBold>
              {rec.title}
            </MD>
            <SM tag="p">{rec.impact}</SM>
            <TagRow>
              {rec.tags.map((tag) => (
                <Tag key={tag} size="small">
                  {tag}
                </Tag>
              ))}
              {rec.status && (
                <Tag size="small" hue="yellow">
                  {rec.status}
                </Tag>
              )}
            </TagRow>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button size="small" isPrimary>
                Set up
              </Button>
              <Button size="small">Preview</Button>
              <Button size="small" isBasic>
                Dismiss
              </Button>
            </div>
          </RecommendationCard>
        ))}
      </Section>

      <Section>
        <SectionHeader>
          <MD tag="h2" isBold>
            Recent assets
          </MD>
        </SectionHeader>
        <Table>
          <Table.Head>
            <Table.HeaderRow>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Last accessed</Table.HeaderCell>
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            {recentAssets.map((asset) => (
              <Table.Row key={asset.id}>
                <Table.Cell>{asset.title}</Table.Cell>
                <Table.Cell>{asset.type}</Table.Cell>
                <Table.Cell>{asset.author}</Table.Cell>
                <Table.Cell>{asset.lastAccessed}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>
    </Page>
  );
}

export default HomeContent;
