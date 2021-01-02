import axios from "axios";

export const users = () => {
    debugger
    return axios.get("/api/leaderboard");
}

export const updateUserScore = username => {
    debugger
    return axios.patch(`/api/users/${username}?score=200`);

    // return axios.patch(`http://localhost:5000/api/users/${username}`, username, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
    // return axios.post(`localhost:5000/api/users/${username}`, {data: username, _method: "patch", 
    //      headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Access-Control-Allow-Origin": "*",
    //   }});
}