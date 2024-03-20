import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Home from './component/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import Add from './component/Add';
import Apply from './component/Apply';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
   <Route path='/add' element={<Add/>}></Route>
   <Route path='/apply/:title' element={<Apply/>}></Route>
    </Routes>
    </>);
  
}

export default App
