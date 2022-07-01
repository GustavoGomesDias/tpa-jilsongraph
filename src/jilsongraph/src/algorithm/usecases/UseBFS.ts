export interface BFSNode {
  id: string
  pred: string | null
  color: 'w' | 'g' | 'b' // w === white, g === gray, b === black
}
