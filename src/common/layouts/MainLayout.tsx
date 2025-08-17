import Header from './Header'
import { Outlet, useNavigate } from 'react-router'
import BottomNavigation from './BottomNavigation'
import ServiceModals from '@/pages/Services/ServiceModals'
import { useEffect } from 'react'
import { useQRDataStore } from '@/store/useQRData'
import { useQrId } from '@/hooks/useQrId'

export const MainLayout = () => {
    const navigate = useNavigate();
    const { fetchQrData } = useQRDataStore()
    const id = useQrId()

    useEffect(() => {
        if (id) fetchQrData(id).catch(() => {
            navigate("/404");  // xəta olsa yönləndir
        });
        else
            navigate('/not-found')
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
