import { SortFunction, SortType } from '@shared/types'

export const sortFilesSelector = (sortType: SortType): SortFunction => {
  switch (sortType) {
    case 'sortNotesFromAToZ':
      return sortFilesFromAToZ
    case 'sortNotesFromZToA':
      return sortFilesFromZToA
    case 'sortNotesFromNewToOld':
      return sortFilesFromNewToOld
    case 'sortNotesFromOldToNew':
      return sortFilesFromOldToNew
    default:
      return sortFilesFromOldToNew
  }
}

export const sortFilesFromAToZ: SortFunction = (files) => {
  return files.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
}

export const sortFilesFromZToA: SortFunction = (files) => {
  return files.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
}

export const sortFilesFromNewToOld: SortFunction = (files) => {
  return files.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const sortFilesFromOldToNew: SortFunction = (files) => {
  return files.sort((a, b) => a.lastEditTime - b.lastEditTime)
}
