import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'https://web.intelektaz.com';

export async function getSessions(token) {
    try {
        const response = await axios.get(`${baseURL}/sessions`,
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
        const response = await axios.post(`${baseURL}/sessions`, {},
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
        const response = await axios.get(`${baseURL}/sessions/${session_id}/participants`,
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

export async function sendInviteSession(session_id, target_user_id, token) {
    try {
        const response = await axios.post(`${baseURL}/sessions/${session_id}/invite/${target_user_id}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при приглащении пользователя в сессию", error);
        return error; 
    }
}

export async function aprooveJoin(session_id, token) {
    try {
        const response = await axios.post(`${baseURL}/sessions/${session_id}/join`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при одобрении запроса на добавление в сесиию", error);
        return error; 
    }
}

export async function getFilmBatch(session_id, token) {
    try {
        const response = await axios.get(`${baseURL}/recommendation/batch`,
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
        console.error("Ошибка при получении батча сессии", error);
        return error; 
    }
}

export async function voteFilm(film_id, session_id, vote, token) {
    try {
        const response = await axios.post(`${baseURL}/recommendation/${film_id}/vote`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                  film_id: film_id,
                  session_id: session_id,
                  vote: vote
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при отправке голоса за фильм", error);
        return error; 
    }
}

export async function getFilmById(film_id, token) {
    try {
        const response = await axios.get(`${baseURL}/films/${film_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении фильма по айди", error);
        return error; 
    }
}