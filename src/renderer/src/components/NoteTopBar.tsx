import { ComponentProps } from 'react'
import { ActionButton, BookmarkButton } from './Button'

import { twMerge } from 'tailwind-merge'
import { FloatingNoteTitle } from './FloatingNoteTitle'

type ToggleSideBarAndBookMarkRowProps = ComponentProps<'div'>

export const NoteTopBar = ({ className, ...props }: ToggleSideBarAndBookMarkRowProps) => {
  return (
    <div
      className={twMerge('flex justify-between items-center w-full max-w-full', className)}
      {...props}
    >
      {/* I used the following dummy button for making the items justified properly */}
      <ActionButton className="invisible" />
      <FloatingNoteTitle className="mx-auto" />
      <BookmarkButton />
    </div>
  )
}
