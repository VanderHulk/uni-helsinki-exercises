import { useState } from 'react'

const Blog = ({ blog, user, like, update, remove }) => {

  const [visible, setVisible] = useState(false)

  return (
    <li>
      <div className='group-main'>
        <p className='title'>{`${blog.title}`}</p>
        <p> -- </p>
        <p className='author'>{`${blog.author}`}</p>
        <button className='btn' type='button' onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
      </div>

      {visible && (
        <div className='group-details'>
          
          <p>{`${blog.url}`}</p>
          <p>{`likes ${blog.likes}`}</p>

          <button type='button' onClick={() => like(blog.id)}>👍</button>

          {blog.userID.id === user.id && (
            <>
              <button type='button' onClick={() => update(blog.id)}>✏️</button>
              <button type='button' onClick={() => remove(blog.id)}>🗑️</button>
            </>
          )}

          <p className='p-creator'>{blog.userID?.name}</p>
        </div>
      )}
    </li>
  )
}

export default Blog