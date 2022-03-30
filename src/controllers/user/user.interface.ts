export interface IUser {
  id: number;
  username: string;
  password: string;
  public: boolean;
}

export interface IPagingUserResponse {
  data: IUser[];
  total: number;
}
