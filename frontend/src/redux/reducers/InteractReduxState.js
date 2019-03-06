import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
import { SET_ACTIVE_CHANNEL } from "../constants/InteractReduxState";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/InteractReduxState";



const initialState = {
  addressSignedIn: "0xb8d851486d1c953e31a44374aca11151d49b8bb3",//default must start with 0x
  addressIsValid:false,
  activeChannel:-1,
  privKey:"0xf942d5d524ec07158df4354402bfba8d928c99d0ab34d0799a6158d56156d986",
  pubPrivKeypairValid:true
};

export default function(state = initialState, action) {
  switch (action.type) {

    case CHANGE_ADDRESS_TEXT:
    return {
        ...state,// ...action.payload
        addressSignedIn:action.payload.addressSignedIn,
        addressIsValid:action.payload.addressIsValid
    }

    case SET_ACTIVE_CHANNEL:
    return {
        ...state,
        activeChannel:action.payload
    }

    case HANDLE_PRIVKEY_CHANGE:
    return {
        ...state,
        privKey:action.payload.privKey,
        pubPrivKeypairValid:action.payload.pubPrivKeypairValid
    }

    default:
      return state;
  }
}