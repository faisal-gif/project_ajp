import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Fist from './Fist';
import Stamp from './Stamp';

const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const shortDate = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

// Scraps: mobile = grid cells (repacked, not scaled); lg = pasted at their spots on the board.

// The shadow sits on the wrapper as drop-shadow so it follows the torn mask of the paper inside.
function Scrap({ id, top, onRaise, className, paper, children }) {
    return (
        <article
            tabIndex={0}
            onClick={() => onRaise(id)}
            onFocus={() => onRaise(id)}
            style={{ zIndex: top === id ? 30 : undefined }}
            className={`paste lift relative cursor-pointer scrap-drop ${className}`}
        >
            <div className={paper}>{children}</div>
        </article>
    );
}

function Channel({ id, onRaise, children }) {
    return (
        <button
            type="button"
            onMouseEnter={() => onRaise(id)}
            onFocus={() => onRaise(id)}
            onClick={() => onRaise(id)}
            className="font-semibold text-ink underline decoration-dull decoration-2 underline-offset-4 hover:bg-foil/40"
        >
            {children}
        </button>
    );
}

export default function HeroSection({ countuser, countArticle }) {
    const [top, setTop] = useState(null);

    return (
        <section className="grain relative overflow-hidden bg-stock pt-24 text-ink lg:pt-28">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-20">
                {/* Headline */}
                <div className="lg:col-span-6 lg:pt-8">
                    <div className="flex items-start gap-3">
                        <Fist className="mt-2 hidden w-24 shrink-0 sm:block lg:w-28" />
                        <h1 className="font-wood text-[clamp(3.1rem,7.4vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.01em]">
                            Kabar instansi Anda,
                            <span className="my-2 block font-slab text-[0.42em] normal-case leading-none tracking-normal text-olive">
                                disunting redaksi &amp; terbit di
                            </span>
                            <span className="text-dull">TIMES Indonesia.</span>
                        </h1>
                    </div>
                    <div className="mt-5 sm:ml-[7.5rem]">
                        <div className="h-1.5 w-3/4 bg-ink" />
                        <div className="mt-1 h-px w-2/3 bg-ink" />

                        <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink/85">
                            Kirim naskah lewat AJP. Redaksi TIMES Indonesia menyunting dan menerbitkannya, lalu menyebarkannya ke{' '}
                            <span className="whitespace-nowrap"><Channel id="koran" onRaise={setTop}>e-koran</Channel>,</span>{' '}
                            <span className="whitespace-nowrap"><Channel id="ig" onRaise={setTop}>Instagram</Channel>,</span> dan{' '}
                            <Channel id="wa" onRaise={setTop}>WA Channel</Channel> sesuai paket yang Anda pilih.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href={route('register')}
                                className="ticket group inline-flex items-center gap-3 bg-foil py-3.5 pl-6 pr-7 font-wood text-xl font-black uppercase tracking-wide text-ink [--notch:7px] [--stub:2.6rem] hover:bg-[#f5b43d]"
                            >
                                Daftarkan Instansi
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                            </Link>
                            <a
                                href="#paket"
                                className="inline-flex items-center border-2 border-ink px-5 py-3 font-wood text-xl font-bold uppercase tracking-wide hover:bg-ink hover:text-stock"
                            >
                                Lihat Paket
                            </a>
                        </div>
                    </div>
                </div>

                {/* Collage: one naskah, four channels */}
                <div className="relative lg:col-span-6">
                    <div className="grid grid-cols-2 items-start gap-5 lg:block lg:h-[37rem]">
                        {/* TIMES Indonesia web article */}
                        <Scrap id="web" top={top} onRaise={setTop}
                            className="col-span-2 -rotate-1 lg:absolute lg:left-0 lg:top-4 lg:w-[61%] lg:-rotate-2 [animation-delay:.05s]"
                            paper="torn grain bg-newsprint px-5 pb-7 pt-5">
                            <div className="flex items-baseline justify-between border-b-2 border-ink pb-1">
                                <span className="font-news text-2xl font-bold tracking-tight">TIMES Indonesia</span>
                                <span className="hidden font-type text-[10px] uppercase sm:inline">timesindonesia.co.id</span>
                            </div>
                            <p className="mt-1 border-b border-ink/60 pb-1 font-type text-[10px] capitalize">{today} · Malang</p>
                            <h3 className="mt-3 font-news text-[1.45rem] font-bold leading-tight">
                                Pemkot Resmikan Mal Pelayanan Publik di Tiga Kecamatan
                            </h3>
                            <div className="halftone mt-3 h-28 mix-blend-multiply" role="img" aria-label="Ilustrasi gedung pelayanan (cetak raster)" />
                            <div className="mt-3 columns-2 gap-4 font-news text-[11px] leading-snug text-ink/80 [column-rule:1px_solid_rgb(28_26_23/.35)]">
                                <p>MALANG – Warga kini dapat mengurus dokumen kependudukan, perizinan, dan pajak daerah di satu tempat. Layanan dibuka mulai pukul 08.00 setiap hari kerja.</p>
                                <p className="mt-2">Kepala dinas menyebut antrean rata-rata turun dari dua jam menjadi dua puluh menit sejak uji coba bulan lalu.</p>
                            </div>
                        </Scrap>

                        {/* E-koran column cut */}
                        <Scrap id="koran" top={top} onRaise={setTop}
                            className="rotate-2 lg:absolute lg:right-2 lg:top-0 lg:w-[37%] lg:rotate-3 [animation-delay:.15s]"
                            paper="torn torn-alt grain bg-stock px-3.5 pb-6 pt-4">
                            <div className="flex items-center justify-between bg-ink px-2 py-0.5 text-stock">
                                <span className="font-slab text-sm">E-KORAN</span>
                                <span className="font-type text-[9px]">Hal. 4</span>
                            </div>
                            <div className="halftone mt-2 h-20 mix-blend-multiply [background-position:30%_60%] [background-size:220%]" role="img" aria-label="Ilustrasi foto koran (cetak raster)" />
                            <h3 className="mt-2 font-news text-base font-bold leading-tight">Antrean Layanan Publik Turun Drastis</h3>
                            <p className="mt-1 font-news text-[10.5px] leading-snug text-ink/80">Mal pelayanan di tiga kecamatan menyatukan dua belas jenis layanan dalam satu gedung…</p>
                        </Scrap>

                        {/* Instagram feed post: duotone print */}
                        <Scrap id="ig" top={top} onRaise={setTop}
                            className="-rotate-3 lg:absolute lg:left-[3%] lg:top-[55%] lg:w-[37%] lg:-rotate-[5deg] [animation-delay:.25s]"
                            paper="relative flex aspect-square flex-col overflow-hidden bg-dull text-stock">
                            <div className="halftone absolute inset-0 opacity-80 mix-blend-multiply" aria-hidden="true" />
                            <div className="relative flex items-center gap-2 bg-stock px-2.5 py-1.5 font-type text-[10px] text-ink">
                                <span className="h-4 w-4 rounded-full bg-dull" />@timesindonesia
                            </div>
                            <p className="relative mt-auto bg-ink px-2.5 py-2 font-wood text-[1.45rem] font-black uppercase leading-[0.9] sm:text-[1.6rem]">
                                Urus KTP, izin &amp; pajak di satu atap
                            </p>
                        </Scrap>

                        {/* WA Channel message */}
                        <Scrap id="wa" top={top} onRaise={setTop}
                            className="col-span-2 rotate-1 sm:col-span-1 lg:absolute lg:right-[1%] lg:top-[45%] lg:w-[46%] lg:rotate-[1.5deg] [animation-delay:.35s]"
                            paper="rounded-md bg-[#f3eee2] p-3.5">
                            <p className="font-type text-[10px] uppercase text-olive">WA Channel · TIMES Indonesia</p>
                            <p className="mt-1.5 text-[13px] leading-snug">
                                <b>Mal Pelayanan Publik kini hadir di tiga kecamatan.</b> Simak jam layanan dan syarat dokumennya.
                            </p>
                            <p className="mt-1.5 truncate text-[12px] text-dull underline">timesindonesia.co.id/…/mal-pelayanan-publik</p>
                            <p className="mt-1 text-right font-type text-[10px] text-olive">09.12</p>
                        </Scrap>

                        {/* Readership stub (real claim) */}
                        <div className="ticket-v paste w-32 justify-self-center rotate-[4deg] bg-ink px-3 pb-3 pt-4 text-center text-stock lg:absolute lg:bottom-2 lg:right-[12%] [--stub:2.6rem] [animation-delay:.45s]">
                            <p className="font-slab text-4xl leading-none text-foil">1M+</p>
                            <p className="mt-1 font-type text-[10px] uppercase leading-tight">pembaca TIMES Indonesia</p>
                            <p className="perf-x mt-3 h-2 text-stock/50" />
                            <p className="mt-1 font-type text-[10px]">No. 0341</p>
                        </div>

                        {/* TERBIT stamp, over the gap between IG post and readership stub */}
                        <Stamp sub={shortDate.toUpperCase()}
                            className="paste pointer-events-none w-40 justify-self-center -rotate-12 self-center lg:absolute lg:left-[50%] lg:top-[71%] lg:z-40 lg:w-48 [animation-delay:.55s]" />
                    </div>
                    <p className="mt-4 font-type text-[11px] text-olive lg:absolute lg:-bottom-6 lg:left-0 lg:mt-0">
                        Contoh ilustrasi, bukan berita sungguhan.
                    </p>
                </div>
            </div>

            {/* Proof strip: live counts */}
            <div className="relative bg-ink text-stock">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 font-type text-sm">
                    <span><b className="font-slab text-lg font-normal text-foil tabular-nums">{countArticle}</b> naskah sudah terbit</span>
                    <span className="perf-y hidden h-6 w-2 text-stock/40 sm:block" />
                    <span><b className="font-slab text-lg font-normal text-foil tabular-nums">{countuser}</b> penulis &amp; instansi terdaftar</span>
                    <span className="perf-y hidden h-6 w-2 text-stock/40 sm:block" />
                    <span>Disunting &amp; diterbitkan redaksi TIMES Indonesia, Malang</span>
                </div>
            </div>
        </section>
    );
}

