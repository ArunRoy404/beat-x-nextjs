import { redirect } from "next/navigation";

const page = () => {
    redirect("/admin/dashboard/overview");
};

export default page;
