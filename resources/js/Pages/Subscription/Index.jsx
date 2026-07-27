import Card from '@/Components/Card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { formatRupiah } from '@/Utils/formatter'
import { Head, Link, usePage } from '@inertiajs/react'
import { Check, MessageCircle, Sparkles, Crown } from 'lucide-react'
import React from 'react'

export default function Index({ newsPackagesRegular, newsPackagesSeasonal, newsSatuan, userPackage }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // =====================================================================
    // MINI COMPONENT: Render Fitur Otomatis dari Database
    // =====================================================================
    const RenderDBFeatures = ({ plan, isAddon = false }) => {
        return (
            <div className="flex-1 space-y-3 mb-8">
                {/* 1. Masa Berlaku */}
                {(plan.duration_days > 0 || plan.period > 0) && (
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                            Masa Berlaku: <span className="font-semibold">{plan.duration_days ? `${plan.duration_days} Hari` : `${plan.period} ${plan.jenis_periode}`}</span>
                        </span>
                    </div>
                )}

                {/* 2. Kuota Artikel */}
                {(plan.quota > 0 || plan.quota === null) && (
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                            Kuota Opini: <span className="font-semibold">{plan.quota === null ? 'Unlimited (Tanpa Batas)' : `${plan.quota} Artikel`}</span>
                        </span>
                    </div>
                )}

                {/* 3. Feed Instagram */}
                {plan.feed_instagram > 0 && (
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Feed IG: <span className="font-semibold">{plan.feed_instagram} Post</span></span>
                    </div>
                )}

                {/* 4. Ekoran */}
                {plan.ekoran > 0 && (
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Ekoran: <span className="font-semibold">{plan.ekoran} Edisi</span></span>
                    </div>
                )}

                {/* 5. WA Channel */}
                {plan.wa_channel > 0 && (
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">WA Channel: <span className="font-semibold">{plan.wa_channel} Post</span></span>
                    </div>
                )}

                {/* 6. Fitur Default (Hanya untuk Paket Regular & Promo) */}
                {!isAddon && (
                    <>
                        <div className="flex items-start gap-3 pt-3 border-t border-base-200 mt-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Publikasi di TIMES Indonesia</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Bimbingan dan penyuntingan redaksi</span>
                        </div>
                    </>
                )}
            </div>
        );
    };
    // =====================================================================

    return (
        <>
            <Head title='Membership' />
            <AuthenticatedLayout>
                <section id="pricing" className="py-8 md:py-12 bg-base-200/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* HEADER & BREADCRUMBS */}
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade Membership</h1>
                                <p className='text-sm text-muted-foreground'>Pilih paket yang sesuai dengan kebutuhan Anda untuk mendapatkan lebih banyak fitur</p>
                            </div>
                            <div className="breadcrumbs text-sm text-muted-foreground">
                                <ul>
                                    <li><Link href={route('dashboard')}>Home</Link></li>
                                    <li className="text-foreground font-medium">Subscription</li>
                                </ul>
                            </div>
                        </div>

                        {/* STATUS PAKET SAAT INI */}
                        <Card className="border-primary/20 bg-primary/5 shadow-sm mb-12">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                                        <Crown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-0.5">
                                            Paket Anda Saat Ini
                                        </p>
                                        <h3 className="text-xl font-bold text-foreground">{userPackage.name}</h3>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${user.status == 1
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                        {user.status == 1 ? 'Status: Aktif' : 'Status: Non Aktif'}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* ================= ADD ONS ================= */}
                        {newsSatuan && newsSatuan.length > 0 && (
                            <div className='flex flex-col gap-6 mb-16'>
                                <h2 className='text-2xl font-bold text-center md:text-left'>Add Ons (Layanan Tambahan)</h2>
                                <div className={`grid gap-6 grid-cols-1 md:grid-cols-3`}>
                                    {newsSatuan.map((plan) => (
                                        <Card key={plan.name} className={`relative rounded-2xl border p-8 flex flex-col shadow-sm transition-all hover:shadow-md
                                            ${newsSatuan.length === 1 ? "w-full max-w-md mx-auto" : ""}
                                            ${plan.popular ? "border-primary shadow-lg scale-105 z-10 bg-base-100" : "border-base-200 bg-base-100"}
                                        `}>
                                            {Boolean(plan.popular) && (
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                                    <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-br from-primary to-accent text-primary-content text-sm font-medium shadow-sm">
                                                        <Sparkles className="w-3 h-3" /> Paling Populer
                                                    </div>
                                                </div>
                                            )}
                                            <div className="text-center mb-6">
                                                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                                                <div className="mb-2">
                                                    <span className="font-serif text-2xl font-bold text-primary">{formatRupiah(plan.price)}</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{plan.description}</p>
                                            </div>

                                            {/* Panggil komponen fitur dengan isAddon = true */}
                                            <RenderDBFeatures plan={plan} isAddon={true} />

                                            <Link className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white w-full mt-auto" href={"/checkout?package_id=" + plan.id}>
                                                Beli Add On
                                            </Link>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ================= PAKET PROMO (SEASONAL) ================= */}
                        {newsPackagesSeasonal && newsPackagesSeasonal.length > 0 && (
                            <div className="mb-16">
                                <h2 className="font-serif text-3xl font-bold text-center mb-8">Paket Promo Spesial</h2>
                                <div className={`grid gap-6 max-w-7xl mx-auto
                                    ${newsPackagesSeasonal.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-1 md:grid-cols-3 justify-items-center"}
                                `}>
                                    {newsPackagesSeasonal.map((plan) => (
                                        <Card key={plan.name} className={`relative bg-base-100 rounded-2xl border p-8 flex flex-col shadow-sm transition-all hover:shadow-md
                                            ${newsPackagesSeasonal.length === 1 ? "w-full max-w-md" : "w-full"}
                                            ${plan.popular ? "border-primary shadow-lg scale-105 z-10" : "border-base-200"}
                                        `}>
                                            {plan.popular == 1 && (
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                                    <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-br from-primary to-accent text-primary-content text-sm font-medium shadow-sm">
                                                        <Sparkles className="w-3 h-3" /> Paling Populer
                                                    </div>
                                                </div>
                                            )}
                                            {plan.flash_sale && (
                                                <div className="absolute -top-4 right-4">
                                                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-medium shadow-sm">
                                                        <Sparkles className="w-3 h-3" /> Flash Sale
                                                    </div>
                                                </div>
                                            )}

                                            <div className="text-center mb-6">
                                                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                                                <div className="mb-2">
                                                    <span className="font-serif text-3xl font-bold text-primary">{formatRupiah(plan.price)}</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{plan.description}</p>
                                            </div>

                                            {/* Panggil komponen fitur untuk Promo */}
                                            <RenderDBFeatures plan={plan} isAddon={false} />

                                            <Link className="btn btn-primary w-full shadow-sm mt-auto" href={"/checkout?package_id=" + plan.id}>
                                                Pilih Paket Ini
                                            </Link>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ================= PAKET REGULAR ================= */}
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl font-bold text-center mb-8">Paket Membership Regular</h2>
                            <div className={`grid gap-6 max-w-7xl mx-auto
                                ${newsPackagesRegular.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-1 md:grid-cols-3"}
                            `}>
                                {newsPackagesRegular.map((plan) => (
                                    <Card key={plan.name} className={`relative bg-base-100 rounded-2xl border p-8 flex flex-col shadow-sm transition-all hover:shadow-md
                                        ${newsPackagesRegular.length === 1 ? "w-full max-w-md" : "w-full"}
                                        ${plan.popular ? "border-primary shadow-lg scale-105 z-10" : "border-base-200"}
                                    `}>
                                        {plan.popular == 1 && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                                <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-br from-primary to-accent text-primary-content text-sm font-medium shadow-sm">
                                                    <Sparkles className="w-3 h-3" /> Paling Populer
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                                            <div className="mb-2">
                                                <span className="font-serif text-3xl font-bold text-primary">{formatRupiah(plan.price)}</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm">{plan.description}</p>
                                        </div>

                                        {/* Panggil komponen fitur untuk Regular */}
                                        <RenderDBFeatures plan={plan} isAddon={false} />

                                        <Link className="btn btn-primary w-full shadow-sm mt-auto" href={"/checkout?package_id=" + plan.id}>
                                            Pilih Paket Ini
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* ================= PAKET KUSTOM (CUSTOM PLAN) ================= */}
                        <div className="max-w-3xl mx-auto mt-16">
                            <div className="relative bg-base-100 rounded-2xl border-2 border-dashed border-primary/40 p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:border-primary/80 transition-colors">
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-serif text-2xl font-bold mb-2">Paket Kustom</h3>
                                    <p className="text-muted-foreground">Untuk kebutuhan khusus, event liputan khusus, atau kerjasama yang tidak tersedia dalam paket standar kami.</p>
                                </div>
                                <div className="shrink-0">
                                    <a href="mailto:redaksi@timesindonesia.co.id" className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white shadow-sm">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        Hubungi Kami
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </AuthenticatedLayout>
        </>
    )
}