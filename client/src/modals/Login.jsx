import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(user);
			const res = await axios.post('http://localhost:5000/signup', body, config);
			console.log(res.data);
		} catch (err) {
			console.error(err.response);
		}
	};

	return (
		<Fragment>
			<div className=' px-3 py-3  bg-light text-dark'>
				<Card.Body className='p-1'>
					<h2 className='text-center '>
						<u>Login:</u>
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
						</Col>
					</Row>
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
					</Row>
					<div className='text-center'>
						<Button className='btn btn-primary  btn-lg btn-block w-50 ' type='submit'>
							Login
						</Button>
					</div>
				</Form>
			</div>
		</Fragment>
	);
};

export default Login;
