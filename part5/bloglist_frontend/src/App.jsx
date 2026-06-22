import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const timerRef = useRef(null)

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''    
  })
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const addBlog = async () => {
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
      setBlog({
        title: '',
        author: '',
        url: ''
      })

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

  const updateABlog = async (id) => {    
    try {  
      const foundBlog = findBlogById(id)
      if(!foundBlog) return

      const updatedBlog = {
        ...foundBlog,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      }

      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(prev => prev.map(b => 
        b.id !== id ? b : returnedBlog
      ))

      handleNotify(
        'Success',
        `"${foundBlog.title}" has been updated.`
      )

      handleClear()
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

      console.log('User', user)
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

  const handleSubmit = (event) => {
    event.preventDefault()   

    console.log('blogID: ', blog.id)

    if(!blog.id) {
      addBlog()      
    } else {      
      updateABlog(blog.id)
    }   
  }

  const handleUpdate = (id) => {
    // fill the blogform
    scrollToTop()

    const foundBlog = findBlogById(id)
    if(!foundBlog) return

    setBlog({
      ...foundBlog
    })    
  }

  const handleClear = () => {
    setBlog({
      title: '',
      author: '',
      url: ''      
    })    
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

  console.log(blog)
   
  return (
    <div>
      <h1>BlogList App</h1>
      {Notification(message)}
      {!user && LoginForm(handleLogin, username, password, setUsername, setPassword)}
      {user && (
        <>
          <div className='logout'>
            <p>{user.username} logged in</p>
            <button className='btn' type='button' onClick={handleLogout}>Logout</button>            
          </div>          
          <div className='container-blogs'>
            <Togglable buttonLabel='Create New Blog'>
              <BlogForm 
                onSubmit={handleSubmit}
                onClick={handleClear}
                blog={blog}
                setBlog={setBlog}
              />
            </Togglable>
            <Blogs 
              blogList={blogs}
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