import {ResponseBase} from '../response-base';
import {UserData} from '../../modules/auth/user-data';

export interface UpdateUserResponse extends ResponseBase {
  newUser: UserData;
  identityErrors: {
    code: string;
    description: string;
  }[];
}
