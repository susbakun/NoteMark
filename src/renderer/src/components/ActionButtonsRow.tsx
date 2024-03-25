import { DeleteButton, NewNoteButton, SearchButton, ShowBookMarkButton } from '@/components'
import { ComponentProps } from 'react'

type ActionButtonRow = ComponentProps<'div'> & {
  onSearchButtonClick: () => void
  onBookMarkButtonClick: () => void
  showBookmarks: boolean
  searchClicked: boolean
}

export const ActionButtonsRow = ({
  searchClicked,
  showBookmarks,
  onBookMarkButtonClick,
  onSearchButtonClick,
  ...props
}: ActionButtonRow) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <SearchButton onSearchButtonClick={onSearchButtonClick} searchClicked={searchClicked} />
      <ShowBookMarkButton
        onBookMarkButtonClick={onBookMarkButtonClick}
        showBookmarks={showBookmarks}
      />
      <DeleteButton />
    </div>
  )
}
