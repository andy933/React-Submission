import { test, expect } from '@playwright/test'
import { beforeEach } from 'node:test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.delete('http://localhost:3003/api/blogs')
    await request.delete('http://localhost:3003/api/users')

    const user1 = await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Nero Taruo',
        username: 'nero',
        password: 'lopas123'
      }
    }) 

    console.log('user1: ', await user1.json())

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'userForTestingRemoveRight',
        username: 'user2',
        password: 'user2'
      }
    }) 

    const loginApi = await request.post('http://localhost:3003/api/login', {
      data: {
        username: 'nero',
        password: 'lopas123'
      }
    })

    if (loginApi.ok()) {
      const json = await loginApi.json()
      console.log('login: ', json, loginApi.ok())

      const userId = json.id
      const jwtToken = json.token
      console.log('token: ', jwtToken)

      for (let i = 0; i < 5; i++) {
        const postApi = await request.post('http://localhost:3003/api/blogs', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          },
          data: {
            title: `blog${(i+1).toString()} title`,
            author: `blog${(i+1).toString()} author`,
            url: `www.blog${(i+1).toString()}.com`,
            user: userId,
            likes: i+1
          }
        })  
        //console.log('post response:', await postApi.json())
      }
    }

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('nero')
      await textboxes[1].fill('lopas123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Nero Taruo logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('nero')
      await textboxes[1].fill('wrongPassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('nero')
      await textboxes[1].fill('lopas123')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'create new blog' }).click()
      const textboxesAfterLoggedIn = await page.getByRole('textbox').all()
      await textboxesAfterLoggedIn[0].fill('monster hunter wild')
      await textboxesAfterLoggedIn[1].fill('Capcom')
      await textboxesAfterLoggedIn[2].fill('www.capcom.com')
      await page.getByRole('button', { name: 'create' }).click()

    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('devil may cry 5')
      await textboxes[1].fill('Tomio Ogata')
      await textboxes[2].fill('www.capcom.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('a new blog devil may cry 5 by Tomio Ogata added')).toBeVisible()
      await expect(page.getByText('devil may cry 5 Tomio Ogata')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const blogContainer = page.locator('div.blogItem').filter({ hasText: 'monster hunter wild Capcom' })
      await blogContainer.getByRole('button', { name: 'view' }).click()
      await expect(blogContainer.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(blogContainer.getByText('likes 1')).toBeVisible()
    })

    test('the user who adds the blog can delete it', async ({ page }) => {
      const blogContainer = page.locator('div.blogItem').filter({ hasText: 'monster hunter wild Capcom' })
      page.on(
        'dialog', async dialog => {
          expect(dialog.type()).toEqual('confirm')
          expect(dialog.message()).toEqual('Remove blog monster hunter wild by Capcom')
          dialog.accept()
      })
      await blogContainer.getByRole('button', { name: 'view' }).click()

      await blogContainer.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('monster hunter wild Capcom')).not.toBeVisible()
    })

    test('only the user who added the blog can see the delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('user2')
      await textboxes[1].fill('user2')
      await page.getByRole('button', { name: 'login' }).click()

      const blogContainer = page.locator('div.blogItem').filter({ hasText: 'monster hunter wild Capcom' })
      await blogContainer.getByRole('button', { name: 'view' }).click()
      await expect(blogContainer.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('the blog list is arranged in descending order', async ({ page, request }) => {
      await request.delete('http://localhost:3003/api/blogs')

      const blogContainer = await page.locator('.blogItem')
      let blogOrderList = []

      for (let i = 0; i < 5; i++) {
        const extractLikes = await blogContainer.nth(i).locator('.likes').textContent()
        const convertLikes = parseInt(extractLikes)
        blogOrderList.push(convertLikes)
      }

      const descendingBlogCheckArray = [...blogOrderList].sort((a, b) => b - a)

      console.log('blogOrderList', blogOrderList)
      console.log('descendingBlogCheckArray', descendingBlogCheckArray)
      expect(blogOrderList).toEqual(descendingBlogCheckArray)
    })
  })
})