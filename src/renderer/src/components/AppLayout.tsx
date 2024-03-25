import { cn } from '@renderer/utils'
import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main {...props} className={twMerge(`flex felx-row h-screen`, className)}>
      {children}
    </main>
  )
}

type SideBarProps = ComponentProps<'aside'> & {
  showSideBar: boolean
}

export const SideBar = ({ showSideBar, className, children, ...props }: SideBarProps) => {
  return (
    <aside
      className={cn(
        'w-[250px] mt-10 h-[100vh + 10px] overflow-auto transition-all duration-300 ease-out',
        {
          'translate-x-[-100%]': !showSideBar,
          'translate-x-0': showSideBar,
          'w-0': !showSideBar,
          'p-0': !showSideBar,
          'p-2': showSideBar
        },
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

type ContentProps = ComponentProps<'div'> & {
  showSideBar: boolean
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, showSideBar, className, onClick, ...props }, ref) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        className={cn(
          'flex-1 transition-all duration-150 ease-in overflow-auto',
          { 'border-l': showSideBar, 'border-l-0': !showSideBar },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Content.displayName = 'Content'
