import { getPosts } from "$lib/data"

export function load({ params }) {
    return getPosts().find((post) => post.name === params.post)
}