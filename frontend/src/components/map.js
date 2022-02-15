import React, {useState} from 'react';
import ReactMapGL, {Marker} from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from "react-geocode"

const CustomerMap = props => {

    const token = "pk.eyJ1Ijoic2FyYWhmb2kiLCJhIjoiY2t6bmV1bWcwMDN4aDJ4bjJncWFxbXF0ZSJ9.7NfJSfLkTeA055ux7we3VA"
    
    console.log(props.customers)

    const [viewState, setViewState] = useState({
        latitude: 45.4211,
        longitude: -75.69,
        zoom: 10
    })

    Geocode.setApiKey("AIzaSyBaeCNJjI9hglXOhZ7PH8xtdOiMD713KSQ")
    props.customers.map((customer) => (                
        Geocode.fromAddress(`${customer.address.street} , ${customer.address.city}, ${customer.address.state} ${customer.address.zipCode},  ${customer.address.country}`)
        .then(res => {
            const { lat, lng } = res.results[0].geometry.location;
            console.log(lat, lng);
        })
    ))
    
    return(
        <div>
            <ReactMapGL 
            {...viewState}
            style={{width: '100%', height: 400}}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={token} 
            mapStyle="mapbox://styles/mapbox/streets-v11"            
            >
            {/* {props.customers.map((customer) => (                
                Geocode.fromAddress(`${customer.address.street} , ${customer.address.city}, ${customer.address.state} ${customer.address.zipCode},  ${customer.address.country}`)
                .then(res => {
                    const { lat, lng } = res.results[0].geometry.location;
                    console.log(lat, lng);
                })



                // <Marker 
                // key={customer.properties.PARK_ID} 
                // latitude={customer.geometry.coordinates[1]}
                // longitude={customer.geometry.coordinates[0]}>
                //     <button>
                //         teste
                //     </button>
                // </Marker>
            ))} */}
            </ReactMapGL>
        </div>
    )
}

export default CustomerMap