
"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { JobRow } from "@/lib/types/jobs"
import { applyToAJob, getApplicationsCount } from "@/lib/api/applications"
import { type JobApplication } from "@/lib/types/applications"
import { toast } from "@/components/ui/toast"
import { getUserPremiumById } from "@/lib/api/user"

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

            const premiumResult = await getUserPremiumById(user.id)
            console.log("Premium result:", premiumResult)
            console.log("Premium Result:", premiumResult)
            console.log("Premium Status:", premiumResult.premium)
            //number of applied by this user
            const countResult = await getApplicationsCount(`applicantId=${user.id}`)
            console.log("Application Count:", countResult.count)

            if (!premiumResult.premium && countResult.count >= 10) {

                router.push('/payment')
                return
            }
            else {

                const application: JobApplication = {
                    jobId: job._id,
                    userId: user.id,
                    applicantName: user.name,
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
                    toast.add({
                        title: "Application Submitted",
                        description: "Your application has been submitted successfully.",
                    })
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
