import { create } from "zustand"
import {
  ticketsHero,
  ticketPromos,
  sonicHubCities,
  sonicHubs,
  virtualDimensions,
  trendingEvents,
} from "@/dummyData/user/userTicketsData"

export const useUserTicketsStore = create(() => ({
  ticketsHero,
  ticketPromos,
  sonicHubCities,
  sonicHubs,
  virtualDimensions,
  trendingEvents,
}))
