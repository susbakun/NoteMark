import { cn } from '@renderer/utils'
import { ChangeEvent, ComponentProps } from 'react'

type SearchBarProps = ComponentProps<'div'> & {
  showSearchBar: boolean
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  searched: string
}

export const SearchBar = ({
  onInputChange,
  showSearchBar,
  className,
  searched,
  ...props
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        { 'h-0': !showSearchBar },
        'flex justify-center mt-3 duration-300 ease-out ',
        className
      )}
      {...props}
    >
      <input
        autoFocus
        placeholder="Search"
        value={searched}
        onChange={onInputChange}
        className={cn(
          'bg-transparent border w-[200px] border-zinc-400/50 outline-none rounded-md px-1 py-0.5 ',
          'caret-yellow-500 transition-all duration-300 ease-out  visible h-4',
          {
            'opacity-0': !showSearchBar,
            'opacity-100': showSearchBar,
            '-translate-y-2': !showSearchBar,
            'translate-y-0': showSearchBar,
            invisible: !showSearchBar,
            'h-fit': showSearchBar
          }
        )}
      />
    </div>
  )
}
