import { expect, test } from '@playwright/test';

test.describe('initial tests', async () => {
	test('index page has expected h1', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'GitHub Users' })).toBeVisible();
	});
})
