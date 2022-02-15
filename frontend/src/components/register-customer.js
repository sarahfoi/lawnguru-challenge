import React from 'react';

import CustomerForm from './customer-form';

export default function RegisterCustomer(){
    return(
        <div className='container'>
            <h2>Register new customer</h2>
            <CustomerForm url="http://localhost:5000/customer/add"/>
        </div>
    )
}