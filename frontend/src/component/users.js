import React, { useState, useEffect } from "react";

function Users() {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/api/users").then(
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
            <h1>Users</h1>
        
        {(typeof data === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            data.map((user => 
            <div key={user.user_id}>
                <h2>{user.username}</h2>
                <p>{user.firstname}</p>
            </div>
            
            ))
        )}

        </div>
    );
}

export default Users;