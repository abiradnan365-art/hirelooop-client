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
import { getJobs } from "@/lib/api/jobs"
import { type JobRow } from "@/lib/types/jobs"
import { formatDate, formatCompensation } from "@/lib/utils/jobs"
import { PageHeader } from "@/app/components/PageHeader"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

const statusStyles: Record<JobRow["status"], string> = {
    Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Expired: "bg-red-500/10 text-red-600 dark:text-red-400",
}

const headClass = "text-[11px] tracking-wider uppercase"

export default async function ManageJobsPage() {
    const jobs: JobRow[] = await getJobs()
    return (
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
            <PageHeader
                breadcrumb={[
                    { label: "Manage Jobs", href: "/dashboard/recruiter" },
                    { label: "Job Listings & Postings" },
                ]}
                title="Manage Job Posts"
                description="Review live listings, monitor applicants, and update job details across your organization."
                action={
                    <Link href="/dashboard/recruiter/jobs/new">
                        <Button variant="accent">+ New Job Post</Button>
                    </Link>
                }
            />

            {/* Table card; scrolls horizontally on very small screens.
          Less-critical columns collapse away on smaller breakpoints. */}
            <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
                <Table className="min-w-180">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className={headClass}>Job Title &amp; Dept</TableHead>
                            <TableHead className={`${headClass} hidden lg:table-cell`}>Company &amp; Location</TableHead>
                            <TableHead className={headClass}>Type</TableHead>
                            <TableHead className={headClass}>Compensation</TableHead>
                            <TableHead className={`${headClass} hidden md:table-cell`}>Applicants</TableHead>
                            <TableHead className={headClass}>Status</TableHead>
                            <TableHead className={`${headClass} hidden xl:table-cell`}>Deadline</TableHead>
                            <TableHead className={`${headClass} text-right`}>Actions</TableHead>
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
                                    <div>{formatDate(job.deadline)}</div>
                                    <div className="text-xs text-muted-foreground">{job.postedAt}</div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* TODO: wire up to the edit flow / API */}
                                        <Button variant="outline" size="sm">
                                            Update
                                        </Button>
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
