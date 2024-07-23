import Signup from "./Signup";
import Login from './Login';
import Logout from './Logout';
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateBook from "../features/books/CreateBook";
import BookDetails from "../features/books/BookDetails";
import BookList from "../features/books/BookList";
import EditBook from "../features/books/UpdateBook";

const User = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setUserLoggedIn(isLoggedIn);
  }, []);
  const [show, setShow]=useState(true);

  if(isUserLoggedIn) 
    return (
      <Router>
        <NavBar/>
          <Routes>
              <Route path="/" element={<BookList/>}/>
              <Route path="/new" element={<CreateBook/>}/>
              <Route path="books/:id" element={<BookDetails/>}/>
              <Route path="books/:id/edit" element={<EditBook/>}/>
          </Routes>
          <Logout setCurrUser={setUserLoggedIn}/>
      </Router>
    )
    return (
      <div>
        { show?
          <Login setCurrUser={setUserLoggedIn} setShow={setShow}/>  
          :
          <Signup setCurrUser={setUserLoggedIn}  setShow={setShow} />
        }
      </div>
    )
}

export default User
