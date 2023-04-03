//import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/main.css';
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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/books' element={< Books />}></Route>
          <Route exact path='/users' element={< Users />}></Route>
          <Route exact path='/login' element={< LoginPage />}></Route>
          <Route exact path='/register' element={< RegisterPage />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
