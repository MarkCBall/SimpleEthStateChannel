import { GET_PENDING_CHANNELS } from "../constants/InteractDatabase";
import { GET_REQUESTED_CHANNELS } from "../constants/InteractDatabase";
//import { ADD_USER_TO_ACCOUNT } from "../constants/InteractReduxState";


const initialState = {
  PendingChannels:{"demo":"demo"},
  RequestedChannels:{"demo":"demo"}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case GET_PENDING_CHANNELS:
    //console.log(action.payload)
    return {...state, PendingChannels:action.payload }

    case GET_REQUESTED_CHANNELS:
    return {...state, RequestedChannels:action.payload }

    default:
      return state;
  }
}