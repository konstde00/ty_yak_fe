import { flow, types } from 'mobx-state-tree';
import axios from 'axios';
import { checkError } from '../api/utils/errors';
import * as api from '../api/auth';

const UserModel = types.model('UserModel', {
  email: types.maybeNull(types.string),
  family_name: types.maybeNull(types.string),
  given_name: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
});

export const User = types
  .model('User', {
    userData: types.maybeNull(UserModel),
    isAuth: types.maybeNull(types.boolean),
    isVisibleSidebarMenu: types.optional(types.boolean, true),
  })
  .actions((self) => ({
    auth: flow(function* (code) {
      try {
        const data = yield api.getAuth(code);
        self.userData = data;
        localStorage.setItem('_token', data.token);
        if (data.token) {
          self.isAuth = true;
          window.location.href = process.env.REACT_APP_MAIN_URL;
        }
      } catch (err) {
        checkError(err);
      }
    }),
    hideSidebarMenu() {
      self.isVisibleSidebarMenu = false;
    },
    showSidebarMenu() {
      self.isVisibleSidebarMenu = true;
    },
    logout() {
      localStorage.removeItem('_token');
      delete axios.defaults.headers.common.Authorization;
      self.isAuth = false;
    },
  }));
