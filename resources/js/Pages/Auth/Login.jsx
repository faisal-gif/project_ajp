import Alert from '@/Components/Alert';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputPassword from '@/Components/InputPassword';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <h1 className="font-wood text-[clamp(2.6rem,6vw,4rem)] font-black uppercase leading-[0.88]">
                Selamat datang
                <span className="mt-1 block font-slab text-[0.45em] normal-case leading-none text-dull">kembali di meja AJP.</span>
            </h1>
            <p className="mt-4 text-ink/80">Masuk ke akun Anda untuk melanjutkan.</p>

            {status && (
                <p className="mt-6 border-2 border-ink bg-[#f6f1e6] px-4 py-2 font-type text-sm">{status}</p>
            )}

            <div className="scrap-drop mt-8 -rotate-[0.5deg]">
                <div className="torn grain bg-newsprint px-6 pb-9 pt-8 sm:px-8">
                    <Alert
                        type="warning"
                        title="Salah Website"
                        message={errors.type}
                        dismissible
                        className="mb-6 rounded-none"
                    >
                        <a href="http://kopi.times.co.id/" className="link font-bold">
                            kopi.times.co.id
                        </a>
                    </Alert>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Username atau email" />
                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="block w-full"
                                autoComplete="username"
                                placeholder="Masukkan username atau email"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <InputPassword
                                id="password"
                                name="password"
                                value={data.password}
                                className="w-full"
                                autoComplete="current-password"
                                placeholder="Masukkan password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <label className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="checkbox-sm"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                Ingat saya
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="font-type text-sm underline underline-offset-4 hover:text-dull">
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton className="ticket h-14 w-full [--notch:8px] [--stub:3rem]" disabled={processing}>
                            {processing ? 'Memproses…' : 'Masuk'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>

            <p className="mt-8 text-center font-type text-sm">
                Belum punya akun?{' '}
                <Link href={route('register')} className="font-bold text-dull underline underline-offset-4">
                    Daftar sekarang
                </Link>
            </p>
        </GuestLayout>
    );
}
