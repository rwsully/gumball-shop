import { loadStripe } from "@stripe/stripe-js"

// Make sure to use the publishable key, not the secret key
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

