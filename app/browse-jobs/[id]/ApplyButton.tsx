
"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { JobRow } from "@/lib/types/jobs"
import { applyToAJob } from "@/lib/actions/applications"

const ApplyButton = ({job}: {job: JobRow}) => {
    const { data: session } = useSession()
    const router = useRouter()

    const user = session?.user

    const handleApplyClick = async () => {
        if (!user) {
            router.push(`/sign-in?redirect=/browse-jobs/${job._id}`)
            return
        }
        else{
            // console.log("User is logged in. Ready to apply!1234")
            const application = {
                jobId: job._id,
                userId: user.id,
                status: "applied",
                email: user.email,
                jobTitle: job.title,
                companyName: job.company
            }
            const result = await applyToAJob(application)
            if (result.insertedId) {
                console.log("Application submitted successfully:", result)
                router.push(`/browse-jobs`)
            }
        }
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
