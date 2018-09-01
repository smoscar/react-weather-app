import { combineReducers } from 'redux';
import locationsReducer from './locationsReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
	locations: locationsReducer,
	settings: settingsReducer
})
