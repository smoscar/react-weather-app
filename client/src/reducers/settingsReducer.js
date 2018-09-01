import { UPDATE_TIME } from '../actions/types';

const initialState = {
	temp: '',
	wind: '',
	humidity: '',
	time: 12
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_TIME:
			return {
				...state,
				time: action.payload
			};
		default:
			return state;
	}
}
