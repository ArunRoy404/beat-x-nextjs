/**
 * Collapses any Axios/network failure into one clean shape so callers
 * never have to branch on error.response vs error.request vs error.message.
 */
export function normalizeAxiosError(error) {
  const responseData = error?.response?.data;

  return {
    message: responseData?.message || error?.message || "Something went wrong. Please try again.",
    status: error?.response?.status ?? null,
    errors: responseData?.errors ?? null,
  };
}
