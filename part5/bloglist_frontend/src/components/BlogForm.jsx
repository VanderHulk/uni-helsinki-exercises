const BlogForm = ({
  blog,
  formTitle,
  onSubmit,
  onChange,
  onClear,
  btnName
}) => {

  return (
    <form onSubmit={onSubmit}>

      <h3>{formTitle}</h3>

      <label>
        <span className='lbl'>Title:</span>
        <input
          type='text'
          value={blog.title}
          onChange={({ target }) => onChange('title', target.value)}
        />
      </label>

      <label>
        <span className='lbl'>Author:</span>
        <input
          type='text'
          value={blog.author}
          onChange={({ target }) => onChange('author', target.value)}
        />
      </label>

      <label>
        <span className='lbl'>URL:</span>
        <input type='text'
          value={blog.url}
          onChange={({ target }) => onChange('url', target.value)}
        />
      </label>

      <div className='btns'>
        <button className='btn' type="submit">Save</button>
        <button className='btn' type="button" onClick={onClear}>{btnName}</button>
      </div>

    </form>
  )
}

export default BlogForm