
import './App.css'
import AppRoutes from './components/AppRoutes'
import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar'
import { useEffect,useState } from 'react';
import User from './components/User'
import PrivateText from './components/PrivateText'
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {

  return (
      <div className='App'>
        <h2>Book Library</h2>
        <User/>
      </div>

  )
}

export default App
