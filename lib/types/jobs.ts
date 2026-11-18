// Single source of truth for job-related types, shared by the Post a Job
// form, the jobs API layer, and the Manage Jobs table.

// Payload collected by the "Post a New Job" form and sent to POST /jobs.
export type NewJobData = {
    title: string
    company: string
    recruiterId: string
    category: string
    type: string
    remote: boolean
    location: string
    deadline: string
    minSalary: string
    maxSalary: string
    salaryFrequency: string
    responsibilities: string
    requirements: string
    status: "Active" | "Expired"
    applicants: number
}

// A job as returned by the API: everything the form collects,
// plus the fields the server adds (id, created-at label).
export type JobRow = NewJobData & {
    _id: string
    postedAt: string
}
