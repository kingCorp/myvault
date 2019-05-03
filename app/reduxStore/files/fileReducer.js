import { FETCHING_FILES, FETCHING_FILES_SUCCESS, FETCHING_FILES_FAILURE } from './constant';

const initialState = {
    files: [],
    isFetching: false,
    error: false
}

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_FILES:
            return {
                ...state,
                isFetching: true,
                files: []
            }
        case FETCHING_FILES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                files: action.data
            }
        case FETCHING_FILES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}