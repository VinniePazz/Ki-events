import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import eventReducer from "../../features/event/eventReducer";

const rootReducer = combineReducers({
	form: formReducer,
  events: eventReducer
});

export default rootReducer;
