import { Router } from 'express';
import ApiEdgeController from '../controller/ApiEdgeController';

const router = Router();

const controller = new ApiEdgeController();

router.get('/', async (req, res) => {
  await controller.getAllEdges(req, res);
});

router.get('/:edge', async (req, res) => {
  await controller.getAll(req, res);
});
router.get('/node-info/:edge', async (req, res) => {
  await controller.getAllWitNodeInfo(req, res);
});

router.post('/', async (req, res) => {
  await controller.createEmptyEdge(req, res);
});

router.post('/:edgeName', async (req, res) => {
  await controller.addInEdge(req, res);
});

router.delete('/', async (req, res) => {
  await controller.delete(req, res);
});

export default router;
