import { cn } from '@renderer/utils'
import { GoFileDirectory } from 'react-icons/go'
import { ActionButton } from './ActionButton'

type FileButtonProps = {
  showFiles: boolean
  onShowFilesButtonClick: () => void
}

export const FileButton = ({ onShowFilesButtonClick, showFiles }: FileButtonProps) => {
  return (
    <ActionButton
      onClick={onShowFilesButtonClick}
      className={showFiles ? 'bg-zinc-600/50' : ''}
      title="Show Files"
    >
      <GoFileDirectory
        className={cn('w-5 h-[18px] transition-colors duration-150 ease-in font-bold text-white', {
          'text-white': showFiles
        })}
      />
    </ActionButton>
  )
}
