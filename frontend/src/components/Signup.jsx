import { useRef } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const signup = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/signup";
    try {
      const response = await axios.post(url, userInfo);
      const data = response.data;
      localStorage.setItem('token', response.headers["authorization"]);
      setCurrUser(data);
    } catch (error) {
      toast.error(`Signup error: ${error.response?.data?.error || error.message}`);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      "user": { email: data.email, password: data.password }
    }
    signup(userInfo, setCurrUser);
    e.target.reset();
  }

  const handleClick = e => {
    e.preventDefault();
    setShow(true);
  }

  return (
    <div className="signup-container">
      <h3>Sign Up</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name='email' placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name='password' placeholder="Password" required />
        </div>
        <input type='submit' value="Submit" className="submit-button" />
      </form>
      <div className="login-link">
        Already registered? <a href="#login" onClick={handleClick}>Login here</a>.
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
