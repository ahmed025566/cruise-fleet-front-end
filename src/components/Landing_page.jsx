import React, {useState} from 'react'
import Login from './Login';
import Registrations from './Registrations';

const Landing_page = () => {
  const [login, setLogin] = useState(true)
  return (
    <>
    {login ? <Login /> : <Registrations />}
    <button onClick={() => setLogin(!login)}>{login ? 'Register' : 'Login'}</button>
    </>
  )
}

export default Landing_page