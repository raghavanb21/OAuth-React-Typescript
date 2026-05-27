export interface User {
  name: string;
  email: string;
  method: 'email' | 'google';
  picture?: string;
}

export interface UserRecord extends User {
  hash?: string;
  joined: number;
}

export interface ActivityEntry {
  type: 'login' | 'signup';
  method: 'email' | 'google';
  ts: number;
}
