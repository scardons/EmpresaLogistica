import { Router } from 'express';
import { login, registrar } from '../controllers/usuario.controller';

const router = Router();

router.post('/registrar', registrar);
router.post('/login', login)

export default router;
