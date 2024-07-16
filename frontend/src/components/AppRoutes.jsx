import BookList from "../features/books/BookList"
import React from "react"
import { Route, Routes } from "react-router-dom"
import NewBookForm from "../features/books/NewBookForm"
import BookDetails from "../features/books/BookDetails"
import EditBookForm from "../features/books/EditBookForm"


function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<BookList/>}/>
            <Route path="/new" element={<NewBookForm/>}/>
            <Route path="books/:id" element={<BookDetails/>}/>
            <Route path="books/:id/edit" element={<EditBookForm/>}/>

        </Routes>
    )
}

export default AppRoutes
