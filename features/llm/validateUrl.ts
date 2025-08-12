import { redis } from "@/services/redis/redis"

export const validateUrl = async (url: string): Promise<boolean> => {
    const cached = await redis.get<boolean>(`url:${url}`)
    if (cached !== null) return cached
    try {
        const res = await fetch(url, {method: "GET"})
        const isValid= res.ok
         await redis.set(`url:${url}`, isValid, { ex: 86400 })
        return isValid
    }catch(error) {
        await redis.set(`url:${url}`, false, { ex: 86400 })
        return false
    }
}