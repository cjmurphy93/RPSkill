import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import reducer from './errors_reducer';


const RootReducer = combineReducers({
    session,
    errors,
    reducer
});

export default RootReducer;