import { CHANGE_ADDRESS_TEXT } from "../constants/InteractReduxState";
//import { ADD_USER_TO_ACCOUNT } from "../constants/InteractReduxState";


const initialState = {
  addressSignedIn: "0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"
};

export default function(state = initialState, action) {
  switch (action.type) {

    case CHANGE_ADDRESS_TEXT:
    return {...state, addressSignedIn:action.payload}

    default:
      return state;
  }
}