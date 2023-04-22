const { Router } = require('express');
const router = Router();
const { processIngredientDelete } = require("../../middleware/ingredients_middleware")


router.delete("/:id", processIngredientDelete);


module.exports = router;