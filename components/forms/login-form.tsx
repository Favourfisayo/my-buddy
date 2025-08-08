"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authenticate, signUpWithCredentials } from "@/lib/actions"
import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

type Mode = "login" | "signup"

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/plans"

  
  const [loginErrorMessage, loginAction, isLoginPending] = useActionState(authenticate, undefined)
  const [signupErrorMessage, signupAction, isSignupPending] = useActionState(signUpWithCredentials, undefined)

  const [mode, setMode] = useState<Mode>("login")


  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email below to login to your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === "login" ? (
            // LOGIN FORM
            <form action={loginAction}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" name="password" required />
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <input type="hidden" name="mode" value="login" />
                
                <div className="flex flex-col gap-3">
                  <Button disabled={isLoginPending} type="submit" className="w-full">
                    {isLoginPending ? "Logging in..." : "Login"}
                  </Button>
                </div>
                
                {loginErrorMessage && (
                  <p className="text-sm text-red-500">{loginErrorMessage}</p>
                )}
              </div>
            </form>
          ) : (
            // SIGNUP FORM
            <form action={signupAction}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    name="password" 
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required 
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm your password"
                    minLength={6}
                    required 
                  />
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                
                <div className="flex flex-col gap-3">
                  <Button disabled={isSignupPending} type="submit" className="w-full">
                    {isSignupPending ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
                
                {signupErrorMessage && (
                  <p className="text-sm text-red-500">{signupErrorMessage}</p>
                )}
              </div>
            </form>
          )}
          
          {/* Mode Toggle */}
          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="underline underline-offset-4 text-primary hover:text-primary/80"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="underline underline-offset-4 text-primary hover:text-primary/80"
                >
                  Login
                </button>
              </>
            )}
          </div>
          <div className="mt-5">
            <p className="text-center text-xs font-semibold ">Sorry i would implement google sign-ins soon for faster authentication</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}