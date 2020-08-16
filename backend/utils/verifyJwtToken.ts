import { AuthenticationError } from 'apollo-server-express';

import jwt from 'jsonwebtoken';
import User from '../models/User';

export const verifyJwtToken = async (token: any) => {
  let user: any;
  // const cert = fs.readFileSync('./auth0key.pem');
  const secret = process.env.AUTH0_SECRET as string;
  const cert = Buffer.from(secret, 'base64');
  try {
    if (token) {
      const { sub } = await jwt.verify(token, cert);
      user = await User.findOne({ auth0Id: sub }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
      return user;
    }
  } catch (err) {
    return new Error('ログインしてください');
  }
  return user;
};
