const { Router } = require("express");
const router = Router();
const { processIngredientGet, processIngredientGetById} = require("../../middleware/ingredients_middleware");

router.get("/", processIngredientGet);

router.get("/:id", processIngredientGetById);

module.exports = router;
