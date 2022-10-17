import { connection } from '../../db/database.js';

async function insertUser({ name, email, password }) {
  const result = await connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  ); //{}.rows

  return result;
}

async function getUserByEmail(email) {
  //Não precisa do await
  return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function insertSessions({ userId, token }) {
  //Não precisa do await
  return connection.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
    [userId, token]
  );
}

export { insertUser, getUserByEmail, insertSessions };
