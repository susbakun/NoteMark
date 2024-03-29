import { createContextMenu } from '@/configs/AppContextMenu'
import { createApplicationMenu } from '@/configs/AppMenu'
import { createSideBarContextMenu } from '@/configs/SideBarContextMenu'
import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import {
  CreateNote,
  DeleteNote,
  GetNotes,
  OpenLink,
  ReadNote,
  ShowContextMenu,
  ShowFile,
  ShowSideBarContextMenu,
  WriteNote
} from '@shared/types'
import { BrowserWindow, dialog, shell } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path, { parse } from 'path'
import welcomeNote from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileName = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileName.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info(`No notes found creating a welcome note`)

    const content = await readFile(welcomeNote, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })
    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs, //last Edit time
    bookmarked: false
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  const window = BrowserWindow.getFocusedWindow()
  window?.setRepresentedFilename(filename)
  createApplicationMenu()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Undefined.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'], // be aware that the user will overwrite the existing file
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info(`Note creation canceled`)
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })
    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')
  return fileName
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info('Deleting note: ', filename)
  await remove(`${rootDir}/${filename}.md`)
  return true
}

export const openLink: OpenLink = async (link) => {
  await shell.openExternal(link)
}

export const showFile: ShowFile = () => {
  const rootDir = getRootDir()
  const filePath = BrowserWindow.getFocusedWindow()?.getRepresentedFilename()

  if (filePath) {
    const { name: fileName } = parse(filePath)
    shell.showItemInFolder(`${rootDir}/${fileName}.md`)
  }
}

export const showContextMenu: ShowContextMenu = () => {
  const contextMenu = createContextMenu()
  contextMenu.popup()
}

export const showSideBarContextMenu: ShowSideBarContextMenu = () => {
  const sidebarCn = createSideBarContextMenu()
  sidebarCn.popup()
}
