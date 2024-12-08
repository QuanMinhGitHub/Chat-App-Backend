const express = require("express")
const { registerUser, authUser, uploadFile } = require("../controllers/userControllers")
const uploadSingle = require("../config/aws")

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", authUser)
router.post('/upload', uploadSingle, uploadFile)

module.exports = router