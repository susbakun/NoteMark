import { cn, formatDateFromMS } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { BsBookmarkCheck } from 'react-icons/bs'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
  isHidden: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  isActive = false,
  isHidden,
  title,
  content,
  lastEditTime,
  bookmarked,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMS(lastEditTime)
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive,
          hidden: isHidden
        },
        className
      )}
      {...props}
    >
      <div className="flex justify-between">
        <h3 className="mb-1 font-bold truncate">{title}</h3>
        {bookmarked ? <BsBookmarkCheck className="w-4 h-4 text-zinc-300" /> : ''}
      </div>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
  )
}
