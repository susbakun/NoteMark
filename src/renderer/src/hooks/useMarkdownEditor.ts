import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedFileAtom, sortFilesAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedFile = useAtomValue(selectedFileAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const sortFiles = useSetAtom(sortFilesAtom)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedFile) return

      console.info('Auto saving:', selectedFile.relativePath)
      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedFile) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    sortFiles()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    handleAutoSaving,
    selectedFile,
    handleBlur
  }
}
