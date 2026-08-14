import { Suspense } from "react";
import AdminResetPasswordPage from "@/templates/admin/auth/AdminResetPasswordPage";

const page = () => {
    return (
        <Suspense>
            <AdminResetPasswordPage />
        </Suspense>
    )
}

export default page;
