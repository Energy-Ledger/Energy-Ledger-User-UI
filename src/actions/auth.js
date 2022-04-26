import authService from "../services/auth.service";
import storageService from "../services/storage.service";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./types";


// Actions - Login

export const login = (formData) => async (dispatch) => {
  try {
    
      storageService.setObject('authUser', formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: formData },
      });
    return Promise.resolve(formData);
  }
  catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    return Promise.reject();
  }
};


export const logout = () => async (dispatch) => {
  try {
    await authService.logOut();
    dispatch({
      type: LOGOUT
    });
  }
  catch (error) {
  }
};