import {User} from './userData';

export interface IMessageList {
  item: User;
  index: number;
  onPress: () => void;
  lastmsg: string;
}
