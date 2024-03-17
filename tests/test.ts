import { expect, test } from '@playwright/test';

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
		expect(response.ok)
	});

	// can't test all links otherwise we will hit the rate limit too quickly
	test('index page has at least 10 links', async ({ page }) => {
		await page.goto('/');
		expect((await page.getByRole('link').all()).length >= 10)
	});

	test('index page has last link that corresponds to a github user', async ({ page }) => {
		await page.goto('/');
		const linkText = await page.getByRole('link').last().textContent()
		const username = linkText?.split(' - ')[1]
		const response = await fetch(`https://api.github.com/users/${username}`)
		expect(response.ok)
	});
})

test.describe('first user page content tests', () => {

	test('first user page username matches link username', async ({ page }) => {
		await page.goto('/');
		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		await firstLink.click()
		const firstHeader = await page.getByRole('heading').first()
		expect(await firstHeader.textContent() == username)
	})

	test('first user page avatar matches actual avatar', async ({ page }) => {
		await page.goto('/')
		const firstLink = await page.getByRole('link').first()
		const username = (await firstLink.textContent())?.split(' - ')[1]
		await firstLink.click()
		const response = await fetch(`https://api.github.com/users/${username}`)
		const json = await response.json()
		const imageSRC = await page.getByRole('img').getAttribute('src')
		expect(imageSRC == json['avatar_url'])
	})
})

test.describe('arbitrary user page content tests', () => {

	const username = 'VeeIsForVanana'

	test(`${username}'s page has first header matching username`, async ({ page }) => {
		await page.goto(`/${username}`)
		expect(await page.getByRole('heading').first().textContent() == username)
	})

	test(`${username}'s page has an image matching their avatar`, async ({ page }) => {
		await page.goto(`/${username}`)
		const response = await fetch(`https://api.github.com/users/${username}`)
		const json = await response.json()
		const imageSRC = await page.getByRole('img').getAttribute('src')
		expect(imageSRC == json['avatar_url'])
	})

})