import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import User from './User';
import Photo from './Photo';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/User">User</Link>
                        </li>
                        <li>
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
