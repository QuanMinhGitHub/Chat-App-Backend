const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { chats } = require("./data")

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.get("/", (request, response) => {
    response.send("API is running")
})

app.get("/api/chat", (request, response) => {
    response.send(chats)
})

app.get("/api/chat/:id", (request, response) => {
    const singleChat = chats.find((c) => c._id === request.params.id)
    response.send(singleChat)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))