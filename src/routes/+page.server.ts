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
            return {users: usersArray.map(
                (val) => ({
                    username: val["login"],
                    description: val["bio"],
                    userURL: val["user_url"],
                    avatarURL: val["avatar_url"],
                })
            )}
        }
    )
}