var express = require('express');
var router = express.Router();
var ctrlReviews = require('./review.controller');

router.get('/reviews', ctrlReviews.reviewsReadAll);
router.get('/reviews/:reviewID', ctrlReviews.reviewsReadOne);
router.post('/reviews', ctrlReviews.reviewsCreate);
router.put('/reviews/:reviewID', ctrlReviews.reviewsUpdateOne);
router.delete('/reviews/:reviewID', ctrlReviews.reviewsDeleteOne);
module.exports = router;
