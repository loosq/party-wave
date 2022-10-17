import {Transaction} from 'sequelize';
import {User as Model} from '../../db/models';
// eslint-disable-next-line import/extensions
import {User} from '../session';

export const saveOrUpdateUser = (user: User, t?: Transaction) => Model.upsert({
    id: user.id,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name,
    login: user.login,
    avatar: user.avatar,
    email: user.email,
    phone: user.phone,
}, {transaction: t});
