export interface IProfile {
  id: number;

  name: string;

  phoneNumber: string;

  address: string;

  userInfo: string;
}

export interface IAccountInfo {
  id: number;

  email: string;

  profile: IProfile;
}
