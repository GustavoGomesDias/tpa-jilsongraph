import JilsonGraphError from './JilsoGraphError';

export class RunAlgorithmError extends JilsonGraphError {
  constructor(message: string) {
    super(`Erro ao rodar algum algoritmo: ${message}`);
    this.name = 'RunAlgorithmError';
  }
}
