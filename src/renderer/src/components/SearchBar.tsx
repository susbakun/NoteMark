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
        {
          hidden: !showSearchBar,
          'translate-x-[100%]': !showSearchBar,
          'opacity-0': !showSearchBar,
          'translate-x-0': showSearchBar,
          'opacity-100': showSearchBar
        },
        'flex justify-center transition-opacity  duration-300 ease-out mb-5',
        className
      )}
      {...props}
    >
      {showSearchBar && (
        <input
          placeholder="Search"
          value={searched}
          autoFocus
          onChange={onInputChange}
          className={cn(
            'bg-transparent border w-[200px] border-zinc-400/50 outline-none ease-in rounded-md px-1 py-0.5 ',
            'caret-yellow-500 transition-all duration-300 ease-out',
            {
              'opacity-0': !showSearchBar,
              'opacity-100': showSearchBar,
              '-translate-y-2': !showSearchBar,
              'translate-y-0': showSearchBar
            }
          )}
        />
      )}
    </div>
  )
}
