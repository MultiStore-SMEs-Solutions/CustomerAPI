const { Router } = require('express');
const router = Router();
const { processTagPatch } = require("../../middleware/tags_middleware")

router.patch("/", processTagPatch );

module.exports = router;