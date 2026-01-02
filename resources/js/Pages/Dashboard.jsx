import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-8">
                <div className="mb-8">
                    {/* Quota Card */}
                    <Card className="mb-8 border-primary/20 bg-linear-to-bl from-primary/10 to-accent/20">

                        <div className="card-title flex items-center gap-2 text-lg">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Kuota Artikel Bulan Ini
                        </div>
                      

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Terpakai</span>
                                <span className="font-semibold text-foreground">
                                    {/* {writerData.quotaUsed} / {writerData.quotaLimit}  */}
                                     100 artikel
                                </span>
                            </div>
                           
                            <p className="text-sm text-muted-foreground">
                                Sisa 0 artikel untuk bulan ini.
                                {/* {quotaPercentage >= 80 && (
                                    <span className="text-orange-600 font-medium"> Kuota hampir habis!</span>
                                )} */}
                            </p>
                        </div>

                    </Card>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
