const express = require('express');
const travelController = require('./../controller/travelController');

const router = express.Router();

router
  .route('/')
  .get(travelController.getAllTravels)
  .post(travelController.checkBody, travelController.createTravel);

router
  .route('/:id')
  .get(travelController.getTravel)
  .patch(travelController.updateTravel)
  .delete(travelController.deleteTravel);

module.exports = router;
