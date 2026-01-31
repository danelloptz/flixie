import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'https://web.intelektaz.com/flixie';


export async function sendFriendNotification(friend_id, token) {
    try {
        const response = await axios.post(`${baseURL}/friends/${friend_id}/request`, {},
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
        const response = await axios.get(`${baseURL}/friends`,
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
        const response = await axios.post(`${baseURL}/friends/${friend_id}`, {},
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

export async function searchUser(login, token) {
    try {
        const response = await axios.get(`${baseURL}/user/search`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    login: login,
                    limit: 10
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при поиске человека по логину", error);
        return error; 
    }
}

export async function deleteFriend(friend_id, token) {
    try {
        const response = await axios.delete(`${baseURL}/friends/${friend_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при удалении друга", error);
        return error; 
    }
}