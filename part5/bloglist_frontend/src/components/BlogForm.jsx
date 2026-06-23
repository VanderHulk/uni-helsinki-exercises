import { useState } from 'react'

const BlogForm = ({ addBlog }) => {  
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

  const handleClear = () => {
    setNewBlog({
      title: '',
      author: '',
      url: ''      
    })    
  } 

  return (    
    <>
      <form onSubmit={handleSubmit}>
        <h3>Create a blog</h3>
        <label>
          <span className='lbl'>Title:</span>
          <input 
            type='text' 
            value={newBlog.title}
            onChange={({target}) => setNewBlog({ ...newBlog, title: target.value })}
          />    
        </label>
        <label>
          <span className='lbl'>Author:</span>
          <input 
            type='text' 
            value={newBlog.author}
            onChange={({target}) => setNewBlog({ ...newBlog, author: target.value })}
          />     
        </label>
        <label>
          <span className='lbl'>URL:</span>
          <input type='text' 
            value={newBlog.url}
            onChange={({target}) => setNewBlog({ ...newBlog, url: target.value })}
          />  
        </label>        
        <div className='btns'>
          <button className='btn' type="submit">Save</button>
          <button className='btn' type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>       
    </>
  )
}

export default BlogForm