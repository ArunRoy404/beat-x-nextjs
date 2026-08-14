import { Suspense } from "react";
import AdminOtpVerificationPage from "@/templates/admin/auth/AdminOtpVerificationPage";

const page = () => {
    return (
        <Suspense>
            <AdminOtpVerificationPage />
        </Suspense>
    )
}

export default page;
