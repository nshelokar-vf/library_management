import { Route, Routes } from "react-router-dom";
import BookList from "../features/books/BookList";
import CreateBook from "../features/books/CreateBook";
import BookDetails from "../features/books/BookDetails";
import EditBook from "../features/books/UpdateBook";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/new" element={<CreateBook />} />
      <Route path="books/:id" element={<BookDetails />} />
      <Route path="books/:id/edit" element={<EditBook />} />
    </Routes>
  )
}

export default AppRoutes
