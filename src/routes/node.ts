import { Router } from 'express';
import ApiNodeController from '../controller/ApiNodeController';

const router = Router();

const controller = new ApiNodeController();

router.post('/', async (req, res) => {
  await controller.create(req, res);
});

router.get('/all/:nodeName', async (req, res) => {
  await controller.getAll(req, res);
});

router.get('/:nodeName/:id', async (req, res) => {
  await controller.getById(req, res);
});

router.delete('/', async (req, res) => {
  await controller.delete(req, res);
});

export default router;
