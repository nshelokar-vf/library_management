import './App.css'
import AppRoutes from './components/AppRoutes'
import {BrowserRouter as Router} from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <div className='app'>
        <h2>Book Library</h2>
        <NavBar/>
        <AppRoutes/>
      </div>
    </Router>
  )
}

export default App
