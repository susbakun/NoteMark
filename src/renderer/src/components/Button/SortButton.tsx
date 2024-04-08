import { FaSortAlphaDown } from 'react-icons/fa'
import { ActionButton } from './ActionButton'

type SortButtonProps = {
  onSortNotes: () => void
}

export const SortButton = ({ onSortNotes, ...props }: SortButtonProps) => {
  return (
    <ActionButton onClick={onSortNotes} title="Sort Files" {...props}>
      <FaSortAlphaDown className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
