import express from 'express';
import { getComments, postComments } from '../controllers/commentsController.js';
import validateComment from '../data-validators.js';

const commentsRouter = express.Router();

commentsRouter.post('/:trackId', validateComment, postComments);
commentsRouter.get('/:trackId', getComments);

export default commentsRouter;