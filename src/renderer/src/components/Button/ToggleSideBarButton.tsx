import { ComponentProps } from 'react'
import { LuPanelLeftClose } from 'react-icons/lu'
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
      direction="right"
      className={className}
      onClick={toggleSideBar}
      {...props}
    >
      <LuPanelLeftClose className="text-zinc-300 w-5 h-[18px]" />
    </ActionButton>
  )
}
