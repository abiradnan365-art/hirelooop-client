"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type SignInData = {
  email: string
  password: string
}

export type SignUpData = {
  name: string
  email: string
  password: string
}

type AuthFormProps =
  | {
    mode: "sign-in"
    onSubmit: (data: SignInData) => void | Promise<void>
  }
  | {
    mode: "sign-up"
    onSubmit: (data: SignUpData) => void | Promise<void>
  }

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 5.04c1.66 0 3.15.57 4.32 1.69l3.21-3.21C17.56 1.64 15.04.6 12 .6 7.4.6 3.44 3.24 1.53 7.07l3.74 2.9C6.16 7.2 8.87 5.04 12 5.04Z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.48-.24-2.14H12v4.06h6.6c-.13 1.1-.85 2.75-2.44 3.87l3.65 2.83c2.19-2.03 3.69-5.04 3.69-8.62Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.23A7.15 7.15 0 0 1 4.9 12c0-.78.14-1.53.36-2.23l-3.74-2.9A11.4 11.4 0 0 0 .6 12c0 1.85.44 3.6 1.22 5.13l3.46-2.9Z"
      />
      <path
        fill="#34A853"
        d="M12 23.4c3.04 0 5.6-1 7.46-2.72l-3.55-2.76c-.97.67-2.24 1.12-3.91 1.12-3.13 0-5.84-2.16-6.72-5.03l-3.65 2.83C3.47 20.7 7.4 23.4 12 23.4Z"
      />
    </svg>
  )
}

// TODO: wire these up to better-auth (`authClient.signIn.email` / `authClient.signUp.email`).

const inputClassName =
  "h-10 rounded-lg border-white/10 bg-white/[0.03] px-3 text-white focus-visible:border-[#6c5df9]/60 focus-visible:ring-[#6c5df9]/25 dark:bg-transparent placeholder:text-white/30"

const buttonClassName =
  "h-10 w-full bg-[#6c5df9] text-white hover:bg-[#7d6efc]"

export function AuthForm(props: AuthFormProps) {
  const isSignUp = props.mode === "sign-up"
  // Shared field state; name is only used on sign-up.
  const [form, setForm] = useState<SignInData & Partial<SignUpData>>({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)

  const setField = (field: keyof SignInData | keyof SignUpData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (isSignUp) {
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters.")
        return
      }

      await props.onSubmit({
        name: form.name ?? "",
        email: form.email,
        password: form.password,
      })

      return
    }

    await props.onSubmit({
      email: form.email,
      password: form.password,
    })
  }


  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0c11] p-6 shadow-[0_0_80px_rgba(99,102,241,0.12)] md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          {isSignUp
            ? "Start your journey with HireLoop today."
            : "Sign in to continue to HireLoop."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4" noValidate>
        {isSignUp && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-xs text-white/60">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              required
              value={form.name ?? ""}
              onChange={setField("name")}
              className={inputClassName}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs text-white/60">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={setField("email")}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs text-white/60">
              Password
            </Label>
            {!isSignUp && (
              <a href="#" className="text-xs text-[#8fb0ff] hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="••••••••"
            required
            minLength={8}
            value={form.password}
            onChange={setField("password")}
            className={inputClassName}
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button type="submit" className={buttonClassName}>
          {isSignUp ? "Create account" : "Sign In"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-[11px] tracking-widest text-white/40 uppercase">or</span>
        <Separator className="flex-1 bg-white/10" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-full border-white/15 bg-transparent text-white hover:bg-white/5"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-white/50">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-medium text-[#8fb0ff] hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  )
}
