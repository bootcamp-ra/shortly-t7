import express from 'express';
import { shorten, open } from '../controllers/urlController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', authMiddleware, shorten);
router.get('/urls/open/:shortUrl', open);
export default router;
