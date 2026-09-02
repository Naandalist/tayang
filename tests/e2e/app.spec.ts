import { expect, test } from '@playwright/test'

test('home exposes the primary navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Tayang, beranda' })).toBeVisible()
})

test('search page focuses the query field', async ({ page }) => {
  await page.goto('/search')
  await expect(page.getByRole('heading', { name: 'Cari judul' })).toBeVisible()
  await expect(page.getByRole('searchbox', { name: 'Cari film atau serial' })).toBeFocused()
})

test('watchlist empty state links back home', async ({ page }) => {
  await page.goto('/watchlist')
  await expect(page.getByRole('heading', { name: 'Watchlist' })).toBeVisible()
  await page.getByRole('link', { name: 'Kembali ke beranda' }).click()
  await expect(page).toHaveURL('/')
})

test('unknown routes render the not found page', async ({ page }) => {
  await page.goto('/rute-yang-tidak-ada')
  await expect(page.getByRole('heading', { name: 'Halaman tidak ada' })).toBeVisible()
})
