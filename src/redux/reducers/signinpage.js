import {
  CHANGE_LOGIN,
  REQUEST_USER_DATA_PENDING,
  REQUEST_USER_DATA_REJECTED,
  REQUEST_USER_DATA_RESOLVED
} from '../actionTypes.js';

const initialLoginState = {
  loggedin: false,
  id: ""
};

export const changeLoginState = (state=initialLoginState, action={}) => {
  switch(action.type) {
    case CHANGE_LOGIN:
      return {
        ...state,
        loggedin: action.payload.loggedin,
        id: action.payload.id
      }
    default:
      return state;
  }
}

const initialUserData = {
  name: "",
  ranking: 0
}

export const changeUserData = (state=initialUserData, action={}) => {
  switch(action.type) {
    case REQUEST_USER_DATA_PENDING:
      return state
    case REQUEST_USER_DATA_REJECTED:
      return state
    case REQUEST_USER_DATA_RESOLVED:
      return {
        ...state,
        name: action.payload.name,
        ranking: action.payload.ranking
      }
    default:
      return state
  }
}
