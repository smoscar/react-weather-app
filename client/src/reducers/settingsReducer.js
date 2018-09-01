import { UPDATE_TIME, FETCH_DAY } from '../actions/types';

const initialState = {
	temp: 0,
	wind: 0,
	humidity: 0,
	time: 12,
	cloudy: false,
	day: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_TIME:
			return Object.assign({}, state, action.payload);
		case FETCH_DAY:
			return {
				...state,
				day: action.payload
			};
		default:
			return state;
	}
}
