"use client"

import CommonDashboardLayout from "./CommonDashboardLayout/CommonDashboardLayout";
import { useAdminDashboardNavigationStore } from "@/navigationStore/adminDashboardNavigationStore";

const AdminDashboardLayout = ({ children }) => {
  const navigationData = useAdminDashboardNavigationStore((state) => state.navigationData);

  return (
    <CommonDashboardLayout 
      sidebarData={navigationData?.navMain} 
      sidebarTitle={navigationData?.sidebarTitle}
    >
      {children}
    </CommonDashboardLayout>
  );
};

export default AdminDashboardLayout;