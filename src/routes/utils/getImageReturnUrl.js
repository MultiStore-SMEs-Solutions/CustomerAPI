const { Router } = require('express');
const router = Router();
const { getImageFileURL } = require("../../middleware/getImageFileURL")

router.post("/", getImageFileURL);

module.exports = router;