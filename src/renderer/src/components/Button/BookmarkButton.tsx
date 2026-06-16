import { bookmarkNoteAtom, selectedFileAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { BsBookmarkCheck } from 'react-icons/bs'
import { LuBookmark } from 'react-icons/lu'
import { ActionButton } from './ActionButton'

export const BookmarkButton = () => {
  const selectedFile = useAtomValue(selectedFileAtom)
  const bookmarkNote = useSetAtom(bookmarkNoteAtom)

  const handleBookMarkNote = () => {
    bookmarkNote()
  }
  if (!selectedFile) return null
  if (selectedFile.type === 'directory') return null

  const isBookMarked = selectedFile.bookmarked

  return (
    <ActionButton
      direction="bottom-end"
      onClick={handleBookMarkNote}
      title={isBookMarked ? 'UnBookmark the Note' : 'Bookmark the Note'}
    >
      {isBookMarked ? (
        <BsBookmarkCheck className="w-6 h-6 text-zinc-300" />
      ) : (
        <LuBookmark className="w-6 h-6 text-zinc-300" />
      )}
    </ActionButton>
  )
}
