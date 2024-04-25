import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom, sortNotesAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const sortNotes = useSetAtom(sortNotesAtom)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving:', selectedNote.title)
      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    sortNotes()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    handleAutoSaving,
    selectedNote,
    handleBlur
  }
}
