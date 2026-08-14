import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

const newBlog = {
    title: '',
    author: '',
    url: ''
}

test('<CreateBlog .../> creates a new Blog', async () => {
  const user = userEvent.setup()

  const addBlogMock = vi.fn()  

  render(<CreateBlog addBlog={addBlogMock} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')
  const saveButton = screen.getByText('Save')

  await user.type(titleInput, 'A brand new blog')
  await user.type(authorInput, 'Jester Koe')
  await user.type(urlInput, 'www.blogApp.com')
  await user.click(saveButton)

  screen.debug()
  console.log(addBlogMock.mock.calls)
  
  expect(addBlogMock).toHaveBeenCalledTimes(1)
  expect(addBlogMock).toHaveBeenCalledWith({
    title: 'A brand new blog',
    author: 'Jester Koe',
    url: 'www.blogApp.com'
  })
})