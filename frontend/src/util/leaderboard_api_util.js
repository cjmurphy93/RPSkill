import axios from "axios";

export const users = () => {
    debugger
    return axios.get("/api/leaderboard");
}

export const updateUserScore = username => {
    debugger
    return axios.patch(`/api/users/${username}?score=200`);
}