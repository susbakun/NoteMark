import { createContextMenu } from '@/configs/AppContextMenu'
import { createApplicationMenu } from '@/configs/AppMenu'
import { createSideBarContextMenu } from '@/configs/SideBarContextMenu'
import { sortButtonContextMenu } from '@/configs/SortButtonContextMenu'
import { appDirectoryName, fileEncoding } from '@shared/constants'
import { FileSystemItem } from '@shared/models'
import {
  CreateNote,
  DeleteFile,
  OpenLink,
  ReadNote,
  ScanDirectory,
  ShowContextMenu,
  ShowFile,
  ShowSideBarContextMenu,
  ShowSortNotesContextMenu,
  WriteNote
} from '@shared/types'
import { BrowserWindow, dialog, shell } from 'electron'
import { ensureDir, mkdir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

const resolveNotePath = (relativePath: string) => path.join(getRootDir(), `${relativePath}.md`)

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const scanDirectory: ScanDirectory = async (dirPath, relativePrefix) => {
  const entries = await readdir(dirPath, { withFileTypes: true })
  const items: FileSystemItem[] = []

  for (const entry of entries) {
    const rel = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      const children = await scanDirectory(path.join(dirPath, entry.name), rel)
      const stats = await stat(dirPath)
      items.push({
        type: 'directory',
        relativePath: rel,
        name: entry.name,
        children,
        lastEditTime: stats.mtimeMs
      })
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const stats = await stat(path.join(dirPath, entry.name))
      items.push({
        type: 'note',
        relativePath: rel.replace(/\.md$/, ''),
        name: entry.name.replace(/\.md$/, ''),
        lastEditTime: stats.mtimeMs,
        bookmarked: false
      })
    }
  }
  return items
}

export const readNote: ReadNote = async (relativePath) => {
  const window = BrowserWindow.getFocusedWindow()
  const notePath = resolveNotePath(relativePath)
  const { name: filename } = path.parse(notePath)

  window?.setRepresentedFilename(filename)
  createApplicationMenu()

  return readFile(notePath, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (relativePath, content) => {
  console.info(`Writing note ${relativePath}`)
  const notePath = resolveNotePath(relativePath)

  return writeFile(`${notePath}`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async (parentRelativePath) => {
  const notePath = parentRelativePath ? path.join(getRootDir(), parentRelativePath) : getRootDir()

  await ensureDir(notePath)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${notePath}/Undefined.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'], // be aware that the user will overwrite the existing file
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info(`Note creation canceled`)
    return false
  }

  const { name: fileName } = path.parse(filePath)

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')
  return fileName
}

export const deleteFile: DeleteFile = async (relativePath, type) => {
  const title = type == 'note' ? 'Delete Note' : 'Delete Folder'

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title,
    message: `Are you sure you want to delete ${relativePath}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info('Deleting file', relativePath)

  let absolutePath: string
  if (type == 'note') {
    absolutePath = resolveNotePath(relativePath)
  } else {
    absolutePath = path.join(getRootDir(), relativePath)
  }

  await remove(absolutePath)
  return true
}

export const openLink: OpenLink = async (link) => {
  await shell.openExternal(link)
}

export const showFile: ShowFile = () => {
  const filePath = BrowserWindow.getFocusedWindow()?.getRepresentedFilename()

  if (filePath) {
    shell.showItemInFolder(filePath)
  }
}

export const createDir = async (parentRelativePath) => {
  const dirPath = parentRelativePath ? path.join(getRootDir(), parentRelativePath) : getRootDir()

  await ensureDir(dirPath)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Folder',
    defaultPath: `${dirPath}`,
    buttonLabel: 'Create',
    properties: ['createDirectory']
  })

  if (canceled || !filePath) {
    console.info(`Folder creation canceled`)
    return false
  }

  const { name } = path.parse(filePath)

  console.info(`Creating folder: ${filePath}`)
  await mkdir(filePath)
  return name
}

export const showContextMenu: ShowContextMenu = () => {
  const contextMenu = createContextMenu()
  contextMenu.popup()
}

export const showSideBarContextMenu: ShowSideBarContextMenu = () => {
  const sidebarCN = createSideBarContextMenu()
  sidebarCN.popup()
}

export const showSortNotesContextMenu: ShowSortNotesContextMenu = () => {
  const sortButtonCN = sortButtonContextMenu()
  sortButtonCN.popup()
}
