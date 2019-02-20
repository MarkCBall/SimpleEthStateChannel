import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";

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



}