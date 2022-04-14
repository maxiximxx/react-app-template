import React from 'react'
import logo from '../assets/images/logo.svg'
import style from './index.styl'
import getUrlParams from '../utils/getUrlParams'

function Index() {
  const { title } = getUrlParams()
  const data = {
    title: 'react app template',
  }

  return (
    <div>
      <h1>{title}</h1>
      <h1 className={style.title}>{data.title}</h1>
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Index
