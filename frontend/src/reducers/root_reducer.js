import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import hiscores from './hiscores_reducer';


const RootReducer = combineReducers({
    session,
    errors,
    hiscores
});

export default RootReducer;