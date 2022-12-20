import express from 'express'
import bodyParser from 'body-parser';
import todoRouter from './routes/todoRoutes.js';
import connectDB from './config/dbConnection.js'
import { errorHandler } from './middleware/ErrorHandler.js';

const app = express()
const PORT = 8000;
connectDB()


app.use(bodyParser.json()) //Global middleware

app.use('/v1/todo', todoRouter)

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server Listening at port ${PORT}`)
})