import express from 'express';
import commentsRouter from './commentsRoutes.js'
import likesRouter from './likesRoutes.js'

const router = express.Router();
router.use('/comments', commentsRouter)
router.use('/likes', likesRouter)

export default router;