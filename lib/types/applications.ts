// Single source of truth for job-application types, shared by the apply flow,
// the applications API layer, and the seeker/recruiter applications pages.

// Status flow per Project requirements.md:
// Applied → Under Review → Shortlisted → Offered / Rejected
export type ApplicationStatus =
    | "Applied"
    | "Under Review"
    | "Shortlisted"
    | "Rejected"
    | "Offered"

// One application as saved to the database.
// `_id` is only present on rows loaded back from the DB.
export type JobApplication = {
    _id?: string

    // Links
    jobId: string
    userId: string

    // Applicant info (from the signed-in user at apply time)
    applicantName?: string
    email: string
    resumeUrl?: string
    coverLetter?: string

    // Job snapshot — copied at apply time so the list keeps rendering
    // correctly even if the job post is later edited or deleted.
    jobTitle: string
    companyName: string
    jobType: string
    remote: boolean
    location: string

    // Tracking
    status: ApplicationStatus
    appliedAt: string // ISO date string
}
