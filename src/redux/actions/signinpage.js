import {
  CHANGE_LOGIN,
  REQUEST_USER_DATA_PENDING,
  REQUEST_USER_DATA_REJECTED,
  REQUEST_USER_DATA_RESOLVED
} from '../actionTypes.js';

export const signin = (loggedin, id) => (
  {
    type: CHANGE_LOGIN,
    payload: {
      loggedin,
      id,
    }
  }
)

export const requestUserData = (userId) => (dispatch) => {
  console.log(dispatch, "dispatch");
  console.log(userId, "userId");
  dispatch({ type: REQUEST_USER_DATA_PENDING });
  fetch(`http://192.168.1.38:3002/profile${userId}`)
      .then(resp => resp.text())
      .then(result => {
          dispatch({
            type: REQUEST_USER_DATA_RESOLVED,
            payload: {
              name: JSON.parse(result).name,
              ranking: JSON.parse(result).ranking,
            }
          });
      })
      .catch(error => {
        dispatch({type: REQUEST_USER_DATA_REJECTED})
      })
}
