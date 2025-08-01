import { auth } from "@/auth"

export const useSession = async () => {
    try {
    const session = await auth()
    if (session) return session?.user
    }catch(error) {
        console.error(error)
    }
}