import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const RegisterUser = async (data) => {
    console.log('Sending data:', Array.from(data.entries())); // Better FormData logging

    try {
        const response = await axios.post(`${API_URL}user`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error.response?.data || {
            message: 'Gagal Membuat Akun',
            errors: error.response?.data?.errors || {}
        };
    }
}

export const UpdateUser = async (data, id) => {
    const token = localStorage.getItem('token');

    // data.forEach((value, key) => {
    //     console.log(`${key}:`, value);
    // });

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }

    try {
        if (data instanceof FormData) {
            const response = await axios.post(`${API_URL}user/${id}`, data, header)
            return (response.data)
        } else {
            const response = await axios.patch(`${API_URL}user/${id}`, data, header)
            return (response.data)
        }
    } catch (error) {
        throw error.response?.data || { message: 'Gagal mengupdate Akun' };
    }
}

export const GetMembersData = async () => {
    const token = localStorage.getItem('token')

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    try {
        const response = await axios.get(`${API_URL}users`, header)
        return response
    } catch (error) {
        throw error.response?.data || { message: 'Gagal Mengambil Data Anggota' };
    }
}