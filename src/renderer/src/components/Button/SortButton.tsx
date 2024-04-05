import { FaSortAlphaDown } from 'react-icons/fa'
import { ActionButton } from './ActionButton'

type SortButtonProps = {
  //
}

export const SortButton = ({ ...props }: SortButtonProps) => {
  return (
    <ActionButton title="Sort Files" {...props}>
      <FaSortAlphaDown className="w-5 h-[18px] text-zinc-300/80" />
    </ActionButton>
  )
}
