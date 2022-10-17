import * as signRepository from '../repositories/signRepository.js';
import {
  badRequestResponse,
  serverErrorResponse,
  createdResponse,
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
  return res.send(200);

  try {
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export { signin, signup };
