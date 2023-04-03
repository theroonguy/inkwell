import React, { useState, useEffect } from "react";

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
        <div>
            <h1>Books</h1>
        
        {(typeof data === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            data.map((book => 
            <div key={book.book_id}>
                <h2>{book.title}</h2>
                <p>{book.content}</p>
            </div>
            
            ))
        )}

        </div>
    );
}

export default Books;