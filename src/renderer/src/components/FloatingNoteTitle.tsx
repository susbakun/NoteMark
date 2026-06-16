import { selectedFileAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedFile = useAtomValue(selectedFileAtom)

  if (!selectedFile) return null
  if (selectedFile.type === 'directory') return

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span>{selectedFile.name}</span>
    </div>
  )
}
