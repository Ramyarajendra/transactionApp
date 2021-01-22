import { setErrors} from './Alert'
import {ADD_TRANSACTION} from '../utils/Constants'
import {updateAccount} from './accountAction'
import axios from 'axios'

export const depositAmount = (account_id, amount) => async (dispatch) =>{
    try {
        const { data: {msg, accountDetails, transactionObj} } = await axios.post(`/deposit/${account_id}`, {deposit_amount: amount})
        dispatch({
            type: ADD_TRANSACTION,
            payload: transactionObj
        })
        dispatch(updateAccount(accountDetails));
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}
export const withdrawAmount = (account_id, amount) => async (dispatch) =>{
    try {
        const { data: {msg, accountDetails, transactionObj} } = await axios.post(`/withdraw/${account_id}`, {withdraw_amount: amount})
        dispatch({
            type: ADD_TRANSACTION,
            payload: transactionObj
        })
        dispatch(updateAccount(accountDetails));
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}