import { notFound } from "next/navigation"

export const checkDataExists = (data: any) => {
    if(!data) {
        notFound()
    }
}