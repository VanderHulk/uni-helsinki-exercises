import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'testUser',
  name: 'Jester Koe',
  id: 'JK1357'
}

const blog = {
  id: 'blog-001',
  title: 'Render blog\'s title and author only.',
  author: 'Eric Powers',
  url: 'www.bloglist.fi',
  likes: 24,
  userID: 'JK1357'
}

test('renders title and author', () => {
  render(
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      like={vi.fn()}
      update={vi.fn()}
      remove={vi.fn()}
    />
  )
  
  const title = screen.getByText('Render blog\'s title and author only.')
  const author = screen.getByText('Eric Powers')
  const url = screen.queryByText('www.bloglist.fi')
  const likes = screen.queryByText('likes 24') 

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes after clicking view', async () => {
  const user = userEvent.setup()

  render(
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      like={vi.fn()}
      update={vi.fn()}
      remove={vi.fn()}
    />
  )

  const viewButton = screen.getByText('View')

  await user.click(viewButton)  

  const url = screen.getByText('www.bloglist.fi')
  const likes = screen.getByText('likes 24') 

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('like button clicked twice', async () => {
  const user = userEvent.setup()
  const likeMock = vi.fn()

   render(
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      like={likeMock}
      update={vi.fn()}
      remove={vi.fn()}
    />
  )

  const viewButton = screen.getByText('View')

  await user.click(viewButton)

  screen.debug()

  const likeButton = screen.getByText('👍')

  await user.click(likeButton)
  await user.click(likeButton) 

  expect(likeMock).toHaveBeenCalledTimes(2) 
})