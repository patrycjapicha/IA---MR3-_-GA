import React, { ReactNode } from 'react';
import {
  LayoutStroke as LayoutIcon,
  BarChart3Stroke as BarChartIcon,
  PersonStroke as UserCircle,
  ClockStroke as Clock,
  FolderStroke as Folder,
} from '@/components/icons/flora';
import { LibraryAssetCardPreview } from './LibraryAssetCardPreview';

const FLORA_CARD_ICON = 'size-[16px] shrink-0 fill-current !text-muted-foreground';
export const LIBRARY_CARD_MENU_BTN = 'size-4 shrink-0 p-0 hover:bg-muted/50';

export type LibraryAssetCardItem = {
  title: string;
  description?: string;
  type: 'dashboard' | 'report';
  owner?: string;
  lastUpdated?: string;
  projectName?: string;
};

type LibraryAssetCardProps = {
  item: LibraryAssetCardItem;
  onClick: () => void;
  menu?: ReactNode;
};

function MetaRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex h-[16.5px] min-w-0 items-center gap-[5.25px]">
      {icon}
      <span className="truncate text-[11px] leading-[16.5px] text-[#68737d]">{label}</span>
    </div>
  );
}

export function LibraryAssetCard({ item, onClick, menu }: LibraryAssetCardProps) {
  const TypeIcon = item.type === 'dashboard' ? LayoutIcon : BarChartIcon;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className="group relative flex w-full cursor-pointer overflow-hidden rounded-[20px] border border-[#E8EAEC] bg-white transition-colors hover:bg-[#f8f9f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex min-w-0 flex-[2] flex-col gap-[10.5px] p-[17.5px]">
        <div className="flex h-4 items-center justify-between gap-2">
          <TypeIcon className={FLORA_CARD_ICON} />
          {menu && (
            <div
              className="flex shrink-0 items-center"
              onClick={(event) => event.stopPropagation()}
            >
              {menu}
            </div>
          )}
        </div>

        <h3 className="line-clamp-2 text-[14px] font-medium leading-[21px] text-[#293239]">
          {item.title}
        </h3>

        <MetaRow
          icon={<UserCircle className={FLORA_CARD_ICON} />}
          label={item.owner || 'Zendesk'}
        />
        <MetaRow
          icon={<Clock className={FLORA_CARD_ICON} />}
          label={item.lastUpdated || 'Recently updated'}
        />
        <MetaRow
          icon={<Folder className={FLORA_CARD_ICON} />}
          label={item.projectName || 'Uncategorized'}
        />
      </div>

      <div className="w-1/3 shrink-0 self-stretch border-l border-[#E8EAEC] bg-[#E8EAEC] pb-px">
        <div className="flex size-full overflow-hidden rounded-tr-[19px] rounded-br-[19px] bg-white">
          <LibraryAssetCardPreview type={item.type} />
        </div>
      </div>

    </div>
  );
}
