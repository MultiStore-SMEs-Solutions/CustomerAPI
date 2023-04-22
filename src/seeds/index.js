const CreateUserStore = require("./CreateUserStore")
const CreateTags = require("./CreateTags")
const CreateIngredients = require("./CreateIngredients")
const CreateRecipes = require("./CreateRecipes")
const CreateMenuItems = require("./CreateMenuItems")
const CreateTagsMenuItems = require("./CreateTagsMenuItems")
const CreateReviews = require("./CreateReviews")
const CreateOrders = require("./CreateOrders")

module.exports = async function () {
    await Promise.all([ // Returning and thus passing a Promise here
        await CreateUserStore(),
        await CreateTags()
    ]).then(async () => {
        await CreateIngredients()
    }).then(async () => {
        //CreateRecipes()
        await CreateMenuItems()
    }).then(async () => {
        await CreateOrders()
    }).then(async () => {
        await CreateTagsMenuItems(),
        await CreateReviews()

    }).then(()=>{
        console.log('********** Successfully seeded db **********');
    })


    await Promise.all([ // Returning and thus passing a Promise here
        // Independent seeds first
        // Menu(),
        // MenuTags(),
        // User(),
     
    ]).then(()=>{
        // Orders()
    })

    
    



}