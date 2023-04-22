const { Router } = require('express');
const router = Router();
const { processUserLogin } = require("../../middleware/users_middleware")

router.post("/", processUserLogin );


module.exports = router;