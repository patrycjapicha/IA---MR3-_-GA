import React from 'react';

interface SendArrowIconProps {
  className?: string;
}

export default function SendArrowIcon({ className }: SendArrowIconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="32" height="32" rx="16" fill="currentColor"/>
      <path d="M8.33546 10.6433C7.86867 9.24296 9.31833 7.97181 10.6457 8.61756L22.7403 14.5014C23.9904 15.1096 23.9904 16.8908 22.7403 17.4989L10.6457 23.3828C9.31833 24.0285 7.86868 22.7573 8.33546 21.357L9.84335 16.8333H13.4995C13.9597 16.8333 14.3328 16.4603 14.3328 16C14.3328 15.5398 13.9597 15.1667 13.4995 15.1667H9.84324L8.33546 10.6433Z" fill="white"/>
    </svg>
  );
}
