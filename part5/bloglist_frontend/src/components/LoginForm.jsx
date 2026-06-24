const LoginForm = ({ onSubmit, username, password, setUsername, setPassword }) => {
  return (
    <div className='frm-login'>
      <form onSubmit={onSubmit}>
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
}

export default LoginForm