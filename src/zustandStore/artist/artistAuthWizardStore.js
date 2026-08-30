import { create } from "zustand"

const initialState = {
    email: "",
    personalInfo: {
        realFullName: "",
        stageName: "",
        dateOfBirth: null,
        gender: "",
        nationality: "",
        genres: [],
        primaryLanguage: "",
        shortBio: "",
    },
    identityDocs: {
        documentType: "National ID",
        frontSide: null,
        backSide: null,
        selfieWithId: null,
    },
    socialLinks: {
        twitter: "",
        youtube: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        website: "",
        spotify: "",
        appleMusic: "",
        youtubeMusic: "",
        youtubeMusicSecondary: "",
        soundcloud: "",
        amazonMusic: "",
    },
    mediaAssets: {
        profilePicture: null,
        mediaKit: null,
        pressRelease: null,
        promotionalMaterials: null,
    },
}

export const useArtistAuthWizardStore = create((set) => ({
    ...initialState,
    setEmail: (email) => set({ email }),
    setPersonalInfo: (personalInfo) => set((state) => ({ personalInfo: { ...state.personalInfo, ...personalInfo } })),
    setIdentityDocs: (identityDocs) => set((state) => ({ identityDocs: { ...state.identityDocs, ...identityDocs } })),
    setSocialLinks: (socialLinks) => set((state) => ({ socialLinks: { ...state.socialLinks, ...socialLinks } })),
    setMediaAssets: (mediaAssets) => set((state) => ({ mediaAssets: { ...state.mediaAssets, ...mediaAssets } })),
    reset: () => set(initialState),
}))
