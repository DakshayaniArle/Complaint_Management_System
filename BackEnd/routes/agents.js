const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

router.get('/', async (req, res) => {
  const agents = await Agent.find().populate('complaints');
  res.json(agents);
});

module.exports = router;
