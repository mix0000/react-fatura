import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import { IconButton, makeStyles } from '@material-ui/core';
import BrightnessLowOutlinedIcon from '@material-ui/icons/BrightnessLowOutlined';
import Brightness6OutlinedIcon from '@material-ui/icons/Brightness6Outlined';
import ZoomInRounded from '@material-ui/icons/ZoomInRounded';
import ZoomOutRounded from '@material-ui/icons/ZoomOutRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  buttonBg: {
    backgroundColor: theme.palette.primary[store.theme],
    '&:hover': {
      backgroundColor: theme.palette.primary[store.theme],
    },
  }
}));

export const ChangeTheme = observer(() => {
  const { theme } = store
  return (
    <IconButton
    aria-label="Temayı Değiştir"
    onClick={() => store.toggleTheme()}
    color="inherit"

    >
      {
        theme === 'light' ? <Brightness6OutlinedIcon /> : <BrightnessLowOutlinedIcon />
      }
    </IconButton>
  )
})

export const ZoomIn = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Yakınlaştır"
      className={`panControll__zoomIn ${classes.buttonBg}`}
      onClick={() => panZoomRef.zoomIn()}
      color="inherit"
      >
        <ZoomInRounded />
      </IconButton>
  )
})

export const ZoomOut = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Uzaklaştır"
      className={`panControll__zoomOut ${classes.buttonBg}`}
      onClick={() => panZoomRef.zoomOut()}
      color="inherit"
      >
        <ZoomOutRounded />
      </IconButton>
  )
})
export const MoveTop = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Yukarıya Kaydır"
      className={`panControll__moveTop ${classes.buttonBg}`}
      onClick={() => panZoomRef.moveByRatio(0, -1)}
      color="inherit"
      // size="small"
      >
        <KeyboardArrowUpRoundedIcon /*fontSize="small"*/ />
      </IconButton>
  )
})
export const MoveDown = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Aşşağıya Kaydır"
      className={`panControll__moveDown ${classes.buttonBg}`}
      onClick={() => panZoomRef.moveByRatio(0, 1)}
      color="inherit"
      // size="small"
      >
        <KeyboardArrowDownRoundedIcon /*fontSize="small"*//>
      </IconButton>
  )
})

export const MoveLeft = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Sola Kaydır"
      className={`panControll__moveLeft ${classes.buttonBg}`}
      onClick={() => panZoomRef.moveByRatio(-1, 0)}
      color="inherit"
      // size="small"
      >
        <ChevronLeftRoundedIcon /*fontSize="small"*//>
      </IconButton>
  )
})
export const MoveRight = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Sağa Kaydır"
      className={`panControll__moveRight ${classes.buttonBg}`}
      onClick={() => panZoomRef.moveByRatio(1, 0)}
      color="inherit"
      // size="small"
      >
        <ChevronRightRoundedIcon /*fontSize="small"*//>
      </IconButton>
  )
})
export const Reset = observer(() => {
  const classes = useStyles(),
  { panZoomRef } = store;

  return (
      <IconButton
      aria-label="Sıfırla"
      className={`panControll__reset ${classes.buttonBg}`}
      onClick={() => panZoomRef.autoCenter(0.95)}
      color="inherit"
      >
        <LoopRoundedIcon />
      </IconButton>
  )
})
export const Preview = observer(() => {
  const { preview } = store;


  return (
    <IconButton
      aria-label="Preview Mode"
      onClick={() => store.changePreview()}
      color="inherit"
      >
      {preview ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  )
})
