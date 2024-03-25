import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ title, className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      title={title}
      {...props}
      className={twMerge(
        'px-2 py-1 rounded-md  hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
    >
      {children}
    </button>
  )
}
