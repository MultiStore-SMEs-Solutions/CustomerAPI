const { User } = require('../../db');
const { hashFunction, validateAccountPassword, getStoreNameByUserId } = require("../HashFunction/security");
const { INVALID_LOGIN } = require("../../models/utils/User-ErrorMSGs")
const { generateToken, validateToken } = require("../token/token_controller")


const userLoginController = async (email, password) => {
 const user = await User.findOne({where: { email }})
 if (user){
    const hashedPass = hashFunction(password, user.secret)
    const valid = await validateAccountPassword(user.id, hashedPass);
    //! un fn() que extrae el storeName segun el ID de usuario
    //if ( !await validateToken(user.id)) throw Error("Invalid Token")
    const storeName = await getStoreNameByUserId(user.id)
    const newToken = valid ? await generateToken(user.dataValues.id) : null;


    return  valid? {valid, user: {  id: user.id, name: user.name, last_name: user.last_name,
                                    email: user.email, phone: user.phone, profile_image: user.profile_image,
                                    roleId: user.roleId, token: newToken }, storeName: storeName }: {valid}
 }else throw Error(INVALID_LOGIN)

}

module.exports = {
    userLoginController,
}