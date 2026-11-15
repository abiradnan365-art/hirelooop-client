"use client"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { type JobRow } from "@/lib/types/jobs"
import { deleteJob } from "@/lib/api/jobs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"



export function DeleteJobDialog({ job }: { job: JobRow }) {
  const [open, setOpen] = useState(false);


  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteJob(job._id)

    console.log("Deleting job:", job._id, res)
    setOpen(false);
    toast.add({
      title: "Job Deleted",
      description: "Job deleted successfully.",
    })
      router.refresh()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon-sm" aria-label={`Delete ${job.title}`} title="Delete"> <Trash2Icon /></Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the &ldquo;{job.title}&rdquo; posting. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
