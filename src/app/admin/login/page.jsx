import { Suspense } from "react";
import AdminLoginPage from "@/templates/admin/auth/AdminLoginPage";

const page = () => {
    return (
        <Suspense>
            <AdminLoginPage />
        </Suspense>
    )
}

export default page;
