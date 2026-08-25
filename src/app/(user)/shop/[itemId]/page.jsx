import { notFound } from "next/navigation";
import UserProductDetailsPage from "@/templates/user/shop/UserProductDetailsPage";
import { findProductById } from "@/dummyData/user/userShopData";

const page = async ({ params }) => {
  const { itemId } = await params;
  const product = findProductById(itemId);

  if (!product) {
    notFound();
  }

  return <UserProductDetailsPage product={product} />;
};

export default page;
