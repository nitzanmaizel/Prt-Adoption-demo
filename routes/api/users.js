const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    GET /users
// @desc     Get all users
// @access   Private

router.get('/', auth, async (req, res) => {
	try {
		let users = await User.find({});
		res.json(users);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
