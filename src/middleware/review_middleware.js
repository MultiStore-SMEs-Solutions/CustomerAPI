//const {  } = require("../db");
const { reviewPostController } = require("../controllers/review/review-post_controller");
const { getStoreIdByUserId } = require("../controllers/HashFunction/security");
const { Review } = require("../db")


const processReviewPost = async (req,res) => {
    try {
        //! Aca al parecer el usuario no interviene directamente por ende, se evita el remasterizado
        const { rating, title, comment, OrdersMenuId, MenuItemId } = req.body;
        //! Validar si todos los ingredientes son del MISMO store
        await validateReviewPost( rating, title, comment, OrdersMenuId, MenuItemId )
        const result = await reviewPostController( rating, title, comment, OrdersMenuId, MenuItemId )
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const validateReviewPost = async (rating, title, comment, OrdersMenuId, MenuItemId) => {
    if (rating <1 || rating >5 ) throw Error(`Rating: ${rating} is out of acceptable range`)
    if ( !await isNewReview(OrdersMenuId, MenuItemId)) throw Error("Ese review ya existe")
    if ( title && validateBannedWords(title)) throw Error(`The title: '${title}' includes forbiden words`)
    if ( comment && validateBannedWords(comment)) throw Error(`The comment: '${comment}' includes forbiden words`)
}

//! Leevar esto a ctrl aux
const isNewReview = async ( OrdersMenuId, MenuItemId ) => {
    const resu = await Review.findAll({ where: { OrdersMenuId, MenuItemId}});
    return resu.length ? false : true;
}

const validateBannedWords = (text) => {
    //! Fn() que no permite insultar En caso de implementar comentarios. Agregar
    //* No implementado en este Release

    return false;
}

module.exports = {
    processReviewPost

}