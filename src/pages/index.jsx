import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../store/count'
import logo from '../assets/images/logo.svg'
import style from './index.styl'
import getUrlParams from '../utils/getUrlParams'

function Index() {
  const { title } = getUrlParams()
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  const data = {
    title: 'react app template',
  }
  return (
    <div>
      <h1>{title}</h1>
      <h1 className={style.title}>{data.title}</h1>
      <img src={logo} alt="logo" />
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  )
}

export default Index
