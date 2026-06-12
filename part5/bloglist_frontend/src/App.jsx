import { useState, useEffect } from 'react'
import axios from 'axios'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })
  const [blogs, setBlogs] = useState([])
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

  const addBlog = async (event) => {
    event.preventDefault()

    const returnedBlog = await blogService.create(blog)
    setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
    setBlog({
      title: '',
      author: '',
      url: '',
      likes: 0
    })
  }
  
// components
  const Blogs = () => (
    <ul>
      <h3>List</h3>
      {blogs.map(({ id, title, author, url, likes }) => (                
        <li key={id}>
          <p>{`Title: ${title}`}</p>
          <p>{`Author: ${author}`}</p> 
          <p>{`URL: ${url}`}</p>
          <p>{`Likes: ${likes}`}</p>
          <div className='emojis'>
            <button>👍</button>
            <button>✏️</button>
            <button>🗑️</button>
          </div>
        </li>
      ))}      
    </ul>    
  )

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
  
  const BlogForm = () => (    
    <div className='container'>      
      <form>
        <h3>Create a blog</h3>
        <label>
          <span className='lbl'>Title:</span>
          <input type='text' />    
        </label>
        <label>
          <span className='lbl'>Author:</span>
          <input type='text' />    
        </label>
        <label>
          <span className='lbl'>URL:</span>
          <input type='text' />    
        </label>
        <label>
          <span className='lbl'>Likes:</span>
            <input type='text' />    
        </label>
        <div className='btns'>
          <button className='btn'>Save</button>
          <button className='btn'>Clear</button>
        </div>
      </form>
      <Blogs /> 
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
    } catch {
      console.log('Wrong Credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }
   
  return (
    <div>
      <h1>BlogList App</h1>      
      {!user && loginForm()}
      {user && (
        <>
          <div className='logout'>
            <p>{user.username} logged in</p>
            <button className='btn' type='button' onClick={handleLogout}>Logout</button>
          </div>
          <BlogForm />
        </>
      )}
      
    </div>
  )
}

export default App