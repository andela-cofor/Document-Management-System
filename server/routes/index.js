const router = require('express').Router();

router.route('/')
 .get((req, res) => {
   res.status(200).send({ message: 'hello' });
 });

module.exports = router;
