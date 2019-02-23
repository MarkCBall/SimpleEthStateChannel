import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
import { GET_CHANNEL_DETAILS } from "../constants/InteractDatabase";
import { GET_HIGHEST_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_TX } from "../constants/InteractDatabase";
import { GET_HIGHEST_SIGNED_NONCE } from "../constants/InteractDatabase";
import { GET_LATEST_SIGNED_TX } from "../constants/InteractDatabase";


const initialState = {
    PendingChannels: { },
    RequestedChannels: { },
    ActiveChannelDetails:{},//put some defaults here?
    HighestNonce:0,
    LatestTxDetails:{},
    HighestSignedNonce:0,
    LatestSignedTxDetails:{}


};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PENDING_CHANNELS:
            return { ...state, PendingChannels: action.payload }

        case GET_REQUESTED_CHANNELS:
            return { ...state, RequestedChannels: action.payload }

        case GET_CHANNEL_DETAILS:
            return { ...state, ActiveChannelDetails: action.payload }

        case GET_HIGHEST_NONCE:
            return {...state, HighestNonce:action.payload}

        case GET_LATEST_TX:
            return {...state, LatestTxDetails:action.payload}

        case GET_HIGHEST_SIGNED_NONCE:
            //console.log("highestsignednonce", action.payload)
            return {...state, HighestSignedNonce:action.payload}

        case GET_LATEST_SIGNED_TX:
            //console.log("latestsignedtx", action.payload)
            return {...state, LatestSignedTxDetails:action.payload}

        

        default:
            return state;
    }
}