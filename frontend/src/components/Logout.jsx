import axios from 'axios';
import './logout.css';

const Logout = ({ setCurrUser }) => {
  const logout = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/logout", {
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

export default Logout
