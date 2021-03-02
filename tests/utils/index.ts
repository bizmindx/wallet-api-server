import axios from 'axios';

export const postendpointHelper = async <T>(url: string, data: T) => {
    try {
        const base = 'http://localhost:3000';
        const response  = await axios.post(base + url, data)
        return response;
    } catch (error) {
        return error.response;
    }
}