"use client"

import { useState, useTransition } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateAndSavePlan } from "@/lib/actions"
import { Separator } from "@/components/ui/separator"
import { $ZodIssue } from "zod/v4/core"
import { ArrowRight, ArrowLeft, Target, Calendar, BookOpen, CheckCircle } from "lucide-react"

const promptSchemas = [
  z.string({ 
    error: (issue) => issue.input === undefined ?
      "Please specify a topic to learn" :
      "Topic can't be a number"
  }).refine(val => val.trim().length > 0, {
    message: "Please specify a topic to learn"
  }).refine(val => isNaN(Number(val.trim())), {
    message: "Topic can't be a number :)"
  }),
  
  z.union([z.string(), z.number()], {
    error: () => "This field is required"
  }).refine(val => val !== "" && val !== null && val !== undefined, {
    message: "Duration cannot be empty"
  }),
  
  z.string()
  .optional()
]

const promptConfigs = [
  {
    label: "What do you want to learn?",
    placeholder: "e.g. React, Data Science, UI Design...",
    icon: BookOpen,
    description: "Choose a topic that excites you and aligns with your goals"
  },
  {
    label: "How long do you want to learn this?",
    placeholder: "e.g. 3 months, 6 weeks, 1 year...",
    icon: Calendar,
    description: "Set a realistic timeline that fits your schedule (Please be specific)"
  },
  {
    label: "What is your goal for learning this?",
    placeholder: "e.g. Get an internship, build a startup, freelance...",
    icon: Target,
    description: "Define what success looks like for you (optional)"
  },
]

export default function MultiStepPrompts() {
  const [step, setStep] = useState(0)
  const [prompts, setPrompts] = useState(["", "", ""])
  const [errors, setErrors] = useState<$ZodIssue[] | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompts = [...prompts]
    newPrompts[step] = e.target.value
    setPrompts(newPrompts)
    if (errors) {
      setErrors(undefined)
    }
  }

  const handleBack = () => {
    if(errors) {
      setErrors(undefined)
    }
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const schema = promptSchemas[step]
    const value = prompts[step]
    const result = schema.safeParse(value)
    
    if (!result.success) {
      setErrors(result.error.issues)
      return
  }
    
    if (step < 2) {
      setStep(step + 1)
      return
    }
    const input = {
      tech: prompts[0],
      duration: prompts[1],
      goal: prompts[2],
    }

    startTransition(() => {
      generateAndSavePlan(input)
    })
  }

  const { label, placeholder, icon: Icon, description } = promptConfigs[step]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            Step {step + 1} of {promptConfigs.length}
          </Badge>
        </div>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{label}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt-input" className="text-base font-medium">Your Answer</Label>
              <Input
                id="prompt-input"
                placeholder={placeholder}
                value={prompts[step]}
                onChange={handleChange}
                className={`h-12 text-base ${errors && errors.length > 0 ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors && errors.map((err, index) => (
                <p key={index} className="text-sm text-destructive flex items-center gap-1">
                  <span className="w-1 h-1 bg-destructive rounded-full"></span>
                  {err.message}
                </p>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              {step > 0 ? (
                <Button 
                  type="button"
                  variant="outline" 
                  disabled = {isPending}
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 px-8"
              >
                {step < 2 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {isPending ? "Creating Plan" : "Create Plan"}
                  </>
                )}
              </Button>
              <Button  style={{display: isPending ? "block" : "none"}} variant="destructive">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          {promptConfigs.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}