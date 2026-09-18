import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Fist from '@/Pages/Welcome/Partials/Fist';
import Stamp from '@/Pages/Welcome/Partials/Stamp';

// Auth pages: a pasted-up board on AJP red (desktop) beside a paper desk that holds the form.
export default function GuestLayout({ children }) {
    return (
        <div className="landing auth flex min-h-screen text-ink">
            {/* Board */}
            <aside className="relative hidden overflow-hidden bg-dull lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
                <Link href="/" aria-label="AJP, ke beranda" className="ticket relative z-10 inline-block self-start bg-stock py-3 pl-4 pr-10 [--notch:6px] [--stub:1.6rem]">
                    <ApplicationLogo className="h-8 w-auto" />
                </Link>

                <div className="relative z-10 max-w-md">
                    <div className="scrap-drop -rotate-2">
                        <figure className="torn grain bg-newsprint px-7 pb-9 pt-7">
                            <div className="halftone h-40 mix-blend-multiply" aria-hidden="true" />
                            <blockquote className="mt-5 font-news text-[1.6rem] font-bold leading-snug">
                                “Setiap kata yang kita tulis memiliki kekuatan untuk mengubah dunia menjadi tempat yang lebih baik.”
                            </blockquote>
                            <figcaption className="mt-4 font-type text-xs uppercase text-olive">AJP — Aplikasi Jurnalisme Positif</figcaption>
                        </figure>
                    </div>
                    <Stamp sub="TIMES INDONESIA" className="pointer-events-none absolute -bottom-12 -right-10 w-44 rotate-[-10deg] [--color-dull:#1c1a17]" />
                </div>

                <p className="relative z-10 flex items-center gap-3 font-type text-sm text-stock/85">
                    <Fist className="w-16 shrink-0 [--color-stock:#e6d7b8]" />
                    Disunting &amp; diterbitkan bersama redaksi TIMES Indonesia.
                </p>
            </aside>

            {/* Desk */}
            <main className="grain flex w-full flex-col bg-stock lg:w-[54%]">
                <div className="flex items-center justify-between px-6 pt-6 lg:px-12">
                    <Link href="/" aria-label="AJP, ke beranda" className="lg:invisible">
                        <ApplicationLogo className="h-7 w-auto" />
                    </Link>
                    <Link href="/" className="inline-flex items-center gap-2 font-type text-sm hover:text-dull">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke beranda
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-xl">{children}</div>
                </div>
            </main>
        </div>
    );
}
