import { SELECT_DAY } from '../actions/types';

const initialState = {
	selectedDay: 0
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SELECT_DAY:
			return {
				...state,
				selectedDay: action.payload
			};
		default:
			return state;
	}
}
