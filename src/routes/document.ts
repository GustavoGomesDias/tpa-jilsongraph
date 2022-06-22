import { Router } from 'express';
import ApiDocumentController from '../controller/ApiDocumentController';

const router = Router();

const controller = new ApiDocumentController();

router.post('/', async (req, res) => controller.create(req, res));
router.delete('/', async (req, res) => controller.delete(req, res));

export default router;
