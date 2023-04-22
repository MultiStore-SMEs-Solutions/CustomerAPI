const { User, Password } = require("../../db");
const { generateSecret, hashFunction } = require("../HashFunction/security");
const {sendEmail} = require('..//htmlMessageMail/sendActivationEmail')

//?
//* Remastered
//?
const userPostController = async( name, last_name, account_name, password, email, phone, profile_image, roleId = 1 ) => {  try {
    const secret = generateSecret();
    const hashedPass = hashFunction(password, secret);
    const newUser = await User.create({name, last_name, account_name, password, email,
                                      secret, phone, profile_image, roleId });
    let user_id = newUser.id;
    let user_email = newUser.email;

    await Password.create({ user_id, password: hashedPass });

    //CODIGO QUE ENVIA CORREO AL CLIENTE PARA LA ACTIVACION DE LA CUENTA

   sendEmail(user_email)
   //! Devolver User... O un mensaje de exito?!?!?!
   delete newUser.dataValues.secret;

    return newUser;
  } catch (error) {
    return error.message;
  }
};


module.exports = {
  userPostController,
};
