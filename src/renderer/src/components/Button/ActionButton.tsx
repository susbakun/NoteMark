import Tippy from '@tippyjs/react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { roundArrow } from 'tippy.js'
import 'tippy.js/dist/svg-arrow.css'

export type ActionButtonProps = ComponentProps<'button'> & {
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-end' | 'top-end'
}

export const ActionButton = ({
  direction = 'bottom',
  title,
  className,
  children,
  ...props
}: ActionButtonProps) => {
  return (
    <Tippy
      content={title}
      className="bg-black/50 font-sans rounded-md px-1 py-[1px] text-sm"
      delay={[1000, 0]}
      placement={direction}
      animation="fade"
      arrow={roundArrow}
      duration={10}
      hideOnClick={true}
    >
      <button
        {...props}
        className={twMerge(
          'px-2 py-1 rounded-md  hover:bg-zinc-600/50 transition-colors duration-100',
          className
        )}
      >
        {children}
      </button>
    </Tippy>
  )
}
