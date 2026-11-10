'use client'
import { AuthForm, SignUpData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client";


// export const metadata = {
//   title: "Sign Up · HireLoop",
// }

export default function SignUpPage() {

    const handleSignUp = async (data:SignUpData) => {
        const {data: signUpResponse, error} = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/"
        })
        console.log('sirnup response', signUpResponse, error); 
    }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}
    

//   return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
// }
