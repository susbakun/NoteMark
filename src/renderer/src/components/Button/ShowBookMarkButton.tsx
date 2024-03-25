import { cn } from '@renderer/utils'
import { LuBookMarked } from 'react-icons/lu'
import { ActionButton } from './ActionButton'

type ShowBookMarkButtonProps = {
  showBookmarks: boolean
  onBookMarkButtonClick: () => void
}

export const ShowBookMarkButton = ({
  onBookMarkButtonClick,
  showBookmarks
}: ShowBookMarkButtonProps) => {
  return (
    <ActionButton onClick={onBookMarkButtonClick} className={showBookmarks ? 'bg-zinc-600/50' : ''}>
      <LuBookMarked
        className={cn('w-5 h-5 transition-colors duration-150 ease-in font-bold text-zinc-200', {
          'text-white': showBookmarks
        })}
      />
    </ActionButton>
  )
}
