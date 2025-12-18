import axios from 'axios';

export async function getSessions(token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/sessions`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сессий пользователя", error);
        return error; 
    }
}

export async function createSession(session_name, token) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/sessions`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                  session_name: session_name
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании новой сессии", error);
        return error; 
    }
}

export async function getSessionParticipants(session_id, token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/sessions/${session_id}/participants`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                  session_id: session_id
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении участников сессии", error);
        return error; 
    }
}

export async function sendJoinSession(session_id, token) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/sessions/${session_id}/join`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                  session_id: session_id
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при приглащении пользователя в сессию", error);
        return error; 
    }
}