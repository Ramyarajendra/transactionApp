import { setErrors} from './Alert'
import {ADD_TRANSACTION} from '../utils/Constants'
import {updateAccountBalance} from './accountAction'
import axios from 'axios'

export const depositAmount = (account_id, amount) => async (dispatch) =>{
    try {
        await axios.post(`/deposit/${account_id}`, {deposit_amount: amount})
        const transaction = {
            deposit_amount : amount,
            withdraw_amount: null
        }
        dispatch({
            type: ADD_TRANSACTION,
            payload: transaction
        })
        dispatch(updateAccountBalance(amount, 'deposit'));
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}
export const withdrawAmount = (account_id, amount) => async (dispatch) =>{
    try {
        await axios.post(`/withdraw/${account_id}`, {withdraw_amount: amount})
        const transaction = {
            withdraw_amount : amount,
            deposit_amount: null
        }
        dispatch({
            type: ADD_TRANSACTION,
            payload: transaction
        })
        dispatch(updateAccountBalance(amount, 'withdraw'));
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}