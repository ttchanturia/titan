// Decorative audio motifs shared by the About Us and Our Brands pages.

// Bar heights (as a fraction of the strip's height) for the soundwave
// dividers: a sine envelope that tapers at both ends, modulated by a ripple.
// Rounded to whole percents so server and client render identical markup.
const WAVE_BARS = Array.from({ length: 96 }, (_, i) => {
  const envelope = Math.sin((Math.PI * (i + 0.5)) / 96);
  const ripple = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37));
  return Math.max(8, Math.round(envelope * ripple * 100));
});

// Negative delays start each bar mid-cycle so they are out of phase on load.
const EQ_TIMINGS = [
  { duration: '1.1s', delay: '-0.4s' },
  { duration: '0.8s', delay: '-0.1s' },
  { duration: '1.3s', delay: '-0.7s' },
  { duration: '0.9s', delay: '-0.3s' },
  { duration: '1.2s', delay: '-0.9s' },
];

export function Equalizer({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {EQ_TIMINGS.map((timing, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] h-full rounded-full bg-current"
          style={{ animationDuration: timing.duration, animationDelay: timing.delay }}
        />
      ))}
    </span>
  );
}

export function Soundwave({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex h-16 ${className}`}>
      {/* Every other bar is dropped on phones so the wave doesn't fill in solid. */}
      {WAVE_BARS.map((height, i) => (
        <span
          key={i}
          className={`${i % 2 ? 'hidden sm:flex' : 'flex'} flex-1 items-center justify-center`}
        >
          <span
            className="w-0.5 sm:w-[3px] rounded-full bg-current"
            style={{ height: `${height}%`, opacity: 0.2 + (0.8 * height) / 100 }}
          />
        </span>
      ))}
    </div>
  );
}
