const express = require('express');
const travelController = require('./../controller/travelController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(travelController.aliasTopTravels, travelController.getAllTravels);

router.route('/travel-stats').get(travelController.getTravelStats);
router.route('/monthly-plan/:year').get(travelController.getMonthlyPlan);

router
  .route('/')
  .get(travelController.getAllTravels)
  .post(travelController.createTravel);

router
  .route('/:id')
  .get(travelController.getTravel)
  .patch(travelController.updateTravel)
  .delete(travelController.deleteTravel);

module.exports = router;
