import axios from 'axios';

export async function authGoogle(code) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/auth/google/callback', 
            {
                params: {
                    code: code
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при авторизации гугл", error);
        return error; 
    }
}
