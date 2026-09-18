// Printer's fist (manicule), drawn in the page's engraving line.
export default function Fist({ className = '', flip = false }) {
    return (
        <svg
            viewBox="0 0 100 40"
            aria-hidden="true"
            className={className}
            style={flip ? { transform: 'scaleX(-1)' } : undefined}
        >
            <g fill="var(--color-stock)" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
                <path d="M2 7h15v27H2z" fill="var(--color-ink)" />
                <path d="M17 10c7-4 16-4.5 24-1.5h48c6 0 8.5 2.5 8.5 5.5s-2.5 5.5-8.5 5.5H50c2.5 1.5 3.5 3.8 2.5 5.8 3 1 4 4 2 6 2 2 1 5.6-3.5 6.2H25c-4.5 0-8-2.4-8-5z" />
                <path d="M36 19.5h14M34 25.5h18.5M34 31.5h20M30 9.5c4 4.5 10 5.5 16 3" fill="none" />
            </g>
            <path d="M6 12v17M11 12v17" stroke="var(--color-stock)" strokeWidth="1.4" />
        </svg>
    );
}
