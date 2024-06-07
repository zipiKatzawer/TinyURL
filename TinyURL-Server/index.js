import express from 'express' 
import connectDB from './database.js'
import LinksRouter from './Routers/LinksRouter.js'
import UsersRouter from './Routers/UsersRouter.js'

import cors from "cors"
import bodyParser from "body-parser";


connectDB(); 
const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/links', LinksRouter)
app.use('/users', UsersRouter)


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
