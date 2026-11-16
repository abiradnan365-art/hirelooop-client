// Seeker plans, from Project requirements.md (§ Pricing).
// Recruiters have their own set (Free / Growth / Enterprise) — add here when
// the billing page needs them.

export type Plan = {
    id: "free" | "pro" | "premium"
    name: string
    /** USD per month. */
    price: number
    tagline: string
    features: string[]
}

export const PLANS: Plan[] = [
    {
        id: "free",
        name: "Free",
        price: 0,
        tagline: "Get started",
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        price: 19,
        tagline: "Access to all features",
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
    },
    {
        id: "premium",
        name: "Premium",
        price: 39,
        tagline: "Everything in Pro, and more",
        features: [
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
    },
]
