import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Users';
import { USER_SECRET } from '../utils/constant';

const auth = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers['authorization'] || req.query.token;
    token = token.split(' ')[1];
    if (!token) {
      return res.status(401).send({ code: 401, message: 'Unauthorized' });
    }
    const user = jwt.verify(token, USER_SECRET);
    const matchUser = await getRepository(Account)
                            .createQueryBuilder('user')
                            .where('user.id = :userId')
                            .setParameters({userId : user.id})
                            .getOne();
    console.log(`decode token`, user)
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({ code: 401, message: 'Unauthorized' });
  }
};
export default auth;