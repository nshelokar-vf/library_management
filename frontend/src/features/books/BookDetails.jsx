import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../constants';
import './bookdetails.css';

function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("Id is incorrect");
    }
    
    const fetchCurrentBook = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            'Authorization': token, // Ensure "Bearer " prefix is added
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        setBook(response.data);
      } catch (e) {
        toast.error(`Error: ${e.response?.data?.message || e.message}`);
      }
    }
    fetchCurrentBook();
  }, [id]);

  const deleteBook = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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

  if (!book) return <h3>Loading...</h3>

  return (
    <div>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <div className='post-links'>
        <button onClick={deleteBook}>Delete</button>
      </div>
      <Link to="/">Back to Books List</Link>
      <ToastContainer />
    </div>
  )
}

export default BookDetails
