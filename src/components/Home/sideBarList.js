import React from 'react'
import { List, ListSubheader, makeStyles } from '@material-ui/core'
import ListItems from './listItem'
import ChangeBackground from './changeBackground'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  toolbar: theme.mixins.toolbar
}));

const SideBarList = () => {
  const classes = useStyles()

  return (
    <List
      component="ul"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ChangeBackground />
      <ListSubheader component="li" id="nested-list-subheader">
        Bill Items
      </ListSubheader>
      <ListItems />
    </List>
  )
}
export default SideBarList
