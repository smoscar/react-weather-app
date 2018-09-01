import { SELECT_DAY } from '../actions/types';

//Action triggered when a week day is selected
export const updateWeekDay = day => dispatch => {
	dispatch({
		type: SELECT_DAY,
		payload: day
	});
}
