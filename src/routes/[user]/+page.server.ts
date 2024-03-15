import { jsonToUser } from '$lib/data.js'
import { error } from '@sveltejs/kit'

export async function load({ fetch, params: { user }, cookies }) {
    
    const history = cookies.get('last_visited');
    const users = typeof history === 'undefined' ? [user] : history.split(',').concat([user]);
    const stored = users.toString(); 
    cookies.set('last_visited', stored, { path: '/' });
    
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) error(response.status, `${response.statusText} on user ${user}`);
    const json = await response.json();
    return { user: jsonToUser(json), history: stored };
}