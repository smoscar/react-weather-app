import React, { Component } from 'react';
import './location.css';

class Location extends Component {
	constructor() {
		super();
		this.state = {
			states: [],
			cities: []
		};
	}
	
	componentDidMount(){
		fetch('/api/v1/cities/us/')
			.then(res => res.json())
			.then(states => {
				states.sort( (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 );
				
				fetch('/api/v1/cities/us/'+ states[0]['value'] +'/')
					.then( res => res.json() )
					.then( cities => {
						cities.sort( (a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1 );
						this.setState({states}, () => console.log('States fetched..', states));
						this.setState({cities}, () => console.log('Cities fetched..', cities));
					})
			})
	}
	
  render() {
    return (
      <div>
				<select>
				 {this.state.states.map( state => 
					 <option key={state.id} value={state.value}>
					 	{state.name}
					 </option>
				 )}
				</select>
				<select>
				 {this.state.cities.map( city => 
					 <option key={city.id} value={city.lat + "," + city.lng}>
					 	{city.city}
					 </option>
				 )}
				</select>
      </div>
    );
  }
}

export default Location;
