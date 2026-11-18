import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { type JobApplication } from "@/lib/types/applications"
import { formatTimeAgo } from "@/lib/utils/time"
import { PageHeader } from "@/app/components/PageHeader"
import { ApplicationStatusBadge } from "@/app/components/ApplicationStatusBadge"
import { ViewToggle } from "./view-toggle"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Dummy data — typed exactly like the rows the API will return.
// The apply flow (ApplyButton) saves rows with this same shape.
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

// const applications: JobApplication[] = [
//     {
//         _id: "1",
//         jobId: "101",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "Senior Frontend Engineer",
//         companyName: "Stark Industries",
//         jobType: "Full-time",
//         remote: true,
//         location: "New York, USA",
//         status: "Applied",
//         appliedAt: hoursAgo(2),
//     },
//     {
//         _id: "2",
//         jobId: "102",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "Product Designer",
//         companyName: "Cyberdyne Systems",
//         jobType: "Contract",
//         remote: false,
//         location: "London, UK",
//         status: "Under Review",
//         appliedAt: hoursAgo(24),
//     },
//     {
//         _id: "3",
//         jobId: "103",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "Lead Data Scientist",
//         companyName: "Wayne Enterprises",
//         jobType: "Full-time",
//         remote: false,
//         location: "Gotham, USA",
//         status: "Shortlisted",
//         appliedAt: hoursAgo(24 * 4),
//     },
//     {
//         _id: "4",
//         jobId: "104",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "Cloud Architect",
//         companyName: "Oscorp Tech",
//         jobType: "Full-time",
//         remote: true,
//         location: "Remote (EU/US)",
//         status: "Rejected",
//         appliedAt: hoursAgo(24 * 7),
//     },
//     {
//         _id: "5",
//         jobId: "105",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "AI Research Engineer",
//         companyName: "Hooli Corp",
//         jobType: "Full-time",
//         remote: false,
//         location: "Berlin, Germany",
//         status: "Offered",
//         appliedAt: hoursAgo(24 * 14),
//     },
//     {
//         _id: "6",
//         jobId: "106",
//         userId: "u1",
//         email: "seeker@example.com",
//         jobTitle: "DevOps Engineer",
//         companyName: "Umbrella Corp",
//         jobType: "Part-time",
//         remote: true,
//         location: "Remote (EU)",
//         status: "Applied",
//         appliedAt: hoursAgo(5),
//     },
// ]

const headClass = "text-[11px] tracking-wider uppercase"

export default async function MyApplicationsPage() {

      const session = await auth.api.getSession({
        headers: await headers()
    })

    const applications = await getApplications(`applicantId=${session?.user.id}`) // Fetch applications from the API

    // Stats derived from the list (Figma: Stats Overview - Bento Layout).
    // "Interviews" counts applications that reached the interview stage
    // (Shortlisted or Offered) until interviews become their own entity.
    const total = applications.length
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length
    const interviews = applications.filter(
        (a) => a.status === "Shortlisted" || a.status === "Offered"
    ).length
    const offered = applications.filter((a) => a.status === "Offered").length
    const successRate = total === 0 ? 0 : Math.round((offered / total) * 100)

    const stats = [
        { label: "Total Applied", value: String(total) },
        { label: "Shortlisted", value: String(shortlisted) },
        { label: "Interviews", value: String(interviews) },
        { label: "Success Rate", value: `${successRate}%` },
    ]

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">            <PageHeader
            breadcrumb={[
                { label: "Dashboard", href: "/dashboard/seeker" },
                { label: "Applications" },
            ]}
            title="My Applications"
            description="Track your job applications and interview progress in real-time."
            action={
                <div className="flex flex-wrap items-center gap-2">
                    <ViewToggle />
                    {/* TODO: generate a PDF of the applications list */}
                    <Button variant="outline" size="sm">
                        <Download />
                        Export PDF
                    </Button>
                </div>
            }
        />

            {/* Stats overview (Figma: Stats Overview - Bento Layout) */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-card p-5">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Applications table (Figma: Main Table Section) */}
            <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
                <Table className="min-w-160">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className={headClass}>Job Title</TableHead>
                            <TableHead className={headClass}>Company</TableHead>
                            <TableHead className={`${headClass} hidden md:table-cell`}>Applied</TableHead>
                            <TableHead className={headClass}>Status</TableHead>
                            <TableHead className={`${headClass} text-right`}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell>
                                    <div className="font-medium">{application.jobTitle}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {application.jobType} • {application.remote ? "Remote" : application.location}
                                    </div>
                                </TableCell>
                                <TableCell>{application.companyName}</TableCell>
                                <TableCell className="hidden md:table-cell whitespace-nowrap">
                                    {formatTimeAgo(application.appliedAt)}
                                </TableCell>
                                <TableCell>
                                    <ApplicationStatusBadge status={application.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* TODO: application details page */}
                                    <Button variant="outline" size="sm">
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination footer (Figma: Pagination) */}
            <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Showing 1-{applications.length} of {applications.length} applications
                </p>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon-sm" disabled aria-label="Previous page">
                        <ChevronLeft />
                    </Button>
                    <Button variant="outline" size="icon-sm" disabled aria-label="Next page">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
