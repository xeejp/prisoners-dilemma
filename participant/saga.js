import { put, take, call, fork } from 'redux-saga/effects'
import { fetchContents, submitAnswer, finishDescription } from './actions'

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

function* finishDescriptionSaga() {
  while (true) {
    yield take(`${finishDescription}`)
    yield call(sendData, 'finish description')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitAnswerSaga)
  yield fork(finishDescriptionSaga)
}

export default saga
