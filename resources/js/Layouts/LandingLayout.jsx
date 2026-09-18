import React from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Menu, User, Youtube, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

const NAV = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Harga', href: '/harga' },
];

const SOCIAL = [
    { icon: Facebook, href: 'https://www.facebook.com/timesindonesia.co.id', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/timescoid', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://www.instagram.com/timesindonesia', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@timesIDN', label: 'YouTube' },
];

function LandingLayout({ children }) {
    const currentYear = new Date().getFullYear();
    const { auth } = usePage().props;
    const { url } = usePage();
    const user = auth.user;
    const isActive = (href) => (href === '/' ? url === '/' : url.startsWith(href));

    return (
        <div className="landing">
            <header className="grain fixed z-[99] w-full border-b-2 border-ink bg-stock text-ink">
                <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4">
                    {/* Mobile menu */}
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} aria-label="Buka menu" className="flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-ink">
                            <Menu className="h-5 w-5" />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] mt-3 w-52 border-2 border-ink bg-stock p-2 scrap-shadow">
                            {NAV.map((n) => (
                                <li key={n.href}>
                                    <Link href={n.href} className={`block px-3 py-2 font-wood text-lg font-bold uppercase ${isActive(n.href) ? 'bg-dull text-stock' : 'hover:bg-buff'}`}>
                                        {n.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/" aria-label="AJP, ke beranda" className="shrink-0">
                        <ApplicationLogo className="h-6 w-auto sm:h-7 md:h-8" />
                    </Link>

                    <ul className="ml-6 hidden items-center gap-1 lg:flex">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <Link
                                    href={n.href}
                                    className={`block px-3 py-1 font-wood text-lg font-bold uppercase tracking-wide ${isActive(n.href) ? 'bg-dull text-stock' : 'hover:bg-buff'}`}
                                >
                                    {n.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="ml-auto flex items-center gap-2">
                        {user ? (
                            <Dropdown
                                trigger={
                                    <button className="flex items-center gap-2 border-2 border-ink px-3 py-1.5 font-semibold hover:bg-buff">
                                        <User size={18} />
                                        <span className="max-w-[10rem] truncate">{user.name}</span>
                                    </button>
                                }
                            >
                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown>
                        ) : (
                            <>
                                <Link href={route('login')} className="px-2 py-1.5 font-wood text-lg sm:px-3 font-bold uppercase tracking-wide hover:bg-buff">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="ticket bg-ink py-1.5 pl-4 pr-5 font-wood text-lg font-bold uppercase tracking-wide text-stock [--notch:5px] [--stub:1.4rem] hover:bg-dull">
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {children}

            <footer className="relative bg-ink text-stock">
                {/* perforated top edge: the page ends like a torn-off ticket */}
                <div aria-hidden="true" className="-mt-3 h-3 bg-ink [mask:radial-gradient(circle_at_7px_0,#0000_5px,#000_5.5px)_0_0/14px_12px_repeat-x]" />
                <div className="mx-auto max-w-7xl px-4 pb-10 pt-12">
                    <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-14">
                        <Link href="/" aria-label="AJP, ke beranda" className="ticket inline-block self-start bg-stock py-3 pl-4 pr-10 [--notch:6px] [--stub:1.6rem]">
                            <ApplicationLogo className="h-8 w-auto" />
                        </Link>

                        {/* colophon, set as printed matter */}
                        <div className="max-w-2xl font-type text-[13px] leading-relaxed text-stock/80">
                            <p className="font-wood text-2xl font-black uppercase leading-none text-stock">
                                Aplikasi Jurnalisme Positif
                            </p>
                            <p className="mt-3">
                                Diterbitkan bersama redaksi <b className="text-stock">TIMES Indonesia</b>, Jl. Besar Ijen No.90,
                                Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur 65116.
                            </p>
                            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /><a href="mailto:redaksi@timesindonesia.co.id" className="underline-offset-4 hover:text-foil hover:underline">redaksi@<wbr />timesindonesia.co.id</a></span>
                                <span className="perf-y hidden h-4 w-2 text-stock/40 sm:block" />
                                <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /><a href="tel:+62341563566" className="hover:text-foil">(0341) 563566</a></span>
                            </p>
                            <nav aria-label="Tautan footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-wood text-lg font-bold uppercase tracking-wide text-stock">
                                {[...NAV, { label: 'Daftar', href: '/register' }].map((l) => (
                                    <Link key={l.href} href={l.href} className="underline-offset-4 hover:text-foil hover:underline">{l.label}</Link>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <p className="font-type text-[11px] uppercase text-stock/70">Ikuti TIMES Indonesia</p>
                            <div className="mt-3 flex gap-2">
                                {SOCIAL.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex h-10 w-10 items-center justify-center border-2 border-stock/40 hover:border-foil hover:text-foil"
                                    >
                                        <s.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="perf-x mt-12 h-1 text-stock/30" />
                    <div className="mt-5 flex flex-col justify-between gap-3 font-type text-xs text-stock/70 md:flex-row md:items-center">
                        <p>© {currentYear} AJP — Aplikasi Jurnalisme Positif. Hak cipta dilindungi.</p>
                        <div className="flex gap-6">
                            <Link href="/kebijakan-privasi" className="hover:text-stock">Kebijakan Privasi</Link>
                            <Link href="/syarat-ketentuan" className="hover:text-stock">Syarat &amp; Ketentuan</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingLayout
