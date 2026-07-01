# CityPost — Stripe setup

The booking form is wired to Stripe Checkout. Here's how to switch it on.
Nothing here exposes a secret key in the browser — the key lives only in Vercel.

## What's already in the repo
- `api/create-checkout-session.js` — serverless function. Re-prices the cart on the
  server and creates a Stripe Checkout Session (authorise now, **capture at pickup**).
- `package.json` — tells Vercel to install the `stripe` package.
- `booking.html` — the Pay button POSTs the cart here and redirects to Stripe.
  If the backend isn't reachable it falls back to the local confirmation screen,
  so the demo always works.

## One-time setup (≈10 min)

1. **Create a Stripe account** at https://stripe.com (start in **Test mode**).

2. **Get your secret key:** Stripe Dashboard → Developers → API keys →
   copy the **Secret key** (`sk_test_…` while testing).

3. **Add it to Vercel:** your project → Settings → Environment Variables →
   - Name: `STRIPE_SECRET_KEY`
   - Value: paste the `sk_test_…` key
   - Save, then **redeploy** (Deployments → ⋯ → Redeploy) so it picks up the key.

4. **Test it:** open your live `booking.html`, complete a booking, click **Pay**.
   You'll land on Stripe's checkout page. Use test card `4242 4242 4242 4242`,
   any future expiry, any CVC. On success you return to the confirmation screen.

5. **Go live:** flip Stripe to Live mode, swap the key in Vercel for the
   `sk_live_…` one, and redeploy.

## Capture at pickup
Payments are created with `capture_method: 'manual'` — the customer's card is
**authorised but not charged** at booking. You capture (take the money) when the
parcel is collected, from the Stripe Dashboard or via the API. Authorisations
expire after 7 days if not captured.

If you'd rather charge immediately, remove the
`payment_intent_data: { capture_method: 'manual' }` line in the function.

## Recommended next step
A **webhook** (`checkout.session.completed`) so paid bookings are recorded
automatically (emailed to you, saved to a sheet/DB). Ask and I'll scaffold it.
