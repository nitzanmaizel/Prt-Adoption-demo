const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}
			// Get users gravatar ==>
			const avatar = gravatar.url(email, {
				s: '200', // Size
				r: 'pg', // rating
				d: 'mm', // default
			});
			// Create User fom model ==>
			user = new User({
				firstName,
				lastName,
				email,
				avatar,
				password,
				phoneNumber,
			});
			// Encrypt password ==>
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// Save the User ==>
			await user.save();
			// Return jsonwebtoken ==>
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) {
					throw err;
				}
				res.json({ token });
			});
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
