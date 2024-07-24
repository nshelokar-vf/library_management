import { Link } from 'react-router-dom';
import './navbar.css'

function NavBar() {
  return (
    <nav>
      <Link to="/new" > New Book </Link>
    </nav>
  )
}

export default NavBar
