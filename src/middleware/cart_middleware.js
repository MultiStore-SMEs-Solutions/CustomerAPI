const { conn } = require("../db");
const { User } = conn.models;

const getUserCart = async (req,res) => {
    try {
        const { id } = req.params;
        const result = await User.findByPk(id)
        return res.status(200).json( result.my_cart );
    } catch (error) {
        return res.status(400).json( {error: error.message} );
    }
}
const patchUserCart = async (req,res) => {
    try {
        const { id, my_cart } = req.body;
        const result = await User.update({ my_cart },
            { where: { id } });
        return res.status(200).json( result );
    } catch (error) {
        return res.status(400).json( {error: error.message} );
    }
}

module.exports = {
    getUserCart,
    patchUserCart
}