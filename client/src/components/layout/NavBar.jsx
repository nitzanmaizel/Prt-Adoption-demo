import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = () => {
	return (
		<>
			<Router>
				<Navbar bg='dark' variant='dark' style={{ minWidth: 700 }}>
					<Nav className='mr-auto'>
						<Link to='/' className='p-2'>
							Home
						</Link>
						<Link to='/login' className='p-2'>
							Login
						</Link>
						<Link to='/signup' className='p-2'>
							Sign Up
						</Link>
					</Nav>
					<Form inline>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-info'>Search</Button>
					</Form>
				</Navbar>
			</Router>
		</>
	);
};

export default NavBar;
