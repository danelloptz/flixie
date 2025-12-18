import axios from 'axios';

export async function getNotifications(token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/notifications`,
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