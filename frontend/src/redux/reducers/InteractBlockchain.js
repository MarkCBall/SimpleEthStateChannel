import { COUNTERSIGN_CHANNEL } from "../constants/InteractBlockchain";
import { TERMINATE_CHANNEL } from "../constants/InteractBlockchain";
import { WITHDRAW_FROM_CHANNEL } from "../constants/InteractBlockchain";



const initialState = {
    OngoingChannels: { },



};

export default function (state = initialState, action) {
    switch (action.type) {

        case COUNTERSIGN_CHANNEL:
            return {  }

        case TERMINATE_CHANNEL:
            return { }

        case WITHDRAW_FROM_CHANNEL:
            return { }

        default:
            return state;
    }
}