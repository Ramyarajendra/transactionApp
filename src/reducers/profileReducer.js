import React from 'react'
import {UPDATE_PROFILE, GET_PROFILE} from '../utils/Constants'

const initialState = {
    profileData: null
}

export const profileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:    
            return{
                ...state,
                profileData: action.payload
            }
        default:
            return state;
    }
}