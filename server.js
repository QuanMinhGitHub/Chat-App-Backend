const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/database")
const userRoutes = require("./routes/userRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

dotenv.config()
connectDB()

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))