import * as jwt from 'jsonwebtoken';
import { USER_SECRET } from '../utils/constant';

const auth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers['authorization'] || req.query.token;
    token = token.split(' ')[1];
    if (!token) {
      return res.status(401).send({ code: 401, message: 'Unauthorized' });
    }
    const user = jwt.verify(token, USER_SECRET);
    console.log(`decode token`, user)
    req.user = user;
  } catch (err) {
    return res.status(401).send({ code: 401, message: 'Unauthorized' });
  }
  return next();
};
export default auth;