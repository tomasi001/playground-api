import { Router } from 'express';
import { getOpenAIResponse } from '../controllers/openaiController';

const router: Router = Router();

router.post('/openai', getOpenAIResponse);

export default router;