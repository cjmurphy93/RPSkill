import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import hiscores from './hiscores_reducer';
import user from './profile_reducer';


const RootReducer = combineReducers({
    session,
    errors,
    hiscores,
    user,
});

export default RootReducer;