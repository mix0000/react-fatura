import React from 'react'
import { Divider, makeStyles } from '@material-ui/core'
import SideBarList from './sideBarList'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const DrawerInner = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <SideBarList />
    </>
  );
}

export default DrawerInner
