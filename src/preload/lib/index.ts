import { SortFunction } from '@shared/types'

export const sortNotesFromAToZ: SortFunction = (notes) => {
  return notes.sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
}

export const sortNotesFromZToA: SortFunction = (notes) => {
  return notes.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0))
}

export const sortNotesFromNewToOld: SortFunction = (notes) => {
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const sortNotesFromOldToNew: SortFunction = (notes) => {
  return notes.sort((a, b) => a.lastEditTime - b.lastEditTime)
}
