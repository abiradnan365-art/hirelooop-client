import { type JobRow } from "@/lib/types/jobs"

// €25 / €40 + "per hour"  →  "€25 – €40 / hr"   (like the Figma)
export function formatCompensation(row: JobRow) {
    const money = (value: string) => {
        const amount = Number(value)
        return amount >= 1000 ? `€${amount / 1000}k` : `€${value}`
    }
    const unit = row.salaryFrequency.replace("per ", "")
    return `${money(row.minSalary)} – ${money(row.maxSalary)} / ${unit}`
}

// "2025-05-30" → "May 30, 2025"
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })
}
