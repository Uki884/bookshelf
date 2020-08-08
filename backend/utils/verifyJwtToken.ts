import { AuthenticationError } from 'apollo-server-express';

import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/User';

export const verifyJwtToken = async (token: any) => {
  let user: any;
  const cert = fs.readFileSync('./auth0key.pem');
  try {
    if (token) {
      const { sub } = jwt.verify(token, cert);
      user = User.findOne({ auth0Id: sub }, { relations: ['bookShelf', 'bookShelf.books', 'bookShelf.books.bookPosition'] });
      return user;
    }
  } catch (err) {
    return null;
  }
  return user;
};
