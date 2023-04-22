const { Router } = require('express');
const router = Router();
const { processIngredientPatch } = require("../../middleware/ingredients_middleware");

router.patch("/", processIngredientPatch )

module.exports = router;