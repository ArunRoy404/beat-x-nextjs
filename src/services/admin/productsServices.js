import { axiosPrivate } from "@/lib/axios/axiosPrivate"

/**
 * Fetch admin shop/products dashboard statistics.
 * GET /admin/products/dashboard
 */
export async function getProductsDashboardStatsRequest() {
  const res = await axiosPrivate.get("/products/dashboard")
  return res?.data?.data ?? res?.data
}

/**
 * Fetch products list with optional query parameters (page, limit, q, status, etc.).
 * GET /admin/products
 */
export async function getProductsRequest(params) {
  const res = await axiosPrivate.get("/products", { params })
  return res?.data?.data ?? res?.data
}

/**
 * Fetch single product detail.
 * GET /admin/products/:productId
 */
export async function getProductDetailRequest(productId) {
  if (!productId) return null
  const res = await axiosPrivate.get(`/products/${productId}`)
  return res?.data?.data ?? res?.data
}

/**
 * Update product.
 * PATCH /admin/products/:productId
 */
export async function updateProductRequest({ id, data }) {
  const res = await axiosPrivate.patch(`/products/${id}`, data)
  return res?.data?.data ?? res?.data
}

/**
 * Fetch product analytics.
 * GET /admin/products/:productId/analytics
 */
export async function getProductAnalyticsRequest(productId) {
  if (!productId) return null
  const res = await axiosPrivate.get(`/products/${productId}/analytics`)
  return res?.data?.data ?? res?.data
}

/**
 * Delete product.
 * DELETE /admin/products/:productId
 */
export async function deleteProductRequest(productId) {
  const res = await axiosPrivate.delete(`/products/${productId}`)
  return res?.data?.data ?? res?.data
}
