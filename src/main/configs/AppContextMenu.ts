import { Menu } from 'electron'

export const createContextMenu = () => {
  return Menu.buildFromTemplate([
    { type: 'separator' },
    { label: 'Cut', role: 'cut' },
    { label: 'Copy', role: 'copy' },
    { label: 'Paste', role: 'paste' },
    { label: 'Select All', role: 'selectAll' }
  ])
}
