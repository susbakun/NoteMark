import { FileButton, SearchButton, ShowBookMarkButton } from './Button'

export type FilterNotesButtonsRowProps = {
  showBookmarks: boolean
  searchClicked: boolean
  showFiles: boolean
  onSearchButtonClick: () => void
  onBookMarkButtonClick: () => void
  onShowFilesButtonClick: () => void
}

export const FilterNotesButtonsRow = ({
  showBookmarks,
  searchClicked,
  showFiles,
  onShowFilesButtonClick,
  onBookMarkButtonClick,
  onSearchButtonClick
}: FilterNotesButtonsRowProps) => {
  return (
    <div className="flex h-full ml-20 items-center gap-2">
      <FileButton showFiles={showFiles} onShowFilesButtonClick={onShowFilesButtonClick} />
      <SearchButton onSearchButtonClick={onSearchButtonClick} searchClicked={searchClicked} />
      <ShowBookMarkButton
        onBookMarkButtonClick={onBookMarkButtonClick}
        showBookmarks={showBookmarks}
      />
    </div>
  )
}
