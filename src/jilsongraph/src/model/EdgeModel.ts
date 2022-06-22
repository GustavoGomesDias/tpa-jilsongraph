/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable semi */
export default interface EdgeModel {
  id: string
  firstNodeName: string
  secomdNodeName: string
  directed: boolean
  data: {
    id: string
    firstNodeId: string
    secondNodeId: string
    edgeInfos: Record<any, any>
  }[]
}

export interface EdgeModelWithNodeContent {
  id: string
  firstNodeName: string
  secomdNodeName: string
  directed: boolean
  data: {
    id: string
    firstNode: Record<any, any>
    secondNode: Record<any, any>
    edgeInfos: Record<any, any>
  }[]
}

export interface AddEdge {
  firstNodeId: string
  secondNodeId: string
  edgeInfos: Record<any, any>
}

export interface EdgeInfo {
  id: string
  firstNodeId: string
  secondNodeId: string
  edgeInfos: Record<any, any>
}