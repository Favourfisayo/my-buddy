import z from "zod"

export const promptSchemas = [
    z.string()
    .refine(val => val.trim().length > 0, {
      error: () => "Please specify a topic to learn" 
    }).refine(val => {
      const trimmed = val.trim()
      if (trimmed.length === 0) return true
      return isNaN(Number(trimmed))
    }, {
      error: () => "Topic can't be a number :)"
    }),
    z.union([z.string(), z.number()], {
      error: () => "This field is required"
    }).refine(val => val !== "" && val !== null && val !== undefined, {
      message: "Duration cannot be empty"
    }),
    
    z.string()
    .optional()
  ]