import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../constants';
import './newbook.css';

function EditBook() {
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("Invalid Book ID")
      setLoading(false);
      return;
    }
    const fetchCurrentBook = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token not found');
      }
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            'Authorization': token, 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        setBook(response.data);
      } catch (error) {
        toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token not found');
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
      });
      if (response.ok) {
        navigate(`/books/${id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }
    } catch (e) {
      toast.error(`An error occurred: ${e.message}`);
    }
  }

  if (!book) return <h3>Loading...</h3>

  return (
    <div className="form-container" >
      <h3>Edit your book here</h3>
      <form onSubmit={handleSubmit} className="title-form">
        <div className="form-group">
          <label htmlFor='book-title'>Title</label>
          <br />
          <input
            type='text'
            id='book-title'
            name='title'
            value={book.title}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor='book-author'>Author</label>
          <br />
          <input
            type='text'
            id='book-author'
            name='author'
            value={book.author}
            onChange={handleChange}>
          </input>
        </div>
        <div className="form-group">
          <label htmlFor='book-description'>Description</label>
          <br />
          <input
            type='text'
            id='book-description'
            name='description'
            value={book.description}
            onChange={handleChange}>
          </input>
        </div>
        <div>
          <button type='submit' className="submit-button">Save</button>
        </div>
      </form>
      <Link to="/">Back to Books List</Link>
      <ToastContainer />
    </div>
  )
}

export default EditBook
