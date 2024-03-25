import { NoteInfo } from '@shared/models'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
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

export const filterNotes = (notes: NoteInfo[], searched: string): NoteInfo[] => {
  return notes.filter((note) => note.title.toLowerCase().includes(searched.toLowerCase()))
}

export const getBookmarkedNotes = (notes: NoteInfo[]): NoteInfo[] => {
  return notes.filter((note) => note.bookmarked)
}
