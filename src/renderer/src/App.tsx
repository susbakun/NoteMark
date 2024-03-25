import {
  ActionButtonsRow,
  Content,
  DraggbleTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  SideBar,
  ToggleSideBarButton
} from '@/components'
import { useSetAtom } from 'jotai'
import { ChangeEvent, useRef, useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { selectedNoteIndexAtom } from './store'
import { checkIfNodeIsAnchor, getParentNode } from './utils'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [showSideBar, setShowSideBar] = useState(true)
  const [searchClicked, setSearchClicked] = useState(false)
  const [searched, setSearched] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)

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
    setShowBookmarks((prev) => !prev)
  }

  const handleOpenLink = (event: React.MouseEvent) => {
    event.preventDefault()
    const node = event.target as HTMLElement
    if (checkIfNodeIsAnchor(node)) {
      const parentNode = getParentNode(node)
      window.context.openLink(parentNode.href)
    }
  }

  return (
    <>
      <DraggbleTopBar />
      <RootLayout>
        <SideBar showSideBar={showSideBar}>
          <ActionButtonsRow
            searchClicked={searchClicked}
            showBookmarks={showBookmarks}
            onSearchButtonClick={handleCloseSearchBar}
            onBookMarkButtonClick={handleShowBookMarks}
            className="flex justify-between mt-1"
          />
          <SearchBar
            onInputChange={handleSearchNote}
            showSearchBar={searchClicked}
            searched={searched}
          />
          <NotePreviewList searched={searched} className="mt-3 space-y-1" onSelect={resetScroll} />
        </SideBar>
        <Content
          onClick={handleOpenLink}
          ref={contentContainerRef}
          showSideBar={showSideBar}
          className="relative pt-2 bg-zinc-900/50 border-l-white/20"
        >
          <ToggleSideBarButton
            showSideBar={showSideBar}
            toggleSideBar={handleToggleSideBar}
            className="absolute top-10 left-2"
          />
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
