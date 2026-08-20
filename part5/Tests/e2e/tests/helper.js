const { expect } = require('@playwright/test')

const login = async (page, username = 'root', password = 'secret') => {
  await page.getByRole('textbox', { name: 'Username:' }).fill(username)
  await page.getByRole('textbox', { name: 'Password:' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()    
}

const createABlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create a blog' }).click()
  await page.getByRole('textbox', { name: 'Title:' }).fill(title)
  await page.getByRole('textbox', { name: 'Author:' }).fill(author)
  await page.getByRole('textbox', { name: 'URL:' }).fill(url)
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText(`${title} -- ${author}`)).toBeVisible()
}

export { login, createABlog }