const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route    POST api/users
// @desc     Sign up user
// @access   Public

router.post(
	'/',
	[
		check('firstName', 'First name is required').not().isEmpty(),
		check('lastName', 'Last name is required').not().isEmpty(),
		check('email', 'Email is invalid').isEmail(),
		check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
		check('phoneNumber', 'Phone number is invalid').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { firstName, lastName, email, password, phoneNumber } = req.body;
		try {
			// See if the User exists ==>
			// Encrypt password ==>
			// Get users gravatar ==>
			// Save the User ==>
			// Return jsonwebtoken ==>
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server Error');
		}

		res.send('Hello World This is the Users route');
	}
);

module.exports = router;
