import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'https://web.intelektaz.com/api/flixie';

export async function authGoogle(code) {
    try {
        const response = await axios.get(`${baseURL}/auth/callback`, 
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

export async function signupUser(login, password, email, genres, avatar_link) {
  try {
    const response = await axios.post(
      `${baseURL}/auth/registration`, {
        "login": login,
        "password": password,
        "email": email,
        "genres": genres,
        "avatar_link": avatar_link
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации пользователя", error);
    throw error;
  }
}

export async function signupSubmit(token) {
    try {
        const response = await axios.get(`${baseURL}/auth/submit`, 
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

export async function loadImage(avatar) {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await axios.post(
      `${baseURL}/auth/load_avatar`,
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке изображения", error);
    throw error;
  }
}

export async function loginUser(login, password) {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`, {
        "login": login,
        "password": password,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при авторизации пользователя", error);
    throw error;
  }
}

