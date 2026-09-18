import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Fist from './Fist';
import Tear from './Tear';
import Stamp from './Stamp';

export default function RedaksiSection() {
    return (
        <section className="grain relative bg-stock py-20 text-ink lg:py-28">
            <Tear color="bg-dull" />
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-12">
                {/* Newsroom photo slot: replace with the real photo */}
                <figure className="tape scrap-shadow relative -rotate-2 bg-[#f3eee2] p-3 pb-10 lg:col-span-5">
                    <div className="flex aspect-[4/3] items-center justify-center bg-newsprint bg-[repeating-linear-gradient(45deg,rgb(28_26_23/.12)_0_2px,transparent_2px_9px)]">
                        <span className="bg-stock px-3 py-1 font-type text-xs uppercase text-olive">Foto redaksi — ganti dengan foto asli</span>
                    </div>
                    <figcaption className="absolute bottom-3 left-3 font-type text-xs text-olive">
                        Meja redaksi TIMES Indonesia, Malang
                    </figcaption>
                </figure>

                <div className="min-w-0 lg:col-span-7 lg:pl-6">
                    <h2 className="font-wood text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.9]">
                        Di balik setiap naskah,
                        <span className="my-1 block font-slab text-[0.5em] normal-case leading-none text-olive">selalu ada</span>
                        <span className="torn inline-block -rotate-1 bg-newsprint px-3 pb-2 pt-3 font-news font-bold normal-case tracking-tight text-dull">meja redaksi.</span>
                    </h2>
                    <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-ink/85">
                        AJP dijalankan bersama redaksi TIMES Indonesia. Sebelum tayang, naskah Anda dibaca editor:
                        isinya diperiksa, bahasanya dirapikan, judulnya dibuat layak berita. Yang terbit adalah
                        tulisan instansi Anda dengan standar media, dibaca lebih dari satu juta pembaca TIMES Indonesia.
                    </p>

                    <address className="ticket mt-8 inline-grid max-w-full grid-cols-[1fr_auto] bg-ink not-italic text-stock [--stub:6.5rem]">
                        <div className="min-w-0 px-5 py-4 font-type text-sm leading-relaxed">
                            Jl. Besar Ijen No.90, Oro-oro Dowo<br />
                            Klojen, Kota Malang 65116<br />
                            <a href="mailto:redaksi@timesindonesia.co.id" className="break-words text-foil underline underline-offset-4">redaksi@<wbr />timesindonesia.co.id</a>
                        </div>
                        <div className="flex w-[6.5rem] flex-col items-center justify-center border-l-2 border-dashed border-stock/40 px-2 text-center">
                            <span className="font-type text-[10px] uppercase text-stock/70">Telp.</span>
                            <a href="tel:+62341563566" className="font-slab text-sm leading-tight">(0341)<br />563566</a>
                        </div>
                    </address>
                </div>
            </div>

            {/* Close: a torn newsprint strip pasted on the stock, stamped */}
            <div className="mx-auto mt-24 max-w-7xl px-4">
                <div className="scrap-drop relative -rotate-[0.6deg]">
                    <div className="torn grain flex flex-col items-start gap-8 bg-newsprint px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
                        <p className="flex items-center gap-4 font-wood text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.92]">
                            <Fist className="w-16 shrink-0 md:w-24" />
                            <span>
                                Kabar instansi Anda berikutnya,
                                <span className="mt-1 block font-slab text-[0.55em] normal-case leading-none text-dull">terbitkan di sini.</span>
                            </span>
                        </p>
                        <Link
                            href={route('register')}
                            className="ticket group inline-flex shrink-0 items-center gap-3 bg-foil py-3.5 pl-6 pr-7 font-wood text-xl font-black uppercase tracking-wide text-ink [--notch:7px] [--stub:2.6rem] hover:bg-[#f5b43d]"
                        >
                            Daftarkan Instansi
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                        </Link>
                    </div>
                    <Stamp title="REDAKSI" sub="TIMES INDONESIA" className="pointer-events-none absolute -top-10 right-6 w-36 rotate-[8deg] md:right-[30%] md:w-44" />
                </div>
            </div>
        </section>
    );
}
