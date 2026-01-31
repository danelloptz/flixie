import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'https://web.intelektaz.com/flixie';

export async function getNotifications(token) {
    try {
        const response = await axios.get(`${baseURL}/notifications`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    limit: 10
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка уведомлений", error);
        return error; 
    }
}