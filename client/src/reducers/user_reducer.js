import { LOGIN_USER } from "../actions/types";
export default function(state={}, action) {
    switch(action.type) {
        case LOGIN_USER:
            // action.payload because we are sending loginSuccess: true from API
            // ...state returns the entire object
            return { ...state, loginSuccess: action.payload };
        default:
            return state;
    }
}