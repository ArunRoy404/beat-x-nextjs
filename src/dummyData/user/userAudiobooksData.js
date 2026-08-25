import { userAudiobooksAssets } from "./userAudiobooksAssets"

export const continueListening = [
  { id: "badsha-namdar", title: "Badsha Namdar", author: "Humayun Ahmed", progress: "72%", timeLeft: "4h 12m left", art: userAudiobooksAssets.continue.continue1 },
  { id: "the-last-cartographer", title: "The Last Cartographer", author: "Elena Voss", progress: "15%", timeLeft: "12h 45m left", art: userAudiobooksAssets.continue.continue2 },
  { id: "ondhokarer-golpo", title: "Ondhokarer Golpo", author: "Abhik Sarkar", progress: "45%", timeLeft: "8h 20m left", art: userAudiobooksAssets.continue.continue3 },
  { id: "neon-echoes", title: "Neon Echoes", author: "Sarah Jenkins", progress: "72%", timeLeft: "4h 12m left", art: userAudiobooksAssets.continue.continue4 },
  { id: "the-silent-pulse", title: "The Silent Pulse", author: "David Chen", progress: "72%", timeLeft: "4h 12m left", art: userAudiobooksAssets.continue.continue5 },
]

export const bestsellerList = [
  { id: "the-architecture-of", rank: "01", title: "The Architecture of…", author: "Marcus Vane", art: userAudiobooksAssets.bestseller.bestseller1, trend: "up" },
  { id: "beyond-the", rank: "02", title: "Beyond the…", author: "Marcus Vane", art: userAudiobooksAssets.bestseller.bestseller2, trend: "up" },
  { id: "neon-prophets", rank: "03", title: "Neon Prophets", author: "Sarah J. Miller", art: userAudiobooksAssets.bestseller.bestseller3, trend: "down" },
]

export const genreRefractions = {
  sciFi: { id: "sci-fi", title: "Sci-Fi", subtitle: "1,240 TITLES", art: userAudiobooksAssets.genres.sciFi },
  mystery: { id: "mystery", title: "Mystery", subtitle: "842 TITLES", art: userAudiobooksAssets.genres.mystery },
  fantasy: { id: "high-fantasy", title: "High Fantasy", subtitle: "Enter Worlds of Magic and Wonder", art: userAudiobooksAssets.genres.fantasy },
}

export const newlyNarrated = [
  { id: "the-lost-meridian", title: "The Lost Meridian", author: "Captain H. Graves", art: userAudiobooksAssets.newlyNarrated.newly1, isNew: true },
  { id: "flight-pattern", title: "Flight Pattern", author: "Elias Finch", art: userAudiobooksAssets.newlyNarrated.newly2 },
  { id: "shadow-of-the-wick", title: "Shadow of the Wick", author: "Isolde Gray", art: userAudiobooksAssets.newlyNarrated.newly3 },
  { id: "form-and-chaos", title: "Form & Chaos", author: "Arch. J. Sterling", art: userAudiobooksAssets.newlyNarrated.newly4 },
]
