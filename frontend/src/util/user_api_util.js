import axios from 'axios';

export const getUser = username => {
    
    return axios.get(`/api/users/${username}`)
}