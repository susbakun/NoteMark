import { ActionButton } from '@/components'
import { FaRegTrashCan } from 'react-icons/fa6'

type DeleteButtonProps = {
  onDeleteFile: () => void
}

export const DeleteButton = ({ onDeleteFile, ...props }: DeleteButtonProps) => {
  return (
    <ActionButton title="Delete file" onClick={onDeleteFile} {...props}>
      <FaRegTrashCan className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
