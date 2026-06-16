import { cn } from '@renderer/utils'
import { DirectoryInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { BsFolder2, BsFolder2Open } from 'react-icons/bs'
import { IoChevronForward } from 'react-icons/io5'

export type DirectoryPreviewProps = Pick<DirectoryInfo, 'name' | 'relativePath'> & {
  isExpanded?: boolean
  isSelected?: boolean
  isHidden?: boolean
  depth?: number
  onChevronClick?: () => void
} & ComponentProps<'div'>

export const DirectoryPreview = ({
  isExpanded = false,
  isSelected = false,
  isHidden = false,
  depth = 0,
  name,
  onChevronClick,
  className,
  ...props
}: DirectoryPreviewProps) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md px-2.5 py-2.5 cursor-pointer',
        'transition-colors duration-75 select-none',
        {
          'bg-zinc-400/75': isSelected,
          'hover:bg-zinc-500/75': !isSelected,
          hidden: isHidden
        },
        className
      )}
      style={{ paddingLeft: `${depth * 12 + 10}px` }}
      {...props}
    >
      <button
        type="button"
        aria-label={isExpanded ? 'Collapse folder' : 'Expand folder'}
        onClick={(e) => {
          e.stopPropagation()
          onChevronClick?.()
        }}
        className={cn(
          'flex shrink-0 items-center justify-center w-4 h-4 rounded transition-transform duration-150',
          isExpanded && 'rotate-90'
        )}
      >
        <IoChevronForward className="w-3 h-3 text-zinc-400" />
      </button>
      {isExpanded ? (
        <BsFolder2Open className="w-4 h-4 shrink-0 text-zinc-300" />
      ) : (
        <BsFolder2 className="w-4 h-4 shrink-0 text-zinc-400" />
      )}
      <span className="truncate text-sm font-bold text-zinc-100">{name}</span>
    </div>
  )
}
