import Card from '@/Components/Card'
import InputSelect from '@/Components/InputSelect'
import InputWithPrefix from '@/Components/InputWithPrefix'
import PaginationDaisy from '@/Components/PaginationDaisy'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { formatDate } from '@/Utils/formatter'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { AlertTriangle, Crown, Eye, Newspaper, Plus, Search, Instagram, FileText, Phone, CheckCircle, Clock } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

function Index({ news, filters }) {
  const [search, setSearch] = useState(() => filters.search || '');
  const [status, setStatus] = useState(() => filters.status || '');
  const { auth } = usePage().props;
  const user = auth.user;

  const isFirst = useRef(true);
  const INDEX_ROUTE = route('news.index');

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    let timeout = null;
    if (search !== filters.search) {
      timeout = setTimeout(() => {
        router.get(
          INDEX_ROUTE,
          { search, status, page: 1 },
          { preserveState: true, replace: true }
        );
      }, 400);
    } else {
      router.get(
        INDEX_ROUTE,
        { search, status, page: 1 },
        { preserveState: true, replace: true }
      );
    }

    return () => timeout && clearTimeout(timeout);
  }, [search, status]);

  function handleReset() {
    setSearch('');
    setStatus('');
    router.get(
      INDEX_ROUTE,
      { search: '', status: '', page: 1 },
      { preserveState: true, replace: true }
    );
  }

  // ==========================================
  // FUNGSI REQUEST ADD-ONS (SAMA SEPERTI KOPI TIMES)
  // ==========================================
  function handleRequestAddon(newsId, jenis, kuotaTersedia) {
    const labelLayanan = {
      feed_instagram: 'Feed IG',
      ekoran: 'Ekoran',
      wa_channel: 'WA Channel'
    }[jenis] || jenis;

    if (kuotaTersedia <= 0) {
      alert(`Kuota ${labelLayanan} Anda habis. Silakan perpanjang membership.`);
      return;
    }

    if (confirm(`Gunakan 1 kuota untuk jadikan berita ini ${labelLayanan}?`)) {
      router.post(route('news.request-addon', newsId), {
        jenis_request: jenis
      }, {
        preserveScroll: true
      });
    }
  }

  function renderAddonButton(newsId, jenis, kuotaTersedia, addonRequests, icon, label, isMobile = false) {
    const request = addonRequests
      ?.filter(req => req.jenis_request === jenis)
      ?.sort((a, b) => b.id - a.id)[0];

    const baseClass = isMobile ? 'btn btn-sm flex-1' : 'btn btn-sm btn-circle';

    // KONDISI 1: Belum Request / Ditolak (Bisa request lagi)
    if (!request || request.status === 'rejected') {
      return (
        <button
          onClick={() => handleRequestAddon(newsId, jenis, kuotaTersedia)}
          className={`${baseClass} btn-outline ${request?.status === 'rejected' ? 'border-red-500 text-red-500 hover:bg-red-500 hover:border-red-500' : 'border-base-300 text-base-content/70 hover:bg-primary hover:border-primary'} hover:text-white transition-colors`}
          title={request?.status === 'rejected' ? `Ditolak: ${request.keterangan_admin} (Klik request ulang)` : `Request ${label}`}
        >
          {icon} {isMobile && <span>{label}</span>}
        </button>
      );
    }

    // KONDISI 2: Selesai (Completed)
    if (request.status === 'completed') {
      return (
        <a
          href={request.url_hasil || '#'}
          target="_blank"
          rel="noreferrer"
          className={`${baseClass} bg-green-100 border-green-500 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 flex items-center justify-center gap-1`}
          title={`Selesai! Lihat Hasil ${label}`}
        >
          {isMobile ? <CheckCircle size={14} /> : icon}
          {isMobile && <span>Lihat Hasil</span>}
        </a>
      );
    }

    // KONDISI 3: Antre / Diproses (Pending / Processing)
    return (
      <button
        disabled
        className={`${baseClass} btn-disabled opacity-80 bg-primary/10 text-primary border-primary/30 flex items-center justify-center gap-1 cursor-not-allowed`}
        title={`${label} sedang ${request.status === 'processing' ? 'diproses' : 'menunggu antrean'}`}
      >
        {isMobile ? <Clock size={14} /> : icon} 
        {isMobile && <span>{request.status === 'processing' ? 'Diproses' : 'Antre'}</span>}
      </button>
    );
  }
  // ==========================================

  // Desain Badge Status Modern (Borderless)
  function getStatusBadge(status) {
    switch (status) {
      case "pending":
      case '0':
      case 0:
        return <span className="badge badge-secondary border-none bg-secondary/20 text-secondary-content px-3 py-3">Pending</span>;
      case "Review":
      case '2':
      case 2:
        return <span className="badge badge-warning border-none bg-warning/20 text-warning-content px-3 py-3">Review</span>;
      case "On Pro":
      case '3':
      case 3:
        return <span className="badge badge-error border-none bg-error/20 text-error-content px-3 py-3">OnPro</span>;
      case "Publish":
      case '1':
      case 1:
        return <span className="badge badge-success border-none bg-success/20 text-success-content px-3 py-3">Publish</span>;
      default:
        return <span className="badge badge-neutral px-3 py-3">{status}</span>;
    }
  }

  return (
    <>
      <Head title="News Management" />
      <AuthenticatedLayout >
        <div className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">

              {/* Header Info */}
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Daftar Opini Saya</h1>
                </div>
                <div className="breadcrumbs text-sm text-muted-foreground">
                  <ul>
                    <li><Link href={route('dashboard')}>Home</Link></li>
                    <li className="text-foreground font-medium">News</li>
                  </ul>
                </div>
              </div>

              {/* Banner Warning / Button Tambah */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {user?.quota_news > 0 && new Date(user?.dateexp) > new Date() ? (
                  <Link href={route('news.create')} className="btn btn-primary rounded-lg shadow-sm">
                    <Plus size={18} /> Tambah Opini
                  </Link>
                ) : (
                  <div className="w-full bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/20">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-bold text-destructive">Kuota atau masa aktif Anda telah habis!</p>
                        <p className="text-sm text-destructive/80">Silakan hubungi admin untuk memperbarui langganan Anda.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ==================================================== */}
              {/* TAMPILAN 4 KARTU KUOTA (SEPERTI KOPI TIMES) */}
              {/* ==================================================== */}
              {user?.package_id != 10 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                  <Card className="flex items-center gap-4 p-4 shadow-sm border-l-4 border-primary">
                    <div className="p-2.5 bg-primary/10 rounded-full shrink-0">
                      <Newspaper className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-0.5">Sisa Artikel</p>
                      <p className="text-xl font-bold leading-none">{user?.quota_news}</p>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-4 p-4 shadow-sm border-l-4 border-pink-500">
                    <div className="p-2.5 bg-pink-100 rounded-full shrink-0">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-0.5">Sisa Feed IG</p>
                      <p className="text-xl font-bold leading-none">{user?.feed_instagram}</p>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-4 p-4 shadow-sm border-l-4 border-blue-500">
                    <div className="p-2.5 bg-blue-100 rounded-full shrink-0">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-0.5">Sisa Ekoran</p>
                      <p className="text-xl font-bold leading-none">{user?.ekoran}</p>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-4 p-4 shadow-sm border-l-4 border-green-500">
                    <div className="p-2.5 bg-green-100 rounded-full shrink-0">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-0.5">Sisa WA Channel</p>
                      <p className="text-xl font-bold leading-none">{user?.wa_channel}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Start Filter */}
              <Card className="shadow-sm border-base-200">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="w-full md:w-96">
                    <InputWithPrefix
                      prefix={<Search size={16} />}
                      placeholder="Cari judul opini..."
                      className='w-full'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <InputSelect
                      value={status}
                      placeholder='Semua Status'
                      onChange={(e) => setStatus(e.target.value)}
                      options={[
                        { label: "Semua Status", value: "" },
                        { label: "Pending", value: "0" },
                        { label: "Review", value: "2" },
                        { label: "On Pro", value: "3" },
                        { label: "Publish", value: "1" },
                      ]}
                    />
                  </div>
                  <button type="button" className="btn btn-neutral md:ml-2" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </Card>

              {/* Start Table */}
              <Card className="overflow-hidden p-0 shadow-sm border-base-200">

                {/* DESKTOP VERSION (Table Mode) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className="bg-base-200/50">
                        <th className="w-16 text-center">ID</th>
                        <th>Judul</th>
                        <th>Tanggal Upload</th>
                        <th>Status</th>
                        <th className="text-center">Add-ons Sosmed</th>
                        <th className="text-right pr-6">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.data.length > 0 ? (
                        news.data.map((n) => (
                          <tr key={n.id} className="hover:bg-base-200/30 transition-colors">
                            <th className="text-center text-muted-foreground">{n.id}</th>
                            <td className="font-medium whitespace-normal break-words max-w-[18rem] lg:max-w-md">
                              {n.title}
                            </td>
                            <td className="text-muted-foreground text-sm">
                              {formatDate(n.created)}
                            </td>
                            <td>{getStatusBadge(n.status)}</td>
                            <td>
                              <div className="flex items-center justify-center gap-2">
                                {/* Panggil Render Addon (Sama seperti Kopi Times) */}
                                {renderAddonButton(n.id, 'feed_instagram', user.feed_instagram, n.addon_requests, <Instagram size={14} />, 'Feed IG')}
                                {renderAddonButton(n.id, 'ekoran', user.ekoran, n.addon_requests, <FileText size={14} />, 'Ekoran')}
                                {renderAddonButton(n.id, 'wa_channel', user.wa_channel, n.addon_requests, <Phone size={14} />, 'WA Channel')}
                              </div>
                            </td>
                            <td className="pr-6">
                              <div className="flex justify-end gap-2">
                                <Link 
                                  href={route('news.show', n)} 
                                  className="btn btn-sm btn-circle btn-ghost text-primary hover:bg-primary/10"
                                  title="Lihat Detail"
                                >
                                  <Eye size={18} />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-12 text-muted-foreground">
                            Belum ada opini yang ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE VERSION (Card Mode) */}
                <div className="md:hidden flex flex-col p-4 gap-4 bg-base-200/20">
                  {news.data.length > 0 ? (
                    news.data.map((n) => (
                      <div key={n.id} className="border border-base-200 rounded-2xl p-4 bg-base-100 shadow-sm">
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <p className="font-bold text-base leading-snug">{n.title}</p>
                          <div className="shrink-0 mt-0.5">
                            {getStatusBadge(n.status)}
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground mb-4">
                           Tanggal: {formatDate(n.created)}
                        </div>

                        {/* ACTIONS ADDONS MOBILE */}
                        <div className="flex flex-col gap-4 pt-4 border-t border-base-200">
                          <div className="grid grid-cols-2 gap-2">
                             {renderAddonButton(n.id, 'feed_instagram', user.feed_instagram, n.addon_requests, <Instagram size={14} />, 'Feed IG', true)}
                             {renderAddonButton(n.id, 'ekoran', user.ekoran, n.addon_requests, <FileText size={14} />, 'Ekoran', true)}
                             {renderAddonButton(n.id, 'wa_channel', user.wa_channel, n.addon_requests, <Phone size={14} />, 'WA Channel', true)}
                          </div>

                          <Link href={route('news.show', n)} className="btn btn-sm btn-outline w-full flex items-center gap-2 border-base-300 text-foreground hover:bg-primary hover:border-primary hover:text-white">
                            <Eye size={16} /> Lihat Detail Opini
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        Belum ada opini.
                    </div>
                  )}
                </div>
              </Card>

              {/* Pagination */}
              <div className="flex justify-center md:justify-end">
                <PaginationDaisy data={news} />
              </div>

            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}

export default Index