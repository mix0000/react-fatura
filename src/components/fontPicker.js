import React, {useState, useEffect} from 'react'
import store from '../store'
import {observer} from 'mobx-react'
import {toJS, autorun} from 'mobx'
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';


export const FontPicker = observer(() => {
  const {fonts, loadedFonts} = store
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
    store.getFonts()
  }, [])

  const handleClick = event => setIsOpen(event.currentTarget)
  const handleClose = () => setIsOpen(null)
  const closeAndSetFont = font => {
    store.changeFont(font)
    handleClose()
  }

  const addFontsCallback = () => {
    fonts.map(font => (loadedFonts && !loadedFonts[font.family]) && store.loadFont(font.family))
  }

  return (<>
    <IconButton
      aria-controls="fade-menu"
      aria-haspopup="true"
      onClick={handleClick}
      aria-label="Temayı Değiştir">
      <FontDownloadIcon color="inherit"/>
    </IconButton>
    <Menu
      id="fade-menu"
      anchorEl={isOpen}
      open={Boolean(isOpen)}
      keepMounted
      onEnter={addFontsCallback}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: 48 * 6,
          width: '30ch',
        },
      }}
    >
      {fonts && fonts.map(font => {
        const {category, family} = font
        return (
          <MenuItem
            key={`${family}${Date.now()}`}
            onClick={() => closeAndSetFont({family, category})}>
            <span style={{fontFamily: `'${family}', ${category}`}}>
              {family}
            </span>
        </MenuItem>
      )
      })}
    </Menu>
  </>)
})
autorun(() => {
  (store.font.fontName !== 'inherit') && localStorage.setItem('font', JSON.stringify(store.font))
})
