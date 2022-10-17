import jwt from 'jsonwebtoken';
import * as signRepository from '../repositories/signRepository.js';
import {
  badRequestResponse,
  serverErrorResponse,
  createdResponse,
  okResponse,
} from './controllerHelper.js';

async function signup(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return badRequestResponse(
      res,
      'Você precisa enviar os campos corretamente!'
    );
  }

  if (password !== confirmPassword) {
    return badRequestResponse(res, 'As senhas devem ser iguais!');
  }

  try {
    await signRepository.insertUser({
      email,
      name,
      password,
    });

    return createdResponse(res);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function signin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return badRequestResponse(res);
  }

  try {
    const user = await signRepository.getUserByEmail(email);
    const token = jwt.sign({ user: user.rows[0].id }, process.env.TOKEN_SECRET);
    signRepository.insertSessions({
      userId: user.rows[0].id,
      token,
    });
    return okResponse(res, { token });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo0LCJpYXQiOjE2NjYwNDY0MDd9.ls8vpoYiEG4CPgEqruwxEabvHE48hVsV2360JpuXi1Q';
export { signin, signup };
