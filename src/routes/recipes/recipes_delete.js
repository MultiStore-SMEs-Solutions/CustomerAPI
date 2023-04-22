const { Router } = require('express');
const router = Router();
const { processRecipeDelete } = require("../../middleware/recipes_middleware")

router.delete("/", processRecipeDelete);



module.exports = router;