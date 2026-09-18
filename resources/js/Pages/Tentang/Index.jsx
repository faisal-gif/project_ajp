import LandingLayout from "@/Layouts/LandingLayout";
import { Head } from "@inertiajs/react";
import Fist from "../Welcome/Partials/Fist";
import RedaksiSection from "../Welcome/Partials/RedaksiSection";
import Tear from "../Welcome/Partials/Tear";

// Values pasted as newsprint clippings: uneven widths and tilts, no icon tiles.
const VALUES = [
    {
        title: "Jurnalisme Positif",
        description: "Kami percaya kekuatan kata-kata dapat menginspirasi perubahan. Setiap artikel di AJP harus membawa dampak positif bagi pembaca.",
        cls: "md:col-span-7 -rotate-1",
    },
    {
        title: "Kredibel & Terpercaya",
        description: "Setiap artikel melalui proses moderasi untuk memastikan kualitas dan kebenaran informasi yang disampaikan.",
        cls: "md:col-span-5 rotate-[1.5deg] md:mt-10",
    },
    {
        title: "Ide Tanpa Batas",
        description: "Platform terbuka bagi siapa saja yang ingin berbagi ide, cerita, dan pengetahuan yang bermanfaat.",
        cls: "md:col-span-5 rotate-1",
    },
    {
        title: "Jangkauan Luas",
        description: "Tulisanmu akan dibaca oleh ribuan pembaca dari seluruh Indonesia yang mencari konten berkualitas.",
        cls: "md:col-span-7 -rotate-[1.2deg] md:-mt-6",
    },
];

const PRINCIPLES = ["Transparansi", "Integritas", "Inovasi", "Komunitas"];

const Tentang = ({ countuser, countArticle }) => {
    const stats = [
        { value: countuser, label: "Penulis aktif", tilt: "-rotate-3" },
        { value: countArticle, label: "Artikel dipublikasikan", tilt: "rotate-2" },
        { value: "1M+", label: "Pembaca TIMES Indonesia", tilt: "-rotate-1" },
    ];

    return (
        <>
            <Head title="Tentang" />

            <LandingLayout>
                {/* Header */}
                <section className="grain relative bg-stock pb-20 pt-28 text-ink lg:pb-28 lg:pt-36">
                    <div className="mx-auto grid max-w-7xl items-end gap-14 px-4 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="flex items-start gap-3">
                                <Fist className="mt-2 hidden w-24 shrink-0 sm:block" />
                                <h1 className="font-wood text-[clamp(3rem,7vw,5.5rem)] font-black uppercase leading-[0.86]">
                                    Platform
                                    <span className="my-2 block font-slab text-[0.42em] normal-case leading-none text-olive">jurnalisme positif</span>
                                    <span className="text-dull">Indonesia.</span>
                                </h1>
                            </div>
                            <p className="mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink/85 sm:ml-[6.75rem]">
                                AJP hadir sebagai wadah bagi para penulis Indonesia untuk menyuarakan
                                narasi positif yang menginspirasi dan membangun bangsa.
                            </p>
                        </div>

                        {/* live counts as ticket stubs */}
                        <ul className="flex flex-wrap items-end gap-4 lg:col-span-5 lg:justify-end">
                            {stats.map((s) => (
                                <li key={s.label} className={`ticket-v paste w-32 bg-ink px-3 pb-3 pt-4 text-center text-stock [--stub:2.4rem] ${s.tilt}`}>
                                    <p className="font-slab text-3xl leading-none text-foil tabular-nums">{s.value}</p>
                                    <p className="mt-1.5 min-h-[2.4em] font-type text-[10px] uppercase leading-tight">{s.label}</p>
                                    <p className="perf-x mt-2 h-2 text-stock/50" />
                                    <p className="mt-1 font-type text-[10px]">No. 0341</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Values */}
                <section className="grain relative bg-newsprint py-20 text-ink lg:py-28">
                    <Tear color="bg-stock" />
                    <div className="mx-auto max-w-7xl px-4">
                        <h2 className="font-wood text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.9]">
                            Mengapa
                            <span className="mx-3 inline-block -rotate-2 bg-ink px-2 pb-1 pt-1.5 font-slab text-[0.55em] normal-case leading-none text-stock">memilih</span>
                            <span className="text-dull">AJP?</span>
                        </h2>

                        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
                            {VALUES.map((v) => (
                                <article key={v.title} className={`scrap-drop lift ${v.cls}`}>
                                    <div className="torn grain bg-[#eeeae0] px-6 pb-8 pt-6">
                                        <h3 className="border-b-2 border-ink pb-2 font-news text-[1.7rem] font-bold leading-tight">{v.title}</h3>
                                        <p className="mt-3 max-w-prose font-news text-[1.02rem] leading-relaxed text-ink/85">{v.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision */}
                <section className="grain relative bg-stock py-20 text-ink lg:py-28">
                    <Tear color="bg-newsprint" />
                    <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-12">
                        <h2 className="font-wood text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.9] lg:col-span-5">
                            Masa depan
                            <span className="my-1 block font-slab text-[0.5em] normal-case leading-none text-olive">jurnalisme</span>
                            <span className="font-news font-bold normal-case tracking-tight text-dull">Indonesia.</span>
                        </h2>
                        <div className="lg:col-span-7 lg:pt-3">
                            <p className="max-w-[38rem] text-[1.05rem] leading-relaxed text-ink/85">
                                Kami bermimpi menjadi platform jurnalisme terdepan di Indonesia yang
                                tidak hanya menyajikan berita, tetapi juga menginspirasi perubahan positif
                                di masyarakat. Dengan teknologi dan komunitas yang kuat, kami yakin dapat
                                mewujudkan ekosistem media yang sehat dan konstruktif.
                            </p>
                            <ul className="mt-8 flex flex-wrap gap-3">
                                {PRINCIPLES.map((p, i) => (
                                    <li
                                        key={p}
                                        className={`border-2 px-3 py-1.5 font-type text-sm font-bold uppercase ${i === 0 ? 'border-dull bg-dull text-stock' : 'border-ink bg-[#eeeae0]'}`}
                                        style={{ rotate: `${[-2, 1.5, -1, 2][i]}deg` }}
                                    >
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="relative bg-dull py-20 text-stock lg:py-28">
                    <Tear color="bg-stock" />
                    <div className="relative mx-auto max-w-5xl px-4">
                        <h2 className="font-wood text-3xl font-black uppercase tracking-wide text-foil">Misi kami</h2>
                        <blockquote className="mt-6 font-news text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-snug">
                            “Kami percaya bahwa setiap cerita positif memiliki kekuatan untuk
                            mengubah perspektif dan menginspirasi tindakan nyata.”
                        </blockquote>
                        <p className="mt-6 flex items-center gap-3 font-type text-sm text-stock/80">
                            <span className="perf-x h-1 w-16 text-stock/50" />
                            Tim AJP — Aplikasi Jurnalisme Positif
                        </p>
                    </div>
                </section>

                <RedaksiSection />
            </LandingLayout>
        </>
    );
};

export default Tentang;
