import { types } from 'mobx-state-tree';
import { User } from './user';

const RootStore = types.model('RootModel', {
  user: types.optional(User, {}),
});

export default RootStore;
