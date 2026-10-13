'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  /** The selected option's value, or '' for nothing selected. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  noOptionsText?: string;
  clearLabel?: string;
  id?: string;
}

/**
 * A select whose input doubles as a search box (like MUI's Autocomplete):
 * typing filters the options, arrow keys + Enter pick one, Escape closes,
 * and the × button clears the selection.
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  noOptionsText = 'No options',
  clearLabel = 'Clear',
  id,
}: SearchableSelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  // null = not searching, so the input shows the selected option's label
  const [query, setQuery] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);
  const search = (query ?? '').trim().toLowerCase();
  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search))
    : options;

  const close = () => {
    setIsOpen(false);
    setQuery(null);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery(null);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  // Keep the keyboard-highlighted option scrolled into view
  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${highlightedIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, isOpen]);

  const open = () => {
    setIsOpen(true);
    const selectedIndex = filtered.findIndex((o) => o.value === value);
    setHighlightedIndex(Math.max(selectedIndex, 0));
  };

  const select = (option: SearchableSelectOption) => {
    onChange(option.value);
    close();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) open();
        else setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) open();
        else setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        // Don't let Enter submit the surrounding form while picking an option
        if (isOpen) {
          e.preventDefault();
          if (filtered[highlightedIndex]) select(filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          close();
        }
        break;
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-colors">
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && filtered[highlightedIndex]
              ? `${listboxId}-${highlightedIndex}`
              : undefined
          }
          autoComplete="off"
          value={query ?? selected?.label ?? ''}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(0);
            setIsOpen(true);
          }}
          onClick={() => !isOpen && open()}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-surface py-3 focus:outline-none text-sm font-body"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setQuery(null);
            }}
            aria-label={clearLabel}
            className="px-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            ×
          </button>
        )}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => (isOpen ? close() : open())}
          aria-hidden="true"
          className="px-2 text-xs text-on-surface-variant"
        >
          <span className={`inline-block transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full bg-surface-container-low rounded-sm shadow-lg border border-outline-variant/20 py-1 max-h-64 overflow-y-auto"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-2.5 text-sm font-body text-on-surface-variant">
              {noOptionsText}
            </li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={option.value === value}
                // mousedown + preventDefault keeps focus in the input
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(option);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-4 py-2.5 text-sm font-body cursor-pointer ${
                  index === highlightedIndex ? 'bg-surface-container-high' : ''
                } ${option.value === value ? 'text-primary font-semibold' : 'text-on-surface'}`}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
