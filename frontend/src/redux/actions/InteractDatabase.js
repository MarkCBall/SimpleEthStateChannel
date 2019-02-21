import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
import { GET_CHANNEL_DETAILS } from "../constants/InteractDatabase";
import { GET_HIGHEST_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_TX } from "../constants/InteractDatabase";


export default {

    getPendingChannels: (dispatch, address) => {
        return (dispatch) => {
            fetch("http://localhost:3001/Channel/pending", {
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
            fetch("http://localhost:3001/Channel/requested", {
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
            fetch("http://localhost:3001/Channel/", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "cid":CID
                }
            }).then((response) =>{
                return response.json()
            }).then((response) => {
                var ChType = "";
                if (addressSignedIn === response.u1Address)
                    ChType = "proposed";
                else if (addressSignedIn === response.u2Address)
                    ChType = "requested";

                dispatch({
                    type: GET_CHANNEL_DETAILS,
                    payload: {
                        ...response,
                        ChType:ChType
                    }
                })
            })
        }
    },

    getHighestNonce: (dispatch, CID) =>{
        return (dispatch, getState) => {
            fetch("http://localhost:3001/Transaction/HighestNonce", {
                method: "GET",
                mode: "cors", 
                headers: {
                    "cid":CID
                }
            }).then((response) =>{
                return response.json()
            }).then((HighestNonce) => {
                dispatch({
                    type: GET_HIGHEST_NONCE,
                    payload: HighestNonce
                })

                //can I put a call to the server here to get Tx details at highest nonce?

                fetch("http://localhost:3001/Transaction/getTx", {
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


    //getHighestSignedNonce

    //how to set the Tx details at highest signed nonce?


   
}