import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';

import Calendar from './components/calendar/calendar';
import Location from './components/location/location';

import store from './store';

class App extends Component {
  render() {
    return (
			<Provider store={store}>
	      <div className="App time12 cloudy">
					<div className="wrapper">
						<section class = "AppContainer">
		        	<Location />
		        	<Calendar />
						</section>
					</div>
	      </div>
			</Provider>
    );
  }
}

export default App;
