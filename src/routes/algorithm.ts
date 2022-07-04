import { Router } from 'express';
import ApiRunAlgorithm from '../controller/ApiRunAlgorithm';

const router = Router();

const controller = new ApiRunAlgorithm();

router.get('/dfs/:edgeName', async (req, res) => controller.dfs(req, res));
router.get('/bfs', async (req, res) => controller.bfs(req, res));
router.get('/dijkstra', async (req, res) => controller.dijkstra(req, res));
router.get('/prim', async (req, res) => controller.prim(req, res));

export default router;
