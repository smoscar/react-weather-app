import React, { Component } from 'react';
import './location.css';

class Location extends Component {
	constructor() {
		super();
		this.state = {
			selectedState: '',
			selectedCity: '',
			states: [],
			cities: []
		};
		
		//The object this is binded to the event handlers
		this.handleStatesChange = this.handleStatesChange.bind(this)
		this.handleCitiesChange = this.handleCitiesChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	//Function that handles the update of the state dropdown TODO set state to loading
	handleStatesChange(event){
		
		const selectedState = event.target.value;
		
		fetch('/api/v1/cities/us/'+ selectedState +'/')
			.then( res => res.json() )
			.then( cities => {
				cities.sort( (a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1 );
				
				this.setState({
					selectedState: selectedState,
					selectedCity: (cities[0].lat + "," + cities[0].lng),
					cities: cities
				}, () => console.log('Cities fetched..', cities));
			})
	}
	
	//Function that handles the update of the city dropdown
	handleCitiesChange(event){
		
		const selectedCity = event.target.value;
		
		this.setState({
			selectedCity: selectedCity
		});
	}
	
	//Function that handles the form Submit
	onSubmit(event){
		event.preventDefault()
		
		const post = {
			coords: this.state.selectedCity
		}
		
		fetch('/api/v1/getWeek', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(post)
		})
		.then( res => res.json() )
		.then( week => console.log(week) )
	}
	
	componentDidMount(){
		//The states in the US are fetched from the API
		fetch('/api/v1/cities/us/')
			.then(res => res.json())
			.then(states => {
				states.sort( (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 );
				
				//After sorting the states, the first is used to get the cities
				this.setState({
					selectedState: states[0].value,
					states: states,
				}, () => console.log("States fetched..", states));
				
				//The event handler gets triggered to get the initial cities
				this.handleStatesChange({target: {value: states[0].value}});
			})
	}
	
  render() {
    return (
      <div>
				<form onSubmit={this.onSubmit}>
					<select name="state" value={this.state.selectedState} onChange={this.handleStatesChange}>
					 {this.state.states.map( state => 
						 <option key={state.id} value={state.value}>
						 	{state.name}
						 </option>
					 )}
					</select>
					<select name="city" value={this.state.selectedCity} onChange={this.handleCitiesChange}>
					 {this.state.cities.map( city => 
						 <option key={city.id} value={city.lat + "," + city.lng}>
						 	{city.city}
						 </option>
					 )}
					</select>
					<button type="submit">Submit</button>
				</form>
      </div>
    );
  }
}

export default Location;
