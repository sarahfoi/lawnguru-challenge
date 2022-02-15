import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import useToken from './components/useToken';
import "./App.css"

import CustomerList from './components/customer-list';
import Login from "./components/login"
import RegisterCustomer from "./components/register-customer"
import EditCustomer from "./components/edit-customer"
import Navbar from './components/navbar';

function App() {
  
  const {token, setToken} = useToken() 
  
  async function logout(){
    setToken(null)
    localStorage.clear()
  }

  if(!token){
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Navbar logout={logout}/>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer/register" element={<RegisterCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
