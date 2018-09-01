import { UPDATE_TIME } from './types';

//Action triggered when a city is selected
export const updateTime = time => dispatch => {
	dispatch({
		type: UPDATE_TIME,
		payload: parseInt(time, 10)
	});
}
