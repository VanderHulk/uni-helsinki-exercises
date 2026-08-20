const { describe, beforeEach, test, expect } = require('@playwright/test')
const { login, createABlog } = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')  
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'secret'
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {      
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByText('Username: ')).toBeVisible()
    await expect(page.getByText('Password: ')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)

      await expect(page.getByText('Superuser logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page, request }) => {               

        await request.post('/api/users', {
          data: {
            name: 'Bruce Banner',
            username: 'hulk',
            password: 'smash'
          }
        })

        await login(page, 'hulk', 'smash')

        await createABlog(
          page, 
          'A blog already exists',
          'Jester Koe',
          'www.blogApp.com'
        )
      })

      test('a new blog can be created', async ({ page }) => {
        
        await createABlog(
          page, 
          'A new blog can be created',
          'Jennifer Walters',
          'www.blogApp.com'
        )

        const blog = page.locator('li').filter({ hasText: 'A new blog can be created'})
        await expect(blog.getByText('A new blog can be created -- Jennifer Walters')).toBeVisible()
        await expect(blog.getByRole('button', { name: 'View'})).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {

        await createABlog(
          page, 
          'A blog can be liked',
          'Steve Rogers',
          'www.blogApp.com'
        )

        const blog = page.locator('li').filter({ hasText: 'A blog can be liked' })
        await blog.getByRole('button', { name: 'View' }).click()
        const details = page.locator('.group-details')
        await expect(details.getByText('www.blogApp.com')).toBeVisible()
        await expect(details.getByText('likes 0')).toBeVisible()        
        await details.getByRole('button', { name: '👍' }).click()
        await expect(details.getByText('likes 1')).toBeVisible()
      })
      
      test('a blog can be deleted by the user who created it', async ({ page }) => {

        await createABlog(
          page, 
          'This blog will be deleted',
          'Tony Starks',
          'www.blogApp.com'
        )
        
        const blog = page.locator('li').filter({ hasText: 'This blog will be deleted' })

        await blog.getByRole('button', { name: 'View' }).click()

        const details = blog.locator('.group-details')

        await expect(details.getByRole('button', { name: '🗑️' })).toBeVisible()
        await expect(details.getByText('Bruce Banner')).toBeVisible()

        // returns a promise and is waiting for event completion
        const dialogPromise = page.waitForEvent('dialog') 

        // This starts the click immediately and stores the unfinished result—a Promise
        const clickPromise = details.getByRole('button', { name: '🗑️' }).click()        
        
        // the succeeding 3 snippets below is for when window.confirm pops up
        const dialog = await dialogPromise
        //checks if the dialog is a confirmation dialog
        expect(dialog.type()).toBe('confirm') 
        await dialog.accept()
      
        // waits for the original click to finish after the dialog has been accepted
        await clickPromise
        await expect(blog).not.toBeVisible()
      })

      test('only the user who created the blog can see the delete button', async ({ page }) => {
        // Log in as Superuser (default)
        await page.getByRole('button', { name: 'Logout' }).click()
        await login(page)
       
        // Create a blog as Superuser
        await createABlog(
          page, 
          'A user can see the delete button',
          'Natasha Romanoff',
          'www.blogApp.com'
        )
       
        // Superuser can delete their own blog
        const ownBlog = page.locator('li').filter({ hasText: 'A user can see the delete button' })

        await ownBlog.getByRole('button', { name: 'View' }).click()
        
        const ownBlogDetails = ownBlog.locator('.group-details')

        await expect(ownBlogDetails.getByText('Superuser')).toBeVisible()
        await expect(ownBlogDetails.getByRole('button', { name: '🗑️' })).toBeVisible()

        // Superuser cannot delete Bruce's blog
        const bruceBlog = page.locator('li').filter({ hasText: 'A blog already exists'})
        
        await bruceBlog.getByRole('button', { name: 'View' }).click()

        const bruceBlogDetails = bruceBlog.locator('.group-details')
        
        await expect(bruceBlogDetails.getByText('Bruce Banner')).toBeVisible()
        await expect(bruceBlogDetails.getByRole('button', { name: '🗑️' })).not.toBeVisible()
      })
    })
  })
})
