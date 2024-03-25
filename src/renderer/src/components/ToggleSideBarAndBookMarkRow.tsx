import { ComponentProps } from 'react'
import { ToggleSideBarButton } from './Button'
import { BookmarkButton } from './Button/BookmarkButton'

type ToggleSideBarAndBookMarkRowProps = ComponentProps<'div'> & {
  showSideBar: boolean
  handleToggleSideBar: () => void
}

export const ToggleSideBarAndBookMarkRow = ({
  showSideBar,
  handleToggleSideBar,
  ...props
}: ToggleSideBarAndBookMarkRowProps) => {
  return (
    <div {...props}>
      <ToggleSideBarButton showSideBar={showSideBar} toggleSideBar={handleToggleSideBar} />
      <BookmarkButton />
    </div>
  )
}
