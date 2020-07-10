import React from 'react'
import { Button, ListSubheader, ListItem, IconButton, ListItemText, makeStyles  } from '@material-ui/core'
import { observer } from 'mobx-react';
import store from '../../store'
import EditIcon from '@material-ui/icons/Edit';


const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

const validateImg = type => type.includes('image')

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: '6px 10px',
  },
}));

const ChangeBackground = observer(() => {
  const classes = useStyles();

  const { backgroundImage } = store.container

  const handleChange = event => {
    const files = event.target.files

    if ((files.length !== 0) && validateImg(files[0].type)) {
      const imgObj = files[0];

      toDataURL(URL.createObjectURL(imgObj)).then(dataUrl => {
        store.setContainerImage({
          isSet: true,
          image: dataUrl,
          name: imgObj.name
        })
      })
    }
  }
  return (
    <>
      <ListSubheader component="li" id="second-subheader">
        Upload Image
      </ListSubheader>
      <ListItem component="li" className={classes.listItem}>
        {
          backgroundImage.isSet ? (
            <ListItemText primary={backgroundImage.name} primaryTypographyProps={{noWrap: true}} />
          ) : null}
        <input
        accept="image/*"
        onChange={handleChange}
        hidden
        id="upload-image"
        type="file"
        />
        <label htmlFor="upload-image">
        {backgroundImage.isSet ? (
          <IconButton aria-label="Change picture" component="span" size="small">
            <EditIcon />
          </IconButton>

        ) : (
          <Button variant="outlined" color="secondary" aria-label="Change picture" component="span" size="small">
            Upload
          </Button>
        )}


        </label>
      </ListItem>
    </>
  )
})

export default ChangeBackground
