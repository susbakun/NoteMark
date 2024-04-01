import { ToggleSideBarButton } from './Button'
import { FilterNotesButtonsRow, FilterNotesButtonsRowProps } from './FilterNotesButtonsRow'

type DraggableTopBarProps = FilterNotesButtonsRowProps & {
  onToggleSideBar: () => void
  onShowFilesButtonClick: () => void
  showFiles: boolean
  showSideBar: boolean
}

export const DraggableTopBar = ({
  onBookMarkButtonClick,
  onSearchButtonClick,
  searchClicked,
  onToggleSideBar,
  onShowFilesButtonClick,
  showSideBar,
  showFiles,
  showBookmarks
}: DraggableTopBarProps) => {
  return (
    <header className="absolute inset-0 h-10 bg-[#363636] z-10">
      <div className="flex w-[300px] h-full items-center justify-between">
        <FilterNotesButtonsRow
          searchClicked={searchClicked}
          showBookmarks={showBookmarks}
          showFiles={showFiles}
          onShowFilesButtonClick={onShowFilesButtonClick}
          onSearchButtonClick={onSearchButtonClick}
          onBookMarkButtonClick={onBookMarkButtonClick}
        />
        <ToggleSideBarButton showSideBar={showSideBar} toggleSideBar={onToggleSideBar} />
      </div>
    </header>
  )
}
