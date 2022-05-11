const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sample node app is healthy');
});

module.exports = router;
