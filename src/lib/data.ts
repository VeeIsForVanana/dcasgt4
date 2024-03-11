class User { 
    private _username: string;
    private _description: string;
    private _userURL: string;
    private _avatarURL: string;

    constructor(
        username: string,
        description: string,
        userURL: string,
        avatarURL: string,
    ) {
        this._username = username;
        this._description = description;
        this._userURL = userURL;
        this._avatarURL = avatarURL;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get userURL(): string {
        return this._userURL;
    }

    set userURL(value: string) {
        this._userURL = value;
    }

    get avatarURL(): string {
        return this._avatarURL;
    }

    set avatarURL(value: string) {
        this._avatarURL = value;
    }
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
            return new User(
                json["login"],
                json["bio"],
                json["user_url"],
                json["avatar_url"],
            )
        }
    )
}