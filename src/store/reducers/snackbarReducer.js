import * as actionTypes from '../actions/actionTypes';
import clone from 'lodash.clonedeep';

// reducers for snackbar actions

const reducer = (state = {snackbars:[]}, action) => {
  const cloneState = clone(state);
	switch (action.type) {
		case actionTypes.SNACKBAR_ADD:
			cloneState.snackbars.push(action.snackbar);
      return cloneState;
		case actionTypes.SNACKBAR_CLOSE:
      cloneState.snackbars.splice(0,1);
      return cloneState;
		default:
			return state;
	}
};

export default reducer;
