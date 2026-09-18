import { formatRupiah } from "@/Utils/formatter";
import { Link } from "@inertiajs/react";
import Fist from "./Fist";
import Tear from "./Tear";

const Row = ({ children, strong }) => (
    <li className="flex items-start gap-3 text-[0.95rem] leading-snug">
        <span className={`mt-[0.45em] h-2 w-2 shrink-0 ${strong ? 'bg-dull' : 'bg-ink'}`} />
        <span>{children}</span>
    </li>
);

// Fitur paket dibaca langsung dari kolom database
const RenderDBFeatures = ({ plan }) => (
    <>
        {(plan.duration_days > 0 || plan.period > 0) && (
            <Row>Masa berlaku <b>{plan.duration_days ? `${plan.duration_days} hari` : `${plan.period} ${plan.jenis_periode}`}</b></Row>
        )}
        {(plan.quota > 0 || plan.quota === null) && (
            <Row>Kuota opini <b>{plan.quota === null ? 'tanpa batas' : `${plan.quota} artikel`}</b></Row>
        )}
        {plan.feed_instagram > 0 && <Row>Feed Instagram <b>{plan.feed_instagram} post</b></Row>}
        {plan.ekoran > 0 && <Row>E-koran <b>{plan.ekoran} edisi</b></Row>}
        {plan.wa_channel > 0 && <Row>WA Channel <b>{plan.wa_channel} post</b></Row>}
    </>
);

const defaultLevel1Features = [
    "Akses akun CMS",
    "Mendapatkan kuota menulis",
    "Jangkauan pembaca luas"
];

// standalone = the /harga page: page title (h1), no tear above, and every plan lists its database features.
const PricingSection = ({ newsFirstPackage, standalone = false }) => {
    const single = newsFirstPackage.length === 1;
    const Heading = standalone ? 'h1' : 'h2';

    return (
        <section id="paket" className={`relative z-20 scroll-mt-20 bg-dull pb-20 text-stock lg:pb-28 ${standalone ? 'pt-28 lg:pt-36' : 'pt-20 lg:pt-28'}`}>
            {!standalone && <Tear color="bg-newsprint" />}
            <div className={`mx-auto max-w-7xl px-4 ${single ? 'lg:grid lg:grid-cols-12 lg:items-start lg:gap-12' : ''}`}>
                <div className={single ? 'lg:col-span-6 lg:sticky lg:top-28' : ''}>
                    <Heading className="max-w-3xl font-wood text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.9]">
                        Pilih{' '}
                        <span className="ticket inline-block -rotate-2 bg-stock px-3 pb-1 pt-2 font-slab text-[0.62em] normal-case leading-none text-dull [--notch:7px] [--stub:1.2rem]">tiket terbit</span>
                        <br />instansi Anda.
                    </Heading>
                    <p className="mt-5 max-w-xl leading-relaxed text-stock/85">
                        Setiap paket sudah termasuk publikasi di TIMES Indonesia serta bimbingan dan penyuntingan dari redaksi.
                    </p>
                    <div className="mt-10 flex items-center gap-3">
                        <Fist className="hidden w-20 shrink-0 sm:block" />
                        <p className="ticket inline-block rotate-1 bg-stock py-3 pl-4 pr-8 font-type text-sm text-ink [--notch:7px] [--stub:1.4rem]">
                            Butuh paket khusus untuk instansi?<br />Tulis ke{' '}
                            <a href="mailto:redaksi@timesindonesia.co.id" className="font-bold text-dull underline underline-offset-4">
                                redaksi@<wbr />timesindonesia.co.id
                            </a>
                        </p>
                    </div>
                </div>

                <div className={`mt-14 grid gap-8 ${single ? 'max-w-md lg:col-span-6 lg:col-start-7 lg:mt-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                    {newsFirstPackage.map((plan, idx) => {
                        const popular = Boolean(plan.popular);
                        const features = plan.features || defaultLevel1Features;
                        return (
                            <article
                                key={plan.name}
                                className="ticket-v lift grain relative flex flex-col bg-stock text-ink"
                                style={{ rotate: `${[-1, 0.8, -0.6][idx % 3]}deg` }}
                            >
                                <div className="flex-1 px-6 pb-6 pt-5">
                                    <div className="flex items-center justify-between font-type text-[11px] uppercase text-olive">
                                        <span>No. 0341-{String(idx + 1).padStart(2, '0')}</span>
                                        {Boolean(plan.flash_sale) && (
                                            <span className="bg-dull px-2 py-0.5 font-bold text-stock">Flash sale</span>
                                        )}
                                    </div>

                                    <h3 className="mt-3 font-wood text-4xl font-black uppercase leading-none">{plan.name}</h3>
                                    <p className="mt-4 font-slab text-[2.1rem] leading-none text-dull tabular-nums">
                                        {formatRupiah(plan.price)}
                                    </p>
                                    <p className="mt-1 font-type text-xs uppercase text-olive">per {plan.period} {plan.jenis_periode}</p>
                                    {plan.description && <p className="mt-4 text-sm leading-relaxed text-ink/80">{plan.description}</p>}

                                    <ul className="mt-5 space-y-2.5 border-t-2 border-ink pt-5">
                                        {plan.level === 1 && !standalone
                                            ? features.map((f, i) => <Row key={i}>{f}</Row>)
                                            : <>
                                                <RenderDBFeatures plan={plan} />
                                                <Row strong>Publikasi di TIMES Indonesia</Row>
                                                <Row strong>Bimbingan dan penyuntingan redaksi</Row>
                                            </>}
                                    </ul>
                                </div>

                                {/* tear-off stub */}
                                <div className="perf-x h-1 text-ink/40" />
                                <div className="flex h-[4.5rem] items-center px-5">
                                    <Link
                                        href="/register"
                                        className={`flex w-full items-center justify-center py-2.5 font-wood text-lg font-black uppercase tracking-wide ${popular ? 'bg-foil text-ink hover:bg-[#f5b43d]' : 'bg-ink text-stock hover:bg-dull'}`}
                                    >
                                        Pilih paket ini
                                    </Link>
                                </div>

                                {popular && (
                                    <div aria-label="Paling populer" className="absolute -right-3 top-12 rotate-[14deg] border-[5px] border-double border-dull bg-stock/60 px-2 py-0.5 text-center font-slab text-sm uppercase leading-tight text-dull">
                                        Paling<br />populer
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
