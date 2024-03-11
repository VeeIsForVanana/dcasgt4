import { jsonToUser } from "$lib/data"
import { error } from '@sveltejs/kit'

export async function load() {
    return fetch(`https://api.github.com/users`).then(
        response => {
            if (!response.ok) {
                throw error (response.status, `${response.statusText} while looking for users`)
            }
            return response.json()
        }
    ).then(
        json => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const usersArray: Array<any> = json
            return { 
                users: usersArray.map(jsonToUser) 
            }
        }
    )
}