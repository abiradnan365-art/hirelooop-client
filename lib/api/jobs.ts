import { type JobRow, type NewJobData } from "@/lib/types/jobs"
import { BASE_URL } from "@/lib/api/client"

// Manage Jobs table
export const getJobs = async (query = ''): Promise<JobRow[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}

export const getJobById = async (jobId: string): Promise<JobRow | null> => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
    return res.json()
}

// Post a New Job form
export const createJob = async (data: NewJobData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}

// DeleteJobDialog
export const deleteJob = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
    })
    return res.json()
}
