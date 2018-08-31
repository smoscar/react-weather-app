import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Calendar from './components/calendar/calendar';
import Location from './components/location/location';

const store = createStore(() => [], {}, applyMiddleware())

class App extends Component {
  render() {
    return (
			<Provider store={store}>
	      <div className="App">
	        <header className="App-header">
	          <img src={logo} className="App-logo" alt="logo" />
	          <h1 className="App-title">Welcome to React</h1>
	        </header>
	        <Location />
	        <Calendar />
	      </div>
			</Provider>
    );
  }
}

export default App;
