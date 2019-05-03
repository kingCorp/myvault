import {
  FETCHING_FILES,
  FETCHING_FILES_SUCCESS,
  FETCHING_FILES_FAILURE,
  BASE_URL_GET_FILES
} from './constant';
import axios from 'axios';

export function fetchFilesFromAPI(id) {
  return (dispatch) => {
    dispatch(getFiles())
    axios.get(BASE_URL_GET_FILES + id)
      .then(res => {
        dispatch(getFilesSuccess(res.data.fileInfo))
        console.log(res.data.fileInfo)
      })
      .catch(err => {
        dispatch(getFilesFailure(err));
        console.log(err)
      })
  }
}



function getFiles() {
  return {
    type: FETCHING_FILES
  }
}

function getFilesSuccess(data) {
  return {
    type: FETCHING_FILES_SUCCESS,
    data
  }
}

function getFilesFailure(err) {
  return {
    type: FETCHING_FILES_FAILURE,
    err
  }
}
