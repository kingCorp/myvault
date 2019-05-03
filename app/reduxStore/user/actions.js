import {
    AUTH_FETCH,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    BASE_URL_LOGIN
} from './constant';
import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';



export function loginUserAPI(pho, pass) {
    return (dispatch) => {
        console.log('enter here for login');
        dispatch(getAuth());
        try {
           return axios.post(BASE_URL_LOGIN, {
                    phone: pho, //'08093702195',
                    password: pass //'12345'
                })
                .then(res => {
                    dispatch(getAuthSuccess(res.data));
                    AsyncStorage.multiSet([['token', res.data.token],['userId', res.data.userId]], ()=>{
                        console.log('it stored in async')
                    });
                    console.log(res.data);
                })
                .catch(err => {
                    dispatch(getAuthFailure(err));
                    Alert.alert('Failed', 'Network Error or Phone and Password mismatch');
                    console.log(err)
                });
        } catch (e) {
            Alert.alert('Failed', 'Network Error or Phone and Password mismatch redux');
            console.log(e);
        }
    }
}

// export function registerUserAPI(pho, pass, name, email) {
//     return (dispatch) => {
//         dispatch(getAuth());
//         try {
//             axios.post(BASE_URL_LOGIN, {
//                     phone: pho, //'08093702195',
//                     password: pass, //'12345'
//                     email: email,
//                     name: name
//                 })
//                 .then(res => {
//                     dispatch(getAuthSuccess(res.data));
//                     console.log(res.data);
//                 })
//                 .catch(err => {
//                     dispatch(getAuthFailure(err));
//                     console.log(err)
//                 });
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

export function logoutUser() {
    return (dispatch) => {
        console.log('enter here to logout');
        AsyncStorage.removeItem('token')
        .then((data) => {
            dispatch(getAuthFailure(data));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}


function getAuth() {
    console.log('enter here for fetching');
    return {
        type: AUTH_FETCH
    }
}

function getAuthSuccess(data) {
    console.log('enter here for auth');
    return {
        type: AUTH_SUCCESS,
        data
    }
}

function getAuthFailure(err) {
    return {
        type: AUTH_FAILURE,
        err
    }
}

