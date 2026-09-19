import LandingLayout from '@/Layouts/LandingLayout';
import AlurSection from './Partials/AlurSection';
import HeroSection from './Partials/HeroSection';
import PricingSection from './Partials/PricingSection';
import RedaksiSection from './Partials/RedaksiSection';
import { Head } from '@inertiajs/react';

export default function Index({ newsFirstPackage, countuser, countArticle }) {
    return (
        <>
            <Head title="Terbitkan kabar instansi di TIMES Indonesia" />
            <LandingLayout>
                <HeroSection countuser={countuser} countArticle={countArticle} />
                <AlurSection />
                <PricingSection newsFirstPackage={newsFirstPackage} />
                <RedaksiSection />
            </LandingLayout>
        </>
    );
}
