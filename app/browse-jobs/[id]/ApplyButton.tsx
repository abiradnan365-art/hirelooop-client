
"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { JobRow } from "@/lib/types/jobs"
import { applyToAJob, getApplicationsCount } from "@/lib/api/applications"
import { type JobApplication } from "@/lib/types/applications"

const ApplyButton = ({ job }: { job: JobRow }) => {
    const { data: session } = useSession()
    const router = useRouter()

    const user = session?.user

    const handleApplyClick = async () => {
        if (!user) {
            router.push(`/sign-in?redirect=/browse-jobs/${job._id}`)
            return
        }
        else if (user.role === "seeker") {

            //number of applied by this user
            const countResult = await getApplicationsCount(`applicantId=${user.id}`)

            if (countResult.count >= 10) {

                router.push('/payment')
                return
            }
            else {

                const application: JobApplication = {
                    jobId: job._id,
                    userId: user.id,
                    email: user.email,
                    jobTitle: job.title,
                    companyName: job.company,
                    jobType: job.type,
                    remote: job.remote,
                    location: job.location,
                    status: "Applied",
                    appliedAt: new Date().toISOString(),
                }
                const result = await applyToAJob(application)
                if (result.insertedId) {
                    console.log("Application submitted successfully:", result)
                    router.push(`/browse-jobs`)
                }
            }

        }

        // console.log("User is logged in. Ready to apply!1234")

    }

    return (
        <Button
            variant="accent"
            onClick={handleApplyClick}
        >
            Apply Now
        </Button>
    )
}

export default ApplyButton
