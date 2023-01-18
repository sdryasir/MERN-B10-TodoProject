import express from 'express'
import bodyParser from 'body-parser';
import todoRouter from './routes/todoRoutes.js';
import authRouter from './routes/authRoutes.js';
import connectDB from './config/dbConnection.js'
import { errorHandler } from './middleware/ErrorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()

connectDB()

app.use(cors({origin:'http://localhost:3000'}))
app.use(cookieParser());
app.use(bodyParser.json()) //Global middleware

app.use('/v1/todo', todoRouter)
app.use('/v1/users', authRouter)

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`Server Listening at port ${process.env.PORT}`)
})