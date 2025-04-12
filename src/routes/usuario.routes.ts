import { Router } from 'express';
import { registrar } from '../controllers/usuario.controller';

const router = Router();

router.post('/registrar', registrar);

export default router;
