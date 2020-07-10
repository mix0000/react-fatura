import React, {useRef, useEffect} from 'react'
import { entries } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import { Rnd } from 'react-rnd'

const Elems = observer(() => {
  const { elems  } = store

  return entries(elems).map(([key, value]) => {
    const { scale, preview } = store,
    { width, height, x, y } = value.layout;

    const isStatic = value.isStatic || preview

    return (
      <Rnd
        key={key}
        bounds={'parent'}
        scale={scale}
        data-dont_panch='true'
        style={{
          display: 'flex',
          opacity: value.isVisible ? 1 : 0,
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          background: "#f0f0f0",
          cursor: isStatic ? 'not-allowed' : 'move',
          userSelect: isStatic ? 'none' : 'auto',
        }}
        size={{ width,  height }}
        position={{ x, y }}
        onDragStop={(e, d) => {
          const { x, y } = d
          store.setElemPosition(key, { x, y })
        }}
        disableDragging={isStatic}
        enableResizing={{
          bottom: !isStatic,
          bottomLeft: !isStatic,
          bottomRight: !isStatic,
          left: !isStatic,
          right: !isStatic,
          top: !isStatic,
          topLeft: !isStatic,
          topRight: !isStatic
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          // parseInt position values
          Object.keys(position).map(([key, value]) => position[key] = Number(parseFloat(position[key]).toFixed(2)))

          store.setElemLayout(key, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          })
        }}
        >
            {value.content ? value.content : value.name}
        </Rnd>
      )
    })
})


export default Elems
