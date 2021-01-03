const express = require('express');
const authMiddleware = require('../middleware/auth');
const Account = require('../models/Account');
const Transactions = require('../models/Transactions');
const Router = express.Router();
const { startSession } = require('mongoose')

Router.post('/deposit/:id', authMiddleware , async (req, res)=> {
    const session = await startSession()
    try {
        session.startTransaction()
        const account_id = req.params.id
        const {deposit_amount } = req.body
        const result = await Account.findById(account_id)
        const { total_balance } = result
        const total = total_balance + deposit_amount

        const transactionObj = new Transactions({
            deposit_amount,
            balance: total,
            account_id
        })
        await transactionObj.save()

        await Account.findByIdAndUpdate(account_id, {total_balance: total})
        await session.commitTransaction()
        session.endSession()
        res.send({
            msg: 'Amount Deposited!!'
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        res.status(400).send({
            add_error: 'Error while depositing amount..Try again later.'
        });
    }
})

Router.post('/withdraw/:id', authMiddleware, async(req, res)=> {
    const session = await startSession()
    try {
        session.startTransaction()
        const {withdraw_amount} = req.body
        const account_id = req.params.id
        const result = await Account.findById(account_id)
        const { total_balance } = result
        const total = total_balance - withdraw_amount
        if (withdraw_amount <= total_balance){
            const transactionObj = new Transactions({
                withdraw_amount,
                balance: total,
                account_id
            })
            await transactionObj.save()
            await Account.findByIdAndUpdate(account_id, {total_balance: total})
        }else {
            return res.status(400).send({
              withdraw_error: "You don't have enough balance in your account"
            });
        }
        await session.commitTransaction()
        session.endSession()
        res.send({
            msg:'Amount withdrawn'
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error) 
        res.status(400).send({
            withdraw_error: 'Error while withdrawing amount..Try again later.'
          });
    }
})
module.exports = Router