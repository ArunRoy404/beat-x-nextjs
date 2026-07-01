"use client"

import CommonDashboardLayout from "./CommonDashboardLayout/CommonDashboardLayout";
import { useNavigationStore } from "@/navigationData/navigationStore";

const AdminDashboardLayout = ({ children }) => {
  const navigationData = useNavigationStore((state) => state.navigationData);

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