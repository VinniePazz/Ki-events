import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

import modalsReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import eventReducer from "../../features/event/eventReducer";
import asyncReducer from '../../features/async/asyncReducer';


const rootReducer = combineReducers({
	firebase: firebaseReducer,
  firestore: firestoreReducer,
	form: formReducer,
	modals: modalsReducer,
	auth: authReducer,
  async: asyncReducer,	
	events: eventReducer,
	toastr: toastrReducer
});

export default rootReducer;
