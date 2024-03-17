type User = { username: string, id: string, userURL: string, avatarURL: string }

// helper function to convert an arbitrary json object (expected to be from a response from GitHub REST API)
export function jsonToUser(json: { [x: string]: string }): User {
    return {
        username: json["login"],
        id: json["id"],
        userURL: json["user_url"],
        avatarURL: json["avatar_url"],
    }
}