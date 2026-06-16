import { FileSystemItem } from '@shared/models'
import { ConditionType } from '@shared/types'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Tehran'
})

export const formatDateFromMS = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const getParentNode = (node: HTMLElement): HTMLAnchorElement => {
  return node.parentNode as HTMLAnchorElement
}

export const checkIfNodeIsAnchor = (node: HTMLElement | null): boolean => {
  return !!(
    node &&
    node instanceof HTMLSpanElement &&
    getParentNode(node) instanceof HTMLAnchorElement
  )
}

export const hasFocus = (element: HTMLElement) => {
  return element.tagName === 'BODY'
}

export const joinPath = (p1: string, p2: string) => {
  if (p1 === '') return p2
  return p1 + '/' + p2
}

export const relativePathComparison = (selectedNote: FileSystemItem) => {
  return (relativePath: string) => relativePath === selectedNote.relativePath
}

export const relativePathTypeComparison = (selectedNote: FileSystemItem) => {
  return (relativePath: string, type: string) =>
    relativePath === selectedNote.relativePath && type === 'note'
}

export const bookmarkCheck = (bookmarks: string[]) => {
  return (relativePath: string) => bookmarks.includes(relativePath)
}

export const findFileRecursively = (files: FileSystemItem[], condition: ConditionType) => {
  for (const file of files) {
    if (condition(file.relativePath)) return file

    if (file.type === 'directory') {
      const found = findFileRecursively(file.children, condition)
      if (found) return found
    }
  }

  return null
}

export const mapRecursively = (
  files: FileSystemItem[],
  condition: ConditionType,
  toggleBookmark?: boolean,
  bookmark?: boolean
): FileSystemItem[] => {
  return files.map((file) => {
    if (condition(file.relativePath, file.type)) {
      if (toggleBookmark && file.type === 'note') {
        return { ...file, bookmarked: !file.bookmarked }
      } else if (bookmark && file.type === 'note') {
        return { ...file, bookmarked: true }
      }
      return { ...file, lastEditTime: Date.now() }
    } else if (file.type === 'directory' && findFileRecursively(file.children, condition))
      return {
        ...file,
        children: mapRecursively(file.children, condition, toggleBookmark, bookmark)
      }
    else return file
  })
}
