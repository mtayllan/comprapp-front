export const getAccessToken = () => localStorage.getItem('access-token');
export const getClient = () => localStorage.getItem('client');
export const getUid = () => localStorage.getItem('uid');

export const setAccessToken = (token) => localStorage.setItem('access-token', token);
export const setClient = (client) => localStorage.setItem('client', client);
export const setUid = (uid) => localStorage.setItem('uid', uid);

export const getAuthHeader = ({
  'access-token': getAccessToken(),
  client: getClient(),
  uid: getUid(),
});
