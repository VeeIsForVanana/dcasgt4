import { json } from "@sveltejs/kit";

type User = { 
    username: string,
    description: string,
    userURL: string,
    avatarURL: string,
}

export async function getUsers(): Promise<User[]> {
    
}

export async function getUser(username: string): Promise<User> {
    return fetch(`https://api.github.com/users/${username}`).then(
        response => {
            if (!response.ok) {
                throw new Error (`Network errored with status code: ${response.status} ${response.statusText}`)
            }
            return response.json()
        },
        error => {
            console.error(`Error occurred while fetching user ${username}, ${error}`)
        }
    ).then(
        json => {
            return {
                username: json["login"],
                description: json["bio"],
                userURL: json["user_url"],
                avatarURL: json["avatar_url"],
            }
        }
    )
}

export function addNewPost(name: string, content: string): void {
    POSTS.push({ name: name, content: content })
}