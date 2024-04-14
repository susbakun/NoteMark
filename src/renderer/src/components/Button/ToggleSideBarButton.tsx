import { ComponentProps } from 'react'
import { TbLayoutSidebar } from 'react-icons/tb'
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
      <TbLayoutSidebar className="text-zinc-300/80 w-5 h-5" />
    </ActionButton>
  )
}
