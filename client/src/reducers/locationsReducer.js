import { FETCH_STATES, FETCH_CITIES, SELECT_STATES, SELECT_CITIES, FETCH_WEEK } from '../actions/types';

const initialState = {
	selectedState: {},
	selectedCoords: '',
	states: [],
	cities: [],
	weekDays: []
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
				selectedState: state.states.filter( s => s.value === action.payload ).pop()
			};
		case SELECT_CITIES:
			return {
				...state,
				selectedCoords: action.payload
			};
		case FETCH_WEEK:
			return {
				...state,
				weekDays: action.payload
			};
		default:
			return state;
	}
}
