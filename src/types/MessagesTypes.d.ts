export interface IMessages {
  _id: number;
  text: string;
  createdAt: any;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}
