import { nanoid } from 'nanoid';
import {
  badRequestResponse,
  okResponse,
  serverErrorResponse,
} from './controllerHelper.js';
import * as shortenRepository from '../repositories/shortenRepository.js';

async function shorten(req, res) {
  const { url } = req.body;

  if (!url) {
    return badRequestResponse(res, 'Tem que mandar a url');
  }

  try {
    const shortUrl = nanoid(10);

    shortenRepository.insertShortenUrl({
      url,
      shortUrl,
      userId: res.locals.user.id,
    });

    return okResponse(res, {
      shortUrl,
    });
  } catch (error) {}

  return res.send(200);
}

async function open(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await shortenRepository.getUrl(shortUrl);

    return res.redirect(url.rows[0].url);
  } catch (error) {
    return serverErrorResponse(res, error);
  }

  return okResponse(res);
}

export { shorten, open };
