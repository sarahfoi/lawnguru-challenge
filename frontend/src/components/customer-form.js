import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useForm } from "react-hook-form";

function sendCustomer(customer, url){
    console.log(customer)

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(data => data.json())
    .catch(error => console.log(error))
}

const CustomerForm = props => {      

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [zipCode, setZipCode] = useState(0)

    const owner = JSON.parse(localStorage.getItem('username'))

    const retrieveCustomer = () => {
        axios.get("http://localhost:5000/customer/"+props.id)
            .then(res => {                
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
                setCountry(res.data.address.country)
                setState(res.data.address.state)
                setCity(res.data.address.city)
                setStreet(res.data.address.street)
                setZipCode(res.data.address.zipCode)
            })
            .catch(error => {
                console.log(error)
            })
    }


    const { register, setValue } = useForm();

    useEffect(() => {
        if(props.id){                    
            retrieveCustomer();
            setValue('firstName', firstName)
            setValue('lastName', lastName)
            setValue('email', email)
            setValue('country', country)
            setValue('state', state)
            setValue('city', city)
            setValue('street', street)
            setValue('zipCode', zipCode)
        } 
    },[]) 

    const handleSubmit = async e => {
        e.preventDefault()
        const saveCustomer = await sendCustomer({
            owner,
            firstName,
            lastName,
            email,
            address:{
                country,
                state,
                city,
                street,
                zipCode
            }
        }, props.url)

        if(saveCustomer.error){
            alert(saveCustomer.error)
        }else{
            window.location = '/'
        }
    }

    return(
        <div className='form-signin'>            
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input {...register('firstName')} type="text" className="form-control" name="firstName" id="firstName" onChange = {e => setFirstName(e.target.value)} required={true} />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input {...register('lastName')} type="text" className="form-control" name="lastName" id="lastName" onChange = {e => setLastName(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input {...register('email')} type="email" className="form-control" name="email" id="email" onChange = {e => setEmail(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input {...register('country')} type="text" className="form-control" name="country" id="country" onChange = {e => setCountry(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input {...register('state')} type="text" className="form-control" name="state" id="state" onChange = {e => setState(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input {...register('city')} type="text" className="form-control" name="city" id="city" onChange = {e => setCity(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street</label>
                <input {...register('street')} type="text" className="form-control" name="street" id="street" onChange = {e => setStreet(e.target.value)} required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                <input {...register('zipCode')} type="number" className="form-control" name="zipCode" id="zipCode" onChange = {e => setZipCode(e.target.value)} required={true}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CustomerForm