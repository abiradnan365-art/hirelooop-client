
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getSession } from '@/lib/core/server'

export async function POST() {
  const userSession = await getSession()

  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1UcKrLCjuMSUjztlE42pIcSI',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userSession?.user?.email,
      metadata: {
        userId: userSession?.user?.id ?? null,
      },
      billing_address_collection: 'auto',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    })

    return NextResponse.redirect(session.url as string, 303)

  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
