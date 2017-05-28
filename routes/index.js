'use strict';

const express = require('express');
const router = express.Router();
const index = require('../controllers/index');

router.get('/', index.getGame);

module.exports = router;
