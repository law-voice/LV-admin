export const NAMESPACE = 'login';

export function LOGIN(payload) {
  return {
    type: `${NAMESPACE}/login`,
    payload,
  };
}

export function REFRESH_TOKEN() {
  return {
    type: `${NAMESPACE}/refreshToken`,
  };
}

export function LOGOUT() {
  return {
    type: `${NAMESPACE}/logout`,
  };
}
