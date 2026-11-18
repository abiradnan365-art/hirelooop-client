import { Check, CreditCard, Lock } from "lucide-react"

import { PLANS } from "@/lib/constants/plans"
// import { PayButton } from "./pay-button"
import { Button } from "@/components/ui/button";

const PaymentPage = async ({ searchParams, }: {
    searchParams: Promise<{ canceled?: string; plan?: string }>
}) => {

    const { canceled } = await searchParams

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }


    const search = await searchParams
    const planId = typeof search.plan === "string" ? search.plan : "pro"
    const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1]

    return (
        <div className="dark min-h-svh bg-[#04050a] text-foreground">
            <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
                {/* Heading (Figma: Stripe-style checkout header) */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">HireLoop Checkout</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Review your plan and confirm your payment.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
                    {/* Order summary (Figma: Section - LeftColumn) */}
                    <section className="rounded-xl border bg-card p-6">
                        <h2 className="text-sm font-semibold">Order Summary</h2>

                        <div className="mt-4 flex items-start justify-between gap-4 rounded-lg border bg-muted/40 p-4">
                            <div>
                                <p className="font-medium">Hireloop {plan.name} Plan</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">{plan.tagline}</p>
                            </div>
                            <p className="font-semibold">${plan.price.toFixed(2)}</p>
                        </div>

                        <ul className="mt-4 flex flex-col gap-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="mt-0.5 size-4 shrink-0 text-[#6c5df9]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 flex items-center justify-between border-t pt-4">
                            <span className="text-sm text-muted-foreground">Due today</span>
                            <span className="text-lg font-semibold">${plan.price.toFixed(2)}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Billed monthly. Cancel anytime.
                        </p>
                    </section>

                    {/* Pay panel — the real card form will be Stripe's hosted checkout */}
                    <section className="flex h-fit flex-col rounded-xl border bg-card p-6">
                        <h2 className="text-sm font-semibold">Payment</h2>

                        <div className="mt-4 flex items-center gap-3 rounded-lg border bg-muted/40 p-4 text-sm">
                            <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                            <span>Card · via Stripe Checkout</span>
                        </div>

                        <div className="mt-6">

                            <form action="/api/checkout_sessions" method="POST">
                                <section>
                                    {/* <button type="submit">
                                       
                                    </button> */}
                                    <Button
                                        type="submit" role="link"
                                        variant="accent"
                                        className="h-11 w-full"
                                        // onClick={() => {
                                        //     // TODO: POST the selected plan to an API route that creates a
                                        //     // Stripe Checkout Session, then window.location.assign(session.url).
                                        // }}
                                    >
                                       Checkout ${plan.price.toFixed(2)}
                                    </Button>

                                </section>
                            </form>
                        </div>

                        <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                            <Lock className="mt-0.5 size-3.5 shrink-0" />
                            You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your
                            payment. Your card details never touch our servers.
                        </p>
                    </section>
                </div>

                {/* Footer (Figma: Powered by Stripe · Terms · Privacy) */}
                <footer className="mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                    <span>Powered by Stripe</span>
                    <span aria-hidden>·</span>
                    <a href="#" className="hover:text-foreground">
                        Terms
                    </a>
                    <span aria-hidden>·</span>
                    <a href="#" className="hover:text-foreground">
                        Privacy
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default PaymentPage;
