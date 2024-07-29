import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants';
import './book_list.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to sign in or sign up before continuing");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}`, {
          headers: {
            "Authorization": token, 
            "Content-Type": "application/json",
          }
        });
        setBooks(response.data);
      } catch (e) {
        setError(`An error occurred: ${e.response?.data?.message || e.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr className="table-empty-row">
              <td colSpan={5}>
                No books available.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id} className="table-row">
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td><Link to={`/books/${book.id}`}>View</Link></td>
                <td><Link to={`/books/${book.id}/edit`}>Edit</Link></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
