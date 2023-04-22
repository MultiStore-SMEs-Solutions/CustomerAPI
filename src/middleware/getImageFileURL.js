const {cloudinary} = require("../utils/cloudinary")
//const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

const getImageFileURL = async (req,res) => {
    try {
        const { imageStr } = req.body;
        //if ( URL_REGEX.test(imageStr) ) return res.status(200).json( "esto anda " +imageStr );
        const uploadedResponse = await cloudinary.uploader.upload(imageStr, {upload_preset: process.env.CR_DEFAULT_FOLDER})
        return res.status(200).json( uploadedResponse.secure_url );
    } catch (error) {
        return res.status(400).json( {error: error.message} );
    }
}

module.exports = {
    getImageFileURL,
}