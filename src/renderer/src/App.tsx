import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  MarkdownEditor,
  NotePreviewList,
  NoteTopBar,
  RootLayout,
  SearchBar,
  SideBar
} from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { checkIfNodeIsAnchor, getParentNode } from '@/utils'
import { SortType } from '@shared/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const [showSideBar, setShowSideBar] = useState(true)
  const [searchClicked, setSearchClicked] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [searched, setSearched] = useState('')
  const [showFiles, setShowFiles] = useState(true)
  const [isInitilized, setIsInitilized] = useState(false)

  const {
    notes,
    sortNotes,
    setSelectedNoteIndex,
    createEmptyNote,
    deleteNote,
    setSortFunctionName
  } = useNotesList({})

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  const handleToggleSideBar = () => {
    setShowSideBar((prev) => !prev)
  }

  const handleSearchNote = (event: ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value)
    setSelectedNoteIndex(null)
  }

  const handleCloseSearchBar = () => {
    if (searchClicked) {
      setSearched('')
    }
    setSearchClicked((prev) => !prev)
  }

  const handleShowBookMarks = () => {
    setShowBookmarks(true)
    setShowFiles(false)
  }

  const handleShowFiles = () => {
    setShowFiles(true)
    setShowBookmarks(false)
  }

  const handleOpenLink = (event: React.MouseEvent) => {
    event.preventDefault()
    const node = event.target as HTMLElement
    if (checkIfNodeIsAnchor(node)) {
      const parentNode = getParentNode(node)
      window.context.openLink(parentNode.href)
    }
  }

  const handleCreation = async () => {
    await createEmptyNote()
  }

  const handleDeleteNote = async () => {
    await deleteNote()
  }

  const handleSortNotesContextMenu = () => {
    window.context.sortNotes()
  }

  const handleSortNotes = (sortType: SortType) => {
    setSelectedNoteIndex(null)
    setSortFunctionName(sortType)
    console.log(sortType)
    if (notes) sortNotes()
  }

  const handleEditorContextMenu = () => {
    window.context.showContextMenu()
  }

  const handleSideBarContextMenu = (index: number) => {
    setSelectedNoteIndex(index)
    window.context.showSideBarContextMenu()
  }

  useEffect(() => {
    if (!isInitilized && notes) {
      setIsInitilized(true)
      window.context.initilization(handleCreation, handleDeleteNote, handleSortNotes)
    }
  }, [notes])

  return (
    <>
      <DraggableTopBar
        searchClicked={searchClicked}
        showSideBar={showSideBar}
        showFiles={showFiles}
        showBookmarks={showBookmarks}
        onToggleSideBar={handleToggleSideBar}
        onShowFilesButtonClick={handleShowFiles}
        onSearchButtonClick={handleCloseSearchBar}
        onBookMarkButtonClick={handleShowBookMarks}
      />
      <RootLayout>
        <SideBar onDeleteNote={handleDeleteNote} showSideBar={showSideBar}>
          <ActionButtonsRow
            onCreateEmptyNote={handleCreation}
            onSortNotes={handleSortNotesContextMenu}
            onDeleteNote={handleDeleteNote}
            showSearchBar={searchClicked}
            className="gap-2 mt-2 mb-2"
          />
          <SearchBar
            onInputChange={handleSearchNote}
            showSearchBar={searchClicked}
            searched={searched}
          />
          <NotePreviewList
            showBookmarks={showBookmarks}
            searched={searched}
            onSelect={resetScroll}
            onSidebarContextMenu={handleSideBarContextMenu}
            className="mt-3 space-y-1"
          />
        </SideBar>
        <Content
          ref={contentContainerRef}
          onClick={handleOpenLink}
          showSideBar={showSideBar}
          className="relative pt-3 bg-zinc-900/50 border-l-white/20"
        >
          <NoteTopBar className="ml-1 pt-1 px-4" />
          <MarkdownEditor onContextMenu={handleEditorContextMenu} />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
