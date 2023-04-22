const{ Tag } = require("../../db")

const tagsGetController = async (store_id) => {
    const result = await Tag.findAll({where: {store_id}, attributes: {exclude: ['store_id']},
    order: [['id','DESC']]})
    return result;
}

module.exports = {
    tagsGetController,
}

