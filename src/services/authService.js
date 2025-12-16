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

export async function signupUser(login, password, email, genres, avatar) {
  try {
    const formData = new FormData();

    formData.append("login", login);
    formData.append("password", password);
    formData.append("email", email);

    formData.append("genres", genres);

    // файл
    formData.append("avatar", avatar);

    const response = await axios.post(
      "http://127.0.0.1:8000/registration/",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации пользователя", error);
    throw error;
  }
}

export async function signupSubmit(token) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/registration/submit', 
            {
                params: {
                    token: token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при подтверждении почты", error);
        return error; 
    }
}

