import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import {autorun} from 'mobx'
import {observer} from 'mobx-react';
import './reset.css'
import './index.css'
import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const Context = observer(() => {
  const muiTheme = createMuiTheme({
    palette: {
      type: store.theme
    }
  });
  console.log(muiTheme)
  const { palette } = muiTheme
  return (
    <ThemeProvider theme={muiTheme}>
      <section className="appInner"
        style={
          {
            backgroundColor: store.theme === 'dark' ? palette.grey["900"] : palette.grey["300"]
          }
        }
      >
        <App  />
      </section>
    </ThemeProvider>
  );
})
autorun(reaction => {
  localStorage.setItem('theme', store.theme);
})

ReactDOM.render(
  <Context />,
  document.getElementById('root')
)
