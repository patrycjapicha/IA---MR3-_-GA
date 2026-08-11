// ---------------------------------------------------------------------------
// Edit layout and appearance
// ---------------------------------------------------------------------------
// The dashboard's own layout and appearance, shown in edit mode only. These are
// settings for the whole canvas rather than for one widget on it, which is why
// they are not on the widget toolbar: nothing has to be selected to change them.
//
// It opens in the same right-side drawer as context graph, copilot and an AI
// summary's settings — a sibling of the canvas, so changing the grid or the
// theme narrows the canvas rather than covering the thing being changed. That
// matters more here than anywhere else: every setting in this panel changes what
// the canvas looks like, so the canvas has to stay visible while you change it.
//
// Layout: two collapsible groups in the order an author decides in — the grid
// they place on, then the theme the widgets are drawn in.
import React, { useState } from 'react';
import { Button, Field, Toggle } from '@zendesk-ui/react-components';
import { Palette } from '../icons/flora';
import { BuilderDrawer, COMPACT_LABEL, DrawerAccordion, DrawerAccordionSection, SelectRow } from './builder-drawer';

export const GRID_SIZES = ['8 px', '12 px', '16 px', '20 px', '24 px'] as const;
export const WIDGET_SPACING = ['Compact', 'Comfortable', 'Spacious'] as const;
export const CANVAS_WIDTHS = ['Fixed', 'Fit to screen'] as const;
export const CARD_STYLES = ['Bordered', 'Shadow', 'Flat'] as const;
export const CORNER_STYLES = ['Rounded', 'Square'] as const;
export const COLOR_THEMES = ['Zendesk default', 'Neutral', 'High contrast'] as const;

export interface LayoutSettings {
  gridSize: string;
  snapToGrid: boolean;
  widgetSpacing: string;
  canvasWidth: string;
  cardStyle: string;
  cornerStyle: string;
  colorTheme: string;
}

// Defaults describe the canvas the builder already renders, so opening the panel
// explains what is on screen instead of contradicting it.
export const createLayoutSettings = (): LayoutSettings => ({
  gridSize: '20 px',
  snapToGrid: true,
  widgetSpacing: 'Comfortable',
  canvasWidth: 'Fit to screen',
  cardStyle: 'Bordered',
  cornerStyle: 'Rounded',
  colorTheme: 'Zendesk default',
});

// Edits are held as a draft and committed on Save, the same contract as the AI
// summary's settings: these changes redraw the whole dashboard, so an author has
// to be able to try a combination and back out of it. Closing by the X discards,
// same as Cancel.
export function LayoutSettingsDrawer({
  settings,
  onSave,
  onClose,
}: {
  settings: LayoutSettings;
  onSave: (next: LayoutSettings) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<LayoutSettings>(() => ({
    ...createLayoutSettings(),
    ...settings,
  }));

  return (
    <BuilderDrawer
      icon={<Palette className="size-[16px] shrink-0 text-foreground" />}
      title="Layout and appearance"
      description="Set how this dashboard is laid out and how it looks"
      closeLabel="Close layout and appearance"
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
      <LayoutSettingsPanel
        settings={draft}
        onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
      />
    </BuilderDrawer>
  );
}

// A compact toggle row. Toggles carry their own label, so unlike the select rows
// they need the label class on a plain Field rather than a ComboboxField.
function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Field className={COMPACT_LABEL}>
      <Toggle isCompact checked={checked} onChange={(event) => onChange(event.target.checked)}>
        <Field.Label>{label}</Field.Label>
      </Toggle>
    </Field>
  );
}

export function LayoutSettingsPanel({
  settings,
  onChange,
}: {
  settings: LayoutSettings;
  onChange: (patch: Partial<LayoutSettings>) => void;
}) {
  const s = { ...createLayoutSettings(), ...settings };

  return (
    <DrawerAccordion sectionCount={2}>
      {/* ---- Grid and spacing --------------------------------------------- */}
      <DrawerAccordionSection label="Grid and spacing">
        <SelectRow
          label="Grid size"
          value={s.gridSize}
          options={GRID_SIZES}
          info="The spacing of the dots widgets snap to while you place them."
          onChange={(gridSize) => onChange({ gridSize })}
        />
        <ToggleRow
          label="Snap widgets to grid"
          checked={s.snapToGrid}
          onChange={(snapToGrid) => onChange({ snapToGrid })}
        />
        <SelectRow
          label="Widget spacing"
          value={s.widgetSpacing}
          options={WIDGET_SPACING}
          onChange={(widgetSpacing) => onChange({ widgetSpacing })}
        />
        <SelectRow
          label="Canvas width"
          value={s.canvasWidth}
          options={CANVAS_WIDTHS}
          info="Fixed keeps the dashboard at its authored width. Fit to screen stretches it to the viewer's window."
          onChange={(canvasWidth) => onChange({ canvasWidth })}
        />
      </DrawerAccordionSection>

      {/* ---- Appearance --------------------------------------------------- */}
      <DrawerAccordionSection label="Appearance">
        <SelectRow
          label="Card style"
          value={s.cardStyle}
          options={CARD_STYLES}
          onChange={(cardStyle) => onChange({ cardStyle })}
        />
        <SelectRow
          label="Corners"
          value={s.cornerStyle}
          options={CORNER_STYLES}
          onChange={(cornerStyle) => onChange({ cornerStyle })}
        />
        <SelectRow
          label="Color theme"
          value={s.colorTheme}
          options={COLOR_THEMES}
          info="Sets the palette charts on this dashboard are drawn from."
          onChange={(colorTheme) => onChange({ colorTheme })}
        />
      </DrawerAccordionSection>
    </DrawerAccordion>
  );
}
