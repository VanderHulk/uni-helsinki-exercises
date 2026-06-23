import { useState } from 'react'

const Blog = ({blog, like, update, remove}) => { 

  const [visible, setVisible] = useState(false)

  return (
    <li>
      <div className='group-title'>
        <p>{`Title: ${blog.title}`}</p>
        <button className='btn' type='button' onClick={() => setVisible(!visible)}>View</button>
      </div>

      {visible && (
        <div className='group-details'>
          <div className='group-author'>
            <p>{`Author: ${blog.author}`}</p>
            <button className='btn' type='button' onClick={() => setVisible(!visible)}>Hide</button>
          </div>

          <p>{`URL: ${blog.url}`}</p>
          <p>{`Likes: ${blog.likes}`}</p>

          <button type='button' onClick={() => like(blog.id)}>👍</button>
          {/* <button type='button' onClick={() => update(id)}>✏️</button> */}
          <button type='button' onClick={() => remove(blog.id)}>🗑️</button>
        </div>
      )}
    </li>
  )
}

export default Blog