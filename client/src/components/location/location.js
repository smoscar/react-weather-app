import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './location.css';

import { connect } from 'react-redux';
import { fetchStates, fetchCities, selectState } from '../../actions/locationActions';

class Location extends Component {
	constructor(props) {
		super(props);
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
		
		this.props.selectState(selectedState)
		this.props.fetchCities(selectedState)
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
		const that = this;
		this.props.fetchStates()
			.then(() => {
				//The event handler gets triggered to get the initial cities
				this.handleStatesChange({target: {value: that.props.states[0].value}});
			})
	}
	
  render() {
		
		//debugger 
		
    return (
      <div>
				<form onSubmit={this.onSubmit}>
					<select name="state" value={this.props.selectedState.value} onChange={this.handleStatesChange}>
					 {this.props.states.map( state => 
						 <option key={state.id} value={state.value}>
						 	{state.name}
						 </option>
					 )}
					</select>
					<select name="city" value={this.state.selectedCity} onChange={this.handleCitiesChange}>
					 {this.props.cities.map( city => 
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

Location.propTypes = {
	fetchStates: PropTypes.func.isRequired,
	fetchCities: PropTypes.func.isRequired,
	selectState: PropTypes.func.isRequired,
	selectedState: PropTypes.object.isRequired,
	states: PropTypes.array.isRequired,
	cities: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	selectedState: state.locations.selectedState,
	states: state.locations.states,
	cities: state.locations.cities
})

const mapDispatchToProps = {
	fetchStates: fetchStates,
	fetchCities: fetchCities,
	selectState: selectState
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
