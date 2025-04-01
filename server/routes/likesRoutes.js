import express from 'express';
import { getLikes, postLikes } from '../controllers/likesController.js';

const likesRouter = express.Router();
likesRouter.post('/:trackId', postLikes)
likesRouter.get('/:trackId', getLikes)

export default likesRouter;