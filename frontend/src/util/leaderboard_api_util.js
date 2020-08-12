import axios from "axios";

export const users = () => {
    return axios.get("/api/leaderboard")
}