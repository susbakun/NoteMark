import { FiFolderPlus } from 'react-icons/fi'
import { ActionButton } from './ActionButton'

type NewDirectoryButtonProps = {
  onCreateDir: () => void
}

export const NewDirectoryButton = ({ onCreateDir, ...props }: NewDirectoryButtonProps) => {
  return (
    <ActionButton onClick={onCreateDir} title="Create a Directory" {...props}>
      <FiFolderPlus className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
