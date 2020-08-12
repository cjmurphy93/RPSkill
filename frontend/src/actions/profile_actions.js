import * as UserUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => {
    debugger
    return {
        type: RECEIVE_USER,
        user,
    }
}

export const getUser = username => dispatch => {
    debugger
    return UserUtil.getUser(username).then(user => {
        return dispatch(receiveUser(user.data))
    })
}