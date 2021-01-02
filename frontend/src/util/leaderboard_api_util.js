import axios from "axios";

export const users = () => {
    debugger
    return axios.get("/api/leaderboard");
}

export const updateUserScore = username => {
    debugger
    return axios.patch(`api/users/${username}`);
    // return axios.post(`localhost:5000/api/users/${username}`, {data: username, _method: "patch", 
    //      headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Access-Control-Allow-Origin": "*",
    //   }});
}