const router = require('express').Router();

router.use('/api', require('./api/index'));

module.exports = router;