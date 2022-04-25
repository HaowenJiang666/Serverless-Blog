import { AuthenticationClient } from 'authing-js-sdk'

export const getStandardResponse = (success = true, data, message = '') => {
  if (success) {
    return { success, data };
  }
  return { success, message };
};

export const getLoginUser = async (token) => {
  const authing = new AuthenticationClient({
    appId: '6266e3fe26406ac5b2fd948a',
    appHost: 'https://kevinblog.authing.cn', 
    token,
  });
  const user = await authing.getCurrentUser();
  return user || { username: '' };
}
