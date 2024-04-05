import { FiFolderPlus } from 'react-icons/fi'
import { ActionButton } from './ActionButton'

type NewDirectoryButtonProps = {
  //
}

export const NewDirectoryButton = ({ ...props }: NewDirectoryButtonProps) => {
  return (
    <ActionButton title="Create a Directory" {...props}>
      <FiFolderPlus className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
