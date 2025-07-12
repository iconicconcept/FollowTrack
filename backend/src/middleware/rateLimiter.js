import rateLimit from "./upstash.js"

const rateLimiter = async (req, res, next)=>{
    try {
        const {success} = await rateLimit.limit(req.ip)
        if(!success) return res.status(429).json({message: "Too many requests, pls try again later"})
        next()
    } catch (error) {
        console.error("Ratelimit error", error);
        next(error)
    }
}

export default rateLimiter