const{ Tag, TagsMenuItems } = require("../../db")

const tagsDeleteController = async (id, store_id) => {
    const result = await Tag.destroy({where: {id, store_id}})
    /*.then(
       TagsMenuItems.destroy({where: { TagId : id }})
    )*/
    return result
}

module.exports = {
    tagsDeleteController,
}