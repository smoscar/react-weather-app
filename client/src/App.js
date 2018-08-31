import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/calendar/calendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Calendar />
      </div>
    );
  }
}

export default App;
