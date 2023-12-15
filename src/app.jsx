import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login } from './redux/user/userSlice'
import './app.css'

export function App() {

  const dispath = useDispatch()
    useEffect(() => {
      dispath(login())
    }, [])

  const  {logged_in}  = useSelector(state => state.user)
  console.log(logged_in)
  return (
    <>
    </>
  )
}
