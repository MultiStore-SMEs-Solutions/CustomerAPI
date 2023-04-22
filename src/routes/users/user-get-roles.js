const { Router } = require('express');
const router = Router();
const { processGetAllRoles } = require("../../middleware/users_middleware")

router.get("/", processGetAllRoles );


module.exports = router;