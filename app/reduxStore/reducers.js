import { combineReducers } from "redux";
import files from './files/fileReducer';
import auth from './user/userReducer';

const rootReducer = combineReducers({
    files,
    auth
});

export default rootReducer;