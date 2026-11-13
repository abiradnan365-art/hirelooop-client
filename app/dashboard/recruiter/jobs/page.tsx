import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Delete, Trash2 } from "lucide-react"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

// Same shape as the data collected on the "Post a New Job" page (NewJobData),
// plus the fields the table needs for display (status / applicants / postedAt).
export type JobRow = {
    _id: string
    title: string
    category: string
    company: string
    remote: boolean
    location: string
    type: string
    minSalary: string
    maxSalary: string
    salaryFrequency: string
    status: "Active" | "Expired"
    applicants: number
    deadline: string
    postedAt: string
}

// Dummy data — mirrors the rows in the Figma "Manage Job Posts" screen.


// €25 / €40 + "per hour"  →  "€25 – €40 / hr"   (like the Figma)
function formatCompensation(row: JobRow) {
    const money = (value: string) => {
        const amount = Number(value)
        return amount >= 1000 ? `€${amount / 1000}k` : `€${value}`
    }
    const unit = row.salaryFrequency.replace("per ", "")
    return `${money(row.minSalary)} – ${money(row.maxSalary)} / ${unit}`
}

const statusStyles: Record<JobRow["status"], string> = {
    Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Expired: "bg-red-500/10 text-red-600 dark:text-red-400",
}

export default async function ManageJobsPage() {
    const jobs: JobRow[] = await getJobs()
    return (
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link href="/dashboard/recruiter" className="hover:text-foreground">
                    Manage Jobs
                </Link>
                <span aria-hidden>/</span>
                <span className="text-foreground">Job Listings &amp; Postings</span>
            </nav>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Manage Job Posts</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Review live listings, monitor applicants, and update job details across
                        your organization.
                    </p>
                </div>
                <Link href="/dashboard/recruiter/jobs/new">
                    <Button className="bg-[#6c5df9] text-white hover:bg-[#7d6efc]">
                        + New Job Post
                    </Button>
                </Link>
            </div>

            {/* Table card; scrolls horizontally on very small screens.
          Less-critical columns collapse away on smaller breakpoints. */}
            <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
                <Table className="min-w-180">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[11px] tracking-wider uppercase">Job Title &amp; Dept</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase hidden lg:table-cell">Company &amp; Location</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase">Type</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase">Compensation</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase hidden md:table-cell">Applicants</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase">Status</TableHead>
                            <TableHead className="text-[11px] tracking-wider uppercase hidden xl:table-cell">Deadline</TableHead>
                            <TableHead className="text-right text-[11px] tracking-wider uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    <div className="font-medium">{job.title}</div>
                                    <div className="text-xs text-muted-foreground">{job.category}</div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <div>{job.company}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {job.remote ? `Remote (${job.location})` : job.location}
                                    </div>
                                </TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell className="whitespace-nowrap">{formatCompensation(job)}</TableCell>
                                <TableCell className="hidden md:table-cell">{job.applicants} Candidates</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`border-transparent ${statusStyles[job.status]}`}>
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden xl:table-cell whitespace-nowrap">
                                    <div>
                                        {new Date(job.deadline).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{job.postedAt}</div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* TODO: wire up to the edit flow / API */}
                                        <Button variant="outline" size="sm">
                                            Update
                                        </Button>
                                        {/* TODO: DELETE {BASE_URL}/jobs/:id once rows carry an id */}
                                        <DeleteJobDialog job={job} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
