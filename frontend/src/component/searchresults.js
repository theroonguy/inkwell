import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/search.css';

const SearchResults = (props) => {
  const { query, books, users } = props.location.state;

  return (
    <div className="search-results-container">
      <h2>Search results for "{query}"</h2>
      <div className="books-results">
        <h3>Books:</h3>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.book_id}>
                <Link to={`/author/${book.author_id}/book/${book.book_id}`}>{book.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
      <div className="users-results">
        <h3>Users:</h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.user_id}>
                <Link to={`/user/${user.username}`}>{user.username}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
