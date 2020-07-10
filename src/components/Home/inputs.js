import React from 'react'
import { observer } from 'mobx-react'
import store from '../../store'
import { makeStyles, FormControl, InputLabel, Input, InputAdornment, Typography  } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  inner: {
    display: 'flex',
    'flex-direction': 'column'
  },
  margin: {
    marginRight: theme.spacing(2),
  },
  firstEl: {
    marginBottom: theme.spacing(2),
  },
  smallText: {
    fontSize: '0.875rem'
  }
}));

const checkForNumber = value => /\d/g.test(value)

const ElemInputs = observer(({elemKey}) => {
  const { container, elems } = store
  const elem = elems[elemKey]
  const { layout } = elem
  const { width, height, x, y } = layout
  const classes = useStyles()


  const validationCheckByFieldName = {
    width: [
      ({event}) => (event.target.valueAsNumber > 0),
      ({event, container, layout}) => (event.target.valueAsNumber + layout.x < container.width)
    ],
    height: [
      ({event}) => (event.target.valueAsNumber > 0),
      ({event, container, layout}) => (event.target.valueAsNumber + layout.y < container.height)
    ],
    x: [
      ({event}) => (event.target.valueAsNumber > 0),
      ({event, container, layout}) => (event.target.valueAsNumber + layout.width < container.width)
    ],
    y: [
      ({event}) => (event.target.valueAsNumber > 0),
      ({event, container, layout}) => (event.target.valueAsNumber + layout.height < container.height)
    ]
  }

  const handleChange = fieldName => event => {
    // validate number
    if (!checkForNumber(event.target.valueAsNumber)) return;

    const validationCheck = validationCheckByFieldName[fieldName] || [];
    const result = validationCheck.map(check => check({event, container, layout}));
    if (result.some(item => !item)) return;

    // update elem values
    store.changeElemLayout(elemKey, fieldName, event.target.valueAsNumber)
  }

  return (
    <div className={classes.inner}>
      <div className={`${classes.root} ${classes.firstEl}`}>
        <FormControl className={classes.margin} size="small" disabled={!elem.isVisible || elem.isStatic}>
          <InputLabel className={classes.smallText} htmlFor="elem-width">Width</InputLabel>
          <Input
            id="elem-width"
            type="number"
            value={width}
            size="small"
            onChange={handleChange('width')}
            endAdornment={
              <InputAdornment position="end" disableTypography={true} disablePointerEvents={true}>
                <Typography variant="body2" component="span" color="textSecondary">
                  px
                </Typography>
              </InputAdornment>
            }
            inputProps={{inputMode: "numeric"}}
            className={classes.smallText}
          />
        </FormControl>
        <FormControl size="small" disabled={!elem.isVisible || elem.isStatic}>
          <InputLabel htmlFor="elem-height">Height</InputLabel>
          <Input
            id="elem-height"
            type="number"
            value={height}
            onChange={handleChange('height')}
            inputProps={{inputMode: "numeric"}}
            endAdornment={
              <InputAdornment position="end" disableTypography={true} disablePointerEvents={true}>
                <Typography variant="body2" component="span" color="textSecondary">
                  px
                </Typography>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl className={classes.margin} size="small" disabled={!elem.isVisible || elem.isStatic}>
          <InputLabel htmlFor="elem-x">X</InputLabel>
          <Input
            id="elem-x"
            type="number"
            value={x}
            onChange={handleChange('x')}
            inputProps={{inputMode: "numeric"}}
            endAdornment={
              <InputAdornment position="end" disableTypography={true} disablePointerEvents={true}>
                <Typography variant="body2" component="span" color="textSecondary">
                  px
                </Typography>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl size="small" disabled={!elem.isVisible || elem.isStatic}>
          <InputLabel htmlFor="elem-y">Y</InputLabel>
          <Input
            id="elem-y"
            type="number"
            value={y}
            onChange={handleChange('y')}
            inputProps={{inputMode: "numeric"}}
            endAdornment={
              <InputAdornment position="end" disableTypography={true} disablePointerEvents={true}>
                <Typography variant="body2" component="span" color="textSecondary">
                  px
                </Typography>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      </div>
  )
})

export default ElemInputs
