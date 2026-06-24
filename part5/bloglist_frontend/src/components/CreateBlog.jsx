import { useState } from 'react'
import BlogForm from './BlogForm'

const CreateBlog = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    handleClear()
  }

  const handleChange = (field, value) => {
    setNewBlog(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClear = () => {
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <BlogForm
      blog={newBlog}
      formTitle='Create a blog'
      onSubmit={handleSubmit}
      onChange={handleChange}
      onClear={handleClear}
      btnName='Clear'
    />
  )
}

export default CreateBlog