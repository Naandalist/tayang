import { expect, test } from '@playwright/test'

test('app boots and primary routes render', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible()

  await page.getByRole('link', { name: 'Cari' }).click()
  await expect(page.getByRole('heading', { name: 'Cari judul' })).toBeVisible()

  await page.goto('/rute-yang-tidak-ada')
  await expect(page.getByRole('heading', { name: 'Halaman tidak ada' })).toBeVisible()
})
