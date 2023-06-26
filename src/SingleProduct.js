import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UseProductContext } from './context/ProductsContext';
import CartModal from './components/CartModal';
import "././index.css"

export default function SingleProduct() {
    const { id } = useParams();
    let { quantity, singleProduct, populateSingle, incrementQty, decrementQty } = UseProductContext();


    useEffect(() => {
        const fetchSingleData = async () => {
            const response = await axios.get(`https://storebackend-ldjb.onrender.com/api/v1/products/singleproduct?id=${id}`);

            populateSingle(response.data[0]);
        }

        fetchSingleData()
    }, [])

    const incrementBtn = () => {
        incrementQty()
    }
    const decrementBtn = () => {
        decrementQty()
    }

    return (
        <div>

            <div className='container my-5'>
                <div className='row singleProductRow'>
                    <div className='col-6 imgCol'>
                        <img className='w-100 shadow rounded' src={singleProduct.url} alt="" />
                    </div>

                    <div className='col-6 detailsCol'>
                        <span className="myBgDark mb-2 mx-2 d-inline-block">Name: </span>
                        <span>{singleProduct.name}</span> <br />
                        <span className="myBgDark mb-2 mx-2 d-inline-block">Description: </span>
                        <span>{singleProduct.description}</span> <br />
                        
                        <span className="btnYellow px-3 py-1 mb-2 mx-2 d-inline-block">Price: </span>
                        <span>{singleProduct.price}</span> <br />
                        <span className="myBgDark mb-2 mx-2 d-inline-block">Category: </span>
                        <span>{singleProduct.category}</span> <br />
                        <span className="myBgDark mb-2 mx-2 d-inline-block">Brand: </span>
                        <span>{singleProduct.company}</span> <br />
                        <span className="myBgDark mb-2 mx-2 d-inline-block">Rating: </span>
                        <span>{singleProduct.rating}</span> <br />
                        <hr />
                        <div className='quantity'>
                            <button onClick={decrementBtn} className='qtyBtns'>-</button>
                            {quantity}
                            <button onClick={incrementBtn} className='qtyBtns'>+</button>
                        </div>
                        <hr />
                        <div className='modalWrapper'>
                            <CartModal data={singleProduct} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
