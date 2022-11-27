import { takeLatest, takeEvery, put, call, all, select } from 'redux-saga/effects';
import constants from '../constants/userConstants';
import {
    signInSuccess,
    signInFail,

    fetchProfileSuccess,
    fetchProfileFail,

    logoutSuccess,
    logoutFail,

    validatePhoneSuccess,
    validatePhoneFail,

    validateOTPSuccess,
    validateOTPFail,

    signUpSuccess,
    signUpFail,

    signInStart,
} from '../actions/userActions';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/users'; 

function* signInAsync(action) {
    const { phone, password } = action.payload;

    if (phone && password) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = yield axios.post(
                `${BASE_URL}/login/`,
                { 'phone': phone, 'password': password },
                config
            );

            yield put(signInSuccess(data));
            yield localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            yield put(
                signInFail(
                    error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
                )
            );
        }
    } else {
        yield put(signInFail('Enter your phone number and password'));
    }
}

function* userProfileAsync() {
    let { user } = yield select(state => state.signIn);

    const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if ((!user || user === null) && userFromStorage && userFromStorage !== null) {
        user = userFromStorage;
    }

    try {        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        };

        const { data } = yield axios.get(
            `${BASE_URL}/profile/`,
            config
        );
        console.log(data);

        yield put(fetchProfileSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(
            fetchProfileFail(
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            )
        );
    }
}

function* logoutAsync() {
    let { user } = yield select(state => state.signIn);

    const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if ((!user || user === null) && userFromStorage && userFromStorage !== null) {
        user = userFromStorage;
    }

    try {        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        };

        const { data } = yield axios.post(
            `${BASE_URL}/logout/`,
            {},
            config
        );
        console.log(data);

        yield put(logoutSuccess(data));
        yield localStorage.removeItem('user');
    } catch (error) {
        console.log(error);
        yield put(
            logoutFail(
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            )
        );
    }
}

function* validatePhoneAsync(action) {
    const phone = action.payload;

    if (phone) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
    
            const { data } = yield axios.post(
                `${BASE_URL}/validate_phone/`,
                { 'phone': phone },
                config
            );

            yield put(validatePhoneSuccess(data));
            yield localStorage.setItem('validatedPhone', JSON.stringify(data));
        } catch (error) {
            yield put(
                validatePhoneFail(
                    error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
                )
            );
        }
    }
}

function* validateOTPAsync(action) {
    const { phone, otp } = action.payload;

    if (phone && otp) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
    
            const { data } = yield axios.post(
                `${BASE_URL}/validate_otp/`,
                { 'phone': phone, 'otp': otp },
                config
            );

            yield put(validateOTPSuccess(data));
        } catch (error) {
            yield put(
                validateOTPFail(
                    error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
                )
            );
        }
    }
}

function* signUpAsync(action) {
    const { phone, name, email, password } = action.payload;

    if (phone && name && email && password) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = yield axios.post(
                `${BASE_URL}/register/`,
                { 
                    'phone': phone,
                    'name': name,
                    'email': email,
                    'password': password
                },
                config
            );

            yield put(signUpSuccess(data));
            yield put(signInStart(phone, password));
        } catch (error) {
            yield put(
                signUpFail(
                    error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
                )
            );
        }
    }
}

function* signInSaga() {
    yield takeLatest(constants.SIGN_IN_STARTED, signInAsync);
}

function* userProfileSaga() {
    yield takeEvery(constants.FETCH_PROFILE_STARTED, userProfileAsync);
}

function* logoutSaga() {
    yield takeLatest(constants.LOGOUT_STARTED, logoutAsync);
}

function* validatePhoneSaga() {
    yield takeLatest(constants.VALIDATE_PHONE_STARTED, validatePhoneAsync);
}

function* validateOTPSaga() {
    yield takeLatest(constants.VALIDATE_OTP_STARTED, validateOTPAsync);
}

function* signUpSaga() {
    yield takeLatest(constants.SIGN_UP_STARTED, signUpAsync);
}

function* userSaga() {
    yield all([
        call(signInSaga),
        call(userProfileSaga),
        call(logoutSaga),
        call(validatePhoneSaga),
        call(validateOTPSaga),
        call(signUpSaga),
    ]);
}

export default userSaga;