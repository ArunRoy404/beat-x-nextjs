"use client"

import CommonDashboardLayout from "./CommonDashboardLayout/CommonDashboardLayout";
import SidebarUserFooter from "./CommonDashboardLayout/SidebarUserFooter";
import { useArtistDashboardNavigationStore } from "@/navigationStore/artistDashboardNavigationStore";

const ArtistDashboardLayout = ({ children }) => {
  const navigationData = useArtistDashboardNavigationStore((state) => state.navigationData);

  return (
    <CommonDashboardLayout
      sidebarData={navigationData?.navMain}
      sidebarTitle={navigationData?.sidebarTitle}
      sidebarFooter={
        <SidebarUserFooter
          name="Tashrif Khan"
          role="Artist"
          avatar="https://github.com/shadcn.png"
          href="/artist/dashboard/profile"
        />
      }
    >
      {children}
    </CommonDashboardLayout>
  );
};

export default ArtistDashboardLayout;
