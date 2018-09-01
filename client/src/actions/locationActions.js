import { FETCH_STATES, FETCH_CITIES, SELECT_STATES, SELECT_CITIES, FETCH_WEEK } from './types';

//The states in the US are fetched from the API
export const fetchStates = () => dispatch => fetch('/api/v1/cities/us/')
		.then(res => res.json())
		.then(states => {
			states.sort( (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 );
			
			//After sorting the states, the result gets dispatched
			dispatch({
				type: FETCH_STATES,
				payload: states
			})
		})

//The cities in the selected state are fetched from the API
export const fetchCities = selectedState => dispatch => fetch('/api/v1/cities/us/'+ selectedState +'/')
		.then( res => res.json() )
		.then( cities => {
			cities.sort( (a, b) => a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1 );
			
			//After sorting the cities, the result gets dispatched
			dispatch({
				type: FETCH_CITIES,
				payload: cities
			});
		})

//Action triggered when a state is selected
export const selectState = selectedState => dispatch => {
	dispatch({
		type: SELECT_STATES,
		payload: selectedState
	});
}

//Action triggered when a city is selected
export const selectCity = selectedCoords => dispatch => {
	dispatch({
		type: SELECT_CITIES,
		payload: selectedCoords
	});
}

//Action that fetches the days for the previous week for the selected location
export const fetchWeekForLocation = locationCoords => dispatch => fetch('/api/v1/getWeek', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify( locationCoords )
	})
	.then( res => res.json() )
	.then( week => {
		//The week data is dispatched
		dispatch({
			type: FETCH_WEEK,
			payload: week
		});
	})
