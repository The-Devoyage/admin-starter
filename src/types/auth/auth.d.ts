export interface Decoded {
  account: {
    _id: string;
    email: string;
  };
  user: {
    _id: string;
    role: number;
    email: string;
  };
  iat: number;
  exp: number;
}
