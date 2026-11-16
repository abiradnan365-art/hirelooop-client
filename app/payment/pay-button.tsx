"use client"

import { Button } from "@/components/ui/button"

type PayButtonProps = {
    amount: number
}

// Pay button — will redirect to the Stripe Checkout page once wired up.
export function PayButton({ amount }: PayButtonProps) {
    return (
        <Button
            variant="accent"
            className="h-11 w-full"
            onClick={() => {
                // TODO: POST the selected plan to an API route that creates a
                // Stripe Checkout Session, then window.location.assign(session.url).
            }}
        >
            Pay ${amount.toFixed(2)}
        </Button>
    )
}
