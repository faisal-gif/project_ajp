import LandingLayout from '@/Layouts/LandingLayout';
import AlurSection from './Partials/AlurSection';
import HeroSection from './Partials/HeroSection';
import PricingSection from './Partials/PricingSection';
import RedaksiSection from './Partials/RedaksiSection';
import { Head } from '@inertiajs/react';

export default function Index({ newsFirstPackage, countuser, countArticle }) {
    return (
        <>
            <Head>
                <title>Beranda</title>
                <meta name="description" content="AJP (Aplikasi Jurnalisme Positif) adalah platform jurnalistik yang mendorong pemberitaan berimbang, solutif, dan inspiratif untuk membangun optimisme publik." />

                {/* Meta untuk Social Media (Open Graph) */}
                <meta property="og:title" content="Beranda - AJP" />
                <meta property="og:description" content="AJP (Aplikasi Jurnalisme Positif) adalah platform jurnalistik yang mendorong pemberitaan berimbang, solutif, dan inspiratif untuk membangun optimisme publik." />
                <meta property="og:image" content="/logo-web-ajp.png" />
            </Head>
            <LandingLayout>
                <HeroSection countuser={countuser} countArticle={countArticle} />
                <AlurSection />
                <PricingSection newsFirstPackage={newsFirstPackage} />
                <RedaksiSection />
            </LandingLayout>
        </>
    );
}
