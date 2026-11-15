// "2026-11-16T09:00:00Z" → "2 hours ago" / "3 days ago" / "1 week ago"
export function formatTimeAgo(isoDate: string) {
    const seconds = Math.max(0, Math.round((Date.now() - new Date(isoDate).getTime()) / 1000))
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)

    if (seconds < 60) return "just now"
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`
}
