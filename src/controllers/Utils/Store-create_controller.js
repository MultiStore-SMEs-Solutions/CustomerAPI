const { Store, User } = require("../../db");
const { v4: uuidv4 } = require('uuid');

const createStore = async (userId, name, short_name, description, logo, store_type, mercado_pago) => {
//    store_id: UUID, name: STRING(80), short_name: STRING(70), description: STRING,
//    logo: STRING,store_type:  ENUM["Food Truck", "Other", mercado_pago: String]
//  name, short_name, description, logo, store_type
    const store_id = getUUIDv4();
    const user = await User.findByPk(userId);
    if (!user) throw Error("No existe usuario con este ID")
    const newStore = await Store.create({store_id, name, short_name, description, logo, store_type, mercado_pago})
    user.addStore(newStore);
}


const getUUIDv4 = async () => {
    let uuid;
    do{
        uuid = uuidv4();
    }while ( !Store.findAll({where: {store_id: uuid}}).length)
    return uuid;
}

module.exports = {
    //createStore
};