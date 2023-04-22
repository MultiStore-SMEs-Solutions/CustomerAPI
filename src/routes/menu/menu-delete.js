const { Router } = require('express');
const router = Router();
const { processMenuDelete } = require("../../middleware/menu_middleware")

router.delete("/", processMenuDelete );



module.exports = router;