// ---------------------------------------------------------------------------
// AI summary widget
// ---------------------------------------------------------------------------
// The widget the builder's "AI summary" tool inserts. It is one state, always
// open: a takeaway that names where the dashboard stands, then the findings that
// back it up, each carrying the evidence for its claim and the moves available
// on it.
//
// Nothing collapses. A summary that has to be opened to be read gets ignored on
// a dashboard people scan, and a disclosure that is open by default is just a
// control that can only make the widget worse.
//
// Findings are ranked rather than listed. A summary whose items all look alike
// makes the reader do the triage, which is the work it was supposed to do for
// them — so each finding declares its own weight, and the ranking is what the
// eye picks up before any of the words.
import React from 'react';
import { Tooltip as FloraTooltip } from '@zendesk-ui/react-components';
import { InfoStroke, Sparkles, SparklesStroke } from '../icons/flora';
import { INK, INK_2, STATUS } from './service-ops';
import { createAiSummarySettings } from './ai-summary-settings';

const ACCENT = '#5b4bc4';

// How much a finding matters, which is the one thing about it that has to be
// legible before it is read. Three levels rather than a numeric score: the point
// is "look here first", and a reader cannot rank seven shades of urgent.
export type AiFindingTone = 'high' | 'priority' | 'positive';

export interface AiSummaryFinding {
  tone: AiFindingTone;
  // The eyebrow, written out rather than derived from the tone: "high impact" is
  // a claim about this particular finding, not a name for its severity band.
  label: string;
  headline: string;
  // The finding in one or two sentences: the number against a reference point,
  // and where it is concentrated or what it costs. Prose rather than a stack of
  // fragments, because that order is an argument — but kept short, since three of
  // these sit side by side and a paragraph per column is a page of reading in a
  // widget people scan.
  insight?: string;
  // What to do about it, and what to ask next. Both hand off to copilot: the
  // finding is written by AI, and the move after reading it is a conversation
  // about this dashboard rather than a jump to some other screen. A finding with
  // neither is a fact rather than an insight, so every one carries at least one.
  //
  // `action` is the verb on screen; `recommendation` is the prompt behind it,
  // never rendered. The advice used to be printed above the verb as a sentence,
  // which said the same thing twice — the insight has already made the case, so
  // spelling out the move as prose only pushed the button further from the
  // evidence it follows from. A verb is something you click, and it is enough.
  recommendation?: string;
  action?: string;
  followUp?: string;
}

// Relative strings rather than timestamps: a prototype has no live clock behind
// it, and "8 min ago" is what the real widget would render anyway.
export interface AiSummaryFreshness {
  dataRefreshed: string;
  summaryUpdated: string;
}

// Only the high-impact finding is tagged, and only in red. Three coloured tags
// meant every finding was flagged, which is the same as none of them being
// flagged — a reader scanning a row of tags has to compare hues to find the one
// that matters. One red tag is a single mark on the page, and the ranking it
// belongs to is already carried by the order the findings sit in.
//
// The text is darker than the status hue because an 11px label has to clear
// contrast where a chart's fill does not, and the fill is that hue at low alpha so
// the tag reads as tinted rather than as a second button.
const HIGH_TAG = { fill: `${STATUS.critical}1a`, text: '#a8261f' };

// The stroke every finding card is drawn with — the dashboard's own neutral
// border, so a finding reads as a box on the canvas rather than as a coloured
// state.
const CARD_STROKE = '#e4e6e8';

// The height the builder inserts the widget at. One height, because there is one
// state: it fits the header and the three findings at the default width with no
// inner scroll and no band of dead space under the last line. The body scrolls
// rather than clips once an author narrows the widget and the findings drop into
// fewer columns.
export const AI_SUMMARY_HEIGHT = 476;
// Full-width-at-the-top is the placement this is designed for, and at 1060 the
// three findings sit in three columns with the takeaway across the top. Narrower
// is supported — the findings reflow — but this is the shape the default should
// land in.
export const AI_SUMMARY_WIDTH = 1060;

// The narrowest a finding column reads at: below roughly this, its evidence
// lines start wrapping every second word. It sets where the grid drops a column
// rather than any particular column count, so the same number works at every
// widget width.
const SECTION_MIN_COL = 300;

export const isAiSummaryChart = (chartType?: string) => chartType === 'ai-summary';

// Claims that came from a report are marked up inline as [text](Report name), so
// the copy and its sources stay in one string. The alternative — a parallel array
// of offsets — breaks the moment anyone edits the sentence.
const SOURCE_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

// Renders a marked-up sentence: plain runs as text, marked runs as links to the
// report the claim was read from.
//
// Underlined rather than coloured, and only on the specific claim rather than the
// whole sentence: an AI summary's real question is "where does that number come
// from", so the underline has to point at the number, and a sentence with four
// blue fragments in it stops being a sentence. The underline is the affordance
// on its own, which is also what keeps it legible for anyone not seeing the hue.
function SourcedText({
  text,
  onOpenSource,
}: {
  text: string;
  onOpenSource?: (report: string) => void;
}) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  // exec with /g is stateful, so the regex is reset per call rather than shared.
  SOURCE_PATTERN.lastIndex = 0;
  while ((match = SOURCE_PATTERN.exec(text))) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const [, label, report] = match;
    nodes.push(
      // A span with a button role rather than a <button>: a real button is an
      // atomic inline-block in layout, so the punctuation after a link that wraps
      // gets pushed onto a line of its own. A span wraps as text does, which is
      // what a fragment of a sentence has to do. A native title rather than
      // Flora's Tooltip for the same reason — Tooltip wraps its child in a div,
      // invalid inside a <p> and outside the line box.
      <span
        key={`${match.index}-${report}`}
        role="button"
        tabIndex={0}
        title={`From ${report}`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenSource?.(report);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            onOpenSource?.(report);
          }
        }}
        // A plain solid underline in the text's own colour. The dotted violet rule
        // was a third mark on a card that already has a stroke and a pill, and at
        // 13px a dotted line renders as a smudge rather than as a texture.
        className="cursor-pointer underline decoration-1 underline-offset-2"
        aria-label={`${label} — open source report ${report}`}
      >
        {label}
      </span>
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm font-semibold" style={{ color: INK }}>
      {children}
    </h4>
  );
}

// The tag on the high-impact finding. Sentence case, so it is a phrase a reader
// takes in whole rather than a label they decode letter by letter.
//
// 13px is the floor for every size in this widget, tags included: a summary is
// read rather than glanced at, and 11px metadata on a dashboard someone reads
// across a room is metadata nobody reads. Leading is set in px throughout because
// the root font is 14px, so Tailwind's rem-based leading-4 would resolve to 14px
// and crowd a 13px line.
function CategoryTag({
  children,
  color,
  background,
}: {
  children: React.ReactNode;
  color: string;
  background: string;
}) {
  return (
    <span
      className="inline-flex max-w-full items-center rounded-full px-2.5 py-0.5 text-[13px] font-semibold leading-[18px]"
      style={{ color, backgroundColor: background }}
    >
      {children}
    </span>
  );
}

// The move on a finding: the verb alone. The advice it takes used to be printed
// above it as a sentence, but the insight has already made the case — so the
// sentence restated what the reader just read and put two lines between the
// evidence and the thing to press. The recommendation still exists; it is the
// prompt this button sends to copilot, which is where the reasoning belongs.
//
// Underlined text rather than a filled or stroked button. Three buttons across a
// findings row read as the dashboard's primary actions when they are suggestions
// the summary is making, and the card already carries a stroke, a tag and a pill —
// a fourth box was the edge too many.
function Recommendation({ action, onClick }: { action: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      // -m-1 p-1 so the hover surface is bigger than the text without the verb
      // indenting itself away from the lines above the rule.
      className="group -m-1 flex rounded-[8px] p-1 text-left text-[13px] font-medium leading-[18px] underline decoration-1 underline-offset-2 transition-colors hover:bg-[#f5f4fb]"
    >
      {action}
    </button>
  );
}

// One finding, in a card with a neutral stroke. A bounded box rather than a
// coloured rule down the left edge: the rule only worked as a ranking mark while
// all three carried one, and once two of them are untagged it was a decoration
// with nothing to say. A stroke gives each finding its own edge, which is what
// actually separates three columns of text — the ranking stays in the order they
// sit in, worst first.
//
// Stroke only, no fill: the widget's card is already a white surface, so a white
// box on it is an edge drawn twice. Transparent means the three findings read as
// divisions of one card rather than as three cards stacked on another one.
//
// Body copy is the theme's own foreground rather than a per-line colour. Four
// shades down a card made every line look like a different kind of statement; on
// one colour, the hierarchy is carried by weight and size, which is what it is
// for.
function Finding({
  finding,
  onOpenSource,
  onAskCopilot,
}: {
  finding: AiSummaryFinding;
  onOpenSource?: (report: string) => void;
  onAskCopilot?: (prompt: string) => void;
}) {
  return (
    <div
      className="flex min-w-0 flex-col rounded-[12px] border p-4 text-foreground"
      style={{ borderColor: CARD_STROKE }}
    >
      {/* Only the high-impact finding is tagged. The other two are ranked by
          where they sit, and a tag saying "priority finding" on all three was
          telling a reader nothing they could act on. */}
      {finding.tone === 'high' && finding.label && (
        <div className="mb-2.5">
          <CategoryTag color={HIGH_TAG.text} background={HIGH_TAG.fill}>
            {finding.label}
          </CategoryTag>
        </div>
      )}
      {/* Body size, ranked by weight alone. A card this small does not need a type
          step to say which line leads it — the headline is first and it is the only
          bold line, and at 15px it was reading as a heading over a paragraph when
          all five lines are one statement. */}
      <p className="text-[13px] font-semibold leading-[19px]">
        <SourcedText text={finding.headline} onOpenSource={onOpenSource} />
      </p>
      {/* The finding told as prose: what happened, where, and what it costs, in
          sentences. It replaces the stack of comparison / detail / impact lines —
          those were three fragments a reader had to join up themselves, and the
          joining is the part that makes it an insight rather than three readings.
          One paragraph, so the sourced claims sit inside sentences that say why
          they matter. */}
      {finding.insight && (
        <p className="mt-2 text-[13px] leading-[19px]">
          <SourcedText text={finding.insight} onOpenSource={onOpenSource} />
        </p>
      )}
      {/* What to do about the finding, below a rule. The insight above is a
          reading of the data; everything under the rule is a move on it, and the
          two were running together as one column of paragraphs. One rule, not two:
          the recommendation and the question are both offers, so they belong on the
          same side of it.
          mt-auto pins the block to the bottom of the card so the rules line up
          across findings of unequal length instead of floating at three heights. */}
      {/* The action is a hand-off to copilot, so it is only rendered when there is
          somewhere for the click to go — a summary published as a read-only
          briefing keeps the finding and drops the moves on it. */}
      {onAskCopilot && (finding.action || finding.followUp) && (
        <div className="mt-auto border-t pt-3" style={{ borderColor: CARD_STROKE }}>
          {/* The verb, which opens copilot with the recommendation behind it as the
              prompt. The recommendation is the sentence the author wrote; it is
              what gets sent, not what gets shown. */}
          {finding.action && (
            <Recommendation
              action={finding.action}
              onClick={() => onAskCopilot(finding.recommendation || finding.action!)}
            />
          )}
          {/* The same suggestion pill offered in copilot's drawer and in the
              canvas's chip row — it is the same offer in all three places, at the
              compact density a 300px card can carry. */}
          {finding.followUp && (
            <div className={`flex ${finding.action ? 'mt-3' : ''}`}>
              <AiSuggestionPill compact onClick={() => onAskCopilot(finding.followUp!)}>
                {finding.followUp}
              </AiSuggestionPill>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// A suggested question you can take rather than type. One component for all three
// places it appears — the summary's findings, copilot's drawer, and the chip row
// in the canvas's bottom-left corner — because they are the same offer, and three
// renderings of it would read as three different affordances.
//
// The canvas row is the version that was already in Figma, so it sets the shape:
// a filled grey pill, 32px tall, a 16px filled sparkle in Flora's violet, and
// 13px text. Grey rather than outlined because these sit on top of content — a
// stroke pill on a card inside a card is a third nested edge.
//
// `compact` tightens the box for the version inside a finding, where two pills
// stack in a card 300px wide and the drawer's padding makes them the loudest thing
// in it. Type stays at 13px in both — the floor — so the two are the same pill at
// two densities rather than two sizes.
const SUGGESTION_PILL =
  'inline-flex max-w-full shrink-0 cursor-pointer items-center rounded-[99px] bg-[#eeefee] text-left transition-colors hover:bg-[#e5e5e5]';

export function AiSuggestionPill({
  children,
  compact,
  onClick,
}: {
  children: React.ReactNode;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`${SUGGESTION_PILL} ${
        compact ? 'gap-[5px] px-2.5 py-[3px]' : 'gap-[6px] px-[12px] py-[7px]'
      }`}
    >
      <Sparkles
        className={`${compact ? 'size-[13px]' : 'size-[16px]'} shrink-0 !text-[#8d59b1]`}
        aria-hidden
      />
      <span className="min-w-0 text-[13px] leading-[18px] tracking-[-0.132px]" style={{ color: INK }}>
        {children}
      </span>
    </button>
  );
}

// The heading that leads a set of suggestions, and the row they sit in. Shared
// with copilot's drawer for the same reason the pill is.
export function AiSuggestionList({
  heading,
  suggestions,
  onSelect,
}: {
  heading: string;
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
}) {
  return (
    <div className="space-y-2">
      <SectionHeading>{heading}</SectionHeading>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <AiSuggestionPill key={suggestion} onClick={() => onSelect?.(suggestion)}>
            {suggestion}
          </AiSuggestionPill>
        ))}
      </div>
    </div>
  );
}

export function AiSummaryCard({
  content,
  onAskCopilot,
  onOpenSource,
  // The widget's own overflow menu, passed in rather than built here: it is an
  // authoring affordance, so what belongs on it is the builder's business, and
  // the builder already owns the menu primitives the rest of its chrome uses.
  headerAction,
}: {
  content: any;
  onAskCopilot?: (question: string) => void;
  onOpenSource?: (report: string) => void;
  headerAction?: React.ReactNode;
}) {
  const takeaway = content?.takeaway || {};
  const findings: AiSummaryFinding[] = content?.findings || [];
  const freshness = content?.freshness || {};
  // The scope line: what the summary read, in the order that answers "does this
  // apply to what I am looking at" — range, then filter, then age.
  const scope = [content?.timeRange, content?.scope, freshness.summaryUpdated && `Updated ${freshness.summaryUpdated}`]
    .filter(Boolean)
    .join(' · ');
  // Off is a deliberate authoring choice — a summary can be published as a
  // read-only briefing — so the question is hidden rather than disabled.
  const allowFollowUps = content?.settings?.allowCopilotFollowUps !== false;

  return (
    <div className="flex h-full min-h-0 flex-col p-1 text-foreground">
      {/* Header: the takeaway leads and "AI summary" sits opposite it as a tag.
          A title repeating the tag would spend the widget's first line saying what
          it is, when the tag says that in the corner and the takeaway is what a
          reader is actually here for. The scope stays beneath the takeaway, where
          it qualifies a claim rather than heading the widget. */}
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* The takeaway: one sentence saying where the dashboard stands, across
              the full width above the findings rather than as a column among them.
              It is the thing that has to land in a glance, and a reader who stops
              after it should still have the answer. Untagged — it is the widget's
              lead, and a label above it would rank it against the findings it
              introduces. */}
          {/* 15px, one step over the body rather than three. At 17px a two-clause
              sentence was a page title on a widget that is one card among many; a
              single step is enough to say "read this first" when it is also the
              only line above the findings. */}
          {takeaway.text && (
            <p className="text-[15px] font-semibold leading-[21px]">
              <SourcedText text={takeaway.text} onOpenSource={onOpenSource} />
            </p>
          )}
          {/* The scope is the one line that is deliberately quieter than the body:
              it is a qualifier on the takeaway, not part of it. Quieter by colour
              rather than by size, now that 13px is the floor. */}
          {scope && (
            <p className="mt-1.5 text-[13px] leading-[19px] text-muted-foreground">{scope}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
          {/* What wrote this, as a tag rather than a heading: it is provenance, and
              a reader needs it once, at the edge, not as the first thing they
              read. */}
          <span
            className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-semibold leading-[18px]"
            style={{ color: ACCENT, backgroundColor: `${ACCENT}14` }}
          >
            <SparklesStroke className="shrink-0" style={{ width: 13, height: 13, color: ACCENT }} />
            AI summary
          </span>
          {/* The scope line carries the summary's own age; the data behind it
              refreshes on a different clock, and conflating the two is what makes
              a stale summary look current. The breakdown sits behind the icon
              rather than in the line, because it is a caveat. */}
          <FloraTooltip
            content={
              <span className="flex flex-col gap-0.5">
                <span>{`Insights based on data refreshed ${freshness.dataRefreshed}`}</span>
                <span>{`Summary updated ${freshness.summaryUpdated}`}</span>
              </span>
            }
            placement="bottom-end"
            size="small"
          >
            <span
              className="flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full text-[#68737d] hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
              aria-label="AI summary freshness"
            >
              <InfoStroke className="shrink-0" style={{ width: 14, height: 14 }} />
            </span>
          </FloraTooltip>
          {headerAction}
        </div>
      </div>

      {/* No rule under the header: the finding cards have their own edges now, and
          a divider above them was a third horizontal line in 20px of space. The
          gap does the separating. */}
      <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
        {/* Findings are content in a flow rather than a fixed stack, because the
            typical placement is a full-width summary at the top of a dashboard —
            and three stacked findings across 1400px would be a column of text
            with a screen of empty space beside it.
            auto-fit + minmax rather than a fixed column count or a breakpoint:
            the widget is resizable to any width on the canvas, so the number of
            columns has to follow the width it actually has. SECTION_MIN_COL is
            the narrowest a finding reads at, so columns are added only while each
            one still holds a readable measure, and it collapses to a single
            stacked column in a narrow widget without anything to switch.
            Order is the ranking, so a single column reads worst-first.
            items-stretch rather than items-start now that the findings are cards:
            three boxes of different heights in a row read as a broken layout, and
            equal heights are what let each card pin its pill to the bottom. */}
        <div
          className="grid items-stretch gap-4"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${SECTION_MIN_COL}px, 1fr))` }}
        >
          {findings.map((finding) => (
            <Finding
              key={finding.headline}
              finding={finding}
              onOpenSource={onOpenSource}
              // A finding's recommendation and follow-up are hidden along with the
              // rest of the copilot hand-offs when a summary is published as a
              // read-only briefing: they are prompts, and there would be nowhere
              // for them to go.
              onAskCopilot={allowFollowUps ? onAskCopilot : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// The content the tool inserts. Kept beside the renderer so the copy and the
// component that lays it out stay in step.
export const createAiSummaryContent = () => ({
  chartType: 'ai-summary',
  reportSource: 'Customer Support Analytics',
  reportType: 'Analytics',
  description: 'Written from the reports on this dashboard for the selected time range and filters.',
  // Authoring settings travel with the widget so the contextual panel has state
  // to read from the moment the widget is inserted.
  settings: createAiSummarySettings(),
  // The scope line, in the order that answers "does this apply to what I am
  // looking at": the range, then the filter, then how old the reading is.
  timeRange: 'Last 30 days',
  scope: 'All channels',
  freshness: {
    dataRefreshed: '12 min ago',
    summaryUpdated: '8 min ago',
  },
  // `[claim](Report name)` marks the parts of a sentence that came from a report,
  // so a viewer can go to the source of a specific number rather than the source
  // of the paragraph. Only the measured claims are marked — the connective prose
  // between them has no report behind it, and underlining it would say it does.
  takeaway: {
    text: 'Support quality is stable overall, but [Voice is underperforming](Quality score by channel) and is contributing disproportionately to [churn risk](Churn risk by channel).',
  },
  // Ranked worst-first. Each finding carries its own evidence and the moves
  // available on it, so a reader can act on one without reading the others.
  //
  // The insight is one or two sentences: the measured claim, then the one thing
  // that qualifies it. Anything further is a question for copilot rather than a
  // third line in a column that is 300px wide.
  //
  // Each carries the verb that appears on the button, the recommendation that verb
  // sends to copilot as a prompt, and a follow-up question. The recommendation is
  // written as a prompt because that is all it is used for now — a line a viewer
  // has to rewrite before sending is worse than no line at all.
  findings: [
    {
      tone: 'high' as const,
      label: 'Priority finding — high impact',
      headline: 'Voice reopen rate is elevated',
      insight:
        'Voice tickets are reopening [18% more often than Email](Reopen rate by channel), almost all of it in [Enterprise Support after an escalation](Reopens by team). Those reopens touch [798 tickets already flagged as churn risks](Churn risk by channel).',
      recommendation:
        'Review the Enterprise Support escalation path for Voice — the reopens cluster after handoff.',
      action: 'Review escalation path',
      followUp: 'Which reopened Voice tickets are churn risks?',
    },
    {
      tone: 'priority' as const,
      label: 'Priority finding',
      headline: 'Voice quality score is below peer channels',
      insight:
        'Voice is scoring [45% on quality against 54% for Email](Quality score by channel). [Tone and empathy account for most of the gap](Quality score breakdown) while accuracy holds up, so this is a coaching gap rather than a knowledge one.',
      recommendation: 'Add tone and empathy coaching to the Voice QA sample.',
      action: 'Add QA coaching',
      followUp: 'Which agents drive the Voice quality gap?',
    },
    {
      tone: 'positive' as const,
      label: 'Positive finding',
      headline: 'Messaging FRT improved',
      insight:
        'Messaging is answering [22% faster than last period](First reply time by channel) and sits inside target. The gain tracks the mid-month routing change, so it looks structural rather than a quiet week.',
      // A positive finding gets a recommendation about keeping the gain rather
      // than fixing it, which is the move a reader actually has here.
      recommendation: 'Apply the Messaging routing change to Voice, where reply times still lag.',
      action: 'Apply to Voice',
      followUp: 'What drove the Messaging first reply time improvement?',
    },
  ],
});

// ---------------------------------------------------------------------------
// The summaries the prebuilt dashboards ship with
// ---------------------------------------------------------------------------
// The mocked dashboards carry a real AI summary rather than a card that looks
// like one: it is the same component an author inserts, with the same content
// shape, so what a stakeholder sees in the mock is what the widget actually does
// — sourced claims, ranked findings and hand-offs into copilot all included.
//
// Only the copy differs, and it has to: a summary is a reading of the dashboard
// it sits on, so each one names that dashboard's own reports and numbers.

// The height the widget needs when it runs the full width of a section band
// rather than at its own default width. Wider columns mean the evidence wraps
// onto fewer lines, so a full-width summary is shorter than the same content at
// AI_SUMMARY_WIDTH.
//
// Measured against the longer of the two prebuilt summaries at the default
// viewport, so both fit with no inner scroll and neither leaves a band of dead
// space under the last card. It is a fixed number rather than a measurement
// because a canvas widget is placed at a size — the same reason
// AI_SUMMARY_HEIGHT is one. Re-measure it whenever the findings' copy changes:
// shorter insights leave dead space, longer ones make the band scroll.
export const AI_SUMMARY_BAND_HEIGHT = 312;

// Everything a summary carries besides its copy: what wrote it, what it read,
// and the authoring settings the contextual panel edits. Shared so a prebuilt
// summary is indistinguishable from an inserted one apart from the words.
const prebuiltSummary = (
  read: { timeRange: string; scope: string; freshness: AiSummaryFreshness },
  takeaway: string,
  findings: AiSummaryFinding[]
) => ({
  chartType: 'ai-summary',
  reportSource: 'Customer Support Analytics',
  reportType: 'Analytics',
  description: 'Written from the reports on this dashboard for the selected time range and filters.',
  settings: createAiSummarySettings(),
  ...read,
  takeaway: { text: takeaway },
  findings,
});

// The executive service review's summary. The dashboard's own story is "faster,
// but unevenly" — so the findings are the two places the gain did not reach,
// then the change that produced it.
export const createServiceReviewAiSummary = () =>
  prebuiltSummary(
    {
      timeRange: 'Wk 27 – Wk 32 2026',
      scope: 'All channels, brands and regions',
      freshness: { dataRefreshed: '14 min ago', summaryUpdated: '9 min ago' },
    },
    'Service got materially faster this quarter, but [urgent-priority SLA breached its commitment](SLA Compliance Report) and [Escalations has no headroom left](Agent Utilization Report).',
    [
      {
        tone: 'high',
        label: 'Priority finding — high impact',
        headline: 'Urgent-priority SLA is below the 90% commitment',
        insight:
          'Urgent tickets finished inside SLA [82% of the time, six points down](SLA Compliance Report) — the first miss of the year. It is almost entirely [Escalations, running at 96% occupancy](Agent Utilization Report), and [two enterprise contracts carry service credits at 90%](SLA Compliance Report).',
        recommendation:
          'Move two agents into Escalations for the rest of the quarter — it is the only queue missing the target.',
        action: 'Model the reallocation',
        followUp: 'Which urgent tickets breached SLA this period?',
      },
      {
        tone: 'priority',
        label: 'Priority finding',
        headline: 'Chat overtook email as the busiest channel',
        insight:
          '[Chat passed email in week 31](Channel Performance Overview) and now carries the largest share of inbound contacts. Staffing still follows the old mix, which is why [queue wait time is climbing](Queue Wait Time Report) as resolution time falls.',
        recommendation:
          'Rebalance the weekly staffing plan to the new channel mix before the next roster is published.',
        action: 'Review staffing plan',
        followUp: 'How has chat volume shifted by hour of day?',
      },
      {
        tone: 'positive',
        label: 'Positive finding',
        headline: 'Routing changes cut resolution time by a third',
        insight:
          'Median full resolution is [5.8 hours, down 36% since week 27](Resolution Time Analysis) and held through a 12% rise in volume. [Satisfaction rose 3.8 points](Customer Satisfaction Analysis) over the same weeks, so the speed did not come out of quality.',
        recommendation:
          'Extend skills-based routing to Escalations, the one queue it was never applied to.',
        action: 'Extend routing',
        followUp: 'What did the routing change do for each team?',
      },
    ]
  );

// The monitoring dashboard's summary. One driver explains the whole month, so
// the findings say what is failing, what is causing it, and what is holding the
// month together in spite of it.
export const createMonitoringAiSummary = () =>
  prebuiltSummary(
    {
      timeRange: '1 – 31 July 2026',
      scope: 'All channels',
      freshness: { dataRefreshed: '2 min ago', summaryUpdated: '6 min ago' },
    },
    '[Resolution SLA has missed target for five weeks](SLA Compliance Report), and [billing demand](Customer Support Analytics) accounts for effectively all of it — this is a capacity decision rather than a process one.',
    [
      {
        tone: 'high',
        label: 'Priority finding — high impact',
        headline: 'Resolution SLA has been below target for five weeks',
        insight:
          'Attainment sits at [81% against a 90% target, nine points down this month](SLA Compliance Report). [212 of the 412 at-risk tickets are in the Billing queue](Backlog Analysis) while the other three teams stay inside target.',
        recommendation:
          'Reallocate agents into Billing this week — every other team still has headroom.',
        action: 'Model the reallocation',
        followUp: 'Which at-risk tickets breach first?',
      },
      {
        tone: 'priority',
        label: 'Priority finding',
        headline: 'Billing contacts account for the volume increase',
        insight:
          '[Billing and refund contacts are up 18%](Customer Support Analytics) and account for 78% of the rise in total volume, while [every other driver is flat or down](Channel Performance Overview). Demand has been above forecast for eleven straight days, so [this is a shift in the mix rather than a spike](Ticket Volume Trends).',
        recommendation:
          'Add the top three billing questions to the AI agent — they repeat and vary little.',
        action: 'Review AI coverage',
        followUp: 'What are customers asking about billing?',
      },
      {
        tone: 'positive',
        label: 'Positive finding',
        headline: 'AI containment absorbed the simpler contacts',
        insight:
          '[Containment reached 34%, up four points](Automation Impact Summary) — 4,240 conversations resolved with no agent involved. It is why [satisfaction still rose 1.5 points](Customer Satisfaction Analysis) in a month when resolution time slipped.',
        recommendation:
          'Put the freed agent hours into the Billing queue rather than back into general staffing.',
        action: 'Reallocate hours',
        followUp: 'Which conversations did the AI agent contain?',
      },
    ]
  );

// ---------------------------------------------------------------------------
// Per-report AI summary
// ---------------------------------------------------------------------------
// The same idea one level down: a chart on the dashboard can carry its own
// summary, reading only its own data rather than the whole dashboard's.
//
// It renders inside the report's card, under the chart, rather than as a second
// widget beside it — a summary of one chart that sits somewhere else on the
// canvas is a claim with no visible subject, and it would come apart the moment
// the author moved either box. Under the chart it is unambiguously about the
// thing above it, and it travels with it.
//
// Two or three sentences, no sections and no follow-up row. The dashboard-level
// widget has room for a briefing because it is the point of its own box; this one
// is an annotation on a chart, and every line it takes is a line of the chart.
export const REPORT_SUMMARY_MIN_HEIGHT = 96;

export const hasReportSummary = (content?: any) => content?.reportSummary?.enabled === true;

// The height a report's card grows by when a summary is turned on, so a chart
// that fitted before still fits after. Charts vary, so this is the band's own
// space rather than a measurement of any particular one.
export const REPORT_SUMMARY_EXTRA_HEIGHT = 132;

export function ReportSummaryBand({
  summary,
  onAskCopilot,
  onOpenSource,
  // Edit-mode affordance: turning the summary back off from where it appears,
  // rather than making the author find the toolbar toggle again.
  onRemove,
}: {
  summary: any;
  onAskCopilot?: (question: string) => void;
  onOpenSource?: (report: string) => void;
  onRemove?: () => void;
}) {
  const text: string = summary?.text || '';
  const followUp: string | undefined = summary?.followUp;

  return (
    // A tinted band with a top rule rather than a card of its own: it is part of
    // the report's card, and a second border inside one box reads as two boxes.
    <div
      className="mt-2 shrink-0 rounded-[12px] border px-3 py-2.5"
      style={{ borderColor: '#e3dcf5', backgroundColor: `${ACCENT}0a` }}
    >
      <div className="flex items-start gap-2">
        <SparklesStroke
          className="mt-[3px] shrink-0"
          style={{ width: 12, height: 12, color: ACCENT }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug" style={{ color: INK_2 }}>
            <SourcedText text={text} onOpenSource={onOpenSource} />
          </p>
          {/* One question, not a row of them: this summary makes one point, so
              there is one obvious thing to ask next. The same suggestion pill the
              findings and copilot's drawer offer — a follow-up question is one
              affordance wherever it appears. */}
          {followUp && (
            <div className="mt-2 flex">
              <AiSuggestionPill onClick={() => onAskCopilot?.(followUp)}>
                {followUp}
              </AiSuggestionPill>
            </div>
          )}
        </div>
        {onRemove && (
          <button
            type="button"
            aria-label="Remove AI summary from this report"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#68737d] transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <span aria-hidden className="text-[13px] leading-none">
              ×
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

// The summary a report gets when an author turns one on. Written from the chart's
// own data, so it names that chart rather than the dashboard's other reports.
export const createReportSummary = (reportTitle: string) => ({
  enabled: true,
  text: `[Volume rose 12% over the period](${reportTitle}), with the increase concentrated in the last five days. The trend is above the comparable period rather than a one-day spike.`,
  followUp: 'What is driving the increase?',
});
