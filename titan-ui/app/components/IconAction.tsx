'use client';

interface IconActionProps {
  /** Material Symbols Outlined glyph name (e.g. "edit", "delete", "add"). */
  icon: string;
  /** Used as both the accessible name and the hover tooltip, since the icon has no visible label. */
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

/**
 * A single-glyph row action (edit, delete, add…). Replaces a text link so a
 * row of actions stays compact — useful in tables where a wordy label (long
 * in Georgian especially) can force a column wider than it has room for.
 */
export function IconAction({
  icon,
  label,
  onClick,
  disabled = false,
  variant = 'default',
}: IconActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`material-symbols-outlined text-[20px] leading-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        variant === 'danger'
          ? 'text-red-600 hover:text-red-700'
          : 'text-primary hover:text-primary-container'
      }`}
    >
      {icon}
    </button>
  );
}
