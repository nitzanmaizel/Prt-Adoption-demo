const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Pet = require('../../models/Pet');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

// @route    POST /pets
// @desc     Add pet
// @access   Privet

router.post(
	'/',
	[
		auth,
		[
			check('type', 'Type name is required').not().isEmpty(),
			check('name', 'Name name is required').not().isEmpty(),
			check('adoptionStatus', 'Adoption Status is required').not().isEmpty(),
			check('image', 'Image  is required').not().isEmpty(),
			check('height', 'Height  is required').not().isEmpty(),
			check('weight', 'Weight  is required').not().isEmpty(),
			check('color', 'Color  is required').not().isEmpty(),
			check('bio', 'Bio  is required').not().isEmpty(),
			check('hypoallergenic', 'Hypoallergenic  is required').not().isEmpty(),
			check('dietaryRestrictions', 'Dietary Restrictions  is required').not().isEmpty(),
			check('breed', 'Breed  is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			type,
			name,
			adoptionStatus,
			image,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			dietaryRestrictions,
			breed,
		} = req.body;
		try {
			// Create User fom model ==>
			let pet = new Pet({
				type,
				name,
				adoptionStatus,
				image,
				height,
				weight,
				color,
				bio,
				hypoallergenic,
				dietaryRestrictions,
				breed,
			});
			// Save the User ==>
			await pet.save();
			res.json(pet);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET /pets/:id
// @desc     Get Pet by ID
// @access   Privet

router.get('/:id', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id);
		if (!pet) {
			return res.status(400).send({ msg: 'Pet not found' });
		}

		res.json(pet);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Pet not found ' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    PUT /pets/:id
// @desc     Edit Pet by ID
// @access   Privet

router.put(
	'/:id',
	[
		auth,
		[
			check('type', 'Type name is required').not().isEmpty(),
			check('name', 'Name name is required').not().isEmpty(),
			check('adoptionStatus', 'Adoption Status is required').not().isEmpty(),
			check('image', 'Image  is required').not().isEmpty(),
			check('height', 'Height  is required').not().isEmpty(),
			check('weight', 'Weight  is required').not().isEmpty(),
			check('color', 'Color  is required').not().isEmpty(),
			check('bio', 'Bio  is required').not().isEmpty(),
			check('hypoallergenic', 'Hypoallergenic  is required').not().isEmpty(),
			check('dietaryRestrictions', 'Dietary Restrictions  is required').not().isEmpty(),
			check('breed', 'Breed  is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			type,
			name,
			adoptionStatus,
			image,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			dietaryRestrictions,
			breed,
		} = req.body;

		const updatePet = {
			type,
			name,
			adoptionStatus,
			image,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			dietaryRestrictions,
			breed,
		};

		try {
			const pet = await Pet.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: updatePet },
				{ new: true }
			);
			res.json(pet);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
