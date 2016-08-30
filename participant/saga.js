import { put, take, call, fork } from 'redux-saga/effects'
import { fetchContents, submitAnswer } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* submitAnswerSaga() {
  while (true) {
    const { payload } = yield take(`${submitAnswer}`)
    yield call(sendData, 'submit answer', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitAnswerSaga)
}

export default saga
