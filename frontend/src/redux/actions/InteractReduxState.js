import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import {isValidAddress} from "ethereumjs-util";
//import web3 from "web3";

export default {

    handleAddressChange: (dispatch,textString) => {
        
        return (dispatch) =>{
            dispatch({
                type: CHANGE_ADDRESS_TEXT,
                payload: {
                    textString:textString,
                    addressIsValid: isValidAddress(textString)
                }
            })
        }
    }



    // calcAddress: (dispatch,msg, msgSig) => {
    //     return (dispatch, state) => {
    //         //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
    //         const msgBuffer = ethUtil.toBuffer(msg);
    //         const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    //         const signatureBuffer = ethUtil.toBuffer(msgSig);
    //         const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    //         const publicKey = ethUtil.ecrecover(
    //             msgHash,
    //             signatureParams.v,
    //             signatureParams.r,
    //             signatureParams.s
    //         );
    //         const addressBuffer = ethUtil.publicToAddress(publicKey);
    //         const address = ethUtil.bufferToHex(addressBuffer);

    //         dispatch({
    //             type: CALC_ADDRESS,
    //             payload: address
    //         })
    //     }
    // },
}