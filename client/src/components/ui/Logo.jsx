// Wordmark + mark for Task Tracker. The mark is a rounded square with a
// checkmark — instantly reads as "tasks / done" while staying minimal.
export default function Logo({ showText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="9" fill="#4F46E5" />
        <path
          d="M9 16.5L13.5 21L23 11"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Task<span className="text-brand-600">Tracker</span>
        </span>
      )}
    </div>
  );
}
