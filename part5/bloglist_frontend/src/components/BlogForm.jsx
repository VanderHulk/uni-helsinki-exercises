  const BlogForm = ({ onSubmit, onClick, blog, setBlog }) => {    
    return (    
    <>
      <form onSubmit={onSubmit}>
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
          <button className='btn' type="button" onClick={onClick}>Clear</button>
        </div>
      </form>       
    </>
  )
}

export default BlogForm