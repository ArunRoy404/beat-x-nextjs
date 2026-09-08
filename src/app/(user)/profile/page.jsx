import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery/getQueryClient";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { getMyProfileRequest } from "@/services/user/profileServices";
import UserProfilePage from "@/templates/user/profile/UserProfilePage";

// No `export const revalidate` here: getMyProfileRequest reads the signed-in
// session (cookies), which already forces fully dynamic rendering.

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.me(),
    queryFn: getMyProfileRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfilePage />
    </HydrationBoundary>
  );
};

export default page;
