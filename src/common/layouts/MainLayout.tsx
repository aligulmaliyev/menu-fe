import Header from './Header'
import { Outlet } from 'react-router'
import BottomNavigation from './BottomNavigation'
import ServiceModals from '@/pages/Services/ServiceModals'

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <BottomNavigation />
            <ServiceModals />
        </>
    )
}
