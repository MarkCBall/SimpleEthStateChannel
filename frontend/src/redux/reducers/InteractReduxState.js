import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";


const initialState = {
  addressSignedIn: "",//"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87",
  addressIsValid:true,
  activeChannel:-1
};

export default function(state = initialState, action) {
  switch (action.type) {

    case CHANGE_ADDRESS_TEXT:
    return {
        ...state, 
        addressSignedIn:action.payload.textString,
        addressIsValid:action.payload.addressIsValid
    }

    case SET_ACTIVE_CHANNEL:
    return {
        ...state,
        activeChannel:action.payload
    }

    default:
      return state;
  }
}