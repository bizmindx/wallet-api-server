import axios from 'axios';

export const postendpointHelper = async <T>(url: string, data: T) => {
    try {
        const base = 'http://localhost:3000';
        const { data: response } = await axios.post(base + url, data)
        console.log('trs',response)
        return response.data;
    } catch (error) {
        throw error;
    }
}