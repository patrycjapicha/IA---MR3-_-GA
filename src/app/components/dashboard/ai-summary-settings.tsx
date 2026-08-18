// ---------------------------------------------------------------------------
// AI summary — authoring settings
// ---------------------------------------------------------------------------
// The AI summary's configuration, shown in edit mode only. It sets what the
// summary is written from and how, so it belongs to the author rather than the
// viewer.
//
// It lives in a right-side drawer alongside copilot rather than in a popover over
// the canvas: an author changing these wants to see the summary they are
// changing. The drawer is a sibling of the canvas — the same pattern as copilot —
// so opening it narrows the canvas instead of covering the widget being
// configured.
//
// Layout: two collapsible groups in the order an author actually decides in —
// what the summary reads (source and focus), then what it says (content). Both
// open by default, because the point of collapsing is to park a group you are
// done with, not to hide the form from someone who just opened it.
//
// Controls come from builder-drawer's compact vocabulary, shared with the
// builder's other drawers, so all four match the density of the rest of the
// builder's chrome rather than each inventing its own.
import React, { useMemo, useState } from 'react';
// Combobox reads its own Field context, which is a different export from the
// forms Field the input rows use — hence both imports.
import {
  Button,
  Combobox,
  ComboboxField,
  Field,
  Input,
  Option,
} from '@zendesk-ui/react-components';
import { PencilSparkleStroke } from '../icons/flora';
import {
  BuilderDrawer,
  COMPACT_COMBOBOX,
  COMPACT_LABEL,
  DrawerAccordion,
  DrawerAccordionSection,
  LabelWithInfo,
  SelectRow,
} from './builder-drawer';

export const SUMMARIZE_SOURCES = ['Current tab', 'Entire dashboard'] as const;
export const SUMMARY_TONES = ['Concise', 'Balanced', 'Detailed'] as const;
export const COMPARISON_PERIODS = [
  'Previous comparable period',
  'Previous week',
  'Previous month',
  'Same period last year',
  'Target or goal',
  'Forecast',
  'Custom',
] as const;
export const MAX_INSIGHTS_OPTIONS = ['3', '4', '5'] as const;

// Which reports an author can promote. Named as metrics rather than as report
// titles because that is what the setting is about — the measures the summary
// should lead on.
export const PRIMARY_REPORT_OPTIONS = [
  'Ticket volume',
  'Backlog',
  'First reply time',
  'Resolution time',
  'CSAT',
  'SLA compliance',
  'Escalations',
  'Agent utilization',
];

export interface AiSummarySettings {
  source: string;
  primaryReports: string[];
  tone: string;
  comparisonPeriod: string;
  customComparison: string;
  maxInsights: string;
}

// Defaults describe the summary the widget already ships with, so opening the
// panel explains the visible output instead of contradicting it.
export const createAiSummarySettings = (): AiSummarySettings => ({
  source: 'Entire dashboard',
  primaryReports: [],
  tone: 'Balanced',
  comparisonPeriod: 'Previous comparable period',
  customComparison: '',
  maxInsights: '4',
});

// The primary-report picker: the same compact combobox, multiselectable. Flora
// renders the chosen reports as removable tags in the trigger, so the collapsed
// control still reports its own state and the separate disclosure the popover
// version needed is gone.
function PrimaryReportPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRIMARY_REPORT_OPTIONS;
    return PRIMARY_REPORT_OPTIONS.filter((r) => r.toLowerCase().includes(q));
  }, [query]);

  return (
    <ComboboxField className={`${COMPACT_LABEL} ${COMPACT_COMBOBOX}`}>
      <LabelWithInfo
        label={<ComboboxField.Label>Primary reports</ComboboxField.Label>}
        info="Prioritised reports lead the summary. Leave empty to weight everything equally."
        infoLabel="About primary reports"
      />
      <Combobox
        isCompact
        isAutocomplete
        isMultiselectable
        maxHeight="auto"
        listboxAriaLabel="Primary reports"
        placeholder={selected.length ? undefined : 'All reports weighted equally'}
        inputValue={query}
        onChange={(changes) => {
          if (changes.inputValue !== undefined) setQuery(changes.inputValue);
          if (changes.selectionValue !== undefined) {
            const next = Array.isArray(changes.selectionValue)
              ? changes.selectionValue
              : [changes.selectionValue];
            onChange(next.filter((v): v is string => typeof v === 'string'));
          }
        }}
      >
        {results.map((report) => (
          <Option key={report} value={report} label={report} isSelected={selected.includes(report)}>
            {report}
          </Option>
        ))}
      </Combobox>
    </ComboboxField>
  );
}

// The drawer that holds the settings. BuilderDrawer is the shell every right-side
// panel in the builder shares, so this one opens exactly like edit layout,
// context graph and copilot.
//
// Edits are held as a draft and only committed on Save, because Save and Cancel
// promise exactly that: a settings change here rewrites the summary underneath,
// so an author has to be able to try a combination and back out of it. The
// buttons sit in a footer outside the scroll area so they stay reachable at any
// scroll position.
export function AiSummarySettingsDrawer({
  settings,
  onSave,
  onClose,
}: {
  settings: AiSummarySettings;
  onSave: (next: AiSummarySettings) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<AiSummarySettings>(() => ({
    ...createAiSummarySettings(),
    ...settings,
  }));

  return (
    <BuilderDrawer
      // The widget's own icon, so the drawer is recognisable as belonging to the
      // component it configures.
      icon={<PencilSparkleStroke className="size-[16px] shrink-0 text-foreground" />}
      title="AI summary"
      description="Set what this summary is written from and how it reads"
      // Closing by the X discards, same as Cancel — there is no third outcome,
      // and a silent save on close would be the surprising one.
      closeLabel="Close AI summary settings"
      onClose={onClose}
      footer={
        <>
          <Button size="small" isBasic onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="small"
            isPrimary
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            Save
          </Button>
        </>
      }
    >
      <AiSummarySettingsPanel
        settings={draft}
        onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
      />
    </BuilderDrawer>
  );
}

export function AiSummarySettingsPanel({
  settings,
  onChange,
}: {
  settings: AiSummarySettings;
  onChange: (patch: Partial<AiSummarySettings>) => void;
}) {
  const s = { ...createAiSummarySettings(), ...settings };

  return (
    <DrawerAccordion sectionCount={2}>
      {/* ---- Source and focus --------------------------------------------- */}
      <DrawerAccordionSection label="Source and focus">
        <SelectRow
          label="Summarize"
          value={s.source}
          options={SUMMARIZE_SOURCES}
          onChange={(source) => onChange({ source })}
        />
        <PrimaryReportPicker
          selected={s.primaryReports}
          onChange={(primaryReports) => onChange({ primaryReports })}
        />
      </DrawerAccordionSection>

      {/* ---- Summary content ---------------------------------------------- */}
      <DrawerAccordionSection label="Summary content">
        {/* No "summary purpose" here. It offered a choice between operational
            monitoring and performance review, which is a claim about what the
            author is doing rather than an instruction to the summary — the range,
            the comparison and the primary reports already say it, and the widget
            reads the same either way. */}
        <SelectRow
          label="Tone and level of detail"
          value={s.tone}
          options={SUMMARY_TONES}
          onChange={(tone) => onChange({ tone })}
        />

        <SelectRow
          label="Comparison period"
          value={s.comparisonPeriod}
          options={COMPARISON_PERIODS}
          onChange={(comparisonPeriod) => onChange({ comparisonPeriod })}
        />
        {/* Disclosed only by "Custom": a date range with nothing to compare
            against is noise in every other case. */}
        {s.comparisonPeriod === 'Custom' && (
          <Field className={COMPACT_LABEL}>
            <Field.Label>Custom comparison range</Field.Label>
            <Input
              isCompact
              value={s.customComparison}
              placeholder="e.g. 1 Jun – 30 Jun 2026"
              onChange={(event) => onChange({ customComparison: event.target.value })}
              className="!text-[12px]"
            />
          </Field>
        )}

        <SelectRow
          label="Maximum insights shown"
          value={s.maxInsights}
          options={MAX_INSIGHTS_OPTIONS}
          onChange={(maxInsights) => onChange({ maxInsights })}
        />
      </DrawerAccordionSection>

      {/* There is no "viewer interaction" section any more. It held one toggle,
          for follow-up questions in copilot, and the summary no longer offers
          any — a setting for an affordance that cannot appear is a control that
          promises the author something the widget will not do. */}
    </DrawerAccordion>
  );
}
