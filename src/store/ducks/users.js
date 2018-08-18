/**
 * Types
 */
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ERROR: 'error/SET',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADD_SUCCESS:
      return {
        data: [...state.data, action.payload.data],
        loading: false,
      };
    case Types.ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addUserRequest: ({ user, coords }) => ({
    type: Types.ADD_REQUEST,
    payload: {
      user,
      coords,
    },
  }),

  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: {
      data,
    },
  }),
};
