import { FETCH_STATES, FETCH_CITIES, SELECT_STATES } from '../actions/types';

const initialState = {
	selectedState: {},
	selectedCity: {},
	states: [],
	cities: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_STATES:
			return {
				...state,
				states: action.payload,
				selectedState: action.payload[0]
			}
		case FETCH_CITIES:
			return {
				...state,
				cities: action.payload
			}
		case SELECT_STATES:
			return {
				...state,
				selectedState: state.states.filter( s => s.value == action.payload ).pop()
			};
		default:
			return state;
	}
}
