import React from 'react';
import { useParams } from "react-router-dom"

import CustomerForm from './customer-form';

export default function EditCustomer(){

    const params = useParams();    

    return(
        <div  className='container'>
            <h2>Edit customer</h2>
            <CustomerForm url={"http://localhost:5000/customer/update/"+params.id} id={params.id}/>
        </div>
    )
}