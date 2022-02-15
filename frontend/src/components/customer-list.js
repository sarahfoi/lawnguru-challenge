import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"

function updateCustomer(id, customer, status){      
    customer.active = status
    return fetch("http://localhost:5000/customer/update/"+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(data => data.json())
    .catch(error => console.log(error))
}

const Customer = props => (
    <tr>
        <td>{props.customer.firstName} {props.customer.lastName}</td>
        <td>{props.customer.address.street}, {props.customer.address.city}, {props.customer.address.state} {props.customer.address.zipCode},  {props.customer.address.country}</td>
        <td>
            { (!props.customer.active) &&
                <span className="badge bg-secondary">Inactive</span>
            }
            { (props.customer.active) &&
                <span className="badge bg-success">Active</span>
            }
        </td>
        <td>
            {props.customer.createdAt.substring(0,10)}
        </td>
        <td>
            <Link to={"/customer/edit/"+props.customer._id}>Edit</Link>
        </td>
        <td>
            {(props.customer.active) &&
                <button className="btn btn-link" onClick={() =>updateCustomer(props.customer._id, props.customer, false)}>Inactivate</button>
            }
            {(!props.customer.active) &&
                <button className="btn btn-link" onClick={() => updateCustomer(props.customer._id, props.customer, true)}>Activate</button>
            }
        </td>
    </tr>
)

function list(customers){
    if(customers)
        return customers.map(customer => {
            return <Customer customer={customer} key={customer._id}/>
        })
}

export default function CustomerList(){
    const [customers, setCustomers] = useState([]);
    const owner = JSON.parse(localStorage.getItem('username'))   


    useEffect(() => {
        retrieveCustomers();
    });


    const retrieveCustomers = () => {
        axios.get("http://localhost:5000/customer/owner/"+owner)
            .then(res => {
                setCustomers(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <div className='container'>
            <h3>Customer list</h3>
            <table className="table table-hover">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                { list(customers) }
            </tbody>
            </table>
        </div>
    )
}