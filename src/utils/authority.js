// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (!authority) {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
export function setToken(token) {
  localStorage.setItem('access_token', token);
}
export function getToken() {
  return localStorage.getItem('access_token');
}
export function removeTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
export function setRefreshToken(token) {
  localStorage.setItem('refresh_token', token);
}
export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}
