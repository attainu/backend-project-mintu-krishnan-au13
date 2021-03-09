const express = require('express');
const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');

const router = express.Router({});

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

// router
//   .route('/:id')
//   .get(reviewController.getReview)
//   .patch(
//     authController.restrictTo('user', 'admin'),
//     reviewController.updateReview
//   )
//   .delete(
//     authController.restrictTo('user', 'admin'),
//     reviewController.deleteReview
//   );

module.exports = router;
