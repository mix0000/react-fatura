import React from 'react'
import {ZoomIn, ZoomOut, MoveTop, MoveDown, MoveLeft, MoveRight, Reset, Preview} from '../actions'
import store from '../../store'
import { observer } from 'mobx-react'



export const Movement = () => {
  return (
    <div className="panControll">
      <MoveTop />
      <MoveDown />
      <MoveLeft />
      <MoveRight />
    </div>
  )
}
export const Zooming = () => {
  return (
    <div className="panControll--zoom">
      <ZoomIn />
      <ZoomOut />
    </div>
  )
}
export const Resets = () => {
  return (
    <div className="panControll--reset">
      <Reset />
    </div>
  )
}
export const Previews = observer(() => {
  const { preview } = store
  return (
    <div className={preview ? 'previewBtn--absolute' : 'previewBtn'}>
      <Preview />
    </div>
  )
})
