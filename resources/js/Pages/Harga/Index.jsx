import LandingLayout from '@/Layouts/LandingLayout'
import { Head } from '@inertiajs/react'
import AlurSection from '../Welcome/Partials/AlurSection'
import PricingSection from '../Welcome/Partials/PricingSection'

function Index({ newsFirstPackage }) {
    return (
        <>
            <Head title='Harga paket' />
            <LandingLayout>
                <PricingSection newsFirstPackage={newsFirstPackage} standalone />
                <AlurSection tear="bg-dull" straddle={false} />
            </LandingLayout>
        </>
    )
}

export default Index
