import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

import eventReducer from "../../features/event/eventReducer";

const rootReducer = combineReducers({
	firebase: firebaseReducer,
  firestore: firestoreReducer,
	form: formReducer,
	events: eventReducer,
	toastr: toastrReducer
});

export default rootReducer;
