import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar(){
  return (
    <nav>
      <Link to="/new">New Book</Link>
    </nav>
  )
}

export default NavBar
