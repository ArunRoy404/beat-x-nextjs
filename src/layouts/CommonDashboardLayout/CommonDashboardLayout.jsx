import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import CommonDashboardNavbar from "./CommonDashboardNavbar"
import CommonDashboardOutlet from "./CommonDashboardOutlet"
import CommonDashboardSidebar from "./CommonDashboardSidebar"

export default function CommonDashboardLayout({ children, sidebarData, sidebarTitle, sidebarFooter, userMenu }) {
    return (
        <SidebarProvider
            className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
            style={{ backgroundImage: "url('/bg-images/dashboard_bg.png')" }}
        >
            <CommonDashboardSidebar data={sidebarData} title={sidebarTitle} footer={sidebarFooter} />
            <SidebarInset className="bg-transparent">
                <CommonDashboardNavbar userMenu={userMenu} />
                <CommonDashboardOutlet>{children}</CommonDashboardOutlet>
            </SidebarInset>
        </SidebarProvider>
    )
}