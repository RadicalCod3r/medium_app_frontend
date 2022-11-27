import { call, all } from 'redux-saga/effects';
import articleSaga from './articleSagas';
import userSaga from './userSagas';

function* rootSaga() {
    yield all([
        call(articleSaga),
        call(userSaga),
    ]);
}

export default rootSaga;