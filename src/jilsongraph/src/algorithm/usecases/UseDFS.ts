/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DFSNode {
  id: string,
  nodeInfo: Record<any, any>
  pred: {
    id: string | null
    predInfo: Record<any, any>
  }
  color: 'w' | 'g' | 'b' // w === white, g === gray, b === black
  discoveryTime: number
  nodeFinishedTime: number
}
