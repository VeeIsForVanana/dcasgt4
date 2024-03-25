// This item is worth 45 points

import { expect, test, type Cookie } from '@playwright/test';

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

		const button = await page.getByRole('button')
		await button.click()

		const cookies = await context.cookies()
		const historyCookie = cookies.find( (elem: Cookie) => elem.name == 'last_visited' )

		await expect(historyCookie?.value).toBe(`%2C${usersToVisit[0]}`)
	})

})