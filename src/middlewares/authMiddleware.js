import jwt from 'jsonwebtoken';
import { serverErrorResponse } from '../controllers/controllerHelper.js';
import * as singRepository from '../repositories/signRepository.js';

async function authMiddleware(req, res, next) {
  let token = req.headers?.authorization;
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await singRepository.getTokenByUserId(decoded.user);

    if (user.rowCount > 0) {
      console.log(user.rowCount);
      res.locals.user = user.rows[0];
      return next();
    }
    return serverErrorResponse(res);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res);
  }
}

export { authMiddleware };
