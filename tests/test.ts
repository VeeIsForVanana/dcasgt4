import { expect, test } from '@playwright/test';

test.describe('initial tests', async () => {
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
	})

	// can't test all links otherwise we will hit the rate limit too quickly
	test('index page has at least 10 links', async ({ page }) => {
		await page.goto('/');
		expect((await page.getByRole('link').all()).length >= 10)
	})

	test('index page has last link taht corresponds to a github user', async({ page }) => {
		await page.goto('/');
		const linkText = await page.getByRole('link').last().textContent()
		const username = linkText?.split(' - ')[1]
		const response = await fetch(`https://api.github.com/users/${username}`)
		expect(response.ok)
	})
})
