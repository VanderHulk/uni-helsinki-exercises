import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const timerRef = useRef(null)
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [editedBlog, setEditedBlog] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    if(user) {
      blogService.setToken(user.token)
    }
  }, [user])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))

      handleNotify(
        'Success',
        `"${returnedBlog.title}" has been added.`
      )

    } catch (error) {
      notifyError(error)
    }
  }

  const addLikes = async (id) => {
    try {
      const foundBlog = findBlogById(id)
      if(!foundBlog) return

      const updatedBlog = {
        ...foundBlog,
        likes: foundBlog.likes + 1
      }

      const returnedBlog = await blogService.updateLikes(id, updatedBlog)
      setBlogs(prev => prev.map(b =>
        b.id !== id ? b : returnedBlog
      ))
    } catch (error) {
      scrollToTop()
      notifyError(error)
    }
  }

  const updateABlog = async (event) => {
    event.preventDefault()

    try {
      console.log('updateABlog', editedBlog)

      const returnedBlog = await blogService.update(editedBlog.id, editedBlog)
      setBlogs(prev => prev.map(b =>
        b.id !== editedBlog.id ? b : returnedBlog
      ))

      handleNotify(
        'Success',
        `"${editedBlog.title}" has been updated.`
      )

      handleUpdateClear()

    } catch (error) {
      notifyError(error)
    }
  }

  const deleteABlog = async(id) => {
    scrollToTop()

    const foundBlog = findBlogById(id)
    if(!foundBlog) return

    const yes = window.confirm(`Delete blog "${foundBlog.title}" by ${foundBlog.author}?`)

    try {
      if(yes) {
        const response = await blogService.remove(id)
        console.log('deleteABlog', response)

        setBlogs(prev => prev.filter(b => b.id !== id))

        handleNotify (
          'Success',
          `"${foundBlog.title}" has been removed.`
        )
      }
    } catch (error) {
      notifyError(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notifyError(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleUpdate = (id) => {
    // fill the blogform
    console.log(id)
    const foundBlog = findBlogById(id)
    if(!foundBlog) return

    setEditedBlog(foundBlog)
    scrollToTop()
  }

  const handleUpdateClear = () => {
    setEditedBlog(null)
  }

  const handleUpdateOnChange = (field, value) => {
    setEditedBlog(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotify = (type, text, duration = 3000) => {
    if(timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setMessage({ type, text })

    timerRef.current = setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  // helpers

  const notifyError = (error) => {
    handleNotify(
      `Error ${error.response?.status || ''}`,
      error.response?.data?.error || 'Something went wrong',
      5000
    )
  }

  const findBlogById = (id) => blogs.find(b => b.id === id)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      <h1>BlogList App</h1>
      {Notification(message)}
      {!user &&
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      }
      {user && (
        <>
          <div className='logout'>
            <p>{user.username} logged in</p>
            <button className='btn' type='button' onClick={handleLogout}>Logout</button>
          </div>
          <div className='container-blogs'>
            {!editedBlog
              ? <Togglable buttonLabel='Create a Blog' ref={blogFormRef}>
                <CreateBlog addBlog={addBlog} />
              </Togglable>
              : <BlogForm
                blog={editedBlog}
                formTitle='Edit a blog'
                onSubmit={updateABlog}
                onChange={handleUpdateOnChange}
                onClear={handleUpdateClear}
                btnName='Cancel'
              />
            }
            <Blogs
              blogList={blogs}
              user={user}
              eventHandlers={{
                addLikes,
                handleUpdate,
                deleteABlog
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default App