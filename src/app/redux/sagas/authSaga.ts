import { takeLatest, call, put } from "redux-saga/effects";
import { login } from "../slices/authSlice";

function* handleLogin(action) {
    try {
        const response = yield call(() => login(action.payload));
        yield put(response);
    } catch (error) {
        console.error("Login failed", error);
    }
}

export default function* authSaga() {
    yield takeLatest(login.type, handleLogin);
}
