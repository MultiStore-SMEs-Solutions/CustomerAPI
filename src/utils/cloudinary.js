require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CR_CLOUD_NAME,
    api_key: process.env.CR_API_KEY,
    api_secret: process.env.CR_API_SECRET
})

module.exports = {
    cloudinary
}