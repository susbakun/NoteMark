import { cn, hasFocus } from '@renderer/utils'
import { ComponentProps, forwardRef, useEffect, useRef } from 'react'
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
  onDeleteNote: () => void
}

export const SideBar = ({
  onDeleteNote,
  showSideBar,
  className,
  children,
  ...props
}: SideBarProps) => {
  const sidebarRef = useRef<HTMLElement>(null)

  const handleKeyboard = (event: KeyboardEvent) => {
    const targetElement = event.target as HTMLElement
    if (event.key === 'Backspace' && event.metaKey && hasFocus(targetElement)) {
      onDeleteNote()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard, sidebarRef.current])

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'w-[250px] mt-2 h-[100vh + 10px] overflow-y-auto overflow-x-hidden transition-all duration-300 ease-out',
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
          'flex-1 transition-all duration-150 ease-in overflow-y-auto overflow-x-hidden',
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
