"use client"
import {
    AlertDialog as AlertD,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { deletePlan } from "@/lib/actions"
export const AlertDialog = ({plan_id}: {
    plan_id: string
}) => {
    return (
        <AlertD>
            <AlertDialogTrigger>
                <Trash2/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this plan?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this plan
                    and remove all related data.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                className="hover:opacity-80 cursor-pointer"
                variant="destructive"
                onClick={() => deletePlan(plan_id)}
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
    </AlertD>
    )   
}