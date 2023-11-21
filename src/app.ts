import dotenv from 'dotenv'
import express from 'express'
import routes from './routes'

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


console.log(process.env)
