import axios from 'axios';

export const getUser = username => {
    debugger
    return axios.get(`/api/users/${username}`)
}