import { connection } from '../../db/database.js';

//Dica 2 - Se é um insert tem prefixo de insert
async function insertUser({ name, email, password }) {
  const result = await connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  ); //{}.rows

  return result;
}

//Dica 2 - Se é um select tem prefixo get
async function getUserByEmail(email) {
  //Não precisa do await
  return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

//Dica 1 - Repository só faz QUERY
async function getTokenByUserId(userId) {
  //Não precisa do await
  return connection.query(
    `SELECT * FROM sessions WHERE "userId" = $1 AND active = TRUE;`,
    [userId]
  );
}

async function insertSessions({ userId, token }) {
  //Não precisa do await
  return connection.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
    [userId, token]
  );
}

export { insertUser, getUserByEmail, insertSessions, getTokenByUserId };
