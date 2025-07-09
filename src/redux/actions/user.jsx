import axios from 'axios';
import { ActionType } from '../actionTypes';
import Environment from '../../enviornment/enviornment'


// Login Action
export const loginUser = (loginData) => async (dispatch) => {
    try {
        const response = await axios.post(`${Environment.BASE_URL}/api/Authenticate/Login`, loginData);
        dispatch({
            type: ActionType.LOGIN_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ActionType.LOGIN_USER_FAIL,
            payload: error.response?.data || error.message,
        });
    }
};

// Add New User Action
export const addNewUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${Environment.BASE_URL}/api/Authenticate/add-user`, userData);
        dispatch({
            type: ActionType.ADD_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ActionType.ADD_USER_FAIL,
            payload: error.response?.data || error.message,
        });
    }
};
