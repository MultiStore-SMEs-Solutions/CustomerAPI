const { Router } = require('express');
const router = Router();
const { processTagMenuPost } = require("../../middleware/tags_middleware")

router.post("/", processTagMenuPost );

module.exports = router;