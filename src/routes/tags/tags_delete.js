const { Router } = require('express');
const router = Router();
const { processTagDelete } = require("../../middleware/tags_middleware")

router.delete("/", processTagDelete);



module.exports = router;