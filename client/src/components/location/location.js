import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './location.css';

import { connect } from 'react-redux';
import { fetchStates, fetchCities, selectState, selectCity, fetchWeekForLocation } from '../../actions/locationActions';

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			isActive: false
		};
		
		//The object this is binded to the event handlers
		this.handleStatesChange = this.handleStatesChange.bind(this)
		this.handleCitiesChange = this.handleCitiesChange.bind(this)
		this.activateHeader = this.activateHeader.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	//Function that sets the state of the component as active
	activateHeader(event){
		this.setState({isActive: true});
	}
	
	//Function that handles the update of the state dropdown TODO set state to loading
	handleStatesChange(event){
		
		const selectedState = event.target.value;
		const that = this
		
		//Set the state to loading
		this.setState({loading: true});
		
		this.props.selectState(selectedState)
		this.props.fetchCities(selectedState)
			.then(() => {
				//The first city's coordenates are selected
				let firstCity = that.props.cities[0];
				this.props.selectCity(firstCity.lat + "," + firstCity.lng);
				
				const post = {
					coords: this.props.selectedCoords
				}
				this.props.fetchWeekForLocation(post)
					.then(() => this.setState({loading: false}));
			})
	}
	
	//Function that handles the update of the city dropdown
	handleCitiesChange(event){
		
		const selectedCoords = event.target.value;
		this.props.selectCity(selectedCoords);
	}
	
	//Function that handles the form Submit
	onSubmit(event){
		event.preventDefault()
		
		const post = {
			coords: this.props.selectedCoords
		}
		this.props.fetchWeekForLocation(post)
			.then(() => {
				//The loading and active states get removed
				this.setState({loading: false});
				this.setState({isActive: false});
			});
	}
	
	componentDidMount(){
		const that = this;
		this.setState({loading: true});
		
		this.props.fetchStates()
			.then(() => {
				//The event handler gets triggered to get the initial cities
				this.handleStatesChange({target: {value: that.props.states[0].value}});
			})
	}
	
  render() {
		var headerClasses = (this.state.loading ? 'loading ' : '') + (this.state.isActive ? 'active' : '');
		
    return (
      <header className={headerClasses} onClick={this.activateHeader}>
				<form onSubmit={this.onSubmit}>
					<select name="state" value={this.props.selectedState.value} onChange={this.handleStatesChange}>
					 {this.props.states.map( state => 
						 <option key={state.id} value={state.value}>
						 	{state.name}
						 </option>
					 )}
					</select>
					<select name="city" value={this.props.selectedCoords} onChange={this.handleCitiesChange}>
					 {this.props.cities.map( city => 
						 <option key={city.id} value={city.lat + "," + city.lng}>
						 	{city.city}
						 </option>
					 )}
					</select>
					<button type="submit">Submit</button>
				</form>
      </header>
    );
  }
}

Location.propTypes = {
	fetchStates: PropTypes.func.isRequired,
	fetchCities: PropTypes.func.isRequired,
	fetchWeekForLocation: PropTypes.func.isRequired,
	selectState: PropTypes.func.isRequired,
	selectedState: PropTypes.object.isRequired,
	selectedCoords: PropTypes.string.isRequired,
	states: PropTypes.array.isRequired,
	cities: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	selectedState: state.locations.selectedState,
	selectedCoords: state.locations.selectedCoords,
	states: state.locations.states,
	cities: state.locations.cities
})

const mapDispatchToProps = {
	fetchStates: fetchStates,
	fetchCities: fetchCities,
	selectState: selectState,
	selectCity: selectCity,
	fetchWeekForLocation: fetchWeekForLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
