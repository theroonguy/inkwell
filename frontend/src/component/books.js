import React, { useState, useEffect } from "react";
import "../styles/books.css";

function Books() {
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
        <div className="books-page">
            <h1>Books</h1>
            <div className="books-container">
                {(typeof data === 'undefined') ? (
                    <p>Loading...</p>
                ) : (
                    data.map((book => 
                        <div key={book.book_id} className="book-card">
                            <h2 className="book-title">{book.title}</h2>
                            <p className="book-caption">{book.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Books;
