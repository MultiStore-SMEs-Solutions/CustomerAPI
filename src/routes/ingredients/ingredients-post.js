const { Router } = require("express");
const router = Router();
const { processIngredientPost } = require("../../middleware/ingredients_middleware");

router.post("/", processIngredientPost );

module.exports = router;
