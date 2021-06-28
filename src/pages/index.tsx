import React from 'react'
import { useDispatch } from 'react-redux'
import { increment } from '../store/count'
import logo from '../assets/images/logo.svg'
import style from './index.styl'
import { useAppSelector } from '../store/hook'

function Index() {
  const count = useAppSelector((state) => state.count)
  const dispatch = useDispatch()
  const data = {
    title: 'react app template',
  }
  return (
    <div>
      <h1 className={style.title}>{data.title}</h1>
      <img src={logo} alt="logo" />
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  )
}

export default Index
