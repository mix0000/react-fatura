import React, { useState, Fragment } from 'react'
import { entries } from 'mobx';
import { observer } from 'mobx-react';
import store from '../../store'
import { makeStyles, List, ListItem, ListItemText, Collapse, Switch, ListItemSecondaryAction } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ElemInputs from './inputs'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(2),
    paddingTop: 6,
    paddingBottom: 6
  },
  listItem: {
    padding: '6px 10px',
  },
  listItemText: {
    textTransform: 'capitalize'
  },
  collapseList: {
     padding: 0
  }
}));

const ListItems = observer(() => {
  const { elems } = store
  const classes = useStyles();


  return entries(elems).map(([key, value]) => {
    const [open, setOpen] = useState(false),
    { isVisible, isStatic, name } = value;

    return (
      <Fragment key={key}>
        <ListItem component="li" button onClick={() => setOpen(!open)} className={classes.listItem}>
          <ListItemText primary={name} primaryTypographyProps={{variant: 'button', className: classes.listItemText}} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" component="li">
          <List component="ul" className={classes.collapseList}>
            <ListItem className={classes.nested}>
              <ListItemText id={`switchVisibility${key}`} primary="Hide"
              primaryTypographyProps={{variant: 'body2'}}
               />
              <ListItemSecondaryAction>
                <Switch
                color="primary"
                edge="end"
                onChange={() => store.toogleElemsVisibility(key)}
                checked={isVisible}
                inputProps={{ 'aria-labelledby': `switchVisibility${key}` }}
                size="small"
                />
              </ListItemSecondaryAction>
            </ListItem>
              <ListItem className={classes.nested} disabled={!isVisible}>
                <ListItemText id={`switchStatic${key}`} primary="Lock"
                primaryTypographyProps={{variant: 'body2'}} />
                <ListItemSecondaryAction>
                  <Switch
                  color="primary"
                  edge="end"
                  onChange={() => store.toogleElemsStatic(key)}
                  checked={isStatic}
                  inputProps={{ 'aria-labelledby': `switchStatic${key}` }}
                  disabled={!isVisible}
                  size="small"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.nested}>
                <ElemInputs elemKey={key} disabled={!isVisible} />
              </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )

  })
})


export default ListItems
