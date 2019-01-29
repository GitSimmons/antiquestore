require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')

const server = createServer()
server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, (props) => console.log(`GQL Server is running on http://localhost:${props.port}`))
