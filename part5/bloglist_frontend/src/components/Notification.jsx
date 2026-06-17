  const notification = (message) => (    
    <div className='notification'>
      {message && <h3>{`${message.type}: ${message.text}`}</h3>}
    </div>
  )

  export default notification