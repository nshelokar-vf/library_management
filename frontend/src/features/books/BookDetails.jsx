import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Invalid book ID.');
      setLoading(false);
      return;
    }

    const fetchCurrentBook = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const book = await response.json();
          setBook(book);
        } else {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      } catch (e) {
        console.log("An error occurred", e);
      }
    }
    fetchCurrentBook();
  }, [id]);

  const deleteBook = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        navigate('/');
      } else {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (e) {
      console.log("An error occurred", e);
    }
  }

  return (
    <div>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <div className='post-links'>
        <button onClick={deleteBook}>Delete</button>
      </div>
      <Link to="/">Back to Books List</Link>
    </div>
  )
}

export default BookDetails
