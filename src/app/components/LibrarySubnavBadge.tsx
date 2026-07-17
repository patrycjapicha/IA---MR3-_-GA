import styled from 'styled-components';
import { Tag } from '@zendeskgarden/react-tags';
import { componentStyles } from '@zendeskgarden/react-theming';

/** Mirrors @zendesk-ui/navigation StyledNavOverflowBadge + StyledSubnavButtonBadge */
const SubnavButtonBadge = styled(Tag)`
  flex-shrink: 0;
  max-width: none;
  overflow: visible;

  & > * {
    overflow: visible;
    text-overflow: clip;
  }

  ${componentStyles};
`;

function getBadgeLength(badge: number | string) {
  return [...badge.toString()].length;
}

type LibrarySubnavBadgeProps = {
  count: number;
  isCurrent?: boolean;
};

/**
 * Flora Subnav.Item badge — same component, hue, and shape rules as navigation package.
 * @see SubnavItem badge rendering in @zendesk-ui/navigation
 */
export function LibrarySubnavBadge({ count, isCurrent = false }: LibrarySubnavBadgeProps) {
  const badgeLength = getBadgeLength(count);
  if (badgeLength === 0) return null;

  const badgeHue = isCurrent ? 'grey' : undefined;

  return (
    <SubnavButtonBadge
      hue={badgeHue}
      isPill={badgeLength > 1}
      isRound={badgeLength === 1}
      data-garden-id="navigation.subnav-button-badge"
    >
      <span>{count}</span>
    </SubnavButtonBadge>
  );
}
