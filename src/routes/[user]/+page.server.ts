import { jsonToUser } from '$lib/data.js'
import { error } from '@sveltejs/kit'

export async function load({ fetch, params }) {
    return fetch(`https://api.github.com/users/${params.user}`).then(
        response => {
            if (!response.ok) {
                throw error (response.status, `${response.statusText} on user ${params.user}`)
            }
            return response.json()
        }
    ).then(
        jsonToUser
    )
}