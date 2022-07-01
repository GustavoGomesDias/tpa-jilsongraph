export interface DFSNode {
  id: string,
  pred: string | null
  color: 'w' | 'g' | 'b' // w === white, g === gray, b === black
  discoveryTime: number
  nodeFinishedTime: number
}
