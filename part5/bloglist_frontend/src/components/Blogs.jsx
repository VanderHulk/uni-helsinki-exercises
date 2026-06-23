import Blog from './Blog'

const Blogs = ({blogList, eventHandlers}) => {
  const { addLikes, handleUpdate, deleteABlog } = eventHandlers
      
  return (
    <ul>
      <h3>List</h3>
      {blogList.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          like={addLikes}
          remove={deleteABlog}
        />
      ))}
    </ul>    
  )
}

export default Blogs