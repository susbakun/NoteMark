import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Tehran'
})

console.info(`locale: `, window.context.locale)

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
