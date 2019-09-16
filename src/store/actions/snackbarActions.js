import * as actionTypes from './actionTypes';

export const snackbarAdd = (data) => {
  return {
    type: actionTypes.SNACKBAR_ADD,
    snackbar: data
  }
}

export const snackbarClose = () => {
  return {
    type: actionTypes.SNACKBAR_CLOSE,
  }
}

export const snackbarClear = () => {
  return {
    type: actionTypes.SNACKBAR_CLEAR,
  }
}