// import { COUNTERSIGN_CHANNEL } from "../constants/InteractBlockchain";
// import { TERMINATE_CHANNEL } from "../constants/InteractBlockchain";
// import { WITHDRAW_FROM_CHANNEL } from "../constants/InteractBlockchain";
import { ONGOING_CHANNELS } from "../constants/InteractBlockchain";


const initialState = {
    OngoingChannels: { },



};

export default function (state = initialState, action) {
    switch (action.type) {

        // case COUNTERSIGN_CHANNEL:
        //     return {  }

        // case TERMINATE_CHANNEL:
        //     return { }

        // case WITHDRAW_FROM_CHANNEL:
        //     return { }

        case ONGOING_CHANNELS:
            return {...state, OngoingChannels:action.payload }

        default:
            return state;
    }
}