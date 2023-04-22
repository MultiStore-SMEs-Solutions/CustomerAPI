const { Router } = require('express');
const router = Router();
const { processRecipePost } = require("../../middleware/recipes_middleware")

router.post("/", processRecipePost);

module.exports = router;