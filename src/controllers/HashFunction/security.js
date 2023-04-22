const { Password, Store, Op } = require('../../db');
const { INVALID_LOGIN } = require("../../models/utils/User-ErrorMSGs")
const crypto = require('crypto');


//?
//* Remastered
//?
const hashFunction = (password, secret) => {
  const hash = crypto.createHash('sha256');
  hash.update(password + secret);
  return hash.digest('hex');
}

const getStoreIDByStoreName = async (short_name) => {
  const result = await Store.findOne({ where: { short_name }})
  return result ? result.id : null;
}

const getStoreIdByUserId = async (id) => {
  const result = await Store.findOne({ where: { ownerId: id }})
  return result ? result.dataValues.id : "";
}

const getStoreNameByUserId = async (id) => {
  const result = await Store.findOne({ where: { ownerId: id }})
  return result ? result.dataValues.short_name : "";
}

const validateAccountPassword = async (userId, hashedPass) => {
    const result = await Password.findOne({where: {
        [Op.and]: [
          { user_id: userId },
          { password: hashedPass },
          { is_active: true }
        ]
      }})
      return ( result && result.id > 0 ? true : false );
}


const generateSecret = () => {
    const length = 16;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



const getMercadoPagoFailureUrl = () => {
  return process.env.PAYMENT_FAIL_LOCAL_URL || process.env.PAYMENT_FAIL_DEPLOY_URL;
}


const getMercadoPagoSuccessUrl = () => {
  return process.env.PAYMENT_SUCCESS_LOCAL_URL || process.env.PAYMENT_SUCCESS_DEPLOY_URL;
}


const getStoreId = () => {
  //! TODO
  // Revisar implementacion
  //  "f3bc0474-620c-429d-a46c-df2460c7725a"  ==> pepitas
  //  "eb311a9e-7c64-4c3d-bce3-1ce5e474e532"  ==> mari4
  return "f3bc0474-620c-429d-a46c-df2460c7725a"
}

const findStoreIdByShortName = async (short_name) => {
  const store = await Store.findOne({
    where: { short_name },
    attributes: ['id']
  });
  return store ? store.id : null;
}

module.exports =  {
    hashFunction,
    generateSecret,
    validateAccountPassword,
    getMercadoPagoSuccessUrl,
    getMercadoPagoFailureUrl,
    getStoreId,
    findStoreIdByShortName,
    getStoreIdByUserId,
    getStoreIDByStoreName,
    getStoreNameByUserId
}