import { call, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Creators as UserActions } from 'store/ducks/users';
import { Creators as ErrorActions } from 'store/ducks/error';

export function* addUserRequest(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const users = yield select(state => state.users.data);

    if (users.find(user => user.id === data.id)) {
      yield put(ErrorActions.setError('Usuário duplicado'));
    } else {
      const userData = {
        id: data.id,
        avatar_url: data.avatar_url,
        name: data.name,
        bio: data.bio,
        coords: action.payload.coords,
      };

      yield put(UserActions.addUserSuccess(userData));
    }
  } catch (err) {
    yield put(ErrorActions.setError('Usuário não existe'));
  }
}
