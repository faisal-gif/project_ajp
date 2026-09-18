// Ragged join where the upper section is ripped off over the next: a pale fibre lip under the torn stock.
export default function Tear({ color }) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div className="tear tear-lip absolute inset-x-0 top-0 bg-[#efe8da]" />
            <div className={`tear absolute inset-x-0 top-0 ${color}`} />
        </div>
    );
}
