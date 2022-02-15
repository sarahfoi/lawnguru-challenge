import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {    
    return (        
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className='container'>            
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                        <Link to="/" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/customer/register" className="nav-link">Register customer</Link>
                        </li>
                        <li className="navbar-item">
                        <button className="btn btn-link nav-link" onClick={props.logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>        
    );
}

export default Navbar;