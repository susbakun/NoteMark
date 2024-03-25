import { ComponentProps } from 'react'
import { LuPanelLeftClose, LuPanelRightClose } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { ActionButton } from './ActionButton'

type ToggleSideBarButtonProps = ComponentProps<'button'> & {
  toggleSideBar: () => void
  showSideBar: boolean
}

export const ToggleSideBarButton = ({
  toggleSideBar,
  className,
  showSideBar,
  ...props
}: ToggleSideBarButtonProps) => {
  return (
    <ActionButton
      title="Toggle the SideBar"
      className={twMerge('opacity-0 hover:opacity-100 transition-all duration-100 ', className)}
      onClick={toggleSideBar}
      {...props}
    >
      {showSideBar ? (
        <LuPanelLeftClose className="text-zinc-300 w-6 h-6" />
      ) : (
        <LuPanelRightClose className="text-zinc-300 w-6 h-6" />
      )}
    </ActionButton>
  )
}
