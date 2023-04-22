const{ Tag } = require("../../db")

const tagsPatchController = async ( id, name, store_id ) => {
    const result = await Tag.update({name},{ where: {id, store_id}})
    return result
}

module.exports = {
    tagsPatchController,
}