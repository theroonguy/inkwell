//import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './component/home';
import Books from './component/books';
import Users from './component/users';

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
          </ul>
        </div>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/books' element={< Books />}></Route>
          <Route exact path='/users' element={< Users />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
