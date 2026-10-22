import LandingLayout from '@/Layouts/LandingLayout';
import { formatRupiah } from '@/Utils/formatter';
import { Head, Link } from '@inertiajs/react';

// Panduan praktis — melengkapi Syarat & Ketentuan, bukan menyalinnya.
// S&K menjawab "apa aturannya", halaman ini "bagaimana melakukannya".
// Pos internal 10% tidak pernah disebut di halaman publik.
const CONTOH_HARGA = 48000;

function Langkah({ nomor, judul, children }) {
    return (
        <div className="flex gap-4 mb-10">
            <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-content"
            >
                {nomor}
            </span>
            <div>
                <h2 className="font-serif text-2xl font-bold mb-3">{judul}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">{children}</div>
            </div>
        </div>
    );
}

function Tanya({ judul, children }) {
    return (
        <div className="border-t border-base-300 py-6">
            <h2 className="font-serif text-lg font-bold mb-2">{judul}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
        </div>
    );
}

export default function Panduan({ min_payout, hold_days, cookie_days, tier1_bps, tier2_bps }) {
    // Tarif datang dari config lewat props, bukan diketik di halaman.
    const TIER1_PERSEN = tier1_bps / 100 + '%';
    const TIER2_PERSEN = tier2_bps / 100 + '%';

    // AJP berjalan satu tingkat: tier2_bps = 0. Bagian komisi jaringan tidak boleh
    // muncul sama sekali — menyebutnya "0%" sama saja menjanjikan sesuatu yang tidak ada.
    const adaTingkatKedua = tier2_bps > 0;

    const contohTier1 = Math.floor((CONTOH_HARGA * tier1_bps) / 10000);
    const contohTier2 = Math.floor(((CONTOH_HARGA - contohTier1) * tier2_bps) / 10000);

    return (
        <LandingLayout>
            <Head title="Panduan Afiliasi" />
            <main className="pt-16">
                <section className="py-16 bg-base-300">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                                Panduan Afiliasi
                            </h1>
                            <p className="text-muted-foreground">
                                Setiap orang yang mendaftar jadi member AJP lewat tautan Anda, lalu menyelesaikan
                                pembayaran pendaftarannya, memberi Anda komisi{' '}
                                <strong className="text-foreground">{TIER1_PERSEN} dari harga paket</strong>. Halaman
                                ini menjelaskan cara kerjanya dari awal sampai komisinya cair.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <Link href="/afiliasi/daftar" className="btn btn-primary">
                                    Ajukan diri jadi afiliator
                                </Link>
                                <Link href="/syarat-afiliasi" className="btn btn-outline">
                                    Baca syarat &amp; ketentuan
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-base-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <Langkah nomor="1" judul="Pastikan keanggotaan Anda aktif">
                                <p>
                                    Program ini hanya untuk member AJP yang masa aktifnya sedang berjalan. Kalau masa
                                    aktif Anda sudah habis, perpanjang dulu sebelum mengajukan diri.
                                </p>
                            </Langkah>

                            <Langkah nomor="2" judul="Ajukan diri, lalu tunggu ditinjau">
                                <p>
                                    Isi formulir pengajuan: nama, kontak, dan <strong>nomor rekening</strong> tujuan
                                    pencairan. Rekening diisi sejak awal — tanpa itu komisi Anda tidak bisa dicairkan
                                    nanti.
                                </p>
                                <p>
                                    Pengajuan ditinjau tim kami lebih dulu. Selama masih ditinjau, halaman afiliasi Anda
                                    menampilkan status menunggu dan tautan referral belum berlaku.
                                </p>
                            </Langkah>

                            <Langkah nomor="3" judul="Bagikan tautan referral Anda">
                                <p>
                                    Setelah disetujui, Anda mendapat kode unik dan tautan siap bagikan, bentuknya{' '}
                                    <code className="rounded bg-base-300 px-1.5 py-0.5 text-sm">?ref=KODEANDA</code>.
                                    Salin dari halaman afiliasi Anda, lalu sebarkan di mana pun Anda biasa menulis atau
                                    berbicara.
                                </p>
                                <p>
                                    Kode itu menempel di peramban calon pendaftar selama{' '}
                                    <strong>{cookie_days} hari</strong>. Jadi ia tidak harus mendaftar saat itu juga —
                                    selama masih dalam rentang tersebut, pendaftarannya tetap tercatat sebagai ajakan
                                    Anda.
                                </p>
                                <p>
                                    Kalau ia membuka tautan afiliator lain sesudah tautan Anda,{' '}
                                    <strong>yang terakhir dibuka itulah yang berlaku</strong>, dan hitungan harinya ikut
                                    dimulai ulang dari klik terakhir. Ia juga bisa mengetik kode Anda secara manual di
                                    kolom kode referral saat mendaftar.
                                </p>
                            </Langkah>

                            <Langkah nomor="4" judul="Komisi tercatat saat pembayarannya lunas">
                                <p>
                                    Komisi muncul ketika orang yang Anda ajak menyelesaikan pembayaran{' '}
                                    <strong>pendaftaran member baru</strong>. Perpanjangan masa aktif, paket tambahan,
                                    dan pembelian satuan tidak menghasilkan komisi.
                                </p>
                                <p>
                                    Contoh pada harga paket {formatRupiah(CONTOH_HARGA)}: komisi langsung Anda{' '}
                                    <strong className="text-foreground">{formatRupiah(contohTier1)}</strong>. Karena
                                    berupa persentase, nominalnya mengikuti harga yang benar-benar dibayarkan.
                                </p>
                                {adaTingkatKedua && (
                                    <p>
                                        Sebagian afiliator juga ditunjuk untuk menerima{' '}
                                        <strong>komisi jaringan {TIER2_PERSEN}</strong> dari pendaftar yang dibawa orang
                                        yang dulu mereka ajak — pada contoh di atas {formatRupiah(contohTier2)}.
                                        Penunjukan itu dilakukan tim kami, jadi tidak berlaku otomatis untuk setiap
                                        afiliator.
                                    </p>
                                )}
                            </Langkah>

                            <Langkah nomor="5" judul="Pencairan">
                                <p>
                                    Komisi ditahan <strong>{hold_days} hari</strong> sejak pembayaran lunas. Masa ini
                                    dipakai untuk memastikan pendaftarannya benar, bukan pembatalan atau pendaftaran
                                    fiktif.
                                </p>
                                <p>
                                    Setelah itu komisi masuk antrean persetujuan, lalu dicairkan lewat transfer manual
                                    ke rekening yang Anda daftarkan. Pencairan dilakukan bila saldo yang siap cair sudah
                                    mencapai <strong>{formatRupiah(min_payout)}</strong>.
                                </p>
                            </Langkah>

                            <h2 className="font-serif text-3xl font-bold mt-14 mb-4">
                                Pertanyaan yang sering muncul
                            </h2>

                            <Tanya judul="Teman saya sudah mendaftar, kenapa komisinya belum muncul?">
                                <p>
                                    Komisi baru tercatat setelah <strong>pembayarannya lunas</strong>, bukan saat akunnya
                                    dibuat. Kalau ia belum menyelesaikan pembayaran, belum ada yang tercatat.
                                </p>
                                <p>
                                    Setelah lunas pun angkanya masih dalam masa tahan {hold_days} hari sebelum bisa
                                    dicairkan.
                                </p>
                            </Tanya>

                            <Tanya judul="Ia mendaftar lewat tautan saya tapi tidak tercatat. Kenapa?">
                                <p>Biasanya salah satu dari ini:</p>
                                <ul className="list-disc space-y-1 pl-5">
                                    <li>
                                        ia membuka tautan afiliator lain sesudah tautan Anda — yang terakhir yang
                                        berlaku;
                                    </li>
                                    <li>lewat dari {cookie_days} hari sejak ia membuka tautan Anda;</li>
                                    <li>
                                        ia mendaftar di peramban atau perangkat lain, bukan yang dipakai membuka tautan;
                                    </li>
                                    <li>riwayat perambannya dibersihkan sebelum ia mendaftar.</li>
                                    <li>ia menekan &quot;Daftar tanpa kode ini&quot; di halaman pendaftaran.</li>
                                </ul>
                                <p>
                                    Cara paling aman: minta ia mengetik kode Anda langsung di kolom kode referral saat
                                    mendaftar.
                                </p>
                            </Tanya>

                            <Tanya judul="Apakah saya dapat komisi kalau ia memperpanjang masa aktif?">
                                <p>
                                    Tidak. Hanya <strong>pendaftaran member baru</strong> yang berkomisi. Perpanjangan,
                                    paket tambahan, dan pembelian satuan tidak.
                                </p>
                            </Tanya>

                            <Tanya judul="Boleh saya mendaftar lewat tautan saya sendiri?">
                                <p>
                                    Tidak. Pendaftaran dengan tautan sendiri tidak akan tercatat, dan upaya membuat
                                    pendaftaran fiktif berakibat komisi dibatalkan serta akun afiliator ditangguhkan.
                                </p>
                            </Tanya>

                            <Tanya judul="Berapa lama komisinya sampai ke rekening?">
                                <p>
                                    Pencairan diproses manual oleh tim kami setelah masa tahan lewat dan saldo siap cair
                                    mencapai {formatRupiah(min_payout)}. Statusnya bisa Anda pantau kapan saja di
                                    halaman afiliasi Anda.
                                </p>
                            </Tanya>

                            <div className="border-t border-base-300 pt-8">
                                <p className="text-muted-foreground leading-relaxed">
                                    Panduan ini menjelaskan cara kerjanya secara ringkas. Yang mengikat secara aturan
                                    adalah{' '}
                                    <Link href="/syarat-afiliasi" className="link link-primary">
                                        Syarat &amp; Ketentuan Afiliasi
                                    </Link>
                                    . Bila keduanya tampak berbeda, yang berlaku adalah syarat &amp; ketentuan.
                                </p>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Masih ada pertanyaan:{' '}
                                    <a href="mailto:redaksi@timesindonesia.co.id" className="link link-primary">
                                        redaksi@timesindonesia.co.id
                                    </a>
                                </p>
                                <Link href="/afiliasi/daftar" className="btn btn-primary mt-8">
                                    Ajukan diri jadi afiliator
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}
