import { jsonToUser } from '$lib/data.js'

export async function load({ fetch, params }) {
    return fetch(`https://api.github.com/users/${params.user}`).then(
        response => {
            if (!response.ok) {
                throw new Error (`Network errored with status code: ${response.status} ${response.statusText}`)
            }
            return response.json()
        }
    ).then(
        jsonToUser
    )
}