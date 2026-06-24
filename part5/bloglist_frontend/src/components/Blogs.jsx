import Blog from './Blog'

const Blogs = ({ blogList, user, eventHandlers }) => {
  const { addLikes, handleUpdate, deleteABlog } = eventHandlers

  const sortedBlogs = [...blogList].sort((a, b) => b.likes - a.likes)

  return (
    <ul>
      <h3>List</h3>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          like={addLikes}
          update={handleUpdate}
          remove={deleteABlog}
        />
      ))}
    </ul>
  )
}

export default Blogs