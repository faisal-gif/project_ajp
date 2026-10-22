import LandingLayout from '@/Layouts/LandingLayout';
import { formatRupiah } from '@/Utils/formatter';
import { Head, Link } from '@inertiajs/react';

// Komisi ditulis sebagai persentase supaya ikut harga paket, ditambah satu contoh angka.
// Pos internal 10% tidak pernah disebut di halaman publik.
const CONTOH_HARGA = 48000;
const BERLAKU = '22 Oktober 2026';

function Pasal({ nomor, judul, children }) {
    return (
        <>
            <h2 className="font-serif text-2xl font-bold mb-4">{nomor}. {judul}</h2>
            <div className="text-muted-foreground mb-8 leading-relaxed space-y-4">{children}</div>
        </>
    );
}

export default function SyaratKetentuan({ min_payout, hold_days, cookie_days, tier1_bps, tier2_bps }) {
    // Tarif datang dari config lewat props, bukan diketik di halaman.
    const TIER1_PERSEN = (tier1_bps / 100) + '%';
    const TIER2_PERSEN = (tier2_bps / 100) + '%';

    // Tarif 0 mengganti pasal komisi jaringan dengan pernyataan satu tingkat. Ini
    // dokumen yang mengikat, jadi tidak boleh menjanjikan komisi jaringan "0%".
    // AJP ikut dua tingkat sejak 22 Oktober 2026, jadi cabang itu kini yang berlaku.
    const adaTingkatKedua = tier2_bps > 0;

    // Contoh angka diturunkan dari tarif, bukan ditulis mati, supaya tidak pernah
    // bertentangan dengan persentase di atasnya.
    const contohTier1 = Math.floor((CONTOH_HARGA * tier1_bps) / 10000);
    const contohTier2 = Math.floor(((CONTOH_HARGA - contohTier1) * tier2_bps) / 10000);

    return (
        <LandingLayout>
            <Head title="Syarat & Ketentuan Afiliasi" />
            <main className="pt-16">
                <section className="py-16 bg-base-300">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                                Syarat &amp; Ketentuan Afiliasi
                            </h1>
                            <p className="text-muted-foreground">Berlaku {BERLAKU}</p>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-base-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <p className="text-muted-foreground mb-10 leading-relaxed">
                                Ketentuan ini mengikat setiap orang yang mengajukan diri dan disetujui sebagai
                                afiliator AJP. Dengan mengirim pengajuan, Anda menyatakan telah membacanya.
                            </p>

                            <Pasal nomor="1" judul="Keanggotaan">
                                <p>
                                    Pengajuan hanya dapat dilakukan oleh member AJP yang berstatus aktif. Satu orang
                                    hanya boleh memiliki satu akun afiliator, dan satu akun member hanya dapat
                                    ditautkan ke satu akun afiliator.
                                </p>
                                <p>
                                    Pengajuan ditinjau terlebih dahulu. Kami berhak menyetujui atau menolak pengajuan
                                    tanpa kewajiban menjelaskan alasannya.
                                </p>
                            </Pasal>

                            <Pasal nomor="2" judul="Komisi">
                                <p>
                                    Untuk setiap pendaftar baru yang masuk melalui link referral Anda dan
                                    menyelesaikan pembayaran paket pendaftaran, Anda memperoleh komisi{' '}
                                    <strong className="text-foreground">{TIER1_PERSEN} dari harga paket</strong>.
                                </p>
                                {adaTingkatKedua ? (
                                    <>
                                        <p>
                                            Bila afiliator yang Anda rekrut memperoleh pendaftar baru, Anda memperoleh komisi
                                            jaringan sebesar{' '}
                                            <strong className="text-foreground">{TIER2_PERSEN} dari sisa setelah komisi tingkat 1</strong>{' '}
                                            untuk setiap pendaftar tersebut.
                                        </p>
                                        <p>
                                            Contoh pada harga paket {formatRupiah(CONTOH_HARGA)}: komisi langsung{' '}
                                            {formatRupiah(contohTier1)} dan komisi jaringan {formatRupiah(contohTier2)}.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Program ini berjalan <strong className="text-foreground">satu tingkat</strong>.
                                            Komisi hanya diperoleh dari pendaftar yang Anda bawa sendiri; tidak ada komisi
                                            dari pendaftar yang dibawa orang lain yang Anda rekrut.
                                        </p>
                                        <p>
                                            Contoh pada harga paket {formatRupiah(CONTOH_HARGA)}: komisi langsung{' '}
                                            {formatRupiah(contohTier1)} untuk setiap pendaftar baru Anda.
                                        </p>
                                    </>
                                )}
                                <p>
                                    Karena berupa persentase, komisi mengikuti harga yang benar-benar dibayarkan.
                                    Perubahan harga mengubah nominal komisi untuk transaksi berikutnya, tanpa mengubah
                                    komisi yang sudah tercatat.
                                </p>
                            </Pasal>

                            <Pasal nomor="3" judul="Transaksi yang berkomisi">
                                <p>
                                    Komisi hanya berlaku untuk <strong className="text-foreground">pendaftaran member
                                    baru di AJP</strong>. Perpanjangan membership, paket tambahan, dan pembelian satuan
                                    tidak menghasilkan komisi.
                                </p>
                                <p>
                                    Pendaftar yang masuk lewat link Anda tetapi membeli produk di situs lain dalam
                                    ekosistem TIMES tidak menghasilkan komisi bagi Anda.
                                </p>
                                <p>
                                    Pembayaran yang dibatalkan, gagal, kedaluwarsa, atau dikembalikan tidak
                                    menghasilkan komisi. Komisi yang terlanjur tercatat atas pembayaran semacam itu
                                    akan dibatalkan.
                                </p>
                            </Pasal>

                            <Pasal nomor="4" judul="Pencatatan referral">
                                <p>
                                    Kode referral tersimpan di perangkat pendaftar selama{' '}
                                    <strong className="text-foreground">{cookie_days} hari</strong> sejak ia membuka
                                    link Anda. Bila dalam rentang itu ia mendaftar, pendaftaran dicatat atas nama Anda.
                                </p>
                                <p>
                                    Bila seseorang membuka beberapa link referral berbeda, yang berlaku adalah link
                                    yang <strong className="text-foreground">terakhir</strong> ia buka, dan masa
                                    simpannya dihitung ulang sejak klik terakhir itu. Setelah ia mendaftar,
                                    pencatatannya terkunci: satu pendaftar selamanya tercatat pada satu afiliator dan
                                    tidak dapat dipindahkan.
                                </p>
                                <p>
                                    Pendaftar berhak menolak ajakan yang terdeteksi dengan menekan &quot;Daftar
                                    tanpa kode ini&quot; di halaman pendaftaran. Pendaftaran semacam itu tidak
                                    menghasilkan komisi bagi siapa pun.
                                </p>
                            </Pasal>

                            <Pasal nomor="5" judul="Masa tahan dan pencairan">
                                <p>
                                    Komisi ditahan <strong className="text-foreground">{hold_days} hari</strong> sejak
                                    pembayaran dinyatakan lunas, sebelum dapat diajukan untuk pencairan.
                                </p>
                                <p>
                                    Pencairan dilakukan melalui transfer ke rekening yang Anda daftarkan, dengan saldo
                                    minimum <strong className="text-foreground">{formatRupiah(min_payout)}</strong>.
                                    Kesalahan data rekening yang Anda isi di luar tanggung jawab kami.
                                </p>
                                <p>Pajak atas komisi mengikuti ketentuan perpajakan yang berlaku.</p>
                            </Pasal>

                            <Pasal nomor="6" judul="Larangan">
                                <p>Anda dilarang:</p>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li>mendaftarkan diri sendiri atau membuat akun fiktif untuk memperoleh komisi;</li>
                                    <li>menyebarkan link referral lewat spam, pesan massal tanpa izin, atau cara yang menyesatkan;</li>
                                    <li>mengaku sebagai karyawan, perwakilan resmi, atau juru bicara TIMES Indonesia;</li>
                                    <li>menjanjikan keuntungan, jaminan pemuatan tulisan, atau ketentuan apa pun di luar dokumen ini;</li>
                                    <li>memakai nama, logo, atau identitas TIMES Indonesia untuk keperluan di luar promosi program ini.</li>
                                </ul>
                            </Pasal>

                            <Pasal nomor="7" judul="Sanksi">
                                <p>
                                    Pelanggaran atas ketentuan di atas dapat berakibat pembatalan komisi yang belum
                                    dicairkan, penangguhan, atau penghentian akun afiliator. Komisi dari transaksi yang
                                    terbukti tidak sah tidak akan dibayarkan.
                                </p>
                            </Pasal>

                            <Pasal nomor="8" judul="Perubahan ketentuan">
                                <p>
                                    Ketentuan ini dapat berubah sewaktu-waktu. Perubahan berlaku untuk transaksi
                                    setelah tanggal perubahan dan tidak mengubah komisi yang sudah tercatat.
                                </p>
                            </Pasal>

                            <div className="border-t border-base-300 pt-8">
                                <p className="text-muted-foreground">
                                    Pertanyaan tentang program ini:{' '}
                                    <a href="mailto:redaksi@timesindonesia.co.id" className="link link-primary">
                                        redaksi@timesindonesia.co.id
                                    </a>
                                </p>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Penjelasan langkah demi langkah ada di{' '}
                                    <Link href="/panduan-afiliasi" className="link link-primary">Panduan Afiliasi</Link>.
                                </p>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Lihat juga{' '}
                                    <Link href="/syarat-ketentuan" className="link link-primary">Syarat &amp; Ketentuan layanan</Link>
                                    {' '}dan{' '}
                                    <Link href="/kebijakan-privasi" className="link link-primary">Kebijakan Privasi</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}
