import { connection } from '../../db/database.js';

async function insertUser({ name, email, password }) {
  const result = await connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  ); //{}.rows

  return result;
}

export { insertUser };
