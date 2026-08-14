/**
 * Decodes a JWT payload without verifying the signature — the backend is
 * the source of truth for validity, this is only used to read `sub`/`exp`
 * so NextAuth knows the user id and when to refresh.
 */
export function decodeJwt(token) {
  const payload = token.split(".")[1];
  const json = Buffer.from(payload, "base64").toString("utf-8");
  return JSON.parse(json);
}
