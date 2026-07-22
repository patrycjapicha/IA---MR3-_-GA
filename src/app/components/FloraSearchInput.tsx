import React from 'react';
import { MediaInput } from '@zendesk-ui/react-components';
import { Search, FLORA_SEARCH_ICON, floraSearchInputWrapperStyle } from '@/components/icons/flora';

type FloraSearchInputProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  'aria-label'?: string;
  width?: number | string;
  autoFocus?: boolean;
};

export function FloraSearchInput({
  value,
  onChange,
  onBlur,
  placeholder = 'Search...',
  'aria-label': ariaLabel = 'Search',
  width = 280,
  autoFocus,
}: FloraSearchInputProps) {
  return (
    <MediaInput
      isCompact
      type="search"
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      start={
        <span className="inline-flex size-[16px] shrink-0 items-center justify-center leading-none">
          <Search className={FLORA_SEARCH_ICON} aria-hidden />
        </span>
      }
      wrapperProps={{
        style: floraSearchInputWrapperStyle(width),
        className: width === '100%' ? 'w-full max-w-full' : undefined,
      }}
    />
  );
}
