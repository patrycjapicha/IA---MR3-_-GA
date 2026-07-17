import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from '@/components/icons/flora';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({ options, value, onChange, placeholder = 'Select...', className = '' }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return options
      .filter(opt => value.includes(opt.value))
      .map(opt => opt.label);
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 min-w-fit px-3 py-1.5 text-base text-left bg-white border border-[#E8EAEC] rounded-full hover:border-black/50 focus:outline-none focus:ring-1 focus:ring-black transition-colors flex items-center gap-2"
      >
        <div className="flex items-center gap-1 whitespace-nowrap">
          {selectedLabels.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/10 text-foreground rounded-full text-sm font-medium"
              >
                {label}
                <X
                  className="w-3 h-3 hover:text-foreground/70 cursor-pointer"
                  onClick={(e) => {
                    const option = options.find(opt => opt.label === label);
                    if (option) removeValue(e, option.value);
                  }}
                />
              </span>
            ))
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8EAEC] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className="w-full px-3 py-2 text-base text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
              >
                <span className={isSelected ? 'text-foreground font-medium' : 'text-foreground'}>
                  {option.label}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-foreground" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
