require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const infusionRouter = require('./routes/infusion')

// Define the main app
const app = express()

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Built in middleware for JSON
app.use(express.json())

// Built in Middleware to Handle Urlencoded Form Data
app.use(express.urlencoded({ extended: true }))

// middleware for cookies
app.use(cookieParser())

// Routes
app.get('/', (req, res) => { res.json({ message: 'Welcome to the backend API for Hemophilia Bleed App' }) })

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/infusion', infusionRouter)

// Global Error Handler
app.use(errorHandler)

// Start the server 
const port = process.env.PORT || 3333
app.listen(port, () => console.log(`App running at http://localhost:${port}`))