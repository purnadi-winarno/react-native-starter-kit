export const login = () => {
  console.log('user is logged in...');
  return {
    type: 'USER_LOGIN',
  };
};
export const logout = () => {
  console.log('user is logged out...');
  return {
    type: 'USER_LOGOUT',
  };
};
