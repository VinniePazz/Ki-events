import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr';

import eventReducer from "../../features/event/eventReducer";

const rootReducer = combineReducers({
	form: formReducer,
	events: eventReducer,
	toastr: toastrReducer
});

export default rootReducer;
