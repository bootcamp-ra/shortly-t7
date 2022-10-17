import * as signRepository from '../repositories/signRepository.js';

async function signup(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send('Você precisa enviar os campos corretamente!');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('As senhas devem ser iguais!');
  }

  try {
    await signRepository.insertUser({
      email,
      name,
      password,
    });

    return res.send(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Deu ruim!!!');
  }
}

async function signin(req, res) {
  return res.send(200);
}

export { signin, signup };
