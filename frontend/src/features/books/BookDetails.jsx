import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants'

function BookDetails() {
  const [book, setBook] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`)
        if (response.ok) {
          const json = await response.json()
          setBook(json)
        } else {
          const errorText = await response.text()
          throw new Error(`Error ${response.status}: ${errorText}`)
        }
      } catch (e) {
        console.log("An error occurred", e)
      }
    }
    fetchCurrentBook()
  }, [id])

  const deleteBook = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        navigate('/')
      } else {
        const errorText = await response.text()
        throw new Error(`Error ${response.status}: ${errorText}`)
      }
    } catch (e) {
      console.log("An error occurred", e)
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
    </div>
  )
}

export default BookDetails
