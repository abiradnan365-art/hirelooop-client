import { type JobApplication } from "@/lib/types/applications"
// import { BASE_URL } from "@/lib/api/client"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"


// Apply to a job (job details page "Apply Now")
export const applyToAJob = async (data: JobApplication) => {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}

// My Applications page (load later)
export const getApplications = async (query = ''): Promise<JobApplication[]> => {
    const res = await fetch(`${BASE_URL}/applications?${query}`)
    return res.json()
}

export const getApplicationsCount = async (query = ''): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)
    return res.json()
}

// All applications for one job (recruiter view).
// Filters in code so this works even if the backend ignores the query param.
export const getApplicationsByJob = async (jobId: string): Promise<JobApplication[]> => {
    const applications = await getApplications()
    return applications.filter((a) => a.jobId === jobId)
}



