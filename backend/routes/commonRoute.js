const express = require('express');
const commonController = require('../controllers/commonController');

const router = express.Router();

router.get('/allCars', commonController.getAllCars);
router.get('/carsInDealership/:dealership_id', commonController.getCarsInDealership);
router.post('/addVehicle', commonController.addVehicle);
router.get('/dealsInDealership/:dealership_id', commonController.getDealsInDealership);

module.exports= router;
