'use client'

import { AuthForm, type SignUpData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = async (data: SignUpData) => {
    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        // `role` is a better-auth additional field (see lib/auth.ts)
        role: data.role,
        callbackURL: "/",
      })

    if (error) {
      console.log("Signup failed:", error)
      // Let the form display the failure message.
      throw new Error(error.message ?? "Signup failed")
    }

    console.log("Signup successful:", signUpResponse)

    router.replace("/")
    router.refresh()
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}
