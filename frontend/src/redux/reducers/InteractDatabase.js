import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
import { GET_CHANNEL_DETAILS } from "../constants/InteractDatabase";
import { GET_HIGHEST_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_TX } from "../constants/InteractDatabase";


const initialState = {
    PendingChannels: { },
    RequestedChannels: { },
    ActiveChannelDetails:{},//put some defaults here?
    HighestNonce:0,
    LatestTxDetails:{}

};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PENDING_CHANNELS:
            //console.log(action.payload)
            return { ...state, PendingChannels: action.payload }

        case GET_REQUESTED_CHANNELS:
            return { ...state, RequestedChannels: action.payload }

        case GET_CHANNEL_DETAILS:
            //console.log(action.payload)
            return { ...state, ActiveChannelDetails: action.payload }

        case GET_HIGHEST_NONCE:
            return {...state, HighestNonce:action.payload}

        case GET_LATEST_TX:
        console.log("latestTX",action.payload)
            return {...state, LatestTxDetails:action.payload}

        

        default:
            return state;
    }
}