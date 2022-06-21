import JilsonGraphError from '../JilsoGraphError';

export type JilsonGrapgErrorFactory = (messageErr: string, entityName: string) => JilsonGraphError;
