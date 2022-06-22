import { Router } from 'express';
import ApiNodeController from '../controller/ApiNodeController';

const router = Router();

const controller = new ApiNodeController();

router.post('/', async (req, res) => controller.create(req, res));
router.delete('/', async (req, res) => controller.delete(req, res));

export default router;
