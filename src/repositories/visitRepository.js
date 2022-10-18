import { connection } from '../../db/database.js';

//Se não tiver eu INSERT
//Se tiver eu UPDATE

async function upsertVisit(shortId) {
  const result = await getVisit(shortId);
  if (result.rowCount > 0) {
    //update
    return incrementVisit(shortId);
  }

  return insertVisit(shortId);
}

//Pode ser com default 1
async function insertVisit(shortId) {
  return connection.query(
    `INSERT INTO visits ("shortid", visit) VALUES ($1, $2);`,
    [shortId, 1]
  );
}

async function incrementVisit(shortId) {
  return connection.query(
    `UPDATE visits SET visit = visit + 1 WHERE "shortid" = $1;`,
    [shortId]
  );
}

async function getVisit(shortId) {
  return connection.query(`SELECT * FROM visits WHERE "shortid" = $1;`, [
    shortId,
  ]);
}

export { getVisit, insertVisit, incrementVisit, upsertVisit };
