'use client';

export default function NewsletterForm() {
  return (
    <form
      className="max-w-md mx-auto flex"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="flex-1 bg-transparent border-b border-outline-variant py-4 focus:outline-none focus:border-primary transition-colors text-sm"
        placeholder="Email Address"
        type="email"
      />
      <button className="ml-4 font-bold uppercase text-xs tracking-widest">
        Subscribe
      </button>
    </form>
  );
}
