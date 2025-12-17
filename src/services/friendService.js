import axios from 'axios';

export async function sendFriendNotification(friend_id, token) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/friends/${friend_id}/request`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    friend_id: friend_id
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при отправке запроса в друзья", error);
        return error; 
    }
}