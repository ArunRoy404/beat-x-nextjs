import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/reactQuery/getQueryClient"
import { queryKeys } from "@/lib/reactQuery/queryKeys"
import { getEventsRequest, getEventsDashboardStatsRequest } from "@/services/admin/eventsServices"
import { buildEventsParams } from "@/hooks/api/admin/events/eventsParams"
import AdminDashboardEventsPage from "@/templates/admin/dashboard/AdminDashboardEventsPage"

const page = async ({ searchParams }) => {
  const rawParams = await searchParams
  const params = buildEventsParams(rawParams)

  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.events.list(params),
      queryFn: () => getEventsRequest(params),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.events.dashboard(),
      queryFn: () => getEventsDashboardStatsRequest(),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardEventsPage />
    </HydrationBoundary>
  )
}

export default page
