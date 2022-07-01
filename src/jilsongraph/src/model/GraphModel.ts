/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable semi */
export default interface GraphModel {
  id: string
  firstNodeName: string
  secondNodeName: string
  directed: boolean
  data: {
    id: string
    firstNodeId: string
    secondNodeId: string
    edgeInfos: Record<any, any>
  }[]
}

export interface CreateEmptyEdge {
  edgeName: string
  firstNodeName: string
  secondNodeName: string
  directed: boolean
  data: []
}

export interface GrpahModelWithNodeContent {
  id: string
  firstNodeName: string
  secondNodeName: string
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
  directed: boolean
  edgeInfos: Record<any, any>
}
