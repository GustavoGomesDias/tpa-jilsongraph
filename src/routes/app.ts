import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  welcome: 'Bem-vindo! Para usar a API, chame as rotas',
  routes: [{
    path: '/doc',
    to: 'Gerenciar os documentos de arestas ou nós.',
  }, {
    path: '/node',
    to: 'Gerenciar os nós de fato.',
  }, {
    path: '/edge',
    to: 'Gerenciar as arestas de fato.',
  }],
}));

export default router;
