import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import blogService from './services/blogs'
import loginService from './services/login'

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
  
// components
  const Blogs = () => {
    return (
      <ul>
        <h3>List</h3>
        {blogs.map(({ id, title, author, url, likes }) => (                
          <li key={id}>
            <p>{`Title: ${title}`}</p>
            <p>{`Author: ${author}`}</p> 
            <p>{`URL: ${url}`}</p>
            <p>{`Likes: ${likes}`}</p>
            <div className='emojis'>
              <button type='button' onClick={() => addLikes(id)}>👍</button>
              <button type='button' onClick={() => handleUpdate(id)}>✏️</button>
              <button type='button' onClick={() => deleteABlog(id)}>🗑️</button>
            </div>
          </li>
        ))}      
      </ul>    
    )
  }

  const loginForm = () => (
    <div className='frm-login'>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <label>
          <span className='lbl login'>Username:</span>
            <input 
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />    
        </label>
        <label>
          <span className='lbl login'>Password:</span>
            <input 
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />    
        </label>
        <button className='btn login' type='submit'>Login</button>
      </form>
    </div>  
  )
  
  const blogForm = () => (    
    <>
      <form onSubmit={handleSubmit}>
        <h3>{!blog.id ? 'Create' : 'Edit'} a blog</h3>
        <label>
          <span className='lbl'>Title:</span>
          <input 
            type='text' 
            value={blog.title}
            onChange={({ target }) => 
              setBlog({...blog, title: target.value})
            }
          />    
        </label>
        <label>
          <span className='lbl'>Author:</span>
          <input 
            type='text' 
            value={blog.author}
            onChange={({ target }) => 
              setBlog({...blog, author: target.value})
            }
          />     
        </label>
        <label>
          <span className='lbl'>URL:</span>
          <input type='text' 
            value={blog.url}
            onChange={({ target }) => 
              setBlog({...blog, url: target.value})
            }
          />  
        </label>        
        <div className='btns'>
          <button className='btn' type="submit">{!blog.id ? 'Save' : 'Update'}</button>
          <button className='btn' type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>       
    </>
  )

  const notification = () => (    
    <div className='notification'>
      {message && <h3>{`${message.type}: ${message.text}`}</h3>}
    </div>
  )

// handlers
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
   
  return (
    <div>
      <h1>BlogList App</h1>
      {notification()}
      {!user && loginForm()}
      {user && (
        <>
          <div className='logout'>
            <p>{user.username} logged in</p>
            <button className='btn' type='button' onClick={handleLogout}>Logout</button>            
          </div>          
          <div className='container'>
            {blogForm()}
            <Blogs />
          </div>
        </>
      )}
      
    </div>
  )
}

export default App