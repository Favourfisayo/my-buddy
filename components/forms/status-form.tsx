"use client"

import { useRef } from "react"
import { useActionState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, PlayCircle } from "lucide-react"
import { updateStatus } from "@/lib/actions"

const StatusForm = ({ status, id }: { status: string, id: string }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateStatusWithId = updateStatus.bind(null, id)
  const initialState = { error: null , status: undefined}

  const [state, formAction] = useActionState(updateStatusWithId, initialState)

  const statusArray = [
    { status: "not started", icon: Clock },
    { status: "in progress", icon: PlayCircle },
    { status: "completed", icon: CheckCircle },
  ]

  // makes sure the status on frontend is in sync with status in db.
  const handleStatusChange =  (val: string) => {
    if (inputRef.current) inputRef.current.value = val
    // Auto-submit the form after changing status
    formRef.current?.requestSubmit()
  }

  return (
    <form ref={formRef} action={formAction}>
      <input ref={inputRef} type="hidden" name="status" defaultValue={status} />

      <Select defaultValue={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          {statusArray.map(({ status, icon: Icon }) => (
            <SelectItem key={status} value={status}>
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {status}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Optional error message */}
      {state?.error && <p className="text-red-500 text-sm mt-1">{state.error}</p>}
    </form>
  )
}

export default StatusForm
