const { TagsMenuItems } = require('../db');

//const id = "f3bc0474-620c-429d-a46c-df2460c7725a"

//1	 3	 5	 6	8	10
const fakeTags = [
    {TagId: 1, MenuItemId: 1},
    {TagId: 3, MenuItemId: 1},
    {TagId: 8, MenuItemId: 1},
    {TagId: 10, MenuItemId: 1},

    {TagId: 5, MenuItemId: 2},
    {TagId: 6, MenuItemId: 2},
    {TagId: 3, MenuItemId: 2},
    {TagId: 10, MenuItemId: 2},

    {TagId: 1, MenuItemId: 3},
    {TagId: 5 , MenuItemId: 3},
    {TagId: 8, MenuItemId: 3},
    {TagId: 10, MenuItemId: 3},

    {TagId: 1, MenuItemId: 4},
    {TagId: 3, MenuItemId: 4},
    {TagId: 8, MenuItemId: 4},

    {TagId: 5, MenuItemId: 5},
    {TagId: 6, MenuItemId: 5},
    {TagId: 10, MenuItemId: 5},

    {TagId: 1, MenuItemId: 6},
    {TagId: 5 , MenuItemId: 6},
    {TagId: 8, MenuItemId: 6},

]
module.exports = async function() {
    await TagsMenuItems.bulkCreate(fakeTags)
    await new Promise(resolve => setTimeout(resolve, 400)); // Esperar 400 ms

}