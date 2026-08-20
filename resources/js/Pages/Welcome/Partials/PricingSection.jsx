import Card from "@/Components/Card";
import { formatRupiah } from "@/Utils/formatter";
import { Link } from "@inertiajs/react";
import { Check, Sparkles } from "lucide-react";

// =====================================================================
// MINI COMPONENT: Render Fitur Otomatis dari Database
// =====================================================================
const RenderDBFeatures = ({ plan }) => {
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

            {/* 6. Fitur Wajib (Default) */}
            <div className="flex items-start gap-3 pt-3 border-t border-base-200 mt-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Publikasi di TIMES Indonesia</span>
            </div>
            <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Bimbingan dan penyuntingan redaksi</span>
            </div>
        </div>
    );
};
// =====================================================================


const PricingSection = ({ newsFirstPackage }) => {

    const defaultLevel1Features = [
        "Dapat member card penulis",
        "Dapat Akun CMS akses",
        "Mendapatkan Kouta menulis",
        "Jangkauan audience luas"
    ];

    return (
        <section id="pricing" className="py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        Membership
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-6">
                        Mulai Membership Untuk Menulis
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Mulai dan upgrade kapan saja sesuai kebutuhanmu.
                        Semua paket termasuk akses penuh ke platform.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div
                    className={`grid gap-8 max-w-7xl mx-auto
                            ${newsFirstPackage.length === 1
                            ? "grid-cols-1 justify-items-center"
                            : "grid-cols-1 md:grid-cols-3"
                        }
                `}>
                    {newsFirstPackage.map((plan) => {
                        const features = plan.features || defaultLevel1Features;
                        return (
                            <Card
                                key={plan.name}
                                className={`relative bg-base-100 rounded-2xl border p-8 flex flex-col shadow-sm transition-all hover:shadow-md
                                        ${newsFirstPackage.length === 1 ? "w-full max-w-md" : ""}
                                        ${Boolean(plan.popular)
                                        ? "border-primary shadow-lg scale-105 z-10"
                                        : "border-border"
                                    }`}
                            >
                                {/* Popular Badge */}
                                {Boolean(plan.popular) && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-br from-primary to-accent text-primary-content text-sm font-medium shadow-sm">
                                            <Sparkles className="w-3 h-3" />
                                            Paling Populer
                                        </div>
                                    </div>
                                )}

                                {/* Flash Sale Badge */}
                                {Boolean(plan.flash_sale) && (
                                    <div className="absolute -top-4 right-4">
                                        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-medium shadow-sm">
                                            <Sparkles className="w-3 h-3" />
                                            Flash Sale
                                        </div>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="font-serif text-3xl font-bold text-primary">{formatRupiah(plan.price)}</span>
                                        {/* Gunakan periode langsung agar selaras dengan format Subscription */}
                                        <span className="text-muted-foreground text-sm ml-1">/ {plan.period} {plan.jenis_periode}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                                </div>
                                {plan.level === 1 ? (
                                    <>
                                        {features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    < RenderDBFeatures plan={plan} />
                                )}

                                {/* CTA */}
                                <Link className="btn btn-primary w-full shadow-sm mt-auto" href="/register">
                                    Pilih Paket Ini
                                </Link>

                            </Card>
                        )
                    })}
                </div>

                {/* FAQ Hint */}
                <p className="text-center text-muted-foreground text-sm mt-12">
                    Punya pertanyaan? Hubungi tim kami di{" "}
                    <a href="mailto:redaksi@timesindonesia.co.id" className="text-primary hover:underline">
                        redaksi@timesindonesia.co.id
                    </a>
                </p>
            </div>
        </section>
    );
};

export default PricingSection;