wimport * as UserUtil from "../util/user_api_util";
import User from "../../../models/User";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user,
    }
}

export const getUser = user => dispatch => {
    return UserUtil.getUser(user).then(user => {
        return dispatch(receiveUser(user))
    })
}