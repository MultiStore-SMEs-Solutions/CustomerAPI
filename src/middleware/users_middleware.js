const { conn, Op } = require("../db");
const { User, Role } = conn.models;
const { INVAME_NAME_OR_ACCOUNT, EMAIL_REGEX, INVALID_NAME, INVALID_LAST_NAME,
        ALPHA_REGEX, MIN_PASS_LENGTH, PASSWORD_TO_SHORT, INVALID_EMAIL,
        MIN_QUESTION_LENGTH, INVALID_QUESTION, MIN_ANSWER_LENGTH, INVALID_ANSWER,
        INVALID_LOGIN_PARAMS, DEFAULT_IMG } = require("../models/utils/User-ErrorMSGs")
const { userPostController, token } = require("../controllers/user/user-post_controller")
const { userLoginController } = require("../controllers/user/user-get-login_controller")

//* Visto
const isExistingUser = async (account_name, email) => {
    let result = await User.findAll({where: {[Op.or]: [
        { account_name },
        { email }
      ]}})
    return result.length > 0 ? true : false;
}

//?
//* Remastered *//
//?
const processUserPost = async (req,res) => {
    const { name, last_name, account_name, password, email, phone, role_id } = req.body;
    let { profile_image } = req.body;
    try {
        if (!profile_image || !profile_image.length) profile_image = DEFAULT_IMG;
        await validateUser(name, last_name, account_name, password, email, phone, role_id);
        const result = await userPostController(name, last_name, account_name, password, email, phone, profile_image, role_id )
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

//?
//* Remastered *//
//?
const validateUser = async (name, last_name, account_name, password, email, phone, role_id ) => {
    if (await isExistingUser(account_name, email)) throw Error(INVAME_NAME_OR_ACCOUNT);
    if (!name.trim() || !ALPHA_REGEX.test(name)) throw Error( INVALID_NAME);
    if (!last_name.trim().length || !ALPHA_REGEX.test(last_name)) throw Error( INVALID_LAST_NAME);
    if (password.length < MIN_PASS_LENGTH ) throw Error(PASSWORD_TO_SHORT);
    if (!EMAIL_REGEX.test(email)) throw Error(INVALID_EMAIL);
}

//* Visto
const processUserLogin = async (req,res) => {

    try {
        const {email, password } = req.body;
        if (!email || !password) throw Error(INVALID_LOGIN_PARAMS);
        if (!isExistingUser("" , email)) throw Error(INVALID_LOGIN_PARAMS);
        const result = await userLoginController(email, password);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message })
    }
}

//! Retrabajar esto
const processGetAllRoles = async (req,res) => {
    try {
        let roles = await Role.findAll({
            where: {
              id: {
                [Op.between]: [2,4]
              }
            }
          });
          roles = roles.map(({ id, name }) => ({ id, name }));
        if(roles.length){
        
    return res.status(200).send( roles )
}
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports = {
    processUserPost,
    processUserLogin,
    processGetAllRoles
}