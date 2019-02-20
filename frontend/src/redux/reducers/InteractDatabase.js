import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
import { GET_CHANNEL_DETAILS } from "../constants/InteractDatabase";


const initialState = {
    PendingChannels: { "demo": "demo" },
    RequestedChannels: { "demo": "demo" },
    ActiveChannelDetails:{}//put some defaults here?
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

        default:
            return state;
    }
}