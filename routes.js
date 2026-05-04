'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import collection from './controllers/collection.js';
import about from './controllers/about.js';

// welcome page
router.get('/', start.createView);

// dashboard page
router.get('/dashboard', dashboard.createView);

// collection page
router.get('/collection/:id', collection.createView);

// about page
router.get('/about', about.createView);

router.post('/dashboard/addregion', dashboard.addRegion);
router.post('/collection/:id/adddestination', collection.addDestination);


router.get('/dashboard/deleteregion/:id', dashboard.deleteRegion);
router.get('/collection/:id/deletedestination/:destinationid', collection.deleteDestination);


router.post('/collection/:id/updateDestination/:destinationid', collection.updateDestination);

export default router;




