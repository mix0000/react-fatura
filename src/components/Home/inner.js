import React, { useRef, useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import { PanZoom } from 'react-easy-panzoom'
import { makeStyles } from '@material-ui/core'
import Elems from './elems'
import { Movement, Zooming, Resets, Previews } from './PanControls'

const useStyles = makeStyles(theme => ({
  a4Shadow: {
    boxShadow: theme.shadows[6]
  }
}));

const preventPan = (event, x, y) => (event.target.dataset.dont_panch) && true

const AppInner = observer(() => {
  const {font, container, preview} = store
  const { backgroundImage } = container
  const classes = useStyles(),
  zoomRef = useRef(null),
  $a4Ref = useRef(null);


  useEffect(() => {
    const a4 = $a4Ref.current;
    store.setContainerLayout({
      width: a4.clientWidth,
      height: a4.clientHeight
    })
  }, [$a4Ref])

  useEffect(() => {
    store.setPanZoomRef(zoomRef.current)
  }, [zoomRef])

  useEffect(() => {
    window.addEventListener("resize", rerender);
    return () => window.removeEventListener("resize", rerender);
  });

  useEffect(() => {
    rerender()
  }, [preview]);

  const rerender = () => {
    zoomRef.current.autoCenter(0.95)
  };

  const onStateChange = state => {
    store.setScale(state.scale)
  }


  return (
    <div className={`a4-overlay ${preview && 'a4-overlay--preview'}`}>
      <PanZoom
        ref={ zoomRef }
        disabled
        preventPan={preventPan}
        className="panzoom-inner"
        autoCenterZoomLevel={0.95}
        autoCenter="true"
        onStateChange={onStateChange}
        maxZoom={3}
        disableKeyInteraction="false"
        disableDoubleClickZoom="false"
        disableScrollZoom="false"
        style={
          {
            maxWidth: '100%',
            maxHeight: '100%',
            cursor: 'inherit'
          }
        }
      >
        <div ref={$a4Ref} className={`A4 ${classes.a4Shadow} ${(backgroundImage.isSet && !preview) && 'A4--withBgImg'}`}
        style={
          {
            backgroundImage: (backgroundImage.isSet && !preview) ? `url(${backgroundImage.image})` : 'none',
            fontFamily: `'${font.fontName}',  ${font.category}`
          }
        }>
          <Elems />
        </div>
      </PanZoom>
      <Movement />
      <Zooming />
      <Resets />
      <Previews />
    </div>
  )
});
autorun(() => {
  const { backgroundImage } = store.container
  if (backgroundImage) {
    localStorage.setItem('backgroundImage', JSON.stringify(backgroundImage))
  }
})
export default AppInner
