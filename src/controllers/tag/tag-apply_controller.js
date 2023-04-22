const{ Tag, TagsMenuItems } = require("../../db")

const tagsApplyController = async (tagsIds, MenuItemId, store_id) => {
   let find = await TagsMenuItems.findAll({where: { MenuItemId }})
   if ( find && find.length ) {
        await TagsMenuItems.destroy({where: { MenuItemId }})
    }
    if (tagsIds && tagsIds.length ){
        let rel = []
        for (let i = 0; i < tagsIds.length; i++) {
            const element = tagsIds[i];
            rel.push({TagId: tagsIds[i], MenuItemId})
        }
        await TagsMenuItems.bulkCreate(rel)
    }
    return "Done"
}
    //{TagId: 10, MenuItemId: 3},



module.exports = {
    tagsApplyController,
}