//import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles/temp_app.css';
import Home from './component/home';
import Books from './component/books';
import Users from './component/users';
import RegisterPage from './component/register';
import LoginPage from './component/login';
import Search from './component/search';
import SearchResults from './component/searchresults';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            {/* <div classname="link-container"> */}
            <ul className="left-links">
              <li>
                <Link to="/" className="button">Home</Link>
              </li>
              <li>
                <Link to="/books" className="button">Books</Link>
              </li>
              <li>
                <Link to="/register" className="button">Register</Link>
              </li>
              
            </ul>
            <h1 className="logo">INKWELL</h1>
            <ul className="right-links">
              <li>
                <Link to="/users" className="button">Users</Link>
              </li>
              <li>
                <Link to="/login" className="button">Login</Link>
              </li>
              <li>
                <div className="search-wrapper">
                  <Search className='right-links search' />
                </div>

              </li>
            </ul>
            {/* </div> */}
          </header>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
    );
  }
}

export default App;