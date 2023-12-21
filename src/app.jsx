import React, { useEffect } from 'react'
import './app.css'
import {useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { checkLogin } from './redux/user/userSlice';
import Dashboard from './components/pages/Home/Dashboard';
import Landing_page from './components/pages/sessions/LandingPage';
import AppLayout from './components/shared/AppLayout';
import ReserveForm from './components/pages/Reservations/ReserveForm';
import MyReservations from './components/pages/Reservations/MyReservations';
import AddCarItem from './components/pages/Car/AddCarItem';
import DeleteCarItem from './components/pages/Car/DeleteCarItem';

export function App() {

  const { logged_in, loading } = useSelector(state => state.user)
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
  },[])

  useEffect(() => {
    if(logged_in) {
      history('/dashboard')      
    } else if (logged_in === false) {
      history('/')
    }

  }, [logged_in])


  

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Landing_page />} />
        <Route path="/register" element={<Landing_page />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reserve-form" element={<ReserveForm />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/add-car-item" element={<AddCarItem />} />
          <Route path="/delete-car-item" element={<DeleteCarItem />} />
        </Route>
      </Routes>
    </div>
  );
}
