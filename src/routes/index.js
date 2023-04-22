/* eslint-disable new-cap */
const {Router} = require('express');
const router = Router();

//* Order
const ordersGetPredictionRouter = require("./orders/order-predict")
const orderPatchRouter = require("./orders/order-patch")
const orderGetRouter = require("./orders/order-get")
const orderGetBalanceRouter = require("./orders/order-get_balance")
//* Images Processor
const processImage = require("./utils/getImageReturnUrl")

//* Tags Routes
const tagsPostRouter = require("./tags/tags_post");
const tagsGetRouter = require("./tags/tags_get");
const tagsDeleteRouter = require("./tags/tags_delete");
const tagsPatchRouter = require("./tags/tags_patch");
const tagsSetToMenuRouter = require("./tags/tags_apply")         // Agregar TAGS a los Menus


//* Ingredient Routes
const ingredientsPostRouter = require("./ingredients/ingredients-post");
const ingredientsGetRouter = require("./ingredients/ingredients-get");
const ingredientsDeleteRouter = require("./ingredients/ingredients-delete");
const ingredientsPatchRouter = require("./ingredients/ingredients-patch");

//* Recipe Routes
const recipesPostRouter = require("./recipes/recipes_post");
const recipesGetRouter = require("./recipes/recipes_get");
const recipesDeleteRouter = require("./recipes/recipes_delete");
const recipesPatchRouter = require("./recipes/recipes_patch");

//!         -   -   -   -   -           !//

//* Cart
const cartGetRouter = require("./utils/cart/carts_get")
const cartPatchRouter = require("./utils/cart/carts_patch")

//* User Routes
const usersPostRouter = require("./users/users-post");
const usersGetLoginRouter = require("./users/users-login");
const rolesGet = require("./users/user-get-roles");

//* Menu Routes
const menuPostRouter = require("./menu/menu-post");
const menuGetRouter = require("./menu/menu-get");
const menuDeleteRouter = require("./menu/menu-delete");
const menuPatchRouter = require("./menu/menu-patch");

//* Payments Routes     *
const PaymentRouter = require("./payments/payments-router")

//* Reviews Routes
const processReviewPost = require("./review/reviews-router")

//! google route    *
const authGoogle = require("./login-google");


//!                                                                 
// RUTAS //
//* Images Processor
router.use("/processImage/post", processImage);



//* Carts
router.use("/carts/get", cartGetRouter );
router.use("/carts/patch", cartPatchRouter );

//!PAYPAL           *
router.use("/payments", PaymentRouter)
//! auth google     *
router.use("/auth",authGoogle )


//* Menu
router.use("/menu/create", menuPostRouter);
router.use("/menu/get", menuGetRouter);
router.use("/menu/update", menuPatchRouter);
router.use("/menu/delete", menuDeleteRouter);

//* Order
router.use("/orders/predict", ordersGetPredictionRouter)
router.use("/orders/getBalance", orderGetBalanceRouter);
router.use("/orders/update", orderPatchRouter);
router.use("/orders/get", orderGetRouter);

//* Review
router.use("/review/post", processReviewPost);

//!              ------                  !//
//* Ingredient
router.use("/ingredients/create", ingredientsPostRouter);
router.use("/ingredients/get", ingredientsGetRouter);
router.use("/ingredients/update", ingredientsPatchRouter);
router.use("/ingredients/delete", ingredientsDeleteRouter);

//* User
router.use("/users/create", usersPostRouter);
router.use("/roles/get", rolesGet);
router.use("/users/login", usersGetLoginRouter);

//* Tags
router.use("/tags/create", tagsPostRouter);
router.use("/tags/get", tagsGetRouter);
router.use("/tags/delete", tagsDeleteRouter);
router.use("/tags/update", tagsPatchRouter);
router.use("/tags/apply", tagsSetToMenuRouter)


//* Recipe
router.use("/recipes/create", recipesPostRouter);
router.use("/recipes/get", recipesGetRouter);
router.use("/recipes/delete", recipesDeleteRouter);
router.use("/recipes/update", recipesPatchRouter);
//* Store
/*
router.use("/store/post", storePostRouter)
router.use("/store/patch", storePatchRouter)
*/
module.exports = router;

