import constants from '../constants/userConstants';


export const signInStart = (phone, password) => ({
    type: constants.SIGN_IN_STARTED,
    payload: { phone, password }
});

export const signInSuccess = (user) => ({
    type: constants.SIGN_IN_SUCCEED,
    payload: user
});

export const signInFail = (error) => ({
    type: constants.SIGN_IN_FAILED,
    payload: error
});

export const fetchProfileStart = () => ({
    type: constants.FETCH_PROFILE_STARTED
});

export const fetchProfileSuccess = (profile) => ({
    type: constants.FETCH_PROFILE_SUCCEED,
    payload: profile
});

export const fetchProfileFail = (error) => ({
    type: constants.FETCH_PROFILE_FAILED,
    payload: error
});

export const logoutStart = () => ({
    type: constants.LOGOUT_STARTED
});

export const logoutSuccess = (message) => ({
    type: constants.LOGOUT_SUCCEED,
    payload: message.detail
});

export const logoutFail = (error) => ({
    type: constants.LOGOUT_FAILED,
    payload: error
});

export const validatePhoneStart = (phone) => ({
    type: constants.VALIDATE_PHONE_STARTED,
    payload: phone
});

export const validatePhoneSuccess = (validatedPhone) => ({
    type: constants.VALIDATE_PHONE_SUCCEED,
    payload: validatedPhone
});

export const validatePhoneFail = (error) => ({
    type: constants.VALIDATE_PHONE_FAILED,
    payload: error
});

export const validateOTPStart = (phone, otp) => ({
    type: constants.VALIDATE_OTP_STARTED,
    payload: { phone, otp }
});

export const validateOTPSuccess = (message) => ({
    type: constants.VALIDATE_OTP_SUCCEED,
    payload: message.detail
});

export const validateOTPFail = (error) => ({
    type: constants.VALIDATE_OTP_FAILED,
    payload: error
});

export const signUpStart = (phone, name, email, password) => ({
    type: constants.SIGN_UP_STARTED,
    payload: { phone, name, email, password }
});

export const signUpSuccess = (user) => ({
    type: constants.SIGN_UP_SUCCEED,
    payload: user
});

export const signUpFail = (error) => ({
    type: constants.SIGN_UP_FAILED,
    payload: error
});