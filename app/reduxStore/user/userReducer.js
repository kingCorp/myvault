import {
    AUTH_FETCH,
    AUTH_SUCCESS,
    AUTH_FAILURE
} from './constant';
const initialState = {
    auth: [],
    isFetching: false,
    isLogged: false,
    error: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_FETCH:
            return {
                ...state,
                isFetching: true,
                auth: [],
                isLogged: false
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isLogged: true,
                auth: action.data
            }
        case AUTH_FAILURE:
            return {
                ...state,
                isFetching: false,
                isLogged: false,
                error: true
            }
        default:
            return state
    }
}