import { jsonToUser } from "$lib/data"

export async function load() {
    return fetch(`https://api.github.com/users`).then(
        response => {
            if (!response.ok) {
                throw new Error (`Network errored with status code: ${response.status} ${response.statusText}`)
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