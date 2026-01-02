

import LandingLayout from '@/Layouts/LandingLayout';
import AboutSection from './Partials/AboutSection';
import FeaturesSection from './Partials/FeatureSection';
import HeroSection from './Partials/HeroSection';
import PricingSection from './Partials/PricingSection';
import { Head } from '@inertiajs/react';


export default function Index({ newsPackages }) {
   

    return (
        <>
            <Head title='Welcome To AJP' />
            <LandingLayout>
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <PricingSection newsPackages={newsPackages} />
            </LandingLayout>
        </>
    );
}
