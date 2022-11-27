import constants from '../constants/userConstants';

export const signInReducer = (state = { user: null, error: null }, action) => {
    switch (action.type) {
        case constants.SIGN_IN_SUCCEED:
            return { ...state, user: action.payload };
        case constants.SIGN_IN_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const userProfileReducer = (state = { profile: null, error: null }, action) => {
    switch (action.type) {
        case constants.FETCH_PROFILE_SUCCEED:
            return { ...state, profile: action.payload };
        case constants.FETCH_PROFILE_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const logoutReducer = (state = { message: null, success: false, error: null }, action) => {
    switch (action.type) {
        case constants.LOGOUT_SUCCEED:
            return { ...state, message: action.payload, success: true };
        case constants.LOGOUT_FAILED:
            return { ...state, error: action.payload, success: false };
        default:
            return state;
    }
}

export const phoneValidationReducer = (state = { data: null, success: false, error: null }, action) => {
    switch (action.type) {
        case constants.VALIDATE_PHONE_SUCCEED:
            return { ...state, data: action.payload, success: true };
        case constants.VALIDATE_PHONE_FAILED:
            return { ...state, error: action.payload, success: false };
        default:
            return state;
    }
}

export const otpValidationReducer = (state = { message: null, success: false, error: null }, action) => {
    switch (action.type) {
        case constants.VALIDATE_OTP_SUCCEED:
            return { ...state, message: action.payload, success: true };
        case constants.VALIDATE_OTP_FAILED:
            return { ...state, error: action.payload, success: false };
        default:
            return state;
    }
}

export const signUpReducer = (state = { user: null, error: null }, action) => {
    switch (action.type) {
        case constants.SIGN_UP_SUCCEED:
            return { ...state, user: action.payload };
        case constants.SIGN_UP_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}