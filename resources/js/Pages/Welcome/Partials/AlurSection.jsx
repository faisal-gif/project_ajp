import Fist from './Fist';
import Tear from './Tear';

const STOPS = [
    { name: 'Daftar & pilih paket', text: 'Buat akun instansi, pilih paket, lalu bayar lewat Tripay.' },
    { name: 'Kirim naskah', text: 'Tulis atau tempel naskah di CMS AJP, lengkap dengan foto sampul dan kategori.' },
    { name: 'Disunting redaksi', text: 'Editor TIMES Indonesia memeriksa, menyunting, dan memberi catatan bila perlu.' },
    { name: 'Terbit & tersebar', text: 'Tayang di TIMES Indonesia, lalu ke kanal lain sesuai kuota paket Anda.' },
];

const BRANCHES = ['TIMES Indonesia', 'E-koran', 'Instagram', 'WA Channel'];

// straddle: paste the channel tags across the edge into the next section (off when the footer follows).
export default function AlurSection({ tear = 'bg-ink', straddle = true }) {
    return (
        <section className="grain relative z-30 bg-newsprint py-20 text-ink lg:py-28">
            <Tear color={tear} />
            <div className="relative mx-auto max-w-7xl px-4">
                <div className="flex items-end justify-between gap-6">
                    <h2 className="max-w-2xl font-wood text-[clamp(2.4rem,5vw,4rem)] font-black uppercase leading-[0.9]">
                        Satu jalur,
                        <span className="my-1 block font-slab text-[0.5em] normal-case leading-none text-olive">dari naskah sampai</span>
                        <span className="font-news text-[1.05em] font-bold normal-case tracking-tight text-dull">tayang.</span>
                    </h2>
                    <Fist className="mb-2 hidden w-28 md:block" flip />
                </div>

                <ol className="relative mt-14 grid gap-10 pl-8 lg:grid-cols-4 lg:gap-6 lg:pl-0">
                    {/* the route line: vertical on mobile, horizontal on desktop */}
                    <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1 bg-dull lg:hidden" />
                    <span aria-hidden="true" className="absolute left-0 right-[8%] top-[1.35rem] hidden h-1 bg-dull lg:block" />
                    {STOPS.map((stop, i) => (
                        <li key={stop.name} className="relative lg:pr-6">
                            <span className="absolute -left-[3.05rem] top-0 flex h-11 w-11 items-center justify-center rounded-full border-4 border-ink bg-stock font-slab text-lg lg:static">
                                {i + 1}
                            </span>
                            <h3 className="mt-0 inline-block bg-ink px-2 py-0.5 font-wood text-xl font-bold uppercase tracking-wide text-stock lg:mt-5">
                                {stop.name}
                            </h3>
                            <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink/80">{stop.text}</p>
                        </li>
                    ))}
                </ol>

                {/* branch: where the naskah lands */}
                <div className={`mt-10 flex flex-wrap items-center gap-3 ${straddle ? 'lg:absolute lg:-bottom-28 lg:right-4 lg:mt-0 lg:max-w-[20rem] lg:translate-y-1/2 lg:rotate-2 lg:bg-stock lg:p-3 lg:shadow-[0_6px_14px_-6px_rgb(28_26_23/.35)]' : 'lg:ml-[75%] lg:mt-8'}`}>
                    {BRANCHES.map((b, i) => (
                        <span
                            key={b}
                            className={`border-2 border-ink px-2.5 py-1 font-type text-xs font-bold uppercase ${i === 0 ? 'bg-dull text-stock border-dull' : 'bg-stock'}`}
                            style={{ rotate: `${[-2, 1.5, -1, 2][i]}deg` }}
                        >
                            {b}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
