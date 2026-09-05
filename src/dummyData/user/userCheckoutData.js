import { userCheckoutAssets } from "./userCheckoutAssets"

export const checkoutShippingDefaults = {
  firstName: "Billal",
  lastName: "Hossain",
  address: "Moghbazar",
  city: "Dhaka",
  postalCode: "1000",
}

export const checkoutPaymentMethods = [
  { id: "card", label: "Card", icon: userCheckoutAssets.paymentIcons.card },
  { id: "applePay", label: "Pay", icon: userCheckoutAssets.paymentIcons.applePay },
  { id: "cash", label: "Cash", icon: userCheckoutAssets.paymentIcons.cash },
]

export const checkoutCardDefaults = {
  maskedNumber: "**** **** **** 2512",
  expiryDate: "12/28",
  cvv: "***",
}

export const orderSummaryItems = [
  {
    id: "prism-echoes-lp",
    name: "Prism Echoes LP",
    tag: "COLLECTOR'S EDITION",
    tagColor: "secondary",
    quantity: 1,
    price: 45,
    thumbnail: userCheckoutAssets.orderItems.prismEchoesLp,
  },
  {
    id: "x-series-pro",
    name: "X-Series Pro",
    tag: "STUDIO GRADE",
    tagColor: "primary",
    quantity: 1,
    price: 129,
    thumbnail: userCheckoutAssets.orderItems.xSeriesPro,
  },
]

export const orderSummaryTotals = {
  subTotal: 250,
  vat: null,
  shippingFee: 80,
  total: 330,
}
