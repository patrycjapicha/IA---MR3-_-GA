// ---------------------------------------------------------------------------
// Builder drawer shell
// ---------------------------------------------------------------------------
// The one shell every right-side panel in the builder opens in: edit layout,
// context graph, create with copilot, and an AI summary's settings.
//
// It is a sibling of the canvas rather than an overlay — a fixed 384px column
// with its own scroll — so opening a panel narrows the canvas instead of
// covering the thing being configured. That is the whole reason these are
// drawers: every one of them is about something on the canvas, and an author
// changing it has to be able to see it.
//
// The header is defined here rather than per panel so the four titles are one
// type scale: the panel's own icon, a 14px/600 heading, and a line of copy
// saying what the panel is for. Closing by the X is the only close affordance;
// panels that commit changes pass a footer with their own Cancel and Save.
import React from 'react';
// Combobox reads its own Field context, which is a different export from the
// forms Field the checkbox and toggle rows use — hence both imports.
import {
  Accordion,
  Combobox,
  ComboboxField,
  Option,
  Tooltip as FloraTooltip,
} from '@zendesk-ui/react-components';
import { InfoStroke, X } from '../icons/flora';

export const BUILDER_DRAWER_WIDTH_CLASS = 'w-96';

export function BuilderDrawerHeader({
  icon,
  title,
  description,
  closeLabel,
  onClose,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="shrink-0 border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* The panel is titled after what it configures, so it carries that
              thing's own icon rather than a generic settings glyph. */}
          <span className="flex shrink-0 items-center justify-center" aria-hidden>
            {icon}
          </span>
          {/* 14px/600 — the same as the group headings inside the panels, so a
              drawer's title and its sections read as one scale. */}
          <h3 className="text-base font-semibold leading-[20px]">{title}</h3>
        </div>
        {/* A plain button rather than the builder's ghost Button: the X is the
            drawer's own chrome, and it should look identical in all four. */}
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-muted"
        >
          <X className="size-[16px] shrink-0" style={{ width: 16, height: 16 }} />
        </button>
      </div>
      {description && <p className="mt-1 text-base text-muted-foreground">{description}</p>}
    </div>
  );
}

export function BuilderDrawer({
  icon,
  title,
  description,
  closeLabel,
  onClose,
  footer,
  // Panels that own their own padding (a canvas, a graph) opt out of the
  // default 6/2 body inset rather than fighting it.
  bodyClassName = 'px-6 py-2',
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  closeLabel: string;
  onClose: () => void;
  footer?: React.ReactNode;
  bodyClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full ${BUILDER_DRAWER_WIDTH_CLASS} shrink-0 flex-col overflow-hidden rounded-[24px] bg-white`}
    >
      <BuilderDrawerHeader
        icon={icon}
        title={title}
        description={description}
        closeLabel={closeLabel}
        onClose={onClose}
      />
      {/* The body scrolls, not the drawer, so the header and any footer stay
          reachable at every scroll position. */}
      <div className={`min-h-0 flex-1 overflow-y-auto ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className="flex shrink-0 justify-end gap-2 border-t border-border px-6 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The compact form vocabulary the drawers' bodies are built from
// ---------------------------------------------------------------------------
// Controls are Flora's own at compact size throughout, so a drawer matches the
// density of the rest of the builder's chrome rather than inventing a second one.

// Garden sizes compact form labels at 14px/600, which in a drawer would make
// every field label compete with the group headings above them. Dropping them to
// 12px regular keeps the heading leading its own fields.
// 16px of leading, in px rather than leading-4: the root font is 14px, so the
// rem-based scale would resolve to 14px and clip a 16px checkbox's own row.
export const COMPACT_LABEL =
  '[&_label]:!text-[12px] [&_label]:!font-normal [&_label]:!leading-[16px]';
// Flora's elements are styled-components, and Tailwind's utilities live in a
// cascade layer — so `space-y-*`, which puts margin on the children, loses to
// Garden's own `margin: 0`. Row spacing is therefore gap on the wrapper, which
// is a plain div nothing else styles.
export const ROWS = 'flex flex-col gap-[12px]';
// Combobox renders its trigger value and options through nested nodes, so the
// compact type size has to be pushed down the whole subtree. leading stays at
// 20px: Garden centres both against a 20px content box, and a 14px line box
// would sit the text at the top of each instead.
export const COMPACT_COMBOBOX =
  '[&_[data-garden-id="dropdowns.combobox"]_*]:!text-[12px] [&_[data-garden-id="dropdowns.combobox"]_*]:!leading-[20px]';

// Explanatory copy sits behind an info icon on the label rather than as a hint
// under the control: a paragraph beneath every field doubles the height of a
// drawer whose whole point is that an author can see the canvas beside it. Same
// affordance the AI summary widget itself uses for its freshness note.
export function LabelWithInfo({
  label,
  info,
  infoLabel,
}: {
  label: React.ReactNode;
  info: string;
  infoLabel: string;
}) {
  return (
    <span className="flex items-center gap-1">
      {label}
      {/* large, not medium: at medium Garden's max-width wraps a sentence to five
          lines, and the tooltip then covers the field above the one it is
          explaining. */}
      <FloraTooltip content={info} placement="top-start" size="large">
        <span
          className="flex h-4 w-4 shrink-0 cursor-help items-center justify-center text-[#68737d] hover:text-foreground"
          aria-label={infoLabel}
        >
          <InfoStroke className="shrink-0" style={{ width: 14, height: 14 }} />
        </span>
      </FloraTooltip>
    </span>
  );
}

// Single-select dropdown: a compact, non-editable Flora combobox.
export function SelectRow({
  label,
  value,
  options,
  info,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  info?: string;
  onChange: (value: string) => void;
}) {
  const labelNode = <ComboboxField.Label>{label}</ComboboxField.Label>;
  return (
    <ComboboxField className={`${COMPACT_LABEL} ${COMPACT_COMBOBOX}`}>
      {info ? (
        <LabelWithInfo label={labelNode} info={info} infoLabel={`About ${label.toLowerCase()}`} />
      ) : (
        labelNode
      )}
      <Combobox
        isCompact
        isEditable={false}
        selectionValue={value}
        listboxAriaLabel={label}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            const next = Array.isArray(changes.selectionValue)
              ? changes.selectionValue[0]
              : changes.selectionValue;
            if (typeof next === 'string') onChange(next);
          }
        }}
      >
        {options.map((o) => (
          <Option key={o} value={o} label={o} isSelected={o === value}>
            {o}
          </Option>
        ))}
      </Combobox>
    </ComboboxField>
  );
}

// The accordion a drawer's settings groups sit in. level 4 puts the group
// headings under the drawer's own <h3>; isExpandable with isCollapsible lets an
// author collapse any group and keep the others open, because the groups are
// independent and expanding one shouldn't shut another. All open by default —
// the point of collapsing is to park a group you are done with, not to hide the
// form from someone who just opened it.
export function DrawerAccordion({
  sectionCount,
  children,
}: {
  sectionCount: number;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      level={4}
      isBare
      isCompact
      isAnimated
      isExpandable
      isCollapsible
      defaultExpandedSections={Array.from({ length: sectionCount }, (_, i) => i)}
      className="[&_[data-garden-id='accordions.rotate_icon']]:!size-[16px]"
    >
      {children}
    </Accordion>
  );
}

// One group inside a DrawerAccordion.
export function DrawerAccordionSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Section>
      <Accordion.Header>
        <Accordion.Label>{label}</Accordion.Label>
      </Accordion.Header>
      <Accordion.Panel>
        <div className={`${ROWS} pb-2`}>{children}</div>
      </Accordion.Panel>
    </Accordion.Section>
  );
}
