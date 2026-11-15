'use client'

import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"
import { useSearchParams } from "next/navigation"

type SignInData = {
  email: string
  password: string
}

function SignInPageContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  const handleSignIn = async (data: SignInData) => {
    const { data: signInData, error } =
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: redirectTo,
        rememberMe: true,
      })

    if (error) {
      console.error("Sign in failed:", error)
      // Let the form display the failure message.
      throw new Error(error.message ?? "Sign in failed")
    }

    console.log("Sign in successful:", signInData)
  }

  return <AuthForm mode="sign-in" onSubmit={handleSignIn} />
}

// useSearchParams() requires a Suspense boundary during static prerendering.
export default function SignInPage() {
  return (
    <Suspense>
      <SignInPageContent />
    </Suspense>
  )
}
