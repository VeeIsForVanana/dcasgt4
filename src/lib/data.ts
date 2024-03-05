type Posts = { name: string, content: string }

const POSTS: Posts[] = [
    {
        name: 'post1',
        content: 'This is the content of Post 1',
    },
    {
        name: 'post2',
        content: 'This is the content of Post 1',
    },
    {
        name: 'post3',
        content: 'This is the content of Post 1',
    }
]

export function getPosts() {
    return [...POSTS];
}

export function addNewPost(name: string, content: string): void {
    POSTS.push({ name: name, content: content })
}