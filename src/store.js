import { makeObservable, observable, action, makeAutoObservable } from 'mobx'
import {CompanyName} from './components/Home/PageElements'
import React from 'react'




const getCurrentTheme = () => {
  if (localStorage && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
    return 'dark'
  }
  else {
    return 'light'
  }
}

const getBackgroundImage = () => {
  if (localStorage && localStorage.getItem('backgroundImage')) {
    return JSON.parse(localStorage.getItem('backgroundImage'))
  }
  else {
    return 'none'
  }
}


class Store {

  theme = getCurrentTheme()
  toggleTheme() {
    return this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
  checkBoxes = {
    'ek-1': true
  }
  toggleCheckBox(key) {
    if (this.checkBoxes[key]) {
      this.checkBoxes[key] = !this.checkBoxes[key]
    }
    else {
      this.checkBoxes[key] = true
    }
  }
  scale = 1
  setScale(scale) {
    return this.scale = scale
  }
  container = {
    width: null,
    height: null,
    backgroundImage: getBackgroundImage()
  }
  elems = {
    // 'logo': {
    //   name: 'Logo',
    //   isVisible: true,
    //   isStatic: false,
    //   layout: { width: 285, height: 78, x: 13, y: 98 },
    // },

    'company-name': {
      name: 'Company Name',
      isVisible: true,
      isStatic: false,
      layout: { width: 550, height: 330, x: 15, y: 10 },
      content: <CompanyName elemKey="company-name" />
    },


    // 'sirket-detay': {
    //   name: 'Şirket Detay',
    //   isVisible: true,
    //   isStatic: false,
    //   layout: { width: 282, height: 131, x: 503, y: 79 },
    // },
    // 'ek-1': {
    //   name: 'Ek 1',
    //   isVisible: true,
    //   isStatic: false,
    //   layout: { width: 495, height: 146, x: 9, y: 764 },
    // },
    // 'ek-2': {
    //   name: 'Ek 2',
    //   isVisible: true,
    //   isStatic: false,
    //   layout: { width: 767, height: 104, x: 14, y: 914 },
    // },
    // 'adres': {
    //   name: 'Adres',
    //   isVisible: true,
    //   isStatic: false,
    //   layout: { width: 768, height: 50, x: 14, y: 1022 },
    // },
  }
  setElemLayout(el, layout) {
    return this.elems[el].layout = layout
  }
  setElemPosition(el, {x, y}) {
    return (this.elems[el].layout.x = parseInt(x), this.elems[el].layout.y = parseInt(y))
  }
  toogleElemsVisibility(key) {
    return this.elems[key].isVisible = !this.elems[key].isVisible
  }
  toogleElemsStatic(key) {
    return this.elems[key].isStatic = !this.elems[key].isStatic
  }
  changeElemLayout(key, layoutKey, value) {
    return this.elems[key].layout[layoutKey] = value
  }
  setContainerLayout(layout) {
    const { width, height } = layout
    return (this.container.width = width, this.container.height = height)
  }
  setContainerImage(obj) {
    return this.container.backgroundImage = obj
  }
  currentAutoCenter = 0.95
  setCurrentAutoCenter(number) {
    return this.currentAutoCenter = number
  }
  panZoomRef = null
  setPanZoomRef(ref) {
    return this.panZoomRef = ref
  }
  font = this.getFontFromLocalStorage()
  changeFont({family, category}) {
    return this.font = {
      fontName: family,
      category
    }
  }
  fonts = null
  loadedFonts = {}
  setLoadFonts(fontName) {
    return this.loadedFonts && (this.loadedFonts[fontName] = true)
  }


  setFonts(arr) {
    return this.fonts = arr
  }
  async getFonts() {
    const FONTS_API_KEY = 'AIzaSyBUf0k1awetCAd9ZVTO8AwK9k18wmT1f5o'
    try {
      const req = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${FONTS_API_KEY}`)
      const data = await req.json()
      this.setFonts(data.items.slice(0, 15))
    }
    catch (e) {
      console.log(e)
    }
  }



  
  loadFont(fontName) {
    const importLink = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;700&display=swap`;
    const linkTag = `<link href="${importLink}" rel="stylesheet" />`
    document.head.insertAdjacentHTML('beforeend', linkTag)
    this.setLoadFonts(fontName)
  }
  getFontFromLocalStorage() {
    if (localStorage && localStorage.getItem('font')) {
      const font = JSON.parse(localStorage.getItem('font'))
      this.loadFont(font.fontName)
      return font
    }
    else {
      return {
        fontName: 'inherit',
        category: ''
      }
    }
  }
  preview = false
  changePreview() {
    return this.preview = !this.preview
  }
  constructor() {
    makeObservable(this, {
      container: observable,
      checkBoxes: observable,
      elems: observable,
      theme: observable,
      scale: observable,
      currentAutoCenter: observable,
      panZoomRef: observable,
      toggleCheckBox: action,
      toggleTheme: action,
      setScale: action,
      toogleElemsStatic: action,
      toogleElemsVisibility: action,
      changeElemLayout: action,
      setContainerLayout: action,
      setContainerImage: action,
      setCurrentAutoCenter: action,
      setPanZoomRef: action,
      font: observable,
      changeFont: action,
      getFonts: action,
      fonts: observable,
      setFonts: action,
      loadedFonts: observable,
      setLoadFonts: action,
      preview: observable,
      changePreview: action,
    })
  }
}


export default new Store()
