import { Menu } from 'electron'

export const createContextMenu = () => {
  return Menu.buildFromTemplate([
    { label: 'Cut', role: 'cut' },
    { label: 'Copy', role: 'copy' },
    { label: 'Paste', role: 'paste' },
    { label: 'Select All', role: 'selectAll' }
  ])
}
