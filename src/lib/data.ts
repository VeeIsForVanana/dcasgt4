type User = { username: string, id: string, userURL: string, avatarURL: string }
export type RateLimit = { per_hour: number, remaining: number, reset_time: Date }

// helper function to convert an arbitrary json object (expected to be from a response from GitHub REST API)
export function jsonToUser(json: { [x: string]: string }): User {
    return {
        username: json["login"],
        id: json["id"],
        userURL: json["user_url"],
        avatarURL: json["avatar_url"],
    }
}