import { auth } from "@/auth"

export const getSession = async () => {
    try {
    const session = await auth()
    if (session) return session?.user
    }catch(error) {
        console.error(error)
    }
}