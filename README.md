# NoteMark

A desktop markdown note-taking app built with Electron, React, and TypeScript. Notes live as plain `.md` files on your machine—simple, local, and easy to back up.

<img width="758" height="543" alt="image" src="https://github.com/user-attachments/assets/dd50c4bf-8b95-480f-9dd1-7e5878c7c23a" />


This project began as a fork and personal extension of [NoteMark by CodeWithGionatha-Labs](https://github.com/CodeWithGionatha-Labs/NoteMark). The original app is a great introduction to building a markdown editor with Electron; this version keeps that foundation and adds folder organization, a file tree sidebar, and other workflow improvements.

## What's new in this fork

Compared to the [upstream repository](https://github.com/CodeWithGionatha-Labs/NoteMark), this version includes:

- **Folders** — create, organize, expand/collapse, and delete directories in the sidebar
- **Nested notes** — markdown files inside folders, with recursive scanning on startup
- **File tree UI** — hierarchical sidebar with folder icons and indentation
- **Create in context** — new notes and folders respect the selected folder
- **Unified file operations** — delete notes and folders (with confirmation)
- **Recursive sorting** — sort notes within each folder (A→Z, Z→A, newest, oldest)
- **Recursive search & bookmarks** — find notes across the tree; bookmark view walks nested notes
- **Path-based file model** — notes identified by relative paths, not just titles
- **Welcome note** — auto-created when the library is empty

Core features from the original project are still here: MDX-based markdown editing, auto-save, bookmarks, search, native menus, context menus, and a minimal custom chrome (hidden title bar, draggable top bar).

## Data storage

Notes are stored under:

```
~/NoteMark/
```

Each note is a `.md` file. Folders are regular directories. You can edit files outside the app and changes appear after a refresh/re-scan.

## Tech stack

- [Electron](https://www.electronjs.org/) + [electron-vite](https://electron-vite.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jotai](https://jotai.org/) — state management
- [@mdxeditor/editor](https://mdxeditor.dev/) — markdown editor
- [Tailwind CSS](https://tailwindcss.com/)
- [fs-extra](https://github.com/jprichardson/node-fs-extra) — file system access in the main process

## Project setup

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

### Other scripts

```bash
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm run format      # Prettier
```

## Recommended IDE setup

- [VS Code](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Acknowledgments

- **Original project:** [CodeWithGionatha-Labs/NoteMark](https://github.com/CodeWithGionatha-Labs/NoteMark) — markdown note app and [video course](https://youtu.be/t8ane4BDyC8) by Gionatha
- **electron-vite** template and tooling from the Electron ecosystem

## License

This project is licensed under the **MIT License** — see [LICENSE.txt](LICENSE.txt).

The MIT license applies to this project and retains copyright attribution to the original author (gionatha) as included in the license file. This fork modifies and extends the upstream codebase under the same license terms.
