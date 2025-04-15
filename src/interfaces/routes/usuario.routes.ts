import { Router } from 'express';
import { login, perfil, registrar } from '../controllers/usuario.controller';
import { verifyToken } from '../middlewares/authMiddleware';


const router = Router();

router.post('/registrar', registrar);
router.post('/login', login)
router.get('/perfil', verifyToken, perfil)

export default router;
