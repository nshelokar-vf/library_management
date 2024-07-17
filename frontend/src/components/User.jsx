//  frontend/src/components/User.js
import Signup from "./Signup";
import Login from './Login'
import Logout from './Logout'
import AppRoutes from "./AppRoutes";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewBookForm from "../features/books/NewBookForm"
import BookDetails from "../features/books/BookDetails"
import BookList from "../features/books/BookList"

const User = () => {
   const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        setUserLoggedIn(isLoggedIn);
    }, []);
    const [show, setShow]=useState(true)


    if(isUserLoggedIn) 
        return (
            <Router>
               
                <NavBar/>
                <Routes>
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/new" element={<NewBookForm/>}/>
                    <Route path="books/:id" element={<BookDetails/>}/>
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