import { connection } from '../../db/database.js';
import * as visitRepository from './visitRepository.js';

//Dica 1 - Se tiver mais de um parametro use objeto
async function insertShortenUrl({ url, userId, shortUrl }) {
  return connection.query(
    `INSERT INTO shortens (url, "userId", "shorturl") VALUES ($1, $2, $3);`,
    [url, userId, shortUrl]
  );
}

async function getUrl(shortUrl) {
  const result = await connection.query(
    `SELECT * FROM shortens WHERE shorturl = $1;`,
    [shortUrl]
  );

  if (result.rowCount > 0) {
    const shortId = result.rows[0].id;
    visitRepository.upsertVisit(shortId);
  }

  return result;
}

export { insertShortenUrl, getUrl };
