import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import User from './User';
import Photo from './Photo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-3">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/User">User</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/Photo">Photo</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/User" element={<User />} />
                    <Route path="/Photo" element={<Photo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
