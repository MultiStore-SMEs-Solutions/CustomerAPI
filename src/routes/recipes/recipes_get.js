const { Router } = require('express');
const router = Router();
const { processRecipeGet, processRecipeGetById } = require("../../middleware/recipes_middleware")

router.get("/", processRecipeGet);
router.get("/:id", processRecipeGetById);

module.exports = router;