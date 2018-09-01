import { UPDATE_TIME, FETCH_DAY } from './types';

//Action triggered when a city is selected
export const updateTime = details => dispatch => {
	dispatch({
		type: UPDATE_TIME,
		payload: details
	});
}

//Action that fetches the days for the previous week for the selected location
export const fetchDayInfo = postData => dispatch => fetch('/api/v1/getDay', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify( postData )
	})
	.then( res => res.json() )
	.then( day => {
		//The week data is dispatched
		dispatch({
			type: FETCH_DAY,
			payload: day
		});
	})
