export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  revalidateTime: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME || 60),
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
};
