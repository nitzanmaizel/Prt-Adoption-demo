import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import SignUp from './modals/SignUp';
import Login from './modals/Login';

function App() {
	return (
		<Router>
			<Fragment>
				<NavBar />
				<section className='container'>
					<Switch>
						<Route exact path='/' />
						<Route exact path='/signup' component={SignUp} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);
}

export default App;
