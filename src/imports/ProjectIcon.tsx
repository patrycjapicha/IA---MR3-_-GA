import React from 'react';

interface ProjectIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ProjectIcon({ className, style }: ProjectIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M1.6665 14.1667V5C1.6665 3.61929 2.78579 2.5 4.1665 2.5H7.44124C8.2771 2.50002 9.05768 2.91776 9.52132 3.61328L10.4458 5H15.8332C17.2139 5 18.3332 6.1193 18.3332 7.5V14.1667C18.3332 15.5474 17.2139 16.6667 15.8332 16.6667H4.1665C2.7858 16.6667 1.6665 15.5474 1.6665 14.1667ZM3.33317 14.1667C3.33317 14.6269 3.70626 15 4.1665 15H15.8332C16.2934 15 16.6665 14.6269 16.6665 14.1667V7.5C16.6665 7.03975 16.2934 6.66667 15.8332 6.66667H10.4458C9.92325 6.66666 9.4332 6.42181 9.1193 6.00911L9.05908 5.92448L8.1346 4.53776C7.98009 4.30597 7.71986 4.16668 7.44124 4.16667H4.1665C3.70627 4.16667 3.33317 4.53976 3.33317 5V14.1667Z" fill="currentColor"/>
    </svg>
  );
}
