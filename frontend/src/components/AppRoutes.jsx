import BookList from "../features/books/BookList";
import { Route, Routes } from "react-router-dom";
import CreateBook from "../features/books/CreateBook";
import BookDetails from "../features/books/BookDetails";
import EditBookForm from "../features/books/EditBookForm"

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<BookList/>}/>
            <Route path="/new" element={<CreateBook/>}/>
            <Route path="books/:id" element={<BookDetails/>}/>
            <Route path="books/:id/edit" element={<EditBookForm/>}/>

        </Routes>
    )
}

export default AppRoutes
