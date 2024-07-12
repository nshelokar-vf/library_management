import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        console.log('Fetching books from:', API_URL);
        const response = await fetch(`${API_URL}`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const json = await response.json();
          console.log('Response JSON:', json);
          setBooks(json);
        } else {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      } catch (e) {
        setError("An error occurred...");
        console.log("An error occurred", e);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Author</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{book.id}</td>
              <td style={{ padding: '10px' }}>{book.title}</td>
              <td style={{ padding: '10px' }}>{book.author}</td>
              <td style={{ padding: '10px' }}>{book.description}</td>
              <td><Link to={`/books/${book.id}`}>View book</Link></td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
