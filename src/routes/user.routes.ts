import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);

export default router;
