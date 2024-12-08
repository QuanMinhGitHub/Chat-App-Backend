const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (request, response) => {
    const { name, email, password, pic } = request.body

    if (!name || !email || !password) {
        response.status(400)
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        response.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if (user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        response.status(400)
        throw new Error("Failed to create new User")
    }
})

const authUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        response.status(401)
        throw new Error("Invalid email or password")
    }
})

const uploadFile = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ message: 'No file uploaded' });
    }

    // Send back the file URL from S3
    const imageUrl = request.file.location;
    response.status(200).json({ imageUrl });
};

module.exports = { registerUser, authUser, uploadFile }