//import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/app.css';
import Home from './component/home';
import Books from './component/books';
import Users from './component/users';
import RegisterPage from './component/register';
import LoginPage from './component/login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <ul className="left-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
            </ul>
            <h1 className="logo">INKWELL</h1>
            <ul className="right-links">
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </header>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;