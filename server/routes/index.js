const router = require('express').Router();

router.route('/')
 .get((req, res) => {
   res.status(200).send({ message: 'Welcome to DMS API' });
 });

module.exports = router;
