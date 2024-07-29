import axios from 'axios';
import PropTypes from 'prop-types';
import './logout.css';
import { BASE_URL } from "../constants";

const Logout = ({ setCurrUser }) => {
  const logout = async () => {
    const LOGOUT_URL = `${BASE_URL}/logout`;
    try {
        const response = await axios.delete(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });
      if (response.status === 200) { 
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        setCurrUser(null);
      } else {
        throw new Error("Logout failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error.response ? error.response.data : error.message);
    }
  }

  const handleClick = e => {
    e.preventDefault();
    logout();
  }

  return (
    <div>
      <input type="button" value="Logout" onClick={handleClick} className="logout-button" />
    </div>
  )
}

Logout.propTypes = {
  setCurrUser: PropTypes.func.isRequired, 
  setShow: PropTypes.func.isRequired      
};

export default Logout
