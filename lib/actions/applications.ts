const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"


export async function applyToAJob(data: { jobId: string; userId: string; status: string; email: string; jobTitle: string; companyName: string }) {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}