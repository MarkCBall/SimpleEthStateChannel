import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/InteractReduxState";
import {isValidAddress} from "ethereumjs-util";

//make this an import???
const ethers = require('ethers')

export default {

    handleAddressChange: (dispatch,addressSignedIn) => {
        //clean up redundant returns
        return (dispatch) =>{
            //set pubPrivKeypairValid according to logic
            if (/^0[xX][0-9a-fA-F]*$/.test(addressSignedIn)){
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        addressSignedIn:addressSignedIn,
                        addressIsValid: isValidAddress(addressSignedIn)
                    }
                })
            }
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
        //regex to only allow valid entries

        //if the priv key is 66 long
            //

        return (dispatch) =>{
            

            if (privKeyText.length===66){ //better validation to be done?
                let correspondingPubAddress = ethers.utils.computeAddress(privKeyText).toLowerCase()
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        addressSignedIn:correspondingPubAddress,
                        addressIsValid: true
                    }
                })
                dispatch({
                    type: HANDLE_PRIVKEY_CHANGE,
                    payload: {
                        pubPrivKeypairValid: true,
                        privKey:privKeyText
                    } 
                })
            }else{
                dispatch({
                    type: HANDLE_PRIVKEY_CHANGE,
                    payload: {
                        pubPrivKeypairValid: false,
                        privKey:privKeyText
                    } 
                })
            }

            

            
            

        }
    },

}