import { combineReducers } from 'redux';
import locationsReducer from './locationsReducer';
import settingsReducer from './settingsReducer';
import calendarReducer from './calendarReducer';

export default combineReducers({
	locations: locationsReducer,
	settings: settingsReducer,
	calendar: calendarReducer
})
