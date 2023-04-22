const { Router } = require('express');
const router = Router();
const { processReviewPost } = require("../../middleware/review_middleware")

router.post("/", processReviewPost);

module.exports = router;