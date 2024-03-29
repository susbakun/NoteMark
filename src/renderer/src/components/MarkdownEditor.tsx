import {
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'
import { ComponentProps } from 'react'

export const MarkdownEditor = ({ onContextMenu }: ComponentProps<'div'>) => {
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <div onContextMenu={onContextMenu}>
      <MDXEditor
        ref={editorRef}
        key={selectedNote.title}
        onChange={handleAutoSaving}
        markdown={selectedNote.content}
        onBlur={handleBlur}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: 'js'
          }),
          codeMirrorPlugin({
            theme: 'dark',
            codeBlockLanguages: { js: 'JavaScript', css: 'CSS' }
          }),
          imagePlugin(),
          linkPlugin(),
          markdownShortcutPlugin()
        ]}
        contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 
      prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4
       prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-['']
       prose-code:after:content-[''] prose-a:text-blue-500 prose-a:hover:underline prose-a:cursor-pointer"
      />
    </div>
  )
}
