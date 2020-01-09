const getAccessToken = () => localStorage.getItem('access-token');
const getClient = () => localStorage.getItem('client');
const getUid = () => localStorage.getItem('uid');

const setAccessToken = (token) => localStorage.setItem('access-token', token);
const setClient = (client) => localStorage.setItem('client', client);
const setUid = (uid) => localStorage.setItem('uid', uid);

export const isAuthenticated = () => getAccessToken() && getClient() && getUid();
export const authHasChanged = (accessToken) => accessToken && getAccessToken() !== accessToken;
export const getAuthHeader = () => ({
  'access-token': getAccessToken(),
  client: getClient(),
  uid: getUid(),
});

export const setAuthHeader = ({ accessToken, client, uid }) => {
  setAccessToken(accessToken);
  setClient(client);
  setUid(uid);
};
