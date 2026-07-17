import { Button as FloraButton, Item, ItemGroup, MD, Menu } from '@zendesk-ui/react-components';
import { ChevronDown } from '@/components/icons/flora';

export const LIBRARY_ASSET_FILTER_OPTIONS = [
  { value: 'project', label: 'Projects' },
  { value: 'dashboard', label: 'Dashboards' },
  { value: 'report', label: 'Reports' },
  { value: 'dataset', label: 'Datasets' },
] as const;

type LibraryFilterSelectProps = {
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
  multiSelect?: boolean;
  fallbackType?: string;
};

export function LibraryFilterSelect({
  selected,
  onChange,
  multiSelect = true,
  fallbackType = 'project',
}: LibraryFilterSelectProps) {
  const handleChange = (changes: { type?: string; value?: string }) => {
    if (changes.type !== 'menuItem:click' || !changes.value) return;

    const key = changes.value;

    if (multiSelect) {
      const next = new Set(selected);
      if (next.has(key)) {
        next.delete(key);
        onChange(next.size === 0 ? new Set([fallbackType]) : next);
      } else {
        next.add(key);
        onChange(next);
      }
      return;
    }

    onChange(new Set([key]));
  };

  return (
    <Menu
      placement="bottom-start"
      hasArrow={false}
      onChange={handleChange}
      button={(props) => (
        <FloraButton
          {...props}
          size="small"
          isPill
          className="!h-8 shrink-0 gap-2 border border-[#999B97] bg-white px-4 hover:!bg-[#f8f9f9]"
        >
          <MD tag="span" className="!text-[#2F3130]">
            Filter
          </MD>
          <ChevronDown className="size-[16px] shrink-0 text-[#646864]" aria-hidden />
        </FloraButton>
      )}
    >
      <ItemGroup legend="Asset type">
        {LIBRARY_ASSET_FILTER_OPTIONS.map(({ value, label }) => (
          <Item key={value} value={value} isSelected={selected.has(value)}>
            {label}
          </Item>
        ))}
      </ItemGroup>
    </Menu>
  );
}
