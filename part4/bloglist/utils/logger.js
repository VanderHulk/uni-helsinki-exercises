// logging functions
// information for printing normal log messages and error for all error messages

// prints normal operational messages
const info = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// prints error messages
const error = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info, 
  error
}