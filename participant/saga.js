import { put, take, call, fork } from 'redux-saga/effects'
import { fetchContents, submitAnswer, finishDescription, updateSnum } from './actions'

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

function* updateSnumSaga() {
  while(true) {
    const { payload } = yield take(`${updateSnum}`)
    yield call(sendData, 'update snum', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitAnswerSaga)
  yield fork(finishDescriptionSaga)
  yield fork(updateSnumSaga)
}

export default saga
