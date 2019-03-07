import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/InteractReduxState";
import {isValidAddress} from "ethereumjs-util";

import InteractDatabase from "./InteractDatabase";
import InteractBlockchain from "./InteractBlockchain";

//what does it mean to import itself??????? whoaaaa
import InteractReduxState from "./InteractReduxState";

import {ethers} from "ethers";

export default {

    renderChButtons: (dispatch, addressSignedIn) => {
        return (dispatch) => {
            dispatch(InteractDatabase.getPendingChannels(dispatch, addressSignedIn))
            dispatch(InteractDatabase.getRequestedChannels(dispatch, addressSignedIn))
            dispatch(InteractBlockchain.getOngoingChannels(dispatch, addressSignedIn))
        }
    },

    handleAddressChange: (dispatch,addressSignedIn) => {
        //clean up redundant returns?
        return (dispatch, getState) =>{
            //set pubPrivKeypairValid according to logic
            if (/^0[xX][0-9a-fA-F]*$/.test(addressSignedIn)){

                //if isValid address && addressSignedIn===ethers.utils....
                    //dispatch with true 

                let privKey = getState().InteractReduxState.privKey
                let pubPrivKeypairValid = (addressSignedIn ===ethers.utils.computeAddress(privKey).toLowerCase())
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        addressSignedIn:addressSignedIn,
                        addressIsValid: isValidAddress(addressSignedIn),
                        pubPrivKeypairValid: pubPrivKeypairValid
                    }
                })
                if (isValidAddress(addressSignedIn)){
                    dispatch(InteractReduxState.renderChButtons(dispatch, addressSignedIn))
                }
            }
            dispatch({type: SET_ACTIVE_CHANNEL,payload: {channel:0}})
        }
    },
    setActiveChannel:(dispatch,channel, isOngoing) => {
        return (dispatch) =>{
            dispatch({
                type: SET_ACTIVE_CHANNEL,
                payload: {
                    channel:channel,
                    isOngoing:isOngoing
                }
            })
        }
    },
    
    handlePrivKeyChange:(dispatch,privKeyText) => {
        return (dispatch) =>{

            //why doesn't it work do do the else clause always and let the change_address_text over-ride the pubPrivKeypairValid?
            
            //change address text should dispatch get pending channels ect

            if (privKeyText.length===66){ //better validation to be done?
                let correspondingPubAddress = ethers.utils.computeAddress(privKeyText).toLowerCase()
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        addressSignedIn:correspondingPubAddress,
                        addressIsValid: true,
                        pubPrivKeypairValid: true
                    }
                })
                dispatch(InteractReduxState.renderChButtons(dispatch, correspondingPubAddress))
               
                dispatch({
                    type: HANDLE_PRIVKEY_CHANGE,
                    payload: {
                        privKey:privKeyText,
                        pubPrivKeypairValid: true
                    } 
                })
            }else{
                dispatch({
                    type: HANDLE_PRIVKEY_CHANGE,
                    payload: {
                        privKey:privKeyText,
                        pubPrivKeypairValid: false
                    } 
                })
            }
            dispatch({type: SET_ACTIVE_CHANNEL,payload: {channel:0}})
        }
    },

}