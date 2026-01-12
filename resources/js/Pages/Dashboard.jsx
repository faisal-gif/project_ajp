import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/formatter';
import { Head, usePage } from '@inertiajs/react';
import { AlertTriangle, Badge, BookOpen, Calendar, CheckCircle, Image, MapPin, MousePointer, PenTool, Plus, Send, TrendingUp } from 'lucide-react';

export default function Dashboard({ total_news,pending_news, publish_news }) {

    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* Tutorial Card */}
                    <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">

                        <div className="flex items-center gap-2 text-lg">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            Tutorial Menulis Artikel
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Yuk ikuti langkah mudah ini untuk mengirim artikel ke AJP!
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <MousePointer className="w-4 h-4 text-blue-600" />
                                            Klik Menu "Artikel Saya"
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Di menu sebelah kiri, cari dan klik menu "Artikel Saya" untuk masuk ke halaman daftar artikel.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 ">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-blue-600" />
                                            Klik Tombol "Tambah Artikel"
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Tekan tombol "Tambah Artikel" di pojok kanan atas untuk mulai menulis artikel baru.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 ">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <PenTool className="w-4 h-4 text-blue-600" />
                                            Tulis Judul dan Isi Artikel
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Buat judul yang menarik dan tulis isi artikel Anda. Maksimal 4.000 karakter (sekitar 600 kata).</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-white/5">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                            Isi Data Narasumber & Lokasi
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Lengkapi informasi: <span className="font-medium">Kota</span> (lokasi liputan), <span className="font-medium">Narasumber</span> (nama orang yang diwawancara), <span className="font-medium">Profesi</span> (pekerjaan narasumber), dan <span className="font-medium">Kontak</span> (nomor HP).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 ">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">5</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <Image className="w-4 h-4 text-blue-600" />
                                            Tambah Gambar
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            <span className="text-red-600 font-semibold">Gambar A wajib diisi</span> sebagai gambar utama artikel. Gambar B dan C boleh dilewati. Jangan lupa tambahkan keterangan untuk setiap gambar.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 ">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">6</div>
                                    <div>
                                        <p className="font-medium text-foreground flex items-center gap-2">
                                            <Send className="w-4 h-4 text-blue-600" />
                                            Kirim untuk Direview
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">Kalau sudah selesai, tekan tombol "Kirim untuk Review". Tim redaksi akan cek artikel Anda dalam 1-3 hari kerja.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Card>
                    {/* Subscription Card */}
                    <Card className=" border-primary/20">

                        <div className="flex items-center justify-between text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Status Membership
                            </div>
                        </div>

                        <div className="space-y-4 mt-4">
                            <p className="text-sm font-medium text-muted-foreground mb-6">Masa Berlaku Paket</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Mulai</span>
                                <span className="font-medium text-foreground">
                                    {formatDate(user.created)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Berakhir</span>
                                <span className="font-medium text-foreground">
                                    {formatDate(user.dateexp)}
                                </span>
                            </div>
                        </div>


                        <div className="border-t border-border" />

                        {/* Kuota Artikel */}
                        <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        Kuota Artikel Aktif
                                    </p>
                                    <span className="font-semibold text-foreground text-sm">
                                        {user.quota_news}
                                    </span>
                                </div>
                            {/* <Progress value={quotaPercentage} className="h-2" /> */}


                        </div>
                    </Card>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
