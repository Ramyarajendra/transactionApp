import {ADD_TRANSACTION, SIGN_OUT} from '../utils/Constants'

const transactionReducer = (state = [], action) => {
    switch (action.type) {
      case ADD_TRANSACTION:
        return [...state, action.payload];
        case SIGN_OUT:
            return []
      default:
        return state;
    }
  };
  
  export default transactionReducer;