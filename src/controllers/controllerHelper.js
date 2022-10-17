const STATUS_CODE = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
});

const STATUS_TEXT = Object.freeze({
  CREATED: 'created',
  BAD_REQUEST: 'bad request',
});

function createdResponse(res, text = STATUS_TEXT.CREATED) {
  return res.status(STATUS_CODE.CREATED).send(text);
}

function badRequestResponse(res, text = STATUS_TEXT.BAD_REQUEST) {
  return res.status(STATUS_CODE.BAD_REQUEST).send(text);
}

function serverErrorResponse(res, error) {
  console.error(error);
  return res.status(STATUS_CODE.BAD_REQUEST).send('Deu ruim!!!');
}

export { badRequestResponse, serverErrorResponse, createdResponse };