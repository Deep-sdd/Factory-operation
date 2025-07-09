import { ActionType } from '../actionTypes';

const initialState = {
    user: null,
    addUserResponse: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        // LOGIN USER
        case ActionType.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case ActionType.LOGIN_USER_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload,
            };

        // ADD USER
        case ActionType.ADD_USER_SUCCESS:
            return {
                ...state,
                addUserResponse: action.payload,
                loading: false,
                error: null,
            };
        case ActionType.ADD_USER_FAIL:
            return {
                ...state,
                addUserResponse: null,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
