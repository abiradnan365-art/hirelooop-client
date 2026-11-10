'use client'

import { AuthForm } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"

type SignInData = {
  email: string
  password: string
}

export default function SignInPage() {
  const handleSignIn = async (data: SignInData) => {
    const { data: signInData, error } =
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
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
