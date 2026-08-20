// entry point of the application, starts server, no route logic
// starts the application
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

console.log('About to start server')
console.log('PORT', config.PORT)

const server = app.listen(config.PORT, '127.0.0.1', () => {
  logger.info(`Server running on port ${config.PORT}`)
  console.log(`Server running on ${config.PORT}`)
})

server.on('error', (error) => {
  console.error('Server failed to start:', error)
})

/* app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
}) */