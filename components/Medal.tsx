/** Медаль-лавр для наград — цвет задаётся через currentColor родителя. */
export default function Medal({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="5.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.4 13.6 7.6 20.5l4.4-2.3 4.4 2.3-1.8-6.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
