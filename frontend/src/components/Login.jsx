import { useRef } from "react"
import { Link } from 'react-router-dom'
import './Signup.css'


const Login = ({setCurrUser, setShow}) =>{
  const formRef=useRef()
  const login=async (userInfo, setCurrUser)=>{
    const url="http://localhost:3000/login"
    try{
        const response=await fetch(url, {
            method: "post",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const data=await response.json()
        if(!response.ok) throw data.error
        
        const token = response.headers.get("Authorization");
        if (token) {
        console.log("Received token:", token);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        setCurrUser(data);
        setShow(false); 
      } else {
        console.error("Token not found in the response headers.");
      }      
    }catch(error){
       console.log("Loginerror", error)
    }
}
  const handleSubmit=e=>{
    e.preventDefault()
      const formData=new FormData(formRef.current)
      const data=Object.fromEntries(formData)
      const userInfo={
        "user":{
          email: data.email, password: data.password
        }
      }
      login(userInfo, setCurrUser)
      e.target.reset()
  }
  const handleClick=e=>{
    e.preventDefault()
    setShow(false)
  }
  return(
 
    <div className="signup-container">
      <h3>Login</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name='email' placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name='password' placeholder="Password" required />
        </div>
        <input type='submit' value="Login" className="submit-button" />
      </form>
      <div className="login-link">
        Not registered yet? <a href="#signup" onClick={handleClick}>Sign up</a>.
      </div>
      
    </div>
  )
}
export default Login




