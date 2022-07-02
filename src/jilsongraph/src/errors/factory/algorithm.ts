import { RunAlgorithmError } from '../AlgorithmError';

export const makeAlgorithmError = (messageErr: string) => new RunAlgorithmError(messageErr);
