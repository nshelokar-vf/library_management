import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(`${API_URL}`);
        if (response.ok) {
          const json = await response.json();
          setBooks(json);
        } else {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      } catch (e) {
        setError("An error occurred...");
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
