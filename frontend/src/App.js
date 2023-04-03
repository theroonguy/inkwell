//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api/books").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []);

  return (
    <div>
      
      {(typeof data.books === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.books.map((book, i) => (
          <div key={i}>
            <h2>{book.title}</h2>
            <p>{book.content}</p>
          </div>
          
        ))
      )}

    </div>
  );
}

export default App;
