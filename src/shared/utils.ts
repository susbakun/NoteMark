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

const sortFilesFromAToZ: SortFunction = (files) => {
  files.sort((a, b) => a.name.localeCompare(b.name))

  // recursively sorting
  files.forEach((file) => {
    if (file.type === 'directory') {
      sortFilesFromAToZ(file.children)
    }
  })

  return files
}

export const sortFilesFromZToA: SortFunction = (files) => {
  files.sort((a, b) => b.name.localeCompare(a.name))

  // recursively sorting
  files.forEach((file) => {
    if (file.type === 'directory') {
      sortFilesFromZToA(file.children)
    }
  })

  return files
}

export const sortFilesFromNewToOld: SortFunction = (files) => {
  files.sort((a, b) => b.lastEditTime - a.lastEditTime)

  // recursively sorting
  files.forEach((file) => {
    if (file.type === 'directory') {
      sortFilesFromNewToOld(file.children)
    }
  })

  return files
}

export const sortFilesFromOldToNew: SortFunction = (files) => {
  files.sort((a, b) => a.lastEditTime - b.lastEditTime)

  // recursively sorting
  files.forEach((file) => {
    if (file.type === 'directory') {
      sortFilesFromOldToNew(file.children)
    }
  })

  return files
}
