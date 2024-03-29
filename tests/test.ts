import { expect, test, type Cookie } from '@playwright/test';

function errorWhen403(response: Response): void | never {
	if (response.status == 403) throw Error("You've probably exceeded the ratelimit, try again later")
}

test.describe('homepage tests', async () => {
	test('index page has expected h1', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'GitHub Users' })).toBeVisible();
	});

	// test first and last links to keep rate limit sane
	test('index page has first link that corresponds to a github user', async ({ page }) => {
		await page.goto('/');
		const linkText = await page.getByRole('link').first().textContent()
		const username = linkText?.split(' - ')[1]
		const response = await fetch(`https://api.github.com/users/${username}`)
		errorWhen403(response)
		expect(response.ok).toBeTruthy
	});

	// can't test all links otherwise we will hit the rate limit too quickly
	test('index page has at least 10 links', async ({ page }) => {
		await page.goto('/');
		expect((await page.getByRole('link').all()).length).toBeGreaterThanOrEqual(10)
	});

	test('index page has last link that corresponds to a github user', async ({ page }) => {
		await page.goto('/');
		const linkText = await page.getByRole('link').last().textContent()
		const username = linkText?.split(' - ')[1]
		const response = await fetch(`https://api.github.com/users/${username}`)
		errorWhen403(response)
		expect(response.ok).toBeTruthy
	});
})

test.describe('first user page content tests', () => {

	test('first user page username matches link username', async ({ page }) => {
		await page.goto('/');
		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		const firstHREF = await firstLink.getAttribute('href')
		if (firstHREF == undefined) throw Error
		await firstLink.click()
		await page.waitForURL(firstHREF)
		const firstHeader = await page.getByRole('heading').first()
		expect(await firstHeader.textContent()).toBe(username)
	})

	test('first user page avatar matches actual avatar', async ({ page }) => {
		await page.goto('/')
		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		const firstHREF = await firstLink.getAttribute('href')
		if (firstHREF == undefined) throw Error
		await firstLink.click()
		await page.waitForURL(firstHREF)
		const response = await fetch(`https://api.github.com/users/${username}`)
		errorWhen403(response)
		const json = await response.json()
		const imageSRC = await page.getByRole('img').getAttribute('src')
		expect(imageSRC).toBe(json['avatar_url'])
	})
})

test.describe('arbitrary user page content tests', () => {

	const username = 'VeeIsForVanana'

	test(`${username}'s page has first header matching username`, async ({ page }) => {
		await page.goto(`/${username}`)
		expect(await page.getByRole('heading').first().textContent()).toBe(username)
	})

	test(`${username}'s page has an image matching their avatar`, async ({ page }) => {
		await page.goto(`/${username}`)
		const response = await fetch(`https://api.github.com/users/${username}`)
		errorWhen403(response)
		const json = await response.json()
		const imageSRC = await page.getByRole('img').getAttribute('src')
		expect(imageSRC).toBe(json['avatar_url'])
	})

})

test.describe('cookie history tests', () => {

	const usersToVisit = ['VeeIsForVanana', 'BastiDood']

	test('visiting first user page creates correct history in cookies', async ({ context, page }) => {
		await context.clearCookies()
		await page.goto('/')

		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]

		const firstHREF = await firstLink.getAttribute('href')
		if (firstHREF == undefined) throw Error
		await firstLink.click()
		await page.waitForURL(firstHREF)

		const cookies = await context.cookies()
		const historyCookie = cookies.find( (elem: Cookie) => elem.name == 'last_visited' )
		console.log(cookies)
		
		expect(historyCookie?.value).toBe(username)
	})

	test(`visiting first user page followed by ${usersToVisit} creates correct history in cookies`, async ({ context, page }) => {
		await context.clearCookies()
		await page.goto('/')

		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		const usernames = [username].concat(usersToVisit).toString()

		const firstHREF = await firstLink.getAttribute('href')
		if (firstHREF == undefined) throw Error
		await firstLink.click()
		await page.waitForURL(firstHREF)

		for(const user of usersToVisit) await page.goto(`/${user}`)

		const cookies = await context.cookies()
		const historyCookie = cookies.find( (elem: Cookie) => elem.name == 'last_visited' )
		console.log(cookies)
		console.log(usernames)
		const visited = historyCookie?.value.replace(/%2C/g, ',')

		await expect(visited).toBe(usernames)
	})

	test(`visiting first user page followed by ${usersToVisit} creates correct history on pages`, async ({ context, page }) => {
		await context.clearCookies()
		await page.goto('/')

		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		const usernames = [username].concat(usersToVisit).toString().replace(/,/g, ' >> ')

		const firstHREF = await firstLink.getAttribute('href')
		if (firstHREF == undefined) throw Error
		await firstLink.click()
		await page.waitForURL(firstHREF)

		usernames.split

		for(const user of usersToVisit) await page.goto(`/${user}`)

		await page.waitForURL(`/${usersToVisit.findLast( () => true )}`)

		await expect(page.getByText(usernames, { exact: true })).toBeVisible()
	})

	test('clicking on remove history button clears history', async ({ context, page }) => {
		await context.clearCookies()
		await page.goto(`/${usersToVisit[0]}`)

		const button = await page.getByRole('button', { name: 'clearHistory' })
		await button.click()

		const cookies = await context.cookies()
		const historyCookie = cookies.find( (elem: Cookie) => elem.name == 'last_visited' )

		await expect(historyCookie?.value).toBeNull()
	})

})