import React from 'react'

export default function Product({title, price, brand, category}){
    return(
        <div>
            <div style={{border: '1px solid black'}}>
                <h4>Product: {title}  Price: {price}</h4>
                <p>Brand: {brand}</p>
                <p>Category: {category}</p>
            </div>
            <br />
        </div>
    )
}
