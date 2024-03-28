import { DeleteButton, NewNoteButton, SearchButton, ShowBookMarkButton } from '@/components'
import { ComponentProps } from 'react'

type ActionButtonRow = ComponentProps<'div'> & {
  onSearchButtonClick: () => void
  onBookMarkButtonClick: () => void
  onCreateEmptyNote: () => void
  onDeleteNote: () => void
  showBookmarks: boolean
  searchClicked: boolean
}

export const ActionButtonsRow = ({
  searchClicked,
  showBookmarks,
  onBookMarkButtonClick,
  onSearchButtonClick,
  onDeleteNote,
  onCreateEmptyNote,
  ...props
}: ActionButtonRow) => {
  return (
    <div {...props}>
      <NewNoteButton onCreateEmptyNote={onCreateEmptyNote} />
      <SearchButton onSearchButtonClick={onSearchButtonClick} searchClicked={searchClicked} />
      <ShowBookMarkButton
        onBookMarkButtonClick={onBookMarkButtonClick}
        showBookmarks={showBookmarks}
      />
      <DeleteButton onDeleteNote={onDeleteNote} />
    </div>
  )
}
