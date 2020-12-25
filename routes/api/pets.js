const express = require('express');
const router = express.Router();

// @route    GET api/pets
// @desc     Test route
// @access   Public

router.get('/', (req, res) => {
	res.send('Hello World This is the Pets route');
});

module.exports = router;
