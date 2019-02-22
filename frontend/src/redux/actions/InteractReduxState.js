import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/InteractReduxState";
import {isValidAddress} from "ethereumjs-util";
//import web3 from "web3";

export default {

    handleAddressChange: (dispatch,textString) => {
        //clean up redundant returns
        return (dispatch) =>{
            //set pubPrivKeypairValid according to logic
            if (/^0[xX][0-9a-fA-F]*$/.test(textString)){
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        textString:textString,
                        addressIsValid: isValidAddress(textString)
                    }
                })
            }
        }
    },
    setActiveChannel:(dispatch,channel) => {
        return (dispatch) =>{
            dispatch({
                type: SET_ACTIVE_CHANNEL,
                payload: channel
            })
        }
    },
    handlePrivKeyChange:(dispatch,privKeyText) => {
        //regex to only allow valid entries
        return (dispatch) =>{
            dispatch({
                type: HANDLE_PRIVKEY_CHANGE,
                payload: privKeyText
            })
            //set pubPrivKeypairValid to true
            //set public address to value calulated from private key

        }
    },

}