import axios from 'axios';

export const authService = {
  signup,
  signin,
};

const url = 'https://trivia-master.fly.dev';

async function signup(username: string, password: string): Promise<boolean> {
  const usernameAndPassword = { username, password };
  try {
    const response = await axios.post(url + '/user/signup', usernameAndPassword, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error(`Account creation failed: ${error}`);
    return false;
  }
}

async function signin(username: string, password: string): Promise<string | undefined> {
  const usernameAndPassword = { username, password };
  try {
    const response = await axios.post(url + '/user/signin', usernameAndPassword, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.token);
    return response.data.token;
  } catch (error) {
    console.error(`Login failed: ${error}`);
    return;
  }
}
