import {Target, Calendar, BookOpen} from "lucide-react"
export const promptConfigs = [
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