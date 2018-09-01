import React, { Component } from 'react';
import './vendor/fontawesome/css/font-awesome.css';
import './App.css';

import { Provider } from 'react-redux';

import Wrapper from './components/wrapper/wrapper';

import store from './store';

class App extends Component {
  render() {
    return (
			<Provider store={store}>
	      <Wrapper />
			</Provider>
    );
  }
}

export default App;
