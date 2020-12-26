const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    GET /users
// @desc     Get all users
// @access   Private

router.post('/', auth, async (req, res) => {
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
});

module.exports = router;
