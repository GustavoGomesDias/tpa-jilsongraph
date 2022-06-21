import { Router } from 'express';
import ApiDocumentController from '../controller/ApiDocumentController';

const router = Router();

const controller = new ApiDocumentController();

router.post('/', controller.create);
router.delete('/', controller.delete);

export default router;
