import { ComponentProps } from 'react'
import { ActionButton, BookmarkButton } from './Button'

import { FloatingNoteTitle } from './FloatingNoteTitle'

type ToggleSideBarAndBookMarkRowProps = ComponentProps<'div'>

export const NoteTopBar = ({ ...props }: ToggleSideBarAndBookMarkRowProps) => {
  return (
    <div {...props}>
      {/* I used the following dummy button for making the items justified properly */}
      <ActionButton className="invisible" />
      <FloatingNoteTitle className="mx-auto" />
      <BookmarkButton />
    </div>
  )
}
