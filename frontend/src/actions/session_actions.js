import jwt_decode from 'jwt-decode';
import * as APIUtil from "../util/session_api_util";
import * as LeaderboardUtil from "../util/leaderboard_api_util";

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_SCORE = "RECEIVE_SCORE";



export const receiveCurrentUser = (currentUser) => {
    
    return {type: RECEIVE_CURRENT_USER,
    currentUser}
};

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const removeErrors = () => ({
        type: REMOVE_ERRORS,
});

export const receiveUsers = (users) => {
    return{
        type: RECEIVE_USERS,
        users
    }
};

export const receiveScore = username => {
    return {
        type: RECEIVE_SCORE,
        username
    }
}

export const signup = (user) => dispatch => (
    APIUtil.signup(user).then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
    }).catch((err) => {
        dispatch(receiveErrors(err.response.data));
    })
);

export const login = (user) => dispatch => (
    APIUtil.login(user)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        }).catch((err) => {
            dispatch(receiveErrors(err.response.data));
        })
);

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
}

export const clearErrors = () => dispatch => {
    dispatch(removeErrors())
}

export const scores = () => dispatch => (
    LeaderboardUtil.users()
        .then((res) => {
            dispatch(receiveUsers(res.data));
        }).catch((err) => {
            dispatch(receiveErrors(err.response.data));
        })
);

export const updateScore = username => dispatch => {
    LeaderboardUtil.updateUserScore(username)
        .then(res => {
            console.log("update score");
        });
}