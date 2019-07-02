import _ from "lodash";

const initialState = {
    profile: {}, // decoded (thông tin decode của payload)
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                profile: action.payload,
                isAuthenticated: !_.isEmpty(action.payload)
            }
            // isEmpty() = true
            // action.payload = {}
            // ==> decoded = {}
            // ==> token ko có ==> isAuthenticated = false

        default:
            return state;
    }
}

export default authReducer;