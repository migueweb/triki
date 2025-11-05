import type { TrikiInfo } from "../types/triki"

export function createTrikiStructure(): Array<TrikiInfo> {

  const trikiBaseStructure: Array<TrikiInfo>  = []

  // Populate the initial triki array
  for (let i:number = 1; i <= 9; i++) {
      trikiBaseStructure.push({content: "", position: i})
  }

  return trikiBaseStructure

}