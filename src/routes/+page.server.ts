import { jsonToUser, type RateLimit } from "$lib/data"
import { error } from '@sveltejs/kit'

export async function load() {
    const rateLimits: RateLimit = { per_hour: 0, remaining: 0, reset_time: new Date() }
    const response = await fetch(`https://api.github.com/users`)
    if (!response.ok) error (response.status, `${response.statusText} while looking for users`);
    const per_hour = response.headers.get("x-ratelimit-limit")
    const remaining = response.headers.get("x-ratelimit-remaining")
    const reset_time = response.headers.get("x-ratelimit-reset")
    console.log(reset_time)
    if(per_hour && remaining && reset_time) {
        rateLimits.per_hour = Number(per_hour)
        rateLimits.remaining = Number(remaining)
        rateLimits.reset_time = new Date()
        rateLimits.reset_time.setTime(Number(reset_time) * 1000)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json : Array<any> = await response.json()
    return { users: json.map(jsonToUser), rateLimits: rateLimits }
}