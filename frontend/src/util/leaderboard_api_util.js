import axios from "axios";

export const users = () => {
    return axios.get("/api/leaderboard");
}

export const updateUserScore = username => {
    return axios.patch(`/api/users/${username}?score=200`);
}