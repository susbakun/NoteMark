import { cn } from '@renderer/utils'
import { FiSearch } from 'react-icons/fi'
import { ActionButton } from './ActionButton'

type SearchButtonProps = {
  onSearchButtonClick: () => void
  searchClicked: boolean
}

export const SearchButton = ({ searchClicked, onSearchButtonClick }: SearchButtonProps) => {
  return (
    <ActionButton
      title="Search Notes"
      className={searchClicked ? 'bg-zinc-600/50' : ''}
      onClick={onSearchButtonClick}
    >
      <FiSearch
        className={cn('w-5 h-5 transition-colors duration-150 ease-in font-bold text-zinc-200', {
          'text-white': searchClicked
        })}
      />
    </ActionButton>
  )
}
