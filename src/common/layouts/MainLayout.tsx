import Header from './Header'
import { Outlet, useSearchParams } from 'react-router'
import BottomNavigation from './BottomNavigation'
import ServiceModals from '@/pages/Services/ServiceModals'
import { useEffect } from 'react'
import { useQRDataStore } from '@/store/useQRData'

export const MainLayout = () => {
    const { fetchQrData } = useQRDataStore()
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (id) fetchQrData(id)
    }, [id])
    return (
        <>
            <Header />
            <Outlet />
            <BottomNavigation />
            <ServiceModals />
        </>
    )
}
