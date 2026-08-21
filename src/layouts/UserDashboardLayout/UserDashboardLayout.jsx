"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import CommonDashboardSidebar from "@/layouts/CommonDashboardLayout/CommonDashboardSidebar"
import { userHomeAssets } from "@/dummyData/user/userHomeAssets"
import { useUserDashboardNavigationStore } from "@/navigationStore/userDashboardNavigationStore"
import UserNavbar from "./UserNavbar"
import FloatingPlayerBar from "./FloatingPlayerBar"
import SubscriptionSidebarFooter from "./SubscriptionSidebarFooter"

const UserDashboardLayout = ({ children }) => {
    const navigationData = useUserDashboardNavigationStore((state) => state.navigationData)

    return (
        <SidebarProvider className="h-screen w-full overflow-hidden">
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
                <div className="absolute top-1/2 left-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-[100px]">
                    <img alt="" className="h-full w-full object-cover" src={userHomeAssets.backgrounds.gradientBlur} />
                </div>
                <div className="absolute inset-0 bg-black/65" />
            </div>

            <CommonDashboardSidebar
                data={navigationData?.navMain}
                title={navigationData?.sidebarTitle}
                footer={<SubscriptionSidebarFooter />}
            />

            <SidebarInset className="bg-transparent font-switzer">
                <UserNavbar />
                <div className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-28">{children}</div>
                <FloatingPlayerBar />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default UserDashboardLayout
