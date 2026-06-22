const Blogs = ({blogList, eventHandlers}) => {
  const { addLikes, handleUpdate, deleteABlog } = eventHandlers
    
  return (
    <ul>
      <h3>List</h3>
      {blogList.map(({ id, title, author, url, likes }) => (                
        <li key={id}>
          <p>{`Title: ${title}`}</p>
          <p>{`Author: ${author}`}</p> 
          <p>{`URL: ${url}`}</p>
          <p>{`Likes: ${likes}`}</p>
          <div className='emojis'>
            <button type='button' onClick={() => addLikes(id)}>👍</button>
            <button type='button' onClick={() => handleUpdate(id)}>✏️</button>
            <button type='button' onClick={() => deleteBlog(id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>    
  )
}

export default Blogs