import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import CommonDashboardNavbar from "./CommonDashboardNavbar"
import CommonDashboardOutlet from "./CommonDashboardOutlet"
import CommonDashboardSidebar from "./CommonDashboardSidebar"

export default function CommonDashboardLayout({ children, sidebarData }) {
    return (
        <SidebarProvider>
            <CommonDashboardSidebar data={sidebarData} />
            <SidebarInset>
                <CommonDashboardNavbar />
                <CommonDashboardOutlet>{children}</CommonDashboardOutlet>
            </SidebarInset>
        </SidebarProvider>
    )
}