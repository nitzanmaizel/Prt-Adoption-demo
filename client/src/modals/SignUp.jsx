import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Col, Row, Modal, Spinner } from 'react-bootstrap';

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
		phoneNumber: '',
	});
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onSubmitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (password !== password2) {
			console.log('Password do not match');
		} else {
			const newUser = {
				firstName,
				lastName,
				email,
				password,
				phoneNumber,
			};
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				const body = JSON.stringify(newUser);
				const res = await axios.post('http://localhost:5000/signup', body, config);
				setLoading(false);
				console.log(res.data);
			} catch (err) {
				console.error(err.response);
			}
		}
	};

	const { firstName, lastName, email, password, password2, phoneNumber } = formData;
	return (
		<Fragment>
			<Button variant='primary' onClick={handleShow}>
				Login
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Card.Body className='p-1'>
					<h2 className='text-center '>
						<u>Sign Up :</u>
					</h2>
				</Card.Body>
				<Form
					method='POST'
					onSubmit={(e) => {
						onSubmitForm(e);
					}}
				>
					<Row>
						<Col>
							<Form.Label>First Name:</Form.Label>
							<Form.Control
								type='text'
								placeholder='First Name...'
								name='firstName'
								value={firstName}
								onChange={(e) => onChange(e)}
								required
							></Form.Control>
						</Col>
						<Col>
							<Form.Label>Last Name:</Form.Label>
							<Form.Control
								type='text'
								name='lastName'
								value={lastName}
								onChange={(e) => onChange(e)}
								placeholder='Last Name...'
								required
							></Form.Control>
						</Col>
					</Row>
					<Form.Group id='email'>
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
							placeholder='Email...'
							required
						></Form.Control>
					</Form.Group>
					<Row>
						<Col>
							<Form.Group id='password'>
								<Form.Label>password:</Form.Label>
								<Form.Control
									type='password'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
									placeholder='password...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group id='password2'>
								<Form.Label>Confirm Password:</Form.Label>
								<Form.Control
									type='password'
									name='password2'
									value={password2}
									onChange={(e) => onChange(e)}
									placeholder='Confirm Password...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Form.Group id='phoneNumber'>
							<Form.Label>Phone Number:</Form.Label>
							<Form.Control
								type='text'
								name='phoneNumber'
								value={phoneNumber}
								onChange={(e) => onChange(e)}
								placeholder='Phone Number...'
								required
							></Form.Control>
						</Form.Group>
					</Row>
					<div className='text-center'>
						<Button
							className='btn btn-primary mt-3 btn-lg btn-block w-50 '
							type='submit'
						>
							{loading && (
								<Spinner
									animation='border'
									role='status'
									style={{ margin: '0px 5px 0px 0px' }}
								>
									<span className='sr-only mr-2'></span>
								</Spinner>
							)}
							Log In
						</Button>
					</div>
				</Form>
			</Modal>
		</Fragment>
	);
};

export default SignUp;
