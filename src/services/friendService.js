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

export async function getFriends(token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/friends`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка друзей", error);
        return error; 
    }
}

export async function approveRequest(friend_id, token) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/friends/${friend_id}`, {},
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
        console.error("Ошибка при добавлении в друзья", error);
        return error; 
    }
}