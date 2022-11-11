import { call, all } from 'redux-saga/effects';
import articleSaga from './articleSagas';

function* rootSaga() {
    yield all([
        call(articleSaga),
    ]);
}

export default rootSaga;