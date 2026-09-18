import { useId } from 'react';

// Rubber stamp: double frame, wobbly ink edge and worn speckle, drawn as SVG.
export default function Stamp({ title = 'TERBIT', sub, className = '' }) {
    const id = useId().replace(/:/g, '');

    return (
        <svg viewBox="0 0 220 104" role="img" aria-label={sub ? `${title}, ${sub}` : title} className={`mix-blend-multiply ${className}`}>
            <defs>
                <filter id={`ink${id}`} x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
                </filter>
                <filter id={`wear${id}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="3" seed="11" />
                    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -2.4 0 0 0 1.62" />
                </filter>
                <mask id={`m${id}`}>
                    <rect width="220" height="104" fill="#fff" filter={`url(#wear${id})`} />
                </mask>
            </defs>
            <g mask={`url(#m${id})`} filter={`url(#ink${id})`} fill="none" stroke="var(--color-dull)">
                <rect x="4" y="4" width="212" height="96" rx="5" strokeWidth="5" />
                <rect x="13" y="13" width="194" height="78" rx="3" strokeWidth="2" />
                <text x="110" y={sub ? 62 : 70} textAnchor="middle" fill="var(--color-dull)" stroke="none"
                    textLength={title.length > 6 ? 180 : undefined} lengthAdjust="spacingAndGlyphs"
                    style={{ font: '400 44px "Alfa Slab One", Georgia, serif', letterSpacing: '4px' }}>{title}</text>
                {sub && (
                    <text x="110" y="82" textAnchor="middle" fill="var(--color-dull)" stroke="none"
                        style={{ font: '700 13px "Courier Prime", monospace', letterSpacing: '2px' }}>{sub}</text>
                )}
            </g>
        </svg>
    );
}
