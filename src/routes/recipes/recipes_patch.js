const { Router } = require('express');
const router = Router();
const { processRecipePatch } = require("../../middleware/recipes_middleware")

router.patch("/", processRecipePatch);

module.exports = router;