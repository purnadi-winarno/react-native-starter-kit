export const initialState = {
  id: null,
  name: null,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {
        ...state,
        id: 1,
        name: 'Paijo',
      };
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        id: null,
        name: null,
      };
    }
    default:
      return state;
  }
}
