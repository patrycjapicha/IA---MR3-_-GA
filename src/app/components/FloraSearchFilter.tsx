import React from 'react';
import { Combobox, ComboboxField } from '@zendesk-ui/react-components';
import { Search, FLORA_SEARCH_ICON, floraSearchInputWrapperStyle } from '@/components/icons/flora';

type FloraSearchFilterProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  'aria-label'?: string;
  width?: number | string;
};

export function FloraSearchFilter({
  value = '',
  onChange,
  placeholder = '',
  'aria-label': ariaLabel = 'Search',
  width = 250,
}: FloraSearchFilterProps) {
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      className="flora-search-filter shrink-0"
      style={{ width: resolvedWidth, minWidth: resolvedWidth, maxWidth: resolvedWidth }}
    >
      <ComboboxField>
        <ComboboxField.Label hidden>{ariaLabel}</ComboboxField.Label>
        <Combobox
          isCompact
          isEditable
          {...(placeholder ? { placeholder } : {})}
          inputValue={value}
          selectionValue={null}
          defaultExpanded={false}
          listboxAriaLabel={ariaLabel}
          startIcon={
            <span className="inline-flex size-[16px] shrink-0 items-center justify-center leading-none">
              <Search className={FLORA_SEARCH_ICON} aria-hidden />
            </span>
          }
          inputProps={{
            type: 'search',
            'aria-label': ariaLabel,
          }}
          onChange={(changes) => {
            if (changes.type === 'input:change' && onChange) {
              onChange({
                target: { value: changes.inputValue ?? '' },
              } as React.ChangeEvent<HTMLInputElement>);
            }
          }}
          style={floraSearchInputWrapperStyle(width)}
        />
      </ComboboxField>
    </div>
  );
}
