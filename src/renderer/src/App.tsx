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
import { checkIfNodeIsAnchor, getParentNode } from '@/utils'
import { SortType } from '@shared/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNotesList } from './hooks/useNotesList'

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
    sortFunctionName,
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
            className="flex justify-center gap-2 mt-2 mb-2"
          />
          <SearchBar
            onInputChange={handleSearchNote}
            showSearchBar={searchClicked}
            searched={searched}
          />
          <NotePreviewList
            showBookmarks={showBookmarks}
            searched={searched}
            className="mt-3 space-y-1"
            onSelect={resetScroll}
            onSidebarContextMenu={handleSideBarContextMenu}
          />
        </SideBar>
        <Content
          ref={contentContainerRef}
          onClick={handleOpenLink}
          showSideBar={showSideBar}
          className="relative pt-3 transition-all bg-zinc-900/50 border-l-white/20 text-justify"
        >
          <NoteTopBar className="flex justify-between items-center ml-1  pt-1 w-full max-w-full px-4" />
          <MarkdownEditor onContextMenu={handleEditorContextMenu} />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
