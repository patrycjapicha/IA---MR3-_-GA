import React from 'react';

interface FlagIconProps {
  className?: string;
}

export default function FlagIcon({ className }: FlagIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5.00016 1.66669C4.07969 1.66669 3.3335 2.41288 3.3335 3.33335V17.5C3.3335 17.9603 3.7066 18.3334 4.16683 18.3334C4.62706 18.3334 5.00016 17.9603 5.00016 17.5V13.3334H15.9431C17.2742 13.3334 18.0682 11.8498 17.3298 10.7422L15.1683 7.50002L17.3298 4.25785C18.0682 3.15026 17.2742 1.66669 15.9431 1.66669H5.00016Z" fill="currentColor"/>
    </svg>
  );
}
