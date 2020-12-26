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
		let users = await User.find({}).select('-password');
		res.json(users);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

// @route    GET /users/:id/full
// @desc     Get user by ID
// @access   Private

router.get('/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.massage);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'User not found ' });
		}
		res.status(500).send('Server error');
	}
});

// @route    PUT /users/:id
// @desc     Update user by ID
// @access   Private

router.put(
	'/:id',
	[
		auth,
		[
			check('firstName', 'First name is required').not().isEmpty(),
			check('lastName', 'Last name is required').not().isEmpty(),
			check('email', 'Email is invalid').isEmail(),
			check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
			check('phoneNumber', 'Phone number is invalid').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { firstName, lastName, email, password, phoneNumber, bio } = req.body;
			const updateUser = {
				firstName,
				lastName,
				email,
				password,
				phoneNumber,
				phoneNumber,
				bio,
			};

			const user = await User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: updateUser },
				{ new: true }
			);
			res.json(user);
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
