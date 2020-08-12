import {
    RECEIVE_USERS
} from "../actions/session_actions";

const _nullUsers = {};

const HiscoresReducer = (state = _nullUsers, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        default:
            return state;
    }
};

export default HiscoresReducer;