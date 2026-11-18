import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Check, ShieldCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { stripe } from '@/lib/stripe'
import { checkoutVerify } from '@/lib/actions/payments'

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...)`')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const {
    status,
    payment_status,
    customer_email,
    metadata,
    payment_intent,
  } = session

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    console.log({status, payment_status, customer_email, metadata, payment_intent})

    const result = await checkoutVerify(session_id)
    console.log('checkoutVerify result:', result)

    // payment_intent is expanded above, so it's an object here.
    const paymentIntent = payment_intent && typeof payment_intent !== 'string' ? payment_intent : null
    const transactionId = paymentIntent?.id ?? null

    // Plan label from the session metadata (set when the checkout was created).
    // Falls back to a plain welcome when no plan was attached to the session.
    const rawPlan = metadata?.plan ?? metadata?.planId ?? null
    const planName = rawPlan
        ? rawPlan.charAt(0).toUpperCase() + rawPlan.slice(1)
        : null

    const amount = session.amount_total != null ? (session.amount_total / 100).toFixed(2) : null
    const currency = (session.currency ?? 'usd').toUpperCase()
    const amountLabel = currency === 'USD' && amount ? `$${amount}` : `${amount} ${currency}`

    return (
      <div className="dark grid min-h-svh place-items-center bg-[#04050a] px-4 py-10 text-foreground">
        <section className="w-full max-w-md rounded-xl border bg-card p-8 text-center">
          {/* Checkmark (Figma: Checkmark Icon) */}
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Check className="size-7" />
          </div>

          <Badge
            variant="outline"
            className="mt-4 border-transparent bg-emerald-500/10 tracking-wider uppercase text-emerald-600 dark:text-emerald-400"
          >
            Payment Successful
          </Badge>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            {planName ? `Welcome to Hireloop ${planName}` : 'Welcome to Hireloop'}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Your payment of {amountLabel} was received perfectly. A confirmation
            email will be sent to{' '}
            <span className="text-foreground">{customer_email ?? 'your email'}</span>.
          </p>

          {/* Payment details (Figma: Session Verification Box) */}
          <div className="mt-6 rounded-lg border bg-muted/40 p-4 text-left">
            <p className="flex items-center gap-2 text-xs font-medium">
              <ShieldCheck className="size-4 text-emerald-500" />
              Payment verified
            </p>

            <div className="mt-3 flex flex-col gap-2">
              <div>
                <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
                  Transaction ID
                </p>
                <p className="mt-0.5 font-mono text-xs break-all">
                  {transactionId ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
                  Session ID
                </p>
                <p className="mt-0.5 font-mono text-xs break-all">{session_id}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            <Link href="/dashboard/seeker">
              <Button variant="accent" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/browse-jobs">
              <Button variant="ghost" className="w-full">
                Back to Browse Jobs
              </Button>
            </Link>
          </div>
        </section>
      </div>
    )
  }

  // status === 'expired'
  return (
    <div className="dark grid min-h-svh place-items-center bg-[#04050a] px-4 py-10 text-foreground">
      <section className="w-full max-w-md rounded-xl border bg-card p-8 text-center">
        <h1 className="text-xl font-semibold">Payment session expired</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This checkout session is no longer valid. Please start the payment again.
        </p>
        <Link href="/payment" className="mt-6 inline-block">
          <Button variant="accent">Back to Payment</Button>
        </Link>
      </section>
    </div>
  )
}
