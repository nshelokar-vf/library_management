import { useRef } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/login";
    try {
      const response = await axios.post(url, userInfo);
      const data = response.data;
      const token = response.headers.authorization;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        setCurrUser(data);
        setShow(false);
      }
    } catch (error) {
      toast.error(`Login error: ${error.response?.data?.error || error.message}`);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      "user": {
        email: data.email, password: data.password
      }
    };
    login(userInfo, setCurrUser);
    e.target.reset();
  }

  const handleClick = e => {
    e.preventDefault();
    setShow(false);
  }

  return (
    <div className="signup-container">
      <h3>Login</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name='password' placeholder="Password" required />
        </div>
        <input type="submit" value="Login" className="submit-button" />
      </form>
      <div className="login-link">
        Not registered yet? <a href="#signup" onClick={handleClick}> Sign up </a>.
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
