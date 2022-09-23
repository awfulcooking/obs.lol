import { List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'

import useOBS from './lib/useOBS'

import { useToaster } from './Toaster'
import RenameModal from './RenameModal'

import Edit from '@mui/icons-material/Edit'

export default function SceneList({ onSceneSelect }) {
  const obs = useOBS()

  const [ scenes, setScenes ] = useState()
  const [ currentSceneName, setCurrentSceneName ] = useState()

  const toast = useToaster()

  useEffect(() => {
    function changed(data) {
      if (data.scenes)
        setScenes(data.scenes.reverse())

      if (data.currentProgramSceneName) {
        onSceneSelect?.(data.currentProgramSceneName)
        setCurrentSceneName(data.currentProgramSceneName)
      }
    }

    function refresh() {
      obs.call('GetSceneList').then(changed)
      obs.call('GetCurrentProgramScene').then(changed)
    }

    refresh()
  
    obs.on('SceneNameChanged', refresh)
    obs.on('SceneListChanged', changed)
    obs.on('CurrentProgramSceneChanged', changed)
    return () => {
      obs.off('SceneNameChanged', refresh)
      obs.off('SceneListChanged', changed)
      obs.off('CurrentProgramSceneChanged', changed)
    }
  }, [])

  async function setScene(name) {
    await obs.call('SetCurrentProgramScene', { sceneName: name })
    setCurrentSceneName(name)
    onSceneSelect?.(name)
  }

  const [ menuAnchor, setMenuAnchor ] = useState()
  const [ menuSceneName, setMenuSceneName ] = useState()

  function openMenu(event, sceneName) {
    setMenuAnchor(event.currentTarget)
    setMenuSceneName(sceneName)
    event.preventDefault()
  }

  function closeMenu() {
    setMenuAnchor(null)
    setMenuSceneName(null)
  }

  function doRename(sceneName, newSceneName) {
    obs.call('SetSceneName', { sceneName, newSceneName })
      .catch(({ message }) => toast(message, "error"))
  }

  return <List>
    <SceneListContextMenu
      sceneName={menuSceneName}
      open={!!menuSceneName}
      anchorEl={menuAnchor}
      onRename={newName => doRename(menuSceneName, newName)}
      onClose={closeMenu} />

    {scenes?.map(({sceneName}) =>
      <ListItemButton
        key={sceneName}
        selected={sceneName === currentSceneName}
        onClick={() => setScene(sceneName)}
        onContextMenu={(event) => openMenu(event, sceneName)}
      >
        {sceneName}
      </ListItemButton>
    )}
  </List>
}

function SceneListContextMenu({ sceneName, open, onClose, onRename, elevation = 1, ...props }) {
  const [ modal, setModal ] = useState()

  function handleModalClose() {
    setModal(null)
    onClose()
  }

  function handleRename(newName) {
    handleModalClose()
    onRename(newName)
  }

  return <>
    <Menu open={open && !modal} elevation={elevation} onClose={onClose} {...props}>
      <MenuItem onClick={() => setModal("rename")}>
        <ListItemIcon><Edit /></ListItemIcon>
        <ListItemText>Rename</ListItemText>
      </MenuItem>
    </Menu>

    { modal === "rename" && <RenameModal open currentName={sceneName} onConfirm={handleRename} onClose={handleModalClose} /> }
  </>
}
