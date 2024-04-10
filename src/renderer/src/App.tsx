import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  MarkdownEditor,
  NotePreviewList,
  NoteTopBar,
  RootLayout,
  SideBar
} from '@/components'
import { SearchBar } from '@/components/SearchBar'
import { createEmptyNoteAtom, deleteNoteAtom, notesAtom, selectedNoteIndexAtom } from '@/store'
import { checkIfNodeIsAnchor, getParentNode } from '@/utils'
import { SortFunction } from '@shared/types'
import { useAtom, useSetAtom } from 'jotai'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const [showSideBar, setShowSideBar] = useState(true)
  const [searchClicked, setSearchClicked] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [searched, setSearched] = useState('')
  const [showFiles, setShowFiles] = useState(true)

  const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)
  const [notes, setNotes] = useAtom(notesAtom)

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

  const handleSortNotes = (sortFunction: SortFunction) => {
    if (notes) setNotes(sortFunction(notes))
  }

  const handleEditorContextMenu = () => {
    window.context.showContextMenu()
  }

  const handleSideBarContextMenu = (index: number) => {
    setSelectedNoteIndex(index)
    window.context.showSideBarContextMenu()
  }

  useEffect(() => {
    window.context.initilization(handleCreation, handleDeleteNote, handleSortNotes)
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
            className="flex justify-center gap-2 mt-2"
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
          className="relative pt-3 bg-zinc-900/50 border-l-white/20"
        >
          <NoteTopBar className="flex justify-between items-center ml-1  pt-1 w-full max-w-full px-4" />
          <MarkdownEditor onContextMenu={handleEditorContextMenu} />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
