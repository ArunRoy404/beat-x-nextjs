import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useVolumeStore = create(
  persist(
    (set, get) => ({
      volume: 0.8,
      isMuted: false,
      prevVolume: 0.8,

      setVolume: (val) => {
        const normalized = Math.max(0, Math.min(1, val));
        set((state) => ({
          volume: normalized,
          isMuted: normalized === 0,
          prevVolume: normalized > 0 ? normalized : state.prevVolume,
        }));
      },

      toggleMute: () => {
        const { isMuted, volume, prevVolume } = get();
        if (isMuted) {
          const restoreVol = prevVolume > 0 ? prevVolume : 0.8;
          set({
            isMuted: false,
            volume: restoreVol,
          });
        } else {
          set({
            isMuted: true,
            prevVolume: volume > 0 ? volume : 0.8,
            volume: 0,
          });
        }
      },
    }),
    {
      name: "beatx-playback-volume",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : undefined)),
    }
  )
);
