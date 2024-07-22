import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [author, setAuthor] = useState([])
    const [newAuthor, setNewAuthor] = useState({nome:'', cognome:'', email:'', dataDiNascita:'', avatar:''})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [limit, setLimit] = useState(10)
    useEffect(() => {
      fetch(`http://localhost:5001/?page=${currentPage}&limit=${limit}` )
          .then(response => response.json())
          .then((data) => {
              setAuthor(data.authors)
              setTotalPages(data.totalPages)
              setCurrentPage(data.currentPage)
              console.log(data.authors)
          })
          .catch((err) => (console.error("Oh no!", err)))
  }, [currentPage, limit])
    console.log(author)
    const postAuthor = (e) => {
        e.preventDefault();

        fetch('http://localhost:5001/', {
            method: 'POST',
            headers: {
                    'Content-Type':'application/json'
            },
            body:JSON.stringify(newAuthor)
        })
        .then(response => response.json())
        .then(data => {
            setAuthor([...author, data])
            setNewAuthor({nome:'', cognome:'', email:'', dataDiNascita:'', avatar:''})
        })
        .catch((err) => (console.error("Oh no!", err)))
    }

    const deleteAuthor = (id) => {
        fetch('http://localhost:5001/' + id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            setAuthor(author.filter((author) => author._id !== id))
        })
        .catch(err => console.error('Oh cacchio!', err))
    }

  return (
    <>
      <h1>:</h1>
       <ul>
                {author.map((dati) => (
                <li>
                  <h2>{dati.nome} {dati.cognome}</h2>
            <h3>{dati.email}</h3>
            <p>{dati.dataDiNascita}</p>
            <img src={dati.avatar} alt="Avatar Author" />
            <button onClick={() => deleteAuthor(dati._id)}>Delete</button>
                </li>
                ))}
            </ul>

            <form onSubmit={postAuthor}>
                <input type="text" value={newAuthor.nome} onChange={(e) => setNewAuthor({...newAuthor, nome:e.target.value})} placeholder='Nome' required/>
                <input type="text" value={newAuthor.cognome} onChange={(e) => setNewAuthor({...newAuthor, cognome:e.target.value})} placeholder='Cognome' required/>
                <input type="text" value={newAuthor.email} onChange={(e) => setNewAuthor({...newAuthor, email:e.target.value})} placeholder='email' required />
                <input type="text" value={newAuthor.dataDiNascita} onChange={(e) => setNewAuthor({...newAuthor, dataDiNascita:e.target.value})} placeholder='data di nascita'required/>
                <input type="text" value={newAuthor.avatar} onChange={(e) => setNewAuthor({...newAuthor, avatar:e.target.value})} placeholder='url immagine avatar'required/>
                <button type="submit">+</button>
            </form>
            <div>
                <button onClick={() => setCurrentPage(currentPage-1)} disabled = {currentPage === 1}>Back</button>
                <p>{currentPage}/{totalPages}</p>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>
        </>
    )
} 

export default App;

//TODO later