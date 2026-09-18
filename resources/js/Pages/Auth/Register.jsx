import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatDuration, formatRupiah } from '@/Utils/formatter';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputPassword from '@/Components/InputPassword';
import InputTextarea from '@/Components/InputTextarea';
import InputPhoneNumber from '@/Components/InputPhoneNumber';

const Step = ({ n }) => (
    <p className="font-type text-xs font-bold uppercase text-olive">Langkah {n} dari 2</p>
);

export default function Register({ newsPackages }) {
    // 1. State Alur
    const [registerStep, setRegisterStep] = useState("plan");
    const [selectedPlan, setSelectedPlan] = useState(null);

    // 2. Inertia Form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        prov: '',
        city: '',
        contact: '',
        address: '',
        password: '',
        password_confirmation: '',
        plan_id: '',
    });

    // 3. Handlers
    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
        setData('plan_id', planId);
        setRegisterStep("register");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const plan = newsPackages.find(p => p.id === selectedPlan);

    return (
        <GuestLayout>
            <Head title="Daftar" />

            {registerStep === "plan" ? (
                /* === STEP 1: PILIH PAKET === */
                <>
                    <Step n={1} />
                    <h1 className="mt-2 font-wood text-[clamp(2.6rem,6vw,4rem)] font-black uppercase leading-[0.88]">
                        Pilih
                        <span className="mx-2 inline-block -rotate-2 bg-dull px-2 pb-1 pt-1.5 font-slab text-[0.55em] normal-case leading-none text-stock">tiket terbit</span>
                        Anda.
                    </h1>
                    <p className="mt-4 text-ink/80">Pilih paket yang sesuai dengan kebutuhan instansi Anda.</p>

                    <ul className="mt-8 space-y-5">
                        {newsPackages.map((p, idx) => (
                            <li key={p.id} style={{ rotate: `${[-0.6, 0.5, -0.4][idx % 3]}deg` }}>
                                <button
                                    type="button"
                                    onClick={() => handlePlanSelect(p.id)}
                                    className="ticket lift grain group grid w-full grid-cols-[1fr_7.5rem] bg-[#f6f1e6] text-left [--stub:7.5rem]"
                                >
                                    <span className="block px-5 py-4">
                                        <span className="flex items-center gap-2 font-type text-[11px] uppercase text-olive">
                                            No. 0341-{String(idx + 1).padStart(2, '0')}
                                            {p.popular == 1 && <span className="bg-dull px-1.5 py-0.5 font-bold text-stock">Paling populer</span>}
                                        </span>
                                        <span className="mt-1 block font-wood text-3xl font-black uppercase leading-none">{p.name}</span>
                                        <span className="mt-3 flex flex-wrap gap-1.5">
                                            {(p.feature?.keunggulan ?? []).slice(0, 3).map((feature) => (
                                                <span key={feature} className="border border-ink/40 px-1.5 py-0.5 text-[11px] leading-tight">
                                                    {feature}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                    <span className={`flex flex-col items-center justify-center border-l-2 border-dashed border-ink/30 px-2 text-center ${p.popular == 1 ? 'bg-foil' : 'bg-buff'}`}>
                                        <span className="font-slab text-lg leading-tight text-dull">{formatRupiah(p.price)}</span>
                                        <span className="mt-0.5 font-type text-[10px] uppercase">/ {formatDuration(p.period)}</span>
                                        <ArrowRight className="mt-2 h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-center font-type text-sm">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-bold text-dull underline underline-offset-4">Masuk di sini</Link>
                    </p>
                </>
            ) : (
                /* === STEP 2: FORM REGISTRASI === */
                <>
                    <button
                        type="button"
                        onClick={() => setRegisterStep("plan")}
                        className="mb-5 inline-flex items-center gap-1.5 font-type text-sm hover:text-dull"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali pilih paket
                    </button>
                    <Step n={2} />
                    <h1 className="mt-2 font-wood text-[clamp(2.6rem,6vw,4rem)] font-black uppercase leading-[0.88]">
                        Buat akun baru
                    </h1>
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-ink/80">
                        Mendaftar untuk paket
                        <span className="ticket inline-block bg-ink py-1 pl-3 pr-6 font-wood text-lg font-bold uppercase text-stock [--notch:5px] [--stub:1.1rem]">
                            {plan?.name}
                        </span>
                    </p>

                    <div className="scrap-drop mt-8 rotate-[0.3deg]">
                        <form onSubmit={handleRegister} className="torn grain space-y-5 bg-newsprint px-6 pb-9 pt-8 sm:px-8">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama lengkap" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full"
                                        autoComplete="name"
                                        placeholder="Masukkan nama lengkap"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="block w-full"
                                        autoComplete="email"
                                        placeholder="Masukkan email"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="prov" value="Provinsi" />
                                    <TextInput
                                        id="prov"
                                        type="text"
                                        name="prov"
                                        value={data.prov}
                                        className="block w-full"
                                        autoComplete="address-level1"
                                        placeholder="Masukkan nama provinsi"
                                        onChange={(e) => setData('prov', e.target.value)}
                                    />
                                    <InputError message={errors.prov} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="city" value="Kota / kabupaten" />
                                    <TextInput
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        className="block w-full"
                                        autoComplete="address-level2"
                                        placeholder="Masukkan nama kota atau kabupaten"
                                        onChange={(e) => setData('city', e.target.value)}
                                    />
                                    <InputError message={errors.city} className="mt-1" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="contact" value="Nomor kontak" />
                                <InputPhoneNumber
                                    id="contact"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                    placeholder="Masukkan nomor kontak aktif"
                                />
                                <InputError message={errors.contact} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Alamat" />
                                <InputTextarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                    maxLength={255}
                                />
                                <InputError message={errors.address} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="password" value="Password" />
                                    <InputPassword
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full"
                                        autoComplete="new-password"
                                        placeholder="Masukkan password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi password" />
                                    <InputPassword
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full"
                                        autoComplete="new-password"
                                        placeholder="Ulangi password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>

                            <label htmlFor="terms" className="flex items-center gap-2 pt-1 text-sm">
                                <input id="terms" type="checkbox" className="checkbox checkbox-sm" required />
                                <span>
                                    Saya setuju dengan{' '}
                                    <Link href="/syarat-ketentuan" className="font-bold text-dull underline underline-offset-4">Syarat &amp; Ketentuan</Link>
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`btn btn-primary ticket h-14 w-full [--notch:8px] [--stub:3rem] ${processing ? "btn-disabled cursor-not-allowed" : ""}`}
                            >
                                {processing ? "Memproses…" : "Daftar & berlangganan"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-8 text-center font-type text-sm">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-bold text-dull underline underline-offset-4">Masuk di sini</Link>
                    </p>
                </>
            )}
        </GuestLayout>
    );
}
