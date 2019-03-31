import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
import { GET_CHANNEL_DETAILS } from "../constants/InteractDatabase";
import { GET_HIGHEST_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_TX } from "../constants/InteractDatabase";
import { GET_HIGHEST_SIGNED_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_SIGNED_TX } from "../constants/InteractDatabase";


export default {

    getPendingChannels: (dispatch, address) => {
        return (dispatch) => {
            fetch("http://52.60.66.253:3000/Channel/pending", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "address":address
                }
            }).then((response) =>{
                return response.json()
            }).then((response) => {
                dispatch({
                    type: GET_PENDING_CHANNELS,
                    payload: response
                })
            })
        }
    },
    getRequestedChannels: (dispatch, address) => {
        return (dispatch) => {
            fetch("http://52.60.66.253:3000/Channel/requested", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "address":address
                }
            }).then((response) =>{
                return response.json()
            }).then((response) => {
                dispatch({
                    type: GET_REQUESTED_CHANNELS,
                    payload: response
                })
            })
        }
    },

    getChannelDetails:(dispatch, CID) => {
        return (dispatch, getState) => {
            var addressSignedIn = getState().InteractReduxState.addressSignedIn;
            fetch("http://52.60.66.253:3000/Channel/", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "cid":CID
                }
            }).then((response) =>{
                return response.json()
            }).then((response) => {

                //if (getState.InteractDatabase.ActiveChannelDetails.ChType != "ongoing"){
                    //     var ChType = "";
                    // if (addressSignedIn === response.u1Address){
                    //     ChType = "proposed";
                    // }
                    // else if (addressSignedIn === response.u2Address){
                    //     ChType = "requested";
                    // }
                //}
                

                dispatch({
                    type: GET_CHANNEL_DETAILS,
                    payload: {
                        ...response,
                        userOneIsMe: 
                            (addressSignedIn === response.u1Address) ? true : false
                    }
                })
            })
        }
    },

    getHighestNonce: (dispatch, CID) =>{
        return (dispatch, getState) => {
            fetch("http://52.60.66.253:3000/Transaction/HighestNonce", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "cid":CID
                }
            }).then((response) =>{
                //console.log(response)
                return response.json()
            }).then((HighestNonce) => {
                //console.log(HighestNonce)
                dispatch({
                    type: GET_HIGHEST_NONCE,
                    payload: HighestNonce
                })

                fetch("http://52.60.66.253:3000/Transaction/getTx", {
                    method: "GET",
                    mode: "cors", 
                    headers: {
                        "cid":CID,
                        "nonce":HighestNonce
                    }
                }).then((response) =>{
                    return response.json()
                }).then((LatestTxDetails) => {

                    dispatch({
                        type: GET_LATEST_TX,
                        payload: LatestTxDetails
                    })
                })
            })
        }
    },


    getHighestSignedNonce: (dispatch, CID) =>{
        return (dispatch, getState) => {
            fetch("http://52.60.66.253:3000/Transaction/HighestSignedNonce", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "cid":CID
                }
            }).then((response) =>{
                return response.json()
            }).then((HighestSignedNonce) => {
                dispatch({
                    type: GET_HIGHEST_SIGNED_NONCE,
                    payload: HighestSignedNonce
                })

                fetch("http://52.60.66.253:3000/Transaction/getTx", {
                    method: "GET",
                    mode: "cors", 
                    headers: {
                        "cid":CID,
                        "nonce":HighestSignedNonce
                    }
                }).then((response) =>{
                    return response.json()
                }).then((LatestSignedTxDetails) => {

                    dispatch({
                        type: GET_LATEST_SIGNED_TX,
                        payload: LatestSignedTxDetails
                    })
                })
            })
        }
    }

   
}